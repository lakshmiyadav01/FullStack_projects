import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import balloonImg from "../../assets/balloon.png"; 

const Reminder = () => {
  const { userData } = useOutletContext();
  const navigate = useNavigate();

  const requestNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("🎉 Reminder Set!", {
            body: `Don't forget to wish ${userData.fname} on ${userData.dob}!`,
          });
        } else {
          alert("Notification permission denied.");
        }
      });
    } else {
      alert("This browser does not support notifications.");
    }
  };

  // Format DOB for Google Calendar link
  const getGoogleCalendarDateRange = (dob) => {
    const date = new Date(dob);
    const year = new Date().getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}T090000Z/${year}${month}${day}T100000Z`;
  };

  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wish+${userData?.fname}+Happy+Birthday&dates=${getGoogleCalendarDateRange(
    userData?.dob
  )}&details=Don't+forget+to+wish+${userData?.fname}!`;

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



  return (
    <>
      <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-4 flex justify-center flex-col "  onClick={backhome}>
        <h1 className="text-center text-4xl text-yellow-500 font-bold">
           ♥️ Reminder Center
        </h1>

        <p className="text-center mt-6 text-3xl">
          ⏰ Don’t forget to wish{" "}
          <span className="text-pink-300 font-semibold">{userData?.fname} {userData?.lname}</span> on{" "}
          <span className="text-green-300 font-semibold">{userData?.dob}</span>!
        </p>

        <a
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center mt-6 text-blue-400 underline text-xl"
        >
          📅 Add to Google Calendar
        </a>

        <button
          onClick={requestNotification}
          className="bg-yellow-800 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full mt-6 mx-auto"
        >
          🔔 Set Browser Notification
        </button>
      </div>
      <img src={balloonImg} alt="Balloon" className="balloon" />
    </>
  );
};

export default Reminder;

