import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup'
import { createService } from '../../../../store/features/users/userAction';
const schema = yup.object({
    name: yup.string().required().trim().min(3),
}).required();
function AddService() {
    const { error } = useSelector((state) => state.user)
    const [desc, setDesc] = useState(" ")
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        if (desc){
            data.desc = desc;
        }
        dispatch(createService(data))
        .then((response) => {
            if (response.meta.requestStatus === "fulfilled"){
                navigate("/setting/services")
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
                    <label htmlFor="contact">Service Name</label>
                    <input 
                        type="text" 
                        {...register("name")}
                    />
                    <p role="alert">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Description <i>(Optional)</i></label>
                    <input 
                        type="text" 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <p role="alert">{errors.desc?.message}</p>
                </div>
                <div className="action">
                    <Link to="/setting/services" className="cancel-button">Cancel</Link>
                    <input className="submit-button" type="submit" style={{padding: "0.8rem", background: "#0D4E98", border: "1px solid #0D4E98", borderRadius: "5px", color: "#fcfcfc", fontSize: "1rem"}} value="Add"/>
                </div>
            </form>
        </div>
  )
}

export default AddService