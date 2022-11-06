import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { getAllServices } from '../../../store/features/users/userAction'
import { becomeADetailer } from '../../../store/features/detailers/detailerAction'
import Select from 'react-select'
const schema = yup.object({
    IDNumber: yup.number().positive().required().integer(),
    address: yup.string().trim(),
    services: yup.array()
})
function BecomeADetailer() {
    const { userInfo, services, success } = useSelector((state) => state.user)
    const [service, setService] = useState([])
    const [serviceId, setServiceID] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!services){
            dispatch(getAllServices())
        }
    })

    const selectService = (e) => {
        e.forEach(element => {
            setService(oldArray => [...oldArray, element.label])
            setServiceID(oldIdArray => [...oldIdArray, element.id]) 
        });  

    }
    const onSubmit = (data) => {
        data._id = userInfo._id
        data.services = serviceId
        dispatch(becomeADetailer(data))
        .then(resp => {
            if (resp.meta.requestStatus === "rejected" || success !== true){
                setErrorMessage('An error occurred with the server!')
            }
            navigate('/dashboard')
        })
    }
    
    const results = services.map((service) => 
                ({
                    id: service._id,
                    key: service._id,
                    value: service.name, 
                    label: service.name,
                })
    )
    
  return (
    <div className='become-a-detailer' style={{display: 'flex', justifyContent: 'center'}}>
        <form className="detailerForm" style={{width: '50%'}} onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <h3 >Become a Detailer</h3>
            </div>
            <p role="alert">{errorMessage}</p>
            <div className="form-group">
                <label htmlFor="contact">Name</label>
                <input 
                    type="text" 
                    value={userInfo?.firstName + " " + userInfo?.lastName}  
                    placeholder='Name' 
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" value={userInfo?.email} placeholder='Email' readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="Phone Number">Phone Number</label>
                <input type="text" value={userInfo?.phone} readOnly/>
            </div>
            <div className="form-class">
                <div className="form-group" id='nin'>
                    <label htmlFor="nin">NIN</label>
                    <input 
                        type="text" 
                        // aria-invalid={error}
                        {...register('IDNumber')}
                        placeholder='National Identification Number'
                    />
                    <p style={{color: '#000'}}>{errors.IDNumber?.message}</p>
                </div>
                <div className="form-group" id='idCard'>
                    <label htmlFor="ID">Upload ID</label>
                    <input 
                        type="file" 
                        {...register('file')}
                    />
                </div>
                
            </div>
            <div className="form-group">
                <label htmlFor="Services">Services</label>
                <Select 
                    {...register("services")} 
                    name="service" id="" 
                    style={{backround: "#fcfcfc", padding: '10px'}}
                    value={service}
                    onChange={(e) => selectService(e)}
                    defaultValue={service}
                    // getOptionValue={detailer}
                    key={results.id}
                    options={results}
                    isSearchable
                    isMulti
                    required

                />
                    {/* {results} */}
                <p style={{color: '#000'}}>{errors.services?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="Services">Address</label>
                <input 
                    type="text" 
                    {...register('address')}
                    placeholder='Address'
                />
                <p style={{color: '#000'}}>{errors.address?.message}</p>
            </div>
            <div className="action">
                <Link to="/dashboard" className="cancel-button">Cancel</Link>
                <button type='submit'  className="submit-button">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default BecomeADetailer