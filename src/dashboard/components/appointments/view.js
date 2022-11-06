import React from 'react'
import Profile from '../Home/reuse/Profile'
// import AppointmentInfo from '../reuse/AppointmentInfo'


function ViewAppointment() {
  return (
    <div className='viewAppointment' style={{display: 'flex', justifyContent: 'center', marginTop: 50, padding: 8, maxHeight: '100vh'}}>
        {/* <AppointmentInfo /> */}
        <Profile />
    </div>
  )
}

export default ViewAppointment