import React,{ useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'

const App = () => {
    const [userData, setUserData] = useState(null)
  return (
    <>
    <div className="w-full h-screen bg-[url(https://wallpapercat.com/w/full/6/2/a/2117716-3840x2160-desktop-4k-dark-wallpaper-photo.jpg)] bg-center bg-no-repeat bg-cover text-white text-2xl font-serif">
     <Navbar/>
     <Outlet context={{ userData, setUserData }}/>    
    <Footer/>
    </div>
   
    </>
  )
}

export default App
