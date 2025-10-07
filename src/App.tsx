import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import QRTypeSelector from './components/QRTypeSelector';
import QRDataInput from './components/QRDataInput';
import QRStyleCustomizer from './components/QRStyleCustomizer';
import QRCodePreview from './components/QRCodePreview';
import QRDownload from './components/QRDownload';
import { QRType, QRData, QRStyle } from './types/qr';

function App() {
  const [selectedType, setSelectedType] = useState<QRType>('url');
  const [qrData, setQrData] = useState<QRData>({
    type: 'url',
    url: '',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    whatsapp: { phone: '', message: '' },
    mail: { email: '', subject: '', body: '' },
  });

  const [qrStyle, setQrStyle] = useState<QRStyle>({
    colorMode: 'single',
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    gradientStart: '#000000',
    gradientEnd: '#4F46E5',
    logo: 'none',
  });

  const handleTypeChange = (type: QRType) => {
    setSelectedType(type);
    // Reset data ketika tipe QR berubah
    const emptyData: QRData = {
      type: type,
      url: type === 'url' ? '' : undefined,
      wifi: type === 'wifi' ? { ssid: '', password: '', encryption: 'WPA' } : undefined,
      location: type === 'location' ? '' : undefined,
      whatsapp: type === 'whatsapp' ? { phone: '', message: '' } : undefined,
      mail: type === 'mail' ? { email: '', subject: '', body: '' } : undefined,
      fileUrl: ['audio', 'file', 'image'].includes(type) ? '' : undefined,
    };
    setQrData(emptyData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
            <QrCode className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">QR Code Generator & Scanner</h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg px-4">
            Create beautiful, customizable QR codes for any purpose
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="md:col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Select QR Type</h2>
              <QRTypeSelector selectedType={selectedType} onSelect={handleTypeChange} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Enter Data</h2>
              <QRDataInput type={selectedType} data={qrData} onChange={setQrData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Customize Style</h2>
              <QRStyleCustomizer style={qrStyle} onChange={setQrStyle} />
            </motion.div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6 md:sticky md:top-8"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Preview</h2>
              <div id="qr-preview" className="flex justify-center md:justify-start">
                <QRCodePreview data={qrData} style={qrStyle} />
              </div>
              <div className="mt-4 md:mt-6">
                <QRDownload data={qrData} style={qrStyle} />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-16 text-center text-gray-600 text-sm py-4"
        >
          <p>Built with React, TypeScript, and TailwindCSS</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
