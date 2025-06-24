import React from 'react'
import { FaCopyright } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full text-center mb-2">
      <hr className='ml-24 mr-24'/>
      <ul className=' mt-2 flex gap-4 justify-center item-center pt-1' >
       <li><FaFacebook/></li>
       <li><FaGithub/></li>
       <li><FaInstagram/></li>
       <li><FaSquareXTwitter/></li>
      </ul>
      <span className='text-xs'>@Copyright. All rights reserved</span>
    </div>
  )
}

export default Footer
