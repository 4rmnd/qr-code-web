export type QRType = 'url' | 'wifi' | 'location' | 'whatsapp' | 'mail' | 'audio' | 'file' | 'image';

export type WiFiEncryption = 'WPA' | 'WEP' | 'nopass';

export type ColorMode = 'single' | 'gradient';

export type LogoType = 'none' | 'whatsapp' | 'twitter' | 'youtube' | 'facebook' | 'linkedin' | 'custom';

export interface QRData {
  type: QRType;
  url?: string;
  wifi?: {
    ssid: string;
    password: string;
    encryption: WiFiEncryption;
  };
  location?: string;
  whatsapp?: {
    phone: string;
    message?: string;
  };
  mail?: {
    email: string;
    subject?: string;
    body?: string;
  };
  fileUrl?: string;
}

export interface QRStyle {
  colorMode: ColorMode;
  fgColor: string;
  bgColor: string;
  gradientStart?: string;
  gradientEnd?: string;
  logo: LogoType;
  customLogoUrl?: string;
}
