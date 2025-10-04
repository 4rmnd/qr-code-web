import { QRData } from '../types/qr';

export function generateQRValue(data: QRData): string {
  switch (data.type) {
    case 'url':
      return data.url || '';

    case 'wifi':
      if (!data.wifi) return '';
      const { ssid, password, encryption } = data.wifi;
      return `WIFI:T:${encryption};S:${ssid};P:${password};;`;

    case 'location':
      return data.location || '';

    case 'whatsapp':
        if (!data.whatsapp?.phone) return '';
        
        // Extract the country code and phone number
        const parts = data.whatsapp.phone.split(' ');
        if (parts.length !== 2) return '';
        
        // Remove the + from country code and combine with phone number
        const phoneNumber = parts[0].replace('+', '') + parts[1];
        
        const message = data.whatsapp.message ? `?text=${encodeURIComponent(data.whatsapp.message)}` : '';
        return `https://wa.me/${phoneNumber}${message}`;

    case 'mail':
      if (!data.mail?.email) return '';
      const subject = data.mail.subject ? `?subject=${encodeURIComponent(data.mail.subject)}` : '';
      const body = data.mail.body ? `${subject ? '&' : '?'}body=${encodeURIComponent(data.mail.body)}` : '';
      return `mailto:${data.mail.email}${subject}${body}`;

    case 'audio':
    case 'file':
    case 'image':
      return data.fileUrl || '';

    default:
      return '';
  }
}

export const logoUrls: Record<string, string> = {
  whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  twitter: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg',
  youtube: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
  facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  linkedin: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
};
