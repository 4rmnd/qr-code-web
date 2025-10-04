import { QRData, QRType } from '../types/qr';

interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateQRData(data: QRData): ValidationResult {
  const { type } = data;
  
  switch (type) {
    case 'url':
      return validateUrl(data.url || '');
    
    case 'wifi':
      return validateWifi(data.wifi);
    
    case 'location':
      return validateLocation(data.location || '');
    
    case 'whatsapp':
      return validateWhatsapp(data.whatsapp);
    
    case 'mail':
      return validateMail(data.mail);
    
    case 'audio':
    case 'file':
    case 'image':
      return validateFileUrl(data.fileUrl || '');
    
    default:
      return { isValid: false, message: 'Tipe QR tidak valid' };
  }
}

function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, message: 'URL tidak boleh kosong' };
  }
  
  try {
    new URL(url);
    return { isValid: true, message: '' };
  } catch (e) {
    return { isValid: false, message: 'Format URL tidak valid, harus diawali dengan http:// atau https://' };
  }
}

function validateWifi(wifi?: { ssid: string; password: string; encryption: string }): ValidationResult {
  if (!wifi) {
    return { isValid: false, message: 'Data WiFi tidak boleh kosong' };
  }
  
  if (!wifi.ssid) {
    return { isValid: false, message: 'SSID tidak boleh kosong' };
  }
  
  if (wifi.encryption !== 'nopass' && !wifi.password) {
    return { isValid: false, message: 'Password diperlukan untuk enkripsi yang dipilih' };
  }
  
  return { isValid: true, message: '' };
}

function validateLocation(location: string): ValidationResult {
  if (!location) {
    return { isValid: false, message: 'Lokasi tidak boleh kosong' };
  }
  
  // Format lokasi: latitude,longitude atau alamat
  const latLongRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
  if (latLongRegex.test(location)) {
    const [lat, lng] = location.split(',').map(Number);
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return { isValid: false, message: 'Koordinat tidak valid (latitude: -90 to 90, longitude: -180 to 180)' };
    }
    return { isValid: true, message: '' };
  }
  
  // Jika bukan format lat,long, minimal harus ada 3 karakter untuk alamat
  if (location.length < 3) {
    return { isValid: false, message: 'Alamat terlalu pendek, minimal 3 karakter' };
  }
  
  return { isValid: true, message: '' };
}

function validateWhatsapp(whatsapp?: { phone: string; message?: string }): ValidationResult {
  if (!whatsapp) {
    return { isValid: false, message: 'Data WhatsApp tidak boleh kosong' };
  }
  
  if (!whatsapp.phone) {
    return { isValid: false, message: 'Nomor telepon tidak boleh kosong' };
  }
  
  // Split the phone number into country code and number
  const parts = whatsapp.phone.split(' ');
  if (parts.length !== 2) {
    return { isValid: false, message: 'Format nomor telepon tidak valid, gunakan format +[kode negara] [nomor]' };
  }
  
  const countryCode = parts[0];
  const phoneNumber = parts[1];
  
  // Check if country code starts with + and phoneNumber contains only digits
  if (!countryCode.startsWith('+') || !/^[0-9]{8,15}$/.test(phoneNumber)) {
    return { isValid: false, message: 'Format nomor telepon tidak valid, gunakan format +[kode negara] [nomor]' };
  }
  
  return { isValid: true, message: '' };
}

function validateMail(mail?: { email: string; subject?: string; body?: string }): ValidationResult {
  if (!mail) {
    return { isValid: false, message: 'Data email tidak boleh kosong' };
  }
  
  if (!mail.email) {
    return { isValid: false, message: 'Alamat email tidak boleh kosong' };
  }
  
  // Format email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(mail.email)) {
    return { isValid: false, message: 'Format email tidak valid' };
  }
  
  return { isValid: true, message: '' };
}

function validateFileUrl(fileUrl: string): ValidationResult {
  if (!fileUrl) {
    return { isValid: false, message: 'URL file tidak boleh kosong' };
  }
  
  // Validasi sederhana untuk URL file
  if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://') && !fileUrl.startsWith('blob:')) {
    return { isValid: false, message: 'URL file tidak valid' };
  }
  
  return { isValid: true, message: '' };
}