import { motion } from 'framer-motion';
import { QRType, QRData, WiFiEncryption } from '../types/qr';
import { validateQRData } from '../utils/validation';
import { useState, useEffect } from 'react';
import { countryCodes } from '../utils/countryCodes';

interface QRDataInputProps {
  type: QRType;
  data: QRData;
  onChange: (data: QRData) => void;
}

const encryptionTypes: { value: WiFiEncryption; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'No Password' },
];

export default function QRDataInput({ type, data, onChange }: QRDataInputProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...data, fileUrl: url });
    }
  };

  // Validasi data setiap kali data berubah
  useEffect(() => {
    const validationResult = validateQRData(data);
    setErrorMessage(validationResult.isValid ? '' : validationResult.message);
  }, [data]);

  const handleChange = (newData: QRData) => {
    // Jika tipe WiFi dan enkripsi nopass, kosongkan password
    if (newData.type === 'wifi' && newData.wifi?.encryption === 'nopass') {
      newData.wifi.password = '';
    }
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p>{errorMessage}</p>
        </div>
      )}
      
      {type === 'url' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL / Link</label>
          <input
            type="url"
            value={data.url || ''}
            onChange={(e) => handleChange({ ...data, url: e.target.value })}
            placeholder="https://example.com"
            className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      )}

      {type === 'wifi' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SSID (Network Name)</label>
            <input
              type="text"
              value={data.wifi?.ssid || ''}
              onChange={(e) => handleChange({ ...data, wifi: { ...data.wifi!, ssid: e.target.value } })}
              placeholder="My WiFi Network"
              className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          {(data.wifi?.encryption !== 'nopass') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="text"
                value={data.wifi?.password || ''}
                onChange={(e) => handleChange({ ...data, wifi: { ...data.wifi!, password: e.target.value } })}
                placeholder="password123"
                className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Encryption Type</label>
            <div className="grid grid-cols-3 gap-2">
              {encryptionTypes.map(({ value, label }) => (
                <motion.button
                  key={value}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChange({ ...data, wifi: { ...data.wifi!, encryption: value } })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    (data.wifi?.encryption || 'WPA') === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}

      {type === 'location' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location (Address or Coordinates)</label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => handleChange({ ...data, location: e.target.value })}
            placeholder="123 Main St, City, Country or 37.7749,-122.4194"
            className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      )}

      {type === 'whatsapp' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="flex gap-2">
              <select
                value={data.whatsapp?.phone?.split(' ')[0] || '+62'}
                onChange={(e) => {
                  const countryCode = e.target.value;
                  const phoneNumber = data.whatsapp?.phone?.split(' ')[1] || '';
                  handleChange({ 
                    ...data, 
                    whatsapp: { 
                      ...data.whatsapp!, 
                      phone: `${countryCode} ${phoneNumber}` 
                    } 
                  });
                }}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.dial_code}>
                    {country.name} ({country.dial_code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={data.whatsapp?.phone?.split(' ')[1] || ''}
                onChange={(e) => {
                  const countryCode = data.whatsapp?.phone?.split(' ')[0] || '+62';
                  const phoneNumber = e.target.value.replace(/[^0-9]/g, '');
                  handleChange({ 
                    ...data, 
                    whatsapp: { 
                      ...data.whatsapp!, 
                      phone: `${countryCode} ${phoneNumber}` 
                    } 
                  });
                }}
                placeholder="81234567890"
                className={`w-2/3 px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
            <textarea
              value={data.whatsapp?.message || ''}
              onChange={(e) => handleChange({ ...data, whatsapp: { ...data.whatsapp!, message: e.target.value } })}
              placeholder="Hello!"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      {type === 'mail' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={data.mail?.email || ''}
              onChange={(e) => handleChange({ ...data, mail: { ...data.mail!, email: e.target.value } })}
              placeholder="contact@example.com"
              className={`w-full px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject (Optional)</label>
            <input
              type="text"
              value={data.mail?.subject || ''}
              onChange={(e) => handleChange({ ...data, mail: { ...data.mail!, subject: e.target.value } })}
              placeholder="Meeting Request"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body (Optional)</label>
            <textarea
              value={data.mail?.body || ''}
              onChange={(e) => handleChange({ ...data, mail: { ...data.mail!, body: e.target.value } })}
              placeholder="Hello, I would like to schedule a meeting..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      {['audio', 'file', 'image'].includes(type) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {type === 'audio' ? 'Audio File' : type === 'image' ? 'Image File' : 'File'} URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={data.fileUrl || ''}
              onChange={(e) => handleChange({ ...data, fileUrl: e.target.value })}
              placeholder="https://example.com/file.pdf"
              className={`flex-1 px-4 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <span className="text-gray-500">or</span>
            <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
              Upload
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileUpload} 
                accept={type === 'audio' ? 'audio/mp3,audio/mpeg' : type === 'image' ? 'image/*' : '.pdf,.doc,.docx,.xls,.xlsx'}
              />
            </label>
          </div>
          {data.fileUrl && <p className="mt-2 text-sm text-green-600">File uploaded successfully</p>}
        </div>
      )}
    </div>
  );
}
