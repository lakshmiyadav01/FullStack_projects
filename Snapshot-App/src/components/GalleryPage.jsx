import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function GalleryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const photos = location.state?.photos || [];
  const canvasRef = useRef(null);

  const downloadCollage = () => {
    if (photos.length !== 3) {
      alert("Exactly 3 photos required for the collage.");
      return;
    }

    const imgWidth = 300;
    const imgHeight = 400;
    const spacing = 20;
    const canvasHeight = 3 * imgHeight + 2 * spacing;

    const canvas = canvasRef.current;
    canvas.width = imgWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const images = photos.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    Promise.all(images.map(img => new Promise(resolve => {
      img.onload = resolve;
    }))).then(() => {
      images.forEach((img, index) => {
        ctx.drawImage(img, 0, index * (imgHeight + spacing), imgWidth, imgHeight);
      });

      const link = document.createElement('a');
      link.download = 'photobooth_collage.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleRetake = () => {
    navigate('/camera');
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row items-center gap-20 max-w-6xl w-full">
        {/* Photo Strip */}
        <div className="bg-white p-2 rounded-xl shadow-xl border border-gray-200">
          {photos.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Photo ${index + 1}`}
              className="w-80 h-[200px] object-cover mb-2 border border-black shadow-sm"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={downloadCollage}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
          >
            Download Strip
          </button>

          <button
            onClick={handleRetake}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
          >
             Retake Photos
          </button>
        </div>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
