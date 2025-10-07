import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { QRData, QRStyle } from '../types/qr';
import { generateQRValue, logoUrls } from '../utils/qrGenerator';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface QRDownloadProps {
  data: QRData;
  style: QRStyle;
}

// Opsi format file yang tersedia
const fileFormats = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'svg', label: 'SVG' },
  { value: 'pdf', label: 'PDF' },
] as const;

// Opsi ukuran file yang tersedia
const fileSizes = [
  { value: 'small', label: 'Kecil (500x500)', size: 500 },
  { value: 'medium', label: 'Sedang (1000x1000)', size: 1000 },
  { value: 'large', label: 'Besar (2000x2000)', size: 2000 },
] as const;

export default function QRDownload({ data, style }: QRDownloadProps) {
  const qrValue = generateQRValue(data);
  const [selectedFormat, setSelectedFormat] = useState<typeof fileFormats[number]['value']>('png');
  const [selectedSize, setSelectedSize] = useState<typeof fileSizes[number]['value']>('medium');

  // Fungsi untuk mendapatkan URL logo
  const getLogoUrl = () => {
    if (style.logo === 'none') return undefined;
    if (style.logo === 'custom') return style.customLogoUrl;
    return logoUrls[style.logo];
  };

  // Fungsi untuk mendapatkan warna foreground
  const getFgColor = () => {
    if (style.colorMode === 'gradient' && style.gradientStart && style.gradientEnd) {
      return style.gradientStart;
    }
    return style.fgColor;
  };

  const downloadQR = (format: typeof fileFormats[number]['value']) => {
    if (!qrValue) return;
    
    // Dapatkan ukuran yang dipilih
    const sizeOption = fileSizes.find(s => s.value === selectedSize);
    const canvasSize = sizeOption ? sizeOption.size : 1000;
    
    // Dapatkan URL logo
    const logoUrl = getLogoUrl();
    
    // Buat canvas baru untuk menggambar QR code
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Gambar background
    ctx.fillStyle = style.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ambil QR code dari DOM
    const qrElement = document.querySelector('#qr-preview svg');
    if (!qrElement) return;
    
    // Konversi QR code ke gambar
    const qrSvgData = new XMLSerializer().serializeToString(qrElement);
    const qrSvgBlob = new Blob([qrSvgData], { type: 'image/svg+xml;charset=utf-8' });
    const qrUrl = URL.createObjectURL(qrSvgBlob);
    
    // Gambar QR code ke canvas
    const qrImg = new Image();
    qrImg.onload = () => {
      // Gambar QR code ke canvas (sedikit lebih kecil untuk memberi ruang pada logo)
      ctx.drawImage(qrImg, 0, 0, canvas.width, canvas.height);
      
      // Jika ada logo, tambahkan logo
      if (logoUrl) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'Anonymous';
        
        logoImg.onload = () => {
          // Hitung posisi dan ukuran logo
          const logoSize = canvas.width * 0.2; // 20% dari ukuran QR
          const logoX = (canvas.width - logoSize) / 2;
          const logoY = (canvas.height - logoSize) / 2;
          
          // Gambar logo
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          
          // Selesaikan proses download
          finishDownload();
        };
        
        logoImg.onerror = () => {
          console.error('Error loading logo image');
          finishDownload();
        };
        
        logoImg.src = logoUrl;
      } else {
        finishDownload();
      }
      
      function finishDownload() {
        if (format === 'svg') {
          // Untuk SVG, kita perlu membuat SVG baru dengan logo
          const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
              <rect width="1000" height="1000" fill="${style.bgColor}" />
              <image href="${canvas.toDataURL('image/png')}" width="1000" height="1000" />
            </svg>
          `;
          
          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qrcode.svg';
          link.click();
          URL.revokeObjectURL(url);
        } else if (format === 'pdf') {
          // Untuk PDF
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });
          
          const imgData = canvas.toDataURL('image/png');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('qrcode.pdf');
        } else {
          // Untuk PNG dan JPG
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `qrcode.${format}`;
              link.click();
              URL.revokeObjectURL(url);
            }
          }, `image/${format}`, 1.0);
        }
        
        URL.revokeObjectURL(qrUrl);
      }
    };
    
    qrImg.onerror = () => {
      console.error('Error loading QR code image');
      URL.revokeObjectURL(qrUrl);
    };
    
    qrImg.src = qrUrl;
  };

  if (!qrValue) return null;

  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-base md:text-lg font-semibold text-gray-800">Download QR Code</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Dropdown untuk format file */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Format File</label>
          <div className="relative">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as typeof fileFormats[number]['value'])}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-xs sm:text-sm"
            >
              {fileFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
          </div>
        </div>
        
        {/* Dropdown untuk ukuran file */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Ukuran File</label>
          <div className="relative">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as typeof fileSizes[number]['value'])}
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-xs sm:text-sm"
            >
              {fileSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
          </div>
        </div>
      </div>
      
      {/* Tombol download */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => downloadQR(selectedFormat)}
        disabled={!qrValue}
        className="w-full flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="font-medium">Download QR Code</span>
      </motion.button>
    </div>
  );
}
