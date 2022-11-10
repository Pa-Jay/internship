// import { Button } from '@mui/material'
import React from 'react'
import ProfilePic from '../../../../images/profile-1.jpg'
import './profile.css'
function Profile() {
  return (
    <div className='card'>
        <div className="imgBx">
            <img src={ProfilePic} alt="" />
        </div>
        <div className="content">
            <div className="details">
                <h3 >Alina Smith<br/><span style={{fontSize: ''}}>Designer</span></h3>
                <div className="more" style={{justifyContent: 'center'}}>
                    <div className="data"style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h3>300<br/><span>Reviews</span></h3>
                        <h3>50<br/><span>Jobs Completed</span></h3>
                    </div>
                    <div className="actions">
                        <button style={{background: '#0D4E98', color: '#fff'}}>Edit</button>
                        <button style={{background: '#fff', color: '#999', border: '1px solid #999'}}>Message</button>
                    </div>
                    {/* <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: '0 4px', fontSize: '1rem'}}>Edit</Button> */}
                    {/* <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: 2}}><FaPlus /></Button> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile