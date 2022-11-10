import React from 'react'
import { FaList } from 'react-icons/fa'
 function EmailInstruction() {
  return (
    <div className="password-content" id='reset-form'>
        <div className="password-form">
            <div className="top-icon">
                <Icon icon={<FaList />} />
            </div>
            <div className="form-group">
                <h3>Email Instruction Sent</h3>
            </div>
            <div className="form-group">
                <p>Instructions to reset your password has been sent to your mail!</p>
            </div>
        </div>
    </div>
  )
}

const Icon = ({icon}) => (
    <li>
        <a href="http://github.com">{icon}</a>
    </li>
)

export default EmailInstruction