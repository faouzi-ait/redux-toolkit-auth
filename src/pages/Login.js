import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../redux/apiServices/authApiSlice'
import { setCredentials } from '../redux/slices/authSlice'

const Login = () => {
    const navigate = useNavigate();
    const [pwd, setPwd] = useState('');
    const [username, setUser] = useState('');

    const [login, { isLoading }] = useLoginMutation();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { token, refreshToken, user } = await login({ username, password: pwd }).unwrap();
            dispatch(setCredentials({ user, accessToken: { token, refreshToken }, isLoggedIn: true }));
            navigate("/private");
        } catch (error) {
            console.log(error)     
        }
    }

    const handleLogout = () => {
      dispatch(setCredentials({ 
        user: null, 
        accessToken: { token: null, refreshToken: null }, 
        isLoggedIn: false }));
    }

    return (
        <div style={{ textAlign: 'center', margin: 10 }}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Username here"
            />
            <input
                type="text"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Password here"
            />
            <button onClick={handleSubmit}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Login;
