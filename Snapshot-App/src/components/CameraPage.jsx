import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.filter = getCanvasFilter(selectedFilter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    const updatedPhotos = [...photos, imageData];
    setPhotos(updatedPhotos);

    if (updatedPhotos.length === 3) {
      navigate('/gallery', { state: { photos: updatedPhotos } });
    }
  };

  const getCanvasFilter = (filter) => {
    switch (filter) {
      case 'bw': return 'grayscale(100%)';
      case 'sepia': return 'sepia(100%)';
      case 'blur': return 'blur(3px)';
      case 'contrast': return 'contrast(180%)';
      case 'invert': return 'invert(100%)';
      case 'brightness': return 'brightness(150%)';
      case 'hue': return 'hue-rotate(90deg)';
      case 'saturate': return 'saturate(200%)';
      case 'pink': return 'brightness(1.1) sepia(0.4) hue-rotate(-20deg) saturate(120%)';
      case 'blue': return 'brightness(1.05) contrast(1.2) hue-rotate(180deg) saturate(130%)';
      case 'neon': return 'contrast(200%) saturate(250%)';
      default: return 'none';
    }
  };

  const getTailwindFilterClass = () => {
    switch (selectedFilter) {
      case 'bw': return 'filter grayscale';
      case 'sepia': return 'filter sepia';
      case 'blur': return 'filter blur-sm';
      case 'contrast': return 'filter contrast-200';
      case 'invert': return 'filter invert';
      case 'brightness': return 'filter brightness-150';
      case 'hue': return 'filter hue-rotate-90';
      case 'saturate': return 'filter saturate-200';
      case 'pink': return 'filter brightness-110 sepia saturate-125';
      case 'blue': return 'filter brightness-105 contrast-125 hue-rotate-180 saturate-150';
      case 'neon': return 'filter contrast-200 saturate-200';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold mb-4">📷 Photobooth Camera</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full max-w-2xl border-4 rounded-2xl mb-2 transition-all duration-300 ${getTailwindFilterClass()}`}
      />

      {/* 🎨 Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          { label: "Normal", filter: "none" },
          { label: "B/W", filter: "bw" },
          { label: "Sepia", filter: "sepia" },
          { label: "Blur", filter: "blur" },
          { label: "Contrast", filter: "contrast" },
          { label: "Invert", filter: "invert" },
          { label: "Bright", filter: "brightness" },
          { label: "Hue", filter: "hue" },
          { label: "Saturate", filter: "saturate" },
          { label: "Pink Glow", filter: "pink" },
          { label: "Blue Haze", filter: "blue" },
          { label: "Neon Pop", filter: "neon" }
        ].map(({ label, filter }) => (
          <FilterButton
            key={filter}
            label={label}
            filter={filter}
            selected={selectedFilter}
            setFilter={setSelectedFilter}
          />
        ))}
      </div>

      {/* 📸 Capture Button */}
      <button
        onClick={capturePhoto}
        disabled={photos.length >= 3}
        className="bg-red-700 hover:bg-red-800 px-6 py-3 rounded-full text-white font-semibold shadow-md transition"
      >
        {photos.length < 3 ? `Capture Photo (${photos.length}/3)` : 'Redirecting...'}
      </button>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

// 🎨 Reusable Filter Button
function FilterButton({ label, filter, selected, setFilter }) {
  const isActive = selected === filter;
  return (
    <button
      onClick={() => setFilter(filter)}
      className={`px-2 py-2 rounded-full font-medium text-sm shadow transition-all ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
