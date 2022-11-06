import React, { useEffect, useState } from 'react'
import Logo from '../../images/Loxone.png'
import './Menu.css'
import { Link, useNavigate } from 'react-router-dom'
import { BiChat, BiSpreadsheet, BiSlider  } from "react-icons/bi";
import { FaList, FaUsersCog, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/features/users/usersSlice'

function Menu() {
    const { userToken, userInfo } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    useEffect(() => {
        // if (!userToken) navigate('/login')
        const mainMenuLi = document
            .getElementById('mainMenu')
            .querySelectorAll('li');

            function changeActive() {
                mainMenuLi.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
            }

            mainMenuLi.forEach(n => n.addEventListener('click', changeActive))

            // const altMenuLi = document
            // .getElementById('altMenu')
            // .querySelectorAll('li');

            // function checkActive() {
            //     altMenuLi.forEach(n => n.classList.remove('active'));
            //     this.classList.add('active');
            // }

            // altMenuLi.forEach(n => n.addEventListener('click', checkActive))
    }, [])

  return (
    <menu>
        <img src={Logo} alt="Logo" />

        <ul id="mainMenu">
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/dashboard'><Icon icon={<FaList />} /></Link>
            {/* <Icon icon={<FaList />} /> */}
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/dashboard'><Icon icon={<BiChat />} /></Link>
            {userInfo?.role === "admin" ? 
                <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/users'><Icon icon={<FaUsersCog />} /></Link>
            :
                null
            }
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/utilities'><Icon icon={<BiSpreadsheet />} /></Link>
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/appointment'><Icon icon={<BiSlider />} /></Link>

        </ul>

        <ul className="altMenu">
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/setting'><Icon icon={<FaUserCog />} /></Link>
            <button onClick={handleLogout} style={{width: 'inherit', display: 'flex', alignItems: 'inherit', border: "none"}}><Icon icon={<FaSignOutAlt />} /></button>
        </ul>
    </menu>
  )
}

const Icon = ({icon}) => (
    <li>
        <a href="">{icon}</a>
    </li>
)

export default Menu