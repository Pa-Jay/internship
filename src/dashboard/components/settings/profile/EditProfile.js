import React from 'react'
import './style.css'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from  '@hookform/resolvers/yup'
import * as yup from 'yup'
// import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../../store/features/users/userAction'
// const socket = io.connect('/');

const schema = yup.object({
    firstName: yup.string().trim().min(3),
    lastName: yup.string().trim().min(3),
    phone: yup.string().trim(),
    // confirmPassword: yup.string().required(),
}).required();
function EditProfile() {
    const { userInfo, loading, error } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(userInfo?.firstName)
    const [lastName, setLastName] = useState(userInfo?.lastName)
    const [state, setState] = useState(userInfo?.state)
    const [city, setCity] = useState(userInfo?.city)
    const [street, setStreet] = useState(userInfo?.address)
    const [phone, setPhone] = useState(userInfo?.phone)
    const { id } = useParams();
    const onSubmit = async (data) => {
        data._id = id
        dispatch(updateProfile(data))
        .then((response) => {
            if (response.meta.requestStatus === "fulfilled"){
                navigate("/profile")
            }
        })
    }

    return (
        <div className='edit-profile' style={{display: 'flex', justifyContent: 'center'}}>
            <form className="editProfileForm" style={{width: 'inherit'}} onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    {/* <h3 >Edit Profile</h3> */}
                </div>
                <p role="alert">{error}</p>
                <div className="form-group">
                    <label htmlFor="contact">First Name</label>
                    <input 
                        type="text" 
                        {...register("firstName")}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <p role="alert">{errors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Last Name</label>
                    <input 
                        type="text" 
                        {...register("lastName")}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <p role="alert">{errors.lastName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="Phone Number">Phone Number</label>
                    <input 
                        type="text" 
                        {...register("phone")}
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <p role="alert">{errors.phone?.message}</p>
                </div>
                <div className="form-class">
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <select value={state} onChange={(e) => setState(e.target.value)} name="" {...register("state")} style={{padding: ".8rem", background: "#fcfcfc", border: "2px solid rgb(207, 203, 203)", borderRadius: "5px"}}>
                            <option value="Delta State">Delta State</option>
                        </select>
                        <p role="alert">{errors.state?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input 
                            type="text" 
                            {...register("city")}
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <p role="alert">{errors.city?.message}</p>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Street</label>
                    <input 
                        type="text" 
                        {...register("address")}
                        placeholder='Street'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <p role="alert">{errors.address?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea {...register("about")} rows="5" style={{background: "#fcfcfc", border: "2px solid rgb(207, 203, 203)", borderRadius: "5px", outline: "none"}}></textarea>
                    <p role="alert">{errors.about?.message}</p>
                </div>
                <div className="action">
                    <Link to="/dashboard" className="cancel-button">Cancel</Link>
                    <input className="submit-button" type="submit" style={{padding: "0.8rem", background: "#0D4E98", border: "1px solid #0D4E98", borderRadius: "5px", color: "#fcfcfc", fontSize: "1rem"}} value="Update" disabled={loading}/>
                </div>
            </form>
        </div>
    )
}

export default EditProfile