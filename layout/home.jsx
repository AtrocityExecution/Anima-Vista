import { Link } from "react-router-dom";

const Home = () => {

    const title = "Anima-Vista".split('').map((letter, index) => (
        <span key={index} className='letter' style={{animationDelay: `${index * 0.1}s`}}>
            {letter}
        </span>
    ))

    return (
        <div className='home'>
            <h1 id="page-title">
                {title}
            </h1>
            <p>Forums for the past-present-future...</p>
            <Link to='/login'><button className='login-button'>Login</button></Link>
            <Link to="/signup"><button className='sign-up-button'>Sign-Up</button></Link>
        </div>
    )
}

export default Home