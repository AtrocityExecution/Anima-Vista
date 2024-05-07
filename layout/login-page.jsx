import React, { useState } from 'react'
import { supabase } from '../src/client'
import { Link, useNavigate } from 'react-router-dom'
import {toast, ToastContainer, Slide, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({setToken}) => {

    let navigate = useNavigate()

    const [account, setAccount] = useState({email: "", password: ""})

    const handleChange = (e) => { 
        const {name, value} = e.target
        setAccount( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        
        })
        
    }

    const login = async () => {

        if 
            (account.email === "" ||  account.email === " " || account.password === ""  || account.password === " ") {
            toast.error("Please fill out all fields.", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
                })
            return
        }

        try {

            const {data, error} = await supabase.auth.signInWithPassword({
                email: account.email,
                password: account.password,
                
            })

            if (error) throw error
            console.log(data)
            setToken(data)
            navigate('/feed')
            

        } catch (error) {
            toast.error("Incorrect Email or Password.", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
                })
            navigate('/login')
        }
        
    }

    return (
        <div className='login-page'>
            <ToastContainer />
            <h1>Login</h1>
            <form onSubmit={(e) => {e.preventDefault(); login();}}>
                <label>Email</label>
                <input type='text' id='email' name='email' onChange={handleChange}/>
                <br/>

                <label>Password</label>
                <input type='password' id='password' name='password' onChange={handleChange}/>
                <br/>

                <button type='submit'>Login</button>
            </form>

        </div>
    )


}

export default LoginPage