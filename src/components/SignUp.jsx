import { useState,useRef, useEffect, useContext } from 'react'
import UserContext from '../UserContext'
import VerticalNav from './VerticalNav'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function SignUp () {

    const { userFile, setUserFile, handleUserImageUpload } = useContext(UserContext)
    const [usernameFormState, setUsernameFormState] = useState('')
    const [passwordFormState, setPasswordFormState] = useState('')
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
    })
    const { vertUsername,setVertUsername,vertId,setVertId } = useContext(UserContext)

    const usernameHandleChange = (evt) => {
        setUsernameFormState(evt.target.value)
        console.log(usernameFormState)
    }
    const passwordHandleChange = (evt) => {
        setPasswordFormState(evt.target.value)
        
        console.log(passwordFormState)
    }

    useEffect(()=>{
        setUserInfo({
            username: usernameFormState, 
            password: passwordFormState,
            profileImage: userFile,
            isLoggedIn: true
        })
    },[usernameFormState, passwordFormState, userFile])
    console.log(userInfo)

    const handleSubmit = (evt) => {
        evt.preventDefault()
            const postLoginInfo = async(req,res) =>{
                const response2 = await axios.post(`http://localhost:3001/api/userinfo/signup`, userInfo)
            }
            const changeUser = async() => {
                const response = await axios.get(`http://localhost:3001/api/userinfo`)
                alert(`Hello ${userInfo.username}, welcome to StyleSwap!`)
                setVertUsername(response.data.users[response.data.users.length-1].username) 
                setVertId(response.data.users[response.data.users.length-1]._id)
                localStorage.setItem('userId', response.data.users[response.data.users.length-1]._id)
                localStorage.setItem('username', response.data.users[response.data.users.length-1].username)
                localStorage.setItem('userImage', response.data.users[response.data.users.length-1].profileImage)
                console.log(vertUsername)
            }  
        postLoginInfo()
        setTimeout(changeUser, 500)
    }

    const inputRef = useRef(null)
    const [image, setImage] = useState('')
    
    const handleImageClick = (event) => {
        inputRef.current.click()
    }
    
    function handleImage(e) {
        const file = e.target.files[0]
        console.log(file)
        setImage('')
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className='loginContainer signUp'>
                <div className='mainSingup'>
                    <div>
                       <h1 className="headinglogin">Signup page</h1>
                       <p>Already have an account? <Link to='/loginpage'>Log In</Link></p>
                </div>
            <div className='signupInput'>
                    <input className='signUpInput' type="text" onChange={usernameHandleChange} placeholder='Enter your username...'/>
                    <input className='signUpInput' type="text" onChange={passwordHandleChange} placeholder='Enter your password...'/>
                </div>
                <div className='uploadNS'>
                <div className='form-bottom-buttons'>
                   <div onClick={handleImageClick}
                       className="upload">

                        <img src='./src/images/upload.png'
                        style={{ cursor: 'pointer' }} />
                        <input type='file'
                        ref={inputRef}
                        onChange={(event)=> {
                            handleUserImageUpload(event)
                           }}
                        style={{ display: 'none' }}></input>
                   </div>
                </div>
                <div>
                <button className='signUpSubmit' type="submit">Sign Up</button>
                </div>
                </div>
                </div>
            </form>
        </div>
    )
}