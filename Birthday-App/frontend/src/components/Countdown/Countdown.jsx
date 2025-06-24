import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import balloonImg from "../../assets/balloon.png"; 

const Countdown = () => {
   const [timeLeft, setTimeLeft] = useState({});
  const { userData } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const birthDate = new Date(userData.dob);
      const nextBirthday = new Date(
        now.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );

      // If birthday has passed this year, use next year
      if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const diff = nextBirthday - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [userData, navigate]);


 const backhome = () => {
    navigate("/");
  };

  if (!userData) {
    return (
      <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-5">
        <p
          className="text-center text-3xl text-yellow-600 hover:text-blue-700 cursor-pointer"
          onClick={backhome}
        >
          Please fill the form first.
        </p>
      </div>
    );
  }

  const nextbutton = ()=>{
    navigate("/birthday_card")
  }

  return (
     <>
    <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-4 flex justify-center flex-col " >
      <h1 className="text-center text-3xl text-yellow-400 font-bold ">
         ⏳ Countdown to Your Next Birthday
      </h1>
     {timeLeft ? (
        <div className="text-center mt-6 text-3xl">
        <p>
          <span className="font-semibold text-pink-300">
            {timeLeft.days} days
          </span>
          ,{" "}
          <span className="font-semibold text-green-300">
            {timeLeft.hours} hours
          </span>
          ,{" "}
          <span className="font-semibold text-blue-300">
            {timeLeft.minutes} minutes
          </span>{" "},
          <span className="font-semibold text-purple-300">
            {timeLeft.seconds} seconds
          </span>

          
        </p>
        </div>
      ) : (
        <p className="text-center text-3xl text-white mt-4">Calculating...</p>
      )}
        <p className="text-center mt-6 text-xl italic text-rose-500 hover: cursor-pointer"  onClick={nextbutton}>
          Get ready to celebrate! 🎉
        </p>

    </div>
<img src={balloonImg} alt="Balloon" className="balloon" />
    </>
  );
};

export default Countdown;
