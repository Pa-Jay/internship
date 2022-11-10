import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup'
import { updatePassword } from '../../../store/features/users/userAction';

const schema = yup.object({
    oldPassword: yup.string().required().trim().min(6),
    newPassword: yup.string().trim().min(6),
    confirmNewPassword: yup.string().trim().min(6),
}).required();
function Password() {
    const { loading, error } = useSelector((state) => state.user)
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const onSubmit = async (data) => {
        let error = false
        if (data.newPassword !== data.confirmNewPassword){
            error = true
            setErrorMessage("Password does not match")
        }
        if (error === false){
            dispatch(updatePassword(data))
            .then((password) => {
                if (password.payload.status === "success"){
                    setMessage("Password Updated Successfully")
                }else{
                    setErrorMessage(password.payload)
                }
            })
            .catch((error) => {
                setErrorMessage(error)
            })
        }
    }
    return (
        <div className='appointmentSchedule' style={{display: 'flex', justifyContent: 'center'}}>
            <form onSubmit={handleSubmit(onSubmit)} className="appointmentForm" style={{width: '100%', background: '#fff', boxShadow: '0 35px 80px rgba(0, 0, 0, 0.15)', padding: 40, borderRadius: 20}}>
                <div className="form-group">
                    <h3 >Change Password</h3>
                </div>
                {/* <p role="alert">{error}</p> */}
                <p role="alert">{errorMessage}</p>
                <p role="alert">{message}</p>
                <div className="form-group">
                    <label htmlFor="Current Password">Current Password</label>
                    <input 
                        type="password" 
                        {...register("oldPassword")}
                        required
                    />
                    <p role="alert">{errors.oldPassword?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="New Password">New Password</label>
                    <input 
                        type="password" 
                        {...register("newPassword")}
                        required
                    />
                    <p role="alert">{errors.newPassword?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="Confirm Password">Confirm New Password</label>
                    <input 
                        type="password" 
                        {...register("confirmNewPassword")}
                        required
                    />
                    <p role="alert">{errors.confirmNewPassword?.message}</p>
                </div>
                <div className="book" style={{justifyContent: 'center'}}>
                <input className="submit-button" type="submit" style={{padding: "0.8rem", background: "#0D4E98", border: "1px solid #0D4E98", borderRadius: "5px", color: "#fcfcfc", fontSize: "1rem"}} value="Update" disabled={loading}/>
                </div>
            </form>
        </div>
    )
}

export default Password