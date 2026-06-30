import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>𝓕𝓸𝓸𝓭-𝓔𝔁𝓹𝓵𝓸𝓻𝓮𝓻</h2>
          <p>The main purpose of the Food Explorer System is to provide users with a convenient and efficient platform to explore, select, and order food online. It aims to simplify the process of discovering various food items and restaurants by offering all relevant information in one place.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>9844474232</li>
            <li>gowm.0005@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />

    </div>
  )
}

export default Footer
