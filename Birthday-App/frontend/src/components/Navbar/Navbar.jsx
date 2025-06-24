import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='flex justify-around items-center  h-22 '> 
        <div >
            <Link to="/">
            <img className='h-36' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWzaMhqvkTNVNkSmBXVSLoTDUWjcit7DRL7Q&s" alt="" />
            </Link>
        </div>
        <div >
            <ul className='flex gap-10'>
                <li>
                <NavLink to="/" className={({isActive}) =>`${isActive ? "text-yellow-700 underline" : "text-white"} `}>
                    Home 
                </NavLink>
                </li>
                
                <li>
                    <NavLink to="/age_calculator" className={({isActive}) =>`${isActive ? "text-yellow-700 underline" : "text-white"} `}>
                    Age Calculator
                </NavLink></li>
                <li>
                     <NavLink to="/countdown" className={({isActive}) =>`${isActive ? "text-yellow-700 underline" : "text-white"} `}>
                    Countdown 
                </NavLink></li>
                 <li>
                     <NavLink to="/birthday_card" className={({isActive}) =>`${isActive ? "text-yellow-700 underline" : "text-white"} `}>
                    Birthday Card
                </NavLink> </li>
                <li>
                     <NavLink to="/reminder" className={({isActive}) =>`${isActive ? "text-yellow-700 underline" : "text-white"} `}>
                    Reminder 
                </NavLink></li>
               
            </ul>
        </div>
    </div>
    </>
  )
}

export default Navbar
