import React from 'react'
import Mockup from '../../images/wash-6.jpg'

import './style.css'
function Card() {
  return (
    <div className='card' >
        <img src={Mockup} alt="Mockup" />
    </div>
  )
}

export default Card