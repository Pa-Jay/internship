import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
function ForgotPassword() {
  return (
    <div className="password-content" id='reset-form'>
        <div className="password-form">
            <div className="form-group">
                <h3>Forgot Password?</h3>
            </div>
            <div className="form-group">
                <p>Please enter the email address you used to register with us.</p>
            </div>
            <div className="form-group">
                <input type="text" placeholder='Enter your email'/>
            </div>
            <div className="submit">
                <Link to='/reset-password' className="submit-button">Request Password Reset</Link>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword