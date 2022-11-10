import './login.css';
import Card from '../reuse/card'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from  '@hookform/resolvers/yup'
import * as yup from 'yup'
import { userLogin } from '../../store/features/users/userAction';
import { useDispatch, useSelector } from 'react-redux';

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required().min(6),
}).required();

function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const { loading, error, userToken } = useSelector(
        (state) => state.user
    )
    // redirect authenticated user to dashboard
    useEffect(() => {
        if (userToken) {
            navigate('/dashboard')
        }
    }, [navigate, userToken])
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        dispatch(userLogin(data))
    }
    return (
        <div className="Login">
            <div className="login-content" id='auth-img'>
                <Card />
            </div>
            <div className="login-content" id='log-form'>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <h3>Sign In</h3>
                    </div>
                    <p role="alert">{error}</p>
                    <div className="form-group">
                        <input 
                            type="email" 
                            {...register("email")}
                            placeholder='Email'
                            required
                        />
                        <p role="alert">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            {...register("password")}
                            placeholder='Password'
                            required
                        />
                        <p role="alert">{errors.password?.message}</p>
                    </div>
                    <div className="form-group" id='check-box'>
                        <input type="checkbox" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <div className="submit">
                        <input type="submit" onClick={handleSubmit(onSubmit)} className='submit-button' value="Sign In" disabled={loading}/>
                    </div>

                    <div className="have-account">
                        <p>Don't have an acount? <span><Link to="/signup">Sign Up</Link></span></p>
                    </div>
                    <div className="password">
                        <p><span><Link to="/forgot-password">Forgot Password?</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;