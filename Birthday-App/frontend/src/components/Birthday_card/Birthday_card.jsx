import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useOutletContext,useNavigate } from "react-router-dom";
import birthdaySong from "../../assets/birthday.mp3";
import balloonImg from "../../assets/balloon.png"; 


const Birthday_card = () => {
  const { userData } = useOutletContext();
  const audioRef = useRef(null);
  const navigate = useNavigate(); 


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    const backhome = ()=>{
        navigate("/")
      }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked. Click play manually.", err);
      });
    }
  }, [userData]);

  if (!userData) return  <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-5 "><p className="text-center text-3xl text-yellow-600 hover:text-blue-700 cursor-pointer" onClick={backhome}>Please fill the form first.</p></div>

  const audioSrc =
    userData.song && userData.song.trim() !== ""
      ? userData.song
      : birthdaySong;
   
const nextbutton = ()=>{
    navigate("/reminder")
  }


  return (
    <>
      {/* Firecracker confetti */}
      <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={250} />

      <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-5 flex flex-col item-center relative z-10"  onClick={nextbutton}>
        <h2 className="text-4xl font-bold mb-4 text-center text-white">
          🎉 Happy Birthday, {userData.fname} {userData.lname}!
        </h2>
        <p className="text-lg mb-2 text-center text-white">
          📅 Date of Birth: {userData.dob}
        </p>

        {userData.imagePreview && (
          <img
            src={userData.imagePreview}
            alt="Uploaded"
            className="w-60 h-60 object-cover rounded-xl mx-auto mb-4"
          />
        )}

        <audio
          ref={audioRef}
          controls
          autoPlay
          loop
          className="mx-auto mt-4"
          onError={(e) => {
            e.target.src = birthdaySong;
            e.target.play();
          }}
        >
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
           <img src={balloonImg} alt="Balloon" className="balloon" />
    </>
  );
};

export default Birthday_card;
