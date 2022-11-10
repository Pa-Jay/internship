import * as React from 'react'

// import { Outlet } from 'react-router-dom'
import './style.css'
import AddButton from '../Home/reuse/AddButton';
import Tabs from './reuse/Tabs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllDetailers } from '../../../store/features/detailers/detailerAction';
import { useEffect } from 'react';
function Appointments() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDetailers())
        // .then(detail => console.log(detail))
    }, [dispatch])
    return (
        <div className="appointments">
            <div className="top" >
                <h3 style={{position: 'relative', top: '2.5rem', color: '#0D4E98'}}>Appointments</h3><Link to="create"><AddButton /></Link>
            </div>
            <Tabs />

            {/* <Outlet></Outlet> */}
        </div>
    )
}

export default Appointments