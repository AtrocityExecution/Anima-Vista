import React, { useEffect, useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import SignUpPage from '../layout/signup-page.jsx'
import LoginPage from '../layout/login-page.jsx'
import Home from '../layout/home.jsx'
import HomeFeed from '../layout/home-feed.jsx'
import NavBar from '../components/navBar.jsx'
import CreatePost from '../components/posts.jsx'
import PostPage from '../layout/post-page.jsx'
import './App.css'

function App() {

  const [token, setToken] = useState(false)

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      setToken(JSON.parse(storedToken))
    }

  }, [])

  useEffect(() => {
    
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token))
    }

  }, [token])

  return (
    <>
      
      <div className='main-page'>

        <Routes>

          <Route path='/' element={<NavBar token={token}/>} >
            <Route index={true} path='/' element={<Home />} />
            <Route index={false} path='/signup' element={<SignUpPage />} />
            <Route index={false} path='/login' element={<LoginPage setToken={setToken}/>} />
            {token ? <Route index={false} path='/feed' element={<HomeFeed token={token}/>} />: ""}
            <Route index={false} path='/create-post' element={<CreatePost token={token}/>} />
            <Route index={false} path='/post/:id' element={<PostPage token={token}/>} />
          </Route>

        </Routes>

      </div>
      
    </>
  )
}

export default App
