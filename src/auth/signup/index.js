import './signup.css';
import { useForm } from 'react-hook-form'
import Card from '../reuse/card'
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from  '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/features/users/userAction';
import Logo from '../../logo';


const schema = yup.object({
    firstName: yup.string().required().trim().min(3),
    lastName: yup.string().required().trim().min(3),
    email: yup.string().required(),
    phone: yup.string().required().trim(),
    password: yup.string().required().min(6),
    TandC: yup.boolean().required()
}).required();
function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const { loading, success, userInfo, userToken} = useSelector(
        (state) => state.user
    )
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState("")
    let [TandC, setTandC] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("")
   
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        let passwordMatch = false
        // check if passwords match
        if (data.password === confirmPassword) {
            passwordMatch = true
            // transform email string to lowercase to avoid case sensitivity issues during login
            data.email = data.email.toLowerCase();
            dispatch(registerUser(data))
            .then((user) => {
                console.log(user)
                if (user.error?.message === "Rejected"){
                    setError(user.payload.error.message)
                }
                if (user.payload?.status === "success"){
                    navigate('/login')
                }
            })
        }
        if (passwordMatch === false){
            setErrorMessage("Password does not match")
        }
    }

    useEffect(() => {
        if(success && !userInfo) navigate('/login')

    }, [navigate, userInfo])
    return (
        <div className="signup-container">
            <div className="main-logo">
                <Logo />
            </div>
            <div className="signup">
                <div className="signup-content" id='log-form'>
                    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <h3>Create an Account</h3>
                        </div>
                        {/* <p role="alert">{errorMessage}</p> */}
                        <p role="alert">{error}</p>
                        <div className="form-group">
                            <input 
                                type="text" 
                                {...register("firstName")}
                                placeholder='First Name' 
                                />
                                <p role="alert">{errors.firstName?.message}</p>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                {...register("lastName")}
                                placeholder='Last Name' 
                                />
                                <p role="alert">{errors.lastName?.message}</p>
                        </div>
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
                                {...register("phone")}
                                placeholder='Phone Number' 
                            />
                            <p role="alert">{errors.phone?.message}</p>
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                {...register("password")}
                                placeholder='Password'
                            />
                            <p role="alert">{errors.password?.message}</p>
                        </div>
                        <div className="form-group">
                            <input 
                                type="password"
                                value={confirmPassword} 
                                onChange={ (e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm Password'
                            />
                            <p role="alert">{errorMessage}</p>

                        </div>
                        <div className="form-group" id='check-box'>
                            <input 
                                type="checkbox"
                                {...register("TandC")}
                                onClick={(e) => setTandC(TandC = !TandC)}
                            />
                            <label htmlFor="tandc">I agree to the Terms and Condition</label>
                            <p role="alert">{errors.TandC?.message}</p>
                        </div>
                        <div className="submit">
                            <input type="submit" className='submit-button' placeholder='Sign Up' value="Sign Up" disabled={loading}/>
                            {/* <Link to={`/chat/${name}/${room}`} type="submit" onClick={sendData} className="submit-button">Sign Up</Link> */}
                        </div>
                        <div className="have-account">
                            <p>Already have an acount? <span><Link to="/login">Sign In</Link></span></p>
                        </div>
                    </form>
                </div>
                <div className="signup-content" id='auth-img'>
                        <Card />
                </div>
            </div>
        </div>
    );
}

export default Signup;