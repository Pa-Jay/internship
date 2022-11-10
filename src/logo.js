import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLogo from './images/Loxone.png'
import { getUserDetails } from './store/features/users/userAction'
function Logo() {
    const { userInfo, userToken, users} = useSelector((state) => state.user)
    const dispatch = useDispatch()
  
    // automatically authenticate user if token is found
    useEffect(() => {
      // console.log(userToken)
      if (userToken) {
        dispatch(getUserDetails())
      }
    }, [userToken, dispatch])
    return (
        <div id='gen-logo'>
            <img src={MainLogo} alt="Logo" style={{borderRadius: 0, width: "100px"}}/>    
        </div>
    )
}

export default Logo