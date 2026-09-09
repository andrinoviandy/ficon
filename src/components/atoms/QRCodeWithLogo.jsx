import { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeWithLogo = ({ value, size = 170, logoUrl, logoSize }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current || !value) return;

    const generateQRWithLogo = async () => {
      try {
        // Generate QR code ke canvas
        await QRCode.toCanvas(canvasRef.current, value, {
          errorCorrectionLevel: 'H',
          type: 'image/png',
          margin: 1,
          width: size,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        // Draw logo di tengah
        if (logoUrl && logoSize) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            // Height dari logoSize, width auto maintain aspect ratio
            const logoHeight = logoSize;
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            const logoWidth = logoHeight * aspectRatio;
            
            const x = (canvas.width - logoWidth) / 2;
            const y = (canvas.height - logoHeight) / 2;

            // Draw logo tanpa background, width auto
            ctx.drawImage(img, x, y, logoWidth, logoHeight);
          };

          img.onerror = () => {
            console.warn('Gagal load logo:', logoUrl);
          };

          img.src = logoUrl;
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRWithLogo();
  }, [value, size, logoUrl, logoSize]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        display: 'block',
        margin: '0 auto',
        width: '100%',
        height: 'auto'
      }}
    />
  );
};

export default QRCodeWithLogo;
