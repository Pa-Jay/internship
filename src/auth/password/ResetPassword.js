import React from 'react'
import './style.css'
function ResetPassword() {
  return (
    <div className="password-content" id='reset-form'>
        <div className="password-form">
            <div className="form-group">
                <h3>Reset Password</h3>
            </div>
            <div className="form-group">
                <input type="text" placeholder='Password'/>
            </div>
            <div className="form-group">
                <input type="text" placeholder='Confirm Password'/>
            </div>
            <div className="submit">
                <a href="http://github.com" className="submit-button">Sign In</a>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword