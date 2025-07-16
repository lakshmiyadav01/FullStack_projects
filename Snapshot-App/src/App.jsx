import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CameraPage from './components/CameraPage';
import GalleryPage from './components/GalleryPage'

function App() {
  return (
   <div className="min-h-screen bg-[url('https://cdn.pixabay.com/photo/2025/04/02/18/48/background-9509852_1280.jpg')] bg-cover bg-center text-white">
  <div className="backdrop-brightness-50 min-h-screen flex flex-col items-center justify-center">
    <div className="relative z-10">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  </div>
  </div>
</div>


  );
}

export default App;
