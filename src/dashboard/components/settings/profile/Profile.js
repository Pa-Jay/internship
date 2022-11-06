import { useNavigate } from 'react-router-dom'
import React from 'react'
import ProfilePic from '../../../../images/profile-1.jpg'
import './style.css'
import { useSelector } from 'react-redux'
function MainProfile() {
    const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user)

  return (
    <div className='profile' style={{display: 'flex', justifyContent: 'center', marginTop: 0, padding: 8}}>
        <div className='main-profile-card'>
        <div className="imgBx">
            <img src={ProfilePic} alt="" />
        </div>
        <div className="content">
            <div className="details">
                <h3 >{userInfo?.firstName} {userInfo?.lastName}<br/><span style={{fontSize: ''}}>{userInfo?.role}</span></h3>
                <div className="prof-detail">
                    <div className="info-group">
                        <h4>Email :</h4>
                        <p>{userInfo?.email}</p>
                    </div>
                    <div className="info-group">
                        <h4 style={{float: "left"}}>Phone :</h4>
                        <p>{userInfo?.phone}</p>
                    </div>
                    <div className="info-group">
                        <h4>State :</h4>
                        <p>{userInfo?.state}</p>
                    </div>
                    <div className="info-group">
                        <h4>City :</h4>
                        <p>{userInfo?.city}</p>
                    </div>
                    <div className="info-group">
                        <h4>Street  :</h4>
                        <p>{userInfo?.address}</p>
                    </div>

                </div>
                <div className="more" style={{justifyContent: 'center'}}>
                    {/* {userInfo?.role === "agent"
                    ?
                        <div className="services-cont">
                            <h4>Services</h4>
                            <div className="services">
                                <span>Car Wash</span>
                                <span>Inner Cleaning</span>
                            </div> 
                        </div>
                    :
                        null
                    } */}
                    <div className="data"style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h3>300<br/><span>Reviews</span></h3>
                        <h3>50<br/><span>Jobs Completed</span></h3>
                    </div>
                    <div className="actions">
                        <button onClick={() => navigate(`/setting/edit-profile/${userInfo._id}`)} style={{background: '#0D4E98', color: '#fff'}}>Edit</button>
                        <button to='/chat/:user' style={{background: '#fff', color: '#999', border: '1px solid #999'}}>Message</button>
                    </div>
                    {/* <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: '0 4px', fontSize: '1rem'}}>Edit</Button> */}
                    {/* <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: 2}}><FaPlus /></Button> */}
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default MainProfile