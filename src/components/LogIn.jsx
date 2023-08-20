import { Link } from 'react-router-dom'

export default function LogIn() {
    return(
       
             <div className="loginContainer">
                 <div className='loginContent'>
                      <h1 className="headinglogin">Log In</h1>
                      <p>New to this site? <Link to='/signup'>Sign Up</Link></p>
                  </div>
                  <div className='loginButton'>
                      <button className="semail"><Link to='/loginpage'>Log In</Link></button>
                     <button className="semail"><Link to='/logoutpage'>Log Out</Link></button>
                   </div>
                 
             <div className="or">
                <p>
                  <span></span>
                   or
                  <span></span>
                </p>
             </div>
             <div className='loginOthers'>
                <button className="google"><img src="src/images/google.png"/>Log In with Google</button>
                <button className="upfb"><img src="src/images/fb.png"/>Log In with Facebook</button>
              </div>
         </div>
    )
}