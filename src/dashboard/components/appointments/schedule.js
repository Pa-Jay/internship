import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import * as yup from 'yup'
import { bookAppointment } from '../../../store/features/appointments/appointmentAction'
import { getAllDetailers } from '../../../store/features/detailers/detailerAction'
import { getAllServices } from '../../../store/features/users/userAction'

const schema = yup.object({
    detailer: yup.string(),
    services: yup.array(),
    date: yup.string(),
    price: yup.string().trim()
})
function ScheduleAppointment() {
    const { userInfo, services } = useSelector((state) => state.user)
    const { detailers } = useSelector((state) => state.detailer)
    const [price, setPrice] = useState(1000);
    const [service, setService] = useState([]);
    const [serviceId, setServiceID] = useState([]);
    const [detailer, setDetailer] = useState("");
    const [detailerId, setDetailerID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const dispatch = useDispatch();

    const selectDetailer = (e) => {
            setDetailer(e.value)
            setDetailerID(e.id) 
    }

    const selectService = (e) => {
        e.forEach(element => {
            setService(oldArray => [...oldArray, element.label])
            setServiceID(oldIdArray => [...oldIdArray, element.id]) 
        });  

    }
    const navigate = useNavigate();
    const handleBooking = (data) => {
        data.services = serviceId
        data.detailer = detailerId

        dispatch(bookAppointment(data))
        .then((resp) => {
            if (resp.payload.status === "success"){
                navigate('/appointment')
            }else{
                setErrorMessage(resp.payload.error.message)
            }
        })
        // console.log(data)
    }
    const results = detailers.map((detailer) => 
                ({
                    id: detailer._id,
                    value: detailer.firstName + ' ' + detailer.lastName, 
                    label: detailer.firstName + ' ' + detailer.lastName,
                })
    )
    const servs = services.map((service) => 
        ({
            id: service._id,
            value: service.name, 
            label: service.name,
        })
    )

    useEffect(() => {
        dispatch(getAllDetailers())
        dispatch(getAllServices())
    }, [dispatch])
  return (
      <div className='appointmentSchedule' style={{display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit(handleBooking)} className="appointmentForm" style={{width: '60%'}}>
            <div className="form-group">
                <h3 >Book an Appointment</h3>
            </div>
            <p role="alert">{errorMessage}</p>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input value={userInfo?.firstName + " " + userInfo?.lastName} type="text" placeholder='Email' />
            </div>
            <div className="form-group">
                <label htmlFor="Phone Number">Phone Number</label>
                <input type="text" value={userInfo?.phone} placeholder='+234 815 274 3651' />
            </div>
            <div className="form-group">
                <label htmlFor="detailers">Select Detailer</label>
                <Select 
                    {...register("detailer")} 
                    name="detailer" id="" 
                    style={{backround: "#fcfcfc", padding: '10px'}}
                    // value={selected}
                    // multiple="multiple"
                    value={results.value}
                    onChange={(e) => selectDetailer(e)}
                    // defaultValue={results[1].value}
                    options={results}
                />
                    {/* {results} */}
                <p style={{color: '#000'}}>{errors.detailer?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="Services">Select Service</label>
                <Select 
                    {...register("services")} 
                    name="service" id="" 
                    style={{backround: "#fcfcfc", padding: '10px'}}
                    value={service.value}
                    onChange={(e) => selectService(e)}
                    defaultValue={service}
                    // getOptionValue={detailer}
                    key={servs.id}
                    options={servs}
                    isSearchable
                    isMulti

                />
                    {/* {results} */}
                <p style={{color: '#000'}}>{errors.service?.message}</p>
            </div>
            <div className="form-group">
              <label htmlFor="date">Pick Date</label>
                <input type="date" {...register("date")} placeholder='Pick date'/>
                <p role="alert">{errors.date?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="time">Time <span>(optional)</span></label>
                <input type="time" {...register("time")} placeholder='Pick Time' />
            </div>
            <div className="form-group">
                <input type="" {...register("price")} placeholder='1000' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="book">
                <Link to="/dashboard" className="cancel-button">Cancel</Link>
                <button type='submit' className="book-button">Book</button>
            </div>
        </form>
    </div>
  )
}

export default ScheduleAppointment