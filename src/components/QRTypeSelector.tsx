import { motion } from 'framer-motion';
import { Link, Wifi, MapPin, MessageCircle, Mail, Music, FileText, Image } from 'lucide-react';
import { QRType } from '../types/qr';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelect: (type: QRType) => void;
}

const qrTypes = [
  { type: 'url' as QRType, label: 'URL / Link', icon: Link },
  { type: 'wifi' as QRType, label: 'WiFi', icon: Wifi },
  { type: 'location' as QRType, label: 'Location', icon: MapPin },
  { type: 'whatsapp' as QRType, label: 'WhatsApp', icon: MessageCircle },
  { type: 'mail' as QRType, label: 'Email', icon: Mail },
  { type: 'audio' as QRType, label: 'Audio', icon: Music },
  { type: 'file' as QRType, label: 'File', icon: FileText },
  { type: 'image' as QRType, label: 'Image', icon: Image },
];

export default function QRTypeSelector({ selectedType, onSelect }: QRTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {qrTypes.map(({ type, label, icon: Icon }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(type)}
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedType === type
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
          }`}
        >
          <Icon className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
