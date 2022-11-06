import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUserDetails } from '../store/features/users/userAction';
import { logout } from '../store/features/users/usersSlice';

function ProtectedRoute() {
    const { userToken, userInfo } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!userToken) {
            navigate('/login')
        }
    })

    return <Outlet />
}

export default ProtectedRoute