import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            toast.error('Please enter both email and password')
            return
        }

        if (email !== 'admin@gmail.com' || password !== '123456') {
            toast.error('Invalid email or password')
            return
        }

        localStorage.setItem('adminLoggedIn', 'true')
        toast.success('Logged in successfully')
        navigate('/list', { replace: true })
    }

    return (
        <div className='login-page'>
            <div className='login-card'>
                <h1>Admin Login</h1>
                <p>Sign in to access the admin dashboard.</p>

                <form className='login-form' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='admin@example.com'
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />

                    <button type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login
