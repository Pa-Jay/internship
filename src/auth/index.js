import React from 'react'
import { Outlet } from 'react-router-dom'
import './style.css'
// import Logo from '../images/Loxone.png'
function Auth() {
  return (
    <div className='authContent'>
        {/* <div className="logo">
            <img src={Logo} alt="" />
        </div> */}
        <Outlet></Outlet>
    </div>
  )
}

export default Auth