import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";


const Home = () => {
const [Fname, setFname] = useState("")
const [Lname, setLname] = useState("")
const [date, setDate]= useState("")
const [fileName, setFileName] = useState("No file selected");
const [song, setSong] = useState("");
const [imagePreview, setImagePreview] = useState("");

  const { setUserData } = useOutletContext(); 
  const navigate = useNavigate(); 

const handelFile = (e)=>{
  const file = e.target.files[0];
  if (file) {
    setFileName(file.name);
    setImagePreview(URL.createObjectURL(file));
  } else {
    setFileName("No File selected");
    setImagePreview("");
  }
}

const handleSubmit = (e) => {
    e.preventDefault();

 if (!Fname.trim() || !Lname.trim() || !date  || fileName === "No file selected") {
    alert("⚠️ Please fill in all fields before submitting.");
    return;
  }

    setUserData({
      fname: Fname,
      lname: Lname,
      dob: date,
      fileName,
      song,
      imagePreview,
    });
    
    setFname("")
    setLname("")
    setDate("")
    setSong("")
    setFileName("No file selected")

    navigate("/age_calculator");
  };


  return (
    <>
      <div className="border rounded-2xl h-120 w-200 m-11 ml-30 p-4 ">
        <div>
          <h1 className="text-center  mb-4 text-2xl">Enter Your Details</h1>
          <form onSubmit={handleSubmit} className="ml-4">
            <label className="text-yellow-200 text-xl ">
              Enter Your First Name:{" "}
            </label>
            <input
              className="outline py-2 px-3 rounded-full ml-2 text-xl "
              type="text"
              placeholder="Enter your first name"
              value={Fname}
              onChange={(e)=> setFname(e.target.value)}
            />
            <br />
            <label className="text-yellow-200 text-xl ">
              Enter Your Last Name:{" "}
            </label>
            <input
              className="outline py-2 px-3 rounded-full ml-2 text-xl mt-4"
              type="text"
              placeholder="Enter your last name"
              value={Lname}
              onChange={(e)=> setLname(e.target.value)}
            />

            <br />
            <label className="text-yellow-200 text-xl ">
              Enter Your Date of Birth:{" "}
            </label>
            <input
              className="outline py-2 px-3 rounded-full ml-2 text-xl mt-4"
              type="date"
              value={date}
              onChange={(e)=> setDate(e.target.value)}
            />

            <br />
            <label className="text-yellow-200 text-xl ">
              Upload Picture:{" "}
            </label>
            <input
              className="outline py-2 px-3 rounded-full ml-2 text-xl mt-4 w-70"
              type="file"
              onChange={handelFile}
            />

            <br />
            <label className="text-yellow-200 text-xl ">
              Favourite Song (URL):{" "}
            </label>
            <input
              className="outline py-2 px-3 rounded-full ml-2 text-xl mt-4"
              type="url"
              placeholder="Enter Your Favourite Song"
              value={song}
              onChange={(e)=> setSong(e.target.value)}
            />
            <br />
            <button type="submit" className="bg-orange-800 py-2 px-8 rounded-full mt-9 ml-75"
             disabled={!Fname || !Lname || !date  || fileName === "No file selected"}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
