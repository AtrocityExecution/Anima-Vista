import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const NavBar = ({token}) => {

    const [color, setColor] = useState('')
    const [fontColor, setFontColor] = useState('')

    const colors = ['#3d43b4', '#041348', '#2929c7', '#de004e', '#321450', '#7a04eb',
     '#ff00a0', '#575267', '#ff2a6d', '#44786A', '#8f704b', '#ce0000', '#67971a']

    let navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        handleLogout()
    }, [])

    const getBrightness = (color) => {
        let r, g, b, hsp;
        if (color.match(/^rgb/)) {
          color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
          r = color[1];
          g = color[2];
          b = color[3];
        } else {
          color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
          r = color >> 16;
          g = color >> 8 & 255;
          b = color & 255;
        }
        hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
        return hsp;
    }

    const changeColor = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        document.documentElement.style.setProperty('--background-color', randomColor)
        const brightness = getBrightness(randomColor)
        if (brightness > 127.5) {
            setFontColor('black')
        } else {
            setFontColor('azure')
        }
    }

    return (
        <div style={{backgroundColor: color, color: fontColor}}>
            <nav className='nav-bar'>
                <div className="appearance-buttons">
                    <button id='colors' onClick={changeColor}>Change Color</button>
                </div>
                <div className="feature-buttons">
                <Link to='/'><button>Home</button></Link>
                {token && (<>
                
                    <Link to='/feed'><button>Feed</button></Link>
                    <Link to='/create-post'><button type='submit'>Post</button></Link>
                    <button onClick={handleLogout}>Logout</button>

                </>)}
                
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar