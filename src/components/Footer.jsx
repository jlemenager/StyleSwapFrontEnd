import { Link } from "react-router-dom"
export default function Footer () {


    return(
        <div className="footerMain">
           
           <div>
               <Link to='/'><p className='nav-title'>StyleSwap</p></Link>
            </div>
            <div>
                <Link to='/'><p>News feed</p></Link>
                <Link to='/'><p>Home</p></Link>
                <Link to='/search'><p>Search</p></Link>
                <Link to='/product'><p>Products</p></Link>
            </div>
            <div>
                <Link to='/cart'><p>Cart</p></Link>
                <Link to='/login'><p>Login</p></Link> 
            </div>
        
          
        </div>
    )
}