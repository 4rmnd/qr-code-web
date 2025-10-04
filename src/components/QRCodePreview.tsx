import { useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRData, QRStyle } from '../types/qr';
import { generateQRValue, logoUrls } from '../utils/qrGenerator';
import { validateQRData } from '../utils/validation';

interface QRCodePreviewProps {
  data: QRData;
  style: QRStyle;
}

export default function QRCodePreview({ data, style }: QRCodePreviewProps) {
  const qrValue = generateQRValue(data);
  const svgRef = useRef<HTMLDivElement>(null);
  
  // Validasi data QR
  const validationResult = validateQRData(data);
  const isDataValid = validationResult.isValid;

  const getLogoUrl = () => {
    if (style.logo === 'none') return undefined;
    if (style.logo === 'custom') return style.customLogoUrl;
    return logoUrls[style.logo];
  };
  
  // Menentukan apakah logo perlu background putih
  const needsWhiteBackground = () => {
    // Logo Twitter (X) dan LinkedIn berwarna hitam, perlu background putih
    return style.logo === 'twitter' || style.logo === 'linkedin';
  };

  const getFgColor = () => {
    if (style.colorMode === 'gradient' && style.gradientStart && style.gradientEnd) {
      return style.gradientStart;
    }
    return style.fgColor;
  };

  useEffect(() => {
    if (style.colorMode === 'gradient' && svgRef.current && style.gradientStart && style.gradientEnd) {
      const svg = svgRef.current.querySelector('svg');
      if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'qr-gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', `stop-color:${style.gradientStart};stop-opacity:1`);

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', `stop-color:${style.gradientEnd};stop-opacity:1`);

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);

        const existingDefs = svg.querySelector('defs');
        if (existingDefs) {
          existingDefs.remove();
        }
        svg.insertBefore(defs, svg.firstChild);

        const paths = svg.querySelectorAll('path');
        paths.forEach((path) => {
          if (path.getAttribute('fill') !== style.bgColor) {
            path.setAttribute('fill', 'url(#qr-gradient)');
          }
        });
      }
    }
  }, [style, qrValue]);

  // Jika data tidak valid atau qrValue kosong, tampilkan pesan
  if (!qrValue || !isDataValid) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-2xl">
        <p className="text-gray-400">
          {!isDataValid 
            ? `Data tidak valid: ${validationResult.message}` 
            : "Masukkan data untuk menghasilkan kode QR"}
        </p>
      </div>
    );
  }

  const logoUrl = getLogoUrl();

  return (
    <div ref={svgRef} className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-sm">
      <QRCodeSVG
        value={qrValue}
        size={280}
        level="H"
        includeMargin={true}
        fgColor={getFgColor()}
        bgColor={style.bgColor}
        imageSettings={
          logoUrl
            ? {
                src: logoUrl,
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: needsWhiteBackground(),
              }
            : undefined
        }
      />
    </div>
  );
}
