import React, { useEffect } from 'react'
import { BiSearchAlt, BiBell, BiChevronDown } from "react-icons/bi";
import  './container.css';
import { useDispatch, useSelector } from 'react-redux';
import AccountMenu from './TopProfileMenu';
// import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../store/features/users/userAction';
// const { userInfo, userToken, users} = useSelector((state) => state.user)
import Logo from '../../images/Loxone.png'
  

function TopContainer() {
    const { userInfo, userToken } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    useEffect(() => {
        if (userToken && !userInfo) {
            dispatch(getUserDetails())
            
        }
    }, [userToken, dispatch])
    
  return (
    <div className="topContainer">
        <div className="logo">
            <img src={Logo} alt="Logo" />
        </div>

        <div className="inputBox">
            <input type="text" placeholder='Search Item' />
            <i>
                <BiSearchAlt />
            </i>
        </div>
        

        <div className="profileContainer">
            <i className="profileIcon">
                <BiBell />
            </i>

            <div className="profileImage">
                
            </div>

            <p className="profileName">{userInfo?.firstName} {userInfo?.lastName}</p>

            <i className="menuChevron" id='menuChevron'>
                <AccountMenu />
            </i>
        </div>    
    </div>
  )
}

export default TopContainer