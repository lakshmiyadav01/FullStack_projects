import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import balloonImg from "../../assets/balloon.png"; 

const Age_calculator = () => {
  const [ageDetails, setAgeDetails] = useState(null);
  const { userData } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.dob) {
      const birthDate = new Date(userData.dob);
      const today = new Date();

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setAgeDetails({ years, months, days });
    }
  }, [userData]);

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
    navigate("/countdown")
  }

  return (
     <>
    <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-4 flex justify-center flex-col hover: cursor-pointer"  onClick={nextbutton} >
      <h1 className="text-center text-3xl text-yellow-300 font-bold ">
        🎂 Age Breakdown Just for You!
      </h1>
      {ageDetails ? (
        <div className="text-center mt-6 text-3xl">
        <p>
          🎉 You are{" "}
          <span className="font-semibold text-pink-300">
            {ageDetails.years} years
          </span>
          ,{" "}
          <span className="font-semibold text-green-300">
            {ageDetails.months} months
          </span>
          , and{" "}
          <span className="font-semibold text-blue-300">
            {ageDetails.days} days
          </span>{" "}
          old!
        </p>
         <p className="text-xl italic text-yellow-200 mt-6">
            That’s a lot of cake-worthy moments! 🍰
          </p>
        </div>
      ) : (
        <p className="text-center text-3xl text-white mt-4">Calculating...</p>
      )}
    </div>
<img src={balloonImg} alt="Balloon" className="balloon" />
    </>
  );
};

export default Age_calculator;
