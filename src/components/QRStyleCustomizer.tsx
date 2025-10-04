import { motion } from 'framer-motion';
import { QRStyle, ColorMode, LogoType } from '../types/qr';

interface QRStyleCustomizerProps {
  style: QRStyle;
  onChange: (style: QRStyle) => void;
}

const logoTypes: { value: LogoType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'linkedin', label: 'LinkedIn' },
];

export default function QRStyleCustomizer({ style, onChange }: QRStyleCustomizerProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Color Mode</label>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange({ ...style, colorMode: 'single' })}
            className={`px-4 py-2 rounded-lg transition-all ${
              style.colorMode === 'single'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Single Color
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange({ ...style, colorMode: 'gradient' })}
            className={`px-4 py-2 rounded-lg transition-all ${
              style.colorMode === 'gradient'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Gradient
          </motion.button>
        </div>
        <div className="mt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={style.bgColor === 'transparent'}
              onChange={() => {
                if (style.bgColor === 'transparent') {
                  // Ketika checkbox dinonaktifkan, kembalikan background color
                  onChange({ ...style, bgColor: '#FFFFFF' });
                } else {
                  // Ketika checkbox diaktifkan, atur background menjadi transparan tapi tetap pertahankan colorMode
                  onChange({ ...style, bgColor: 'transparent' });
                }
              }}
              className="w-4 h-4 accent-blue-500"
            />
            <span className="text-gray-700">No Background</span>
          </label>
        </div>
      </div>

      {style.bgColor === 'transparent' && style.colorMode === 'single' ? (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.fgColor}
                onChange={(e) => onChange({ ...style, fgColor: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.fgColor}
                onChange={(e) => onChange({ ...style, fgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      ) : style.bgColor === 'transparent' && style.colorMode === 'gradient' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Start Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.gradientStart || '#000000'}
                onChange={(e) => onChange({ ...style, gradientStart: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.gradientStart || '#000000'}
                onChange={(e) => onChange({ ...style, gradientStart: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient End Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.gradientEnd || '#000000'}
                onChange={(e) => onChange({ ...style, gradientEnd: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.gradientEnd || '#000000'}
                onChange={(e) => onChange({ ...style, gradientEnd: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      ) : style.colorMode === 'single' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.fgColor}
                onChange={(e) => onChange({ ...style, fgColor: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.fgColor}
                onChange={(e) => onChange({ ...style, fgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.bgColor}
                onChange={(e) => onChange({ ...style, bgColor: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.bgColor}
                onChange={(e) => onChange({ ...style, bgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Start Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.gradientStart || '#000000'}
                onChange={(e) => onChange({ ...style, gradientStart: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.gradientStart || '#000000'}
                onChange={(e) => onChange({ ...style, gradientStart: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient End Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.gradientEnd || '#000000'}
                onChange={(e) => onChange({ ...style, gradientEnd: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.gradientEnd || '#000000'}
                onChange={(e) => onChange({ ...style, gradientEnd: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={style.bgColor}
                onChange={(e) => onChange({ ...style, bgColor: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={style.bgColor}
                onChange={(e) => onChange({ ...style, bgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Logo</label>
        <div className="grid grid-cols-2 gap-2">
          {logoTypes.map(({ value, label }) => (
            <motion.button
              key={value}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...style, logo: value })}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                style.logo === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>

      </div>
    </div>
  );
}
