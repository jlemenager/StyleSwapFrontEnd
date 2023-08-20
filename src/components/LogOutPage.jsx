import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import UserContext from '../UserContext'
export default function LogoutPage(){
    const [usernameFormState, setUsernameFormState] = useState('')
    const [passwordFormState, setPasswordFormState] = useState('')
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const { vertUsername, setVertUsername, userFile, setUserFile } = useContext(UserContext)

    const usernameHandleChange = (event) => {
        setUsernameFormState(event.target.value)
        console.log(usernameFormState)
    }

    const passwordHandleChange = (event) => {
        setPasswordFormState(event.target.value)
        console.log(passwordFormState)
    }

    useEffect(()=>{
        setUserInfo({
            username: usernameFormState,
            password: passwordFormState
        })
    },[usernameFormState,passwordFormState])
    const handleSubmit = async(event) => {
        event.preventDefault()
        const response = await axios.get(`http://localhost:3001/api/userinfo`)
        const checkIfRealAccount = async() => {
            for (let i = 0;i<response.data.users.length;i++){
                if (userInfo.password == response.data.users[i].password && userInfo.username == response.data.users[i].username){
                    const putRequest = await axios.put(`http://localhost:3001/api/userinfo/logoutpage/${response.data.users[i]._id}`, {...userInfo, isLoggedIn: false})
                    alert(`Hello ${response.data.users[i].username}, you are logged out.`)
                    setVertUsername('Not Logged In')
                    setUserFile('src/images/user-icon.png')
                }  
            }
        }
        checkIfRealAccount()
    }
    return(
        <form onSubmit={handleSubmit} className='loginContainer logOut'>
            <h1 className="headinglogin">Log Out</h1>
            <label>Username:</label>
            <input className='logOutInput' onChange={usernameHandleChange} type="text" placeholder='Username' />
            <label>Password:</label>
            <input className='logOutInput' onChange={passwordHandleChange} type="text" placeholder='Password' />
            <input className='logOutSubmit' type="submit" />
        </form>
    )
}