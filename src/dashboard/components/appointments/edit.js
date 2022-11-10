import { yupResolver } from '@hookform/resolvers/yup'
import { WindowSharp } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { PaystackButton } from 'react-paystack'
import * as yup from 'yup'
import { getAppointmentDetails, updateAppointmentDetail } from '../../../store/features/appointments/appointmentAction'
import { getAllDetailers } from '../../../store/features/detailers/detailerAction'
import { getAllServices } from '../../../store/features/users/userAction'

const schema = yup.object({
    detailer: yup.string(),
    services: yup.array(),
    date: yup.string(),
    time: yup.string(),
    price: yup.string().trim()
})
function EditAppointment() {
    const publicKey = 'pk_test_4504976357a69d02a854e672905145e89f0b250f';
    const { userInfo, services } = useSelector((state) => state.user)
    const { detailers } = useSelector((state) => state.detailer)
    const { appointment } = useSelector((state) => state.appointment)
    const [time, setTime] = useState(appointment?.time);
    const [name, setName] = useState(appointment?.firstName);
    const [email, setemail] = useState(appointment?.email);
    const [phone, setPhone] = useState(appointment?.phone);
    const amount = appointment.price;
    const [date, setDate] = useState(() => {

        let date = new Date(appointment?.date);

        // Get year, month, and day part from the date
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        let formattedDate = year + "-" + month + "-" + day;

        return formattedDate;
    });
    const [service, setService] = useState(() => {
        let services = appointment.services;
        let service = []
        services.forEach(serv => {
            service.push(serv.name)
        });
        return service
    });
    const navigate = useNavigate();
    const [status, setStatus] = useState("pending");
    const [serviceId, setServiceID] = useState([]);
    const [detailer, setDetailer] = useState("");
    const [detailerId, setDetailerID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const paystackProps = {
        email,
        amount,
        metadata: {
            name,
            phone
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => 
        {
            setStatus("paid")
            handleUpdate()
            alert('Payment Succesful!')
        },
        onClose: () => 
            alert('Make Payment')
    }
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

    const handleAccept = () => {
        setStatus("accepted")
    }

    const handleDecline = () => {
        setStatus("declined")
       
    }

    const handleUpdate = (data) => {
        data._id = appointment._id
        data.service = serviceId
        data.detailer = detailerId
        data.date = date
        data.time = time
        data.status = status


        dispatch(updateAppointmentDetail(data))
        .then((resp) => {
            if (resp.meta.requestStatus === "success" || resp.meta.requestStatus === "fulfilled"){
                dispatch(getAppointmentDetails())
                .then((resp) => {
                    window.location.reload();
                    navigate('/appointment');
                })
            }else{
                setErrorMessage(resp.payload)
            }
        })
    }

    const results = detailers.map((detailer) => 
        ({
            id: detailer._id,
            key: detailer._id,
            value: detailer.firstName + ' ' + detailer.lastName, 
            label: detailer.firstName + ' ' + detailer.lastName,
        })
    )
    const servs = services.map((service) => 
        ({
            id: service._id,
            key: service._id,
            value: service.name, 
            label: service.name,
        })
    )

    useEffect(() => {
        dispatch(getAllDetailers())
        dispatch(getAllServices())
        // selectDetailer()
    }, [dispatch])
  return (
    <div className='appointmentSchedule' style={{display: 'flex', justifyContent: 'center'}}>
        <form className="appointmentForm" onSubmit={handleSubmit(handleUpdate)}  style={{width: '70%'}}>
            <div className="form-group">
                <h3 >Edit Appointment</h3>
            </div>
            <p role="alert">{errorMessage}</p>
            <div className="form-group">
                <label htmlFor="detailers">Select Detailer</label>
                <Select 
                    {...register("detailer")} 
                    name="detailer" id="" 
                    style={{backround: "#fcfcfc", padding: '10px'}}
                    key={results.id}
                    value={results.value}
                    onChange={(e) => selectDetailer(e)}
                    defaultValue={detailer}
                    options={results}
                    required
                />
                <p style={{color: '#000'}}>{errors.detailer?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="Services">Select Service</label>
                <Select 
                    {...register("service")} 
                    name="service" id="" 
                    style={{backround: "#fcfcfc", padding: '10px'}}
                    value={service.name}
                    onChange={(e) => selectService(e)}
                    defaultValue={service.name}
                    key={servs.id}
                    options={servs}
                    isSearchable
                    isMulti
                    required
                />
                <p style={{color: '#000'}}>{errors.services?.message}</p>
            </div>
            <div className="form-group">
              <label htmlFor="date">Pick Date</label>
                <input 
                    type="date"    
                    {...register("date")} 
                    placeholder='Pick date'
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                    />
                <p role="alert">{errors.date?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="time">Time <span>(optional)</span></label>
                <input 
                    type="time" 
                    {...register("time")} 
                    placeholder='Pick Time' 
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                />
            </div>
            <div className="form-group">
                <input 
                    type="" 
                    {...register("price")} 
                    value={appointment?.price} 
                    readOnly
                />
            </div>
            {userInfo?.role === "detailer"
            ?
                <div className="edit">
                    <button onClick={handleDecline} className="cancel-button">Decline</button>
                    <button onClick={handleAccept} className="book-button">Accept</button>
                </div>
            : 
                null
            }

            {/* {userInfo?.role === "user" */}
            {/* ? */}
                <div className="edit">
                    <button onClick={handleUpdate} className="book-button">Update</button>
                    <PaystackButton {...paystackProps} />
                </div>
            {/* : */}
                {/* null */}
            {/* } */}
            
        </form>
    </div>
  )
}

export default EditAppointment