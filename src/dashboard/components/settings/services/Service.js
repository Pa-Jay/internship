import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DataGridDemo from '../reuse/DataGridTable'
import './style.css'
function Service() {
  const navigate = useNavigate();
  return (
    <div className="service">
      <div className="add-service-btn">
        <Link to='/setting/add-service'>Add Service</Link>
      </div>
      <DataGridDemo />
    </div>
  )
}

export default Service