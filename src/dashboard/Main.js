import React, { useEffect } from 'react'
import './dash.css'
import Mobile from './components/Mobile'
import Menu from './components/Menu'
import Container from './components/Container'
import { getAllUsers } from '../store/features/users/userAction'
import { useDispatch, useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { getUserDetails } from '../store/features/users/userAction'

function Main() {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userInfo?.role === "admin") {
      dispatch(getAllUsers())
    }
  }, [userInfo, dispatch])

  return (
    <div className='Dashboard'>
        <Menu />
        <Mobile />
        <Container />
    </div>
  )
}

export default Main