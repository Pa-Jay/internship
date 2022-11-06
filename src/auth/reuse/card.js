import React from 'react'
import Mockup from '../../images/car-wash-2.png'

import './style.css'
function Card() {
  return (
    <div className='card' >
        <img src={Mockup} alt="Mockup" />
    </div>
  )
}

export default Card