import React, { useState } from 'react'
import { supabase } from '../src/client'
import {toast, ToastContainer , Slide, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {

    const [account, setAccount] = useState({username: "", email: "", password: ""})

    const handleChange = (e) => { 
        const {name, value} = e.target
        setAccount( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        
        })
        
    }

    const createAccount = async () => {

        if (account.username === "" ||  account.username === " " || account.email === "" || account.email === " " || account.password === ""  || account.password === " ") {
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

            const {data, error} = await supabase.auth.signUp({
                email: account.email,
                password: account.password,
                options: {
                    data: {
                        username: account.username,
                        
                    }
                }
            })
            toast.success("Account created. Check your email for verification.", {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
                })

        } catch (error) {
            toast.error("Error creating account.", {
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
        }
            
    }

    return (
        <div className="sign-up-page">
            <ToastContainer/>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => {e.preventDefault(); createAccount();}}>

                <label htmlFor="username">Username</label><br />
                <input type="text" id="username" name="username" onChange={handleChange}/>
                <br/>

                <label htmlFor="email">Email</label><br />
                <input type="text" id="email" name="email" onChange={handleChange}/>
                <br/>

                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" name="password" onChange={handleChange}/>
                <br/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )


}

export default SignUpPage