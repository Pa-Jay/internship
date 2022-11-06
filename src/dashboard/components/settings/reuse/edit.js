import React from 'react'
import { Link } from 'react-router-dom'
function EditAppointment() {
    const title = 'Profile';
    return (
    <div className='appointmentSchedule' style={{display: 'flex', justifyContent: 'center'}}>
        <div className="appointmentForm" style={{width: '50%'}}>
            <div className="form-group">
                <h3 >Edit {title}</h3>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Email'  readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="Phone Number">Phone Number</label>
                <input type="text" placeholder='+234 815 274 3651' />
            </div>
            <div className="form-group">
                <label htmlFor="contact">Detailer</label>
                <input type="text" placeholder='Select Detailer' />
            </div>
            <div className="form-group">
                <label htmlFor="Services">Services</label>
                <input type="text" placeholder='Select Service(s)'/>
            </div>
            <div className="form-group">
              <label htmlFor="date">Pick Date</label>
                <input type="date" placeholder='Pick date'/>
            </div>
            <div className="form-group">
                <label htmlFor="time">Time <span>(optional)</span></label>
                <input type="time" placeholder='Pick Time' />
            </div>
            <div className="form-group">
                <input type="" placeholder='Price' readOnly/>
            </div>
            <div className="book">
                <Link to="/dashboard" className="cancel-button">Cancel</Link>
                <Link to="/appointment/schedule" className="book-button">Update</Link>
            </div>
        </div>
    </div>
  )
}

export default EditAppointment