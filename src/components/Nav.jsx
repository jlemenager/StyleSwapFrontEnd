import { Link, Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext'
import Home from './Home'
import heroSearch from '../images/heroSearch.png'

export default function Nav () {
    const { userFile, setUserFile, handleUserImageUpload } = useContext(UserContext)
    return(
        <div className='nav-links'>
            <div className='right-title'>
                   <Link to='/'><img className='logo' src="src/images/logo.png" alt="logo" /></Link>
                   <Link to='/'><h1 className='nav-title'>StyleSwap</h1></Link>
            </div>
        
            <div className='center-links'>
                 <Link to='/'><img src='src/images/home.png'/></Link>
                 <Link to='/product'><img className='nav-icon marketplace' src="src/images/product.png"/></Link>
            </div>

            <div className='left-title'>
                <Link to='/cart'><img className='nav-icon left cart' src="src/images/cartt.png" alt="cart" /></Link>
                 <Link to='/login'><img className='nav-icon left login' src={userFile} alt="user-icon" /></Link> 
            </div>
        </div>
    )
}