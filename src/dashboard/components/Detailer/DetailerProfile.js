import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProfilePic from '../../../images/profile-1.jpg'
import { getAllServices } from '../../../store/features/users/userAction'
import './style.css'
function DetailerProfile() {
    const { services } = useSelector((state) => state.user)
    const { detailerProfile } = useSelector((state) => state.detailer)
    const navigate = useNavigate('')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllServices())
    })
    let servicesList = []
    // servicesList.push(
        // {  
        services.forEach(service => {
            servicesList.push(
                <span>{service.name}</span>
            )
        })
        // }
    // )
  return (
    <div className='profile' style={{display: 'flex', justifyContent: 'center', marginTop: 0, padding: 8}}>
        <div className='profile-card' id='detailer-profile'>
        <div className="imgBx">
            <img src={ProfilePic} alt="" />
        </div>
        <div className="content">
            <div className="details">
                <h3 >{detailerProfile?.firstName} {detailerProfile?.lastName}<br/><span style={{fontSize: ''}}>{detailerProfile?.role}</span></h3>
                <div className="prof-detail">
                    <div className="info-group">
                        <h4>Email :</h4>
                        <p>{detailerProfile?.email}</p>
                    </div>
                    <div className="info-group">
                        <h4 style={{float: "left"}}>Phone :</h4>
                        <p>{detailerProfile?.phone}</p>
                    </div>
                    <div className="info-group">
                        <h4>State :</h4>
                        <p>{detailerProfile?.state}</p>
                    </div>
                    <div className="info-group">
                        <h4>City :</h4>
                        <p>{detailerProfile?.city}</p>
                    </div>
                    <div className="info-group">
                        <h4>Street  :</h4>
                        <p>{detailerProfile?.address}</p>
                    </div>

                </div>
                <div className="more" style={{justifyContent: 'center'}}>
                    {detailerProfile?.role === "agent"
                    ?
                        <div className="services-cont" id='service-list'>
                            <h4>Services</h4>
                            <div className="services">
                                {servicesList}
                            </div>
                        </div>
                    :
                        null
                    }
                    <div className="data"style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h3>300<br/><span>Reviews</span></h3>
                        <h3>50<br/><span>Jobs Completed</span></h3>
                    </div>
                    <div className="actions">
                        <button to='/chat/:user' style={{background: '#fff', color: '#999', border: '1px solid #999', fontSize: "13px !important"}}>Message</button>
                        <button onClick={() => navigate('/appointment/create')} style={{background: '#0D4E98', color: '#fff', fontSize: "13px !important"}}>Book Appointment</button>
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

export default DetailerProfile