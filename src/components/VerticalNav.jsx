import UserContext from '../UserContext'
import { useContext, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './Home'

export default function Nav ({ vertUsername, setVertUsername, userFile, setUserFile, handleUserImageUpload }) {
    return(
        <div className='nav-links-vertical'>
              <Link to='/login' className='vert-link nav-link-vertical'><img className='nav-logo-vert account-link-vert' src={userFile} alt="user-icon" />{vertUsername}</Link>
              <Link to='/' className='vert-link nav-link-vertical'><img className='nav-logo-vert home-link-vert' src="src/images/home.png" alt="newsfeed" /><p>Newsfeed</p></Link>
              <Link to='/product' className='vert-link nav-link-vertical'><img className='nav-logo-vert marketplace-link-vert' src="src/images/product.png" alt="marketplace" /><p>Marketplace</p> </Link>
        </div>
    )
}