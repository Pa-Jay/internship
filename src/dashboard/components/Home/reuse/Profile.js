// import { Button } from '@mui/material'
import React from 'react'
import ProfilePic from '../../../../images/profile-1.jpg'
import { BiChat } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import './profile.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailerDetails } from '../../../../store/features/detailers/detailerAction';
function DetailersProfileList() {
    const navigate = useNavigate();
    const { userInfo, users } = useSelector((state) => state.user)
    const { detailers, detailerProfile } = useSelector((state) => state.detailer)
    const dispatch = useDispatch();
    const handleProfile = (data) => {
        // console.log(dispatch(getDetailerDetails(data)))
        dispatch(getDetailerDetails(data))
        .then((resp) => {
            if(resp.meta.requestStatus === "fulfilled"){
                navigate('/agent-profile');
            }
        });
    }
    const results = []
    // return (
        detailers.forEach(detailer => {
            // console.log(detailer.firstName)
        results.push (
        <div className='detailer-card' key={detailer._id}>
            <div className="imgBx">
                <img src={ProfilePic} alt="" />
            </div>
            <div className="content">
                <div className="details">
                    <h4>{detailer.firstName} {detailer.lastName}</h4>
                    <div className="more" style={{justifyContent: 'center'}}>
                        <div className="data"style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <h4>400<br/><span>Reviews</span></h4>
                            <h4>40<br/><span>Jobs Completed</span></h4>
                        </div>
                        <div className="actions">
                            <button onClick={(e) => handleProfile(detailer)} style={{background: '#4caf50', color: '#fff', border: '1px solid #999'}}><FaEye /></button>
                            {userInfo?.role === "agent" && userInfo?._id === detailer._id
                            ?
                                <button onClick={(e) => navigate('/appointment/create')} style={{background: '#0D4E98', color: '#fff'}}><FaEdit /></button>
                            :
                                null
                            }
                            {userInfo?._id !== detailer._id
                            ?
                                <button style={{background: '#fff', color: '#0D4E98', border: '1.5px solid #999'}}><BiChat /></button>
                            :
                                null
                            }
                            
                        </div>
                        {/* <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: '0 4px', fontSize: '1rem'}}>Edit</Button> */}
                        {/* <Button size="small" sx={{background: '#0D4E98', color: '#fcfcfc', textAlign: 'center', padding: 2}}><FaPlus /></Button> */}
                    </div>
                </div>
            </div>
        </div>
        )    
    })
    return (
        <div className="detailers">
            {results}
        </div>
    )
}

export default DetailersProfileList