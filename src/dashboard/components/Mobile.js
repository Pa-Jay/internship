import React, { useEffect } from 'react'
import './Mobile.css'
import { BiChat, BiSpreadsheet, BiSlider  } from "react-icons/bi";
import { FaList, FaUserCog, FaUsersCog} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Mobile() {
    const { userToken, userInfo } = useSelector((state) => state.user)
    useEffect(() => {
        const mainMobileLi = document
            .getElementById('mainMobile')
            .querySelectorAll('li');

            function changeActive() {
                mainMobileLi.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
            }

            mainMobileLi.forEach(n => n.addEventListener('click', changeActive))
    }, [])
  return (
    <nav>
        <ul id="mainMobile">
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/chat'><Icon icon={<BiChat />} /></Link>
            {userInfo?.role === "admin" ? 
                <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/users'><Icon icon={<FaUsersCog />} /></Link>
            :
                null
            }
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/dashboard'><Icon icon={<FaList />} /></Link>
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/appointment'><Icon icon={<BiSlider />} /></Link>
            <Link style={{width: 'inherit', display: 'flex', alignItems: 'inherit'}} to='/setting'><Icon icon={<FaUserCog />} /></Link>


        </ul>
    </nav>
  )
}

const Icon = ({icon}) => (
    <li>
        <a href="/golang.com">{icon}</a>
    </li>
)

export default Mobile