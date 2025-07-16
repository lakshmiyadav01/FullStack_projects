import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-6">👻 Welcome to Photobhoot</h1>
      <button
        onClick={() => navigate('/camera')}
        className="bg-red-700 hover:bg-red-800 px-6 py-3 text-white rounded-lg shadow-md"
      >
        Open Camera
      </button>
    </div>
  );
}
