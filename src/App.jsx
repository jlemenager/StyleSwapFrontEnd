import { useState,useEffect,useContext } from 'react'
import UserContext from './UserContext'
import { Routes,Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import Nav from './components/Nav'
import LogIn from './components/LogIn'
import Cart from './components/Cart'
import Search from './components/Search'
import Product from './components/Product'
import SignUP from './components/SignUp'
import LogInPage from './components/LogInPage'
import LogOutPage from './components/LogOutPage'
import './App.css'
import Footer from './components/Footer'


function App() {

  const [posts,setPosts] = useState([])
  const [userFile, setUserFile] = useState(  localStorage.getItem('userImage'))


  const [products, setProducts] = useState([])

  const [vertUsername, setVertUsername] = useState(localStorage.getItem('username'))
  

  const [vertId, setVertId] = useState(localStorage.getItem('userId'))
  

  const getPostsAPI = async() =>{
    const response = await axios.get('http://localhost:3001/api/post')
    setPosts(response.data.posts)
  }

  useEffect(()=>{
    getPostsAPI()
  },[])

  useEffect(() => {
    const getProduct = async() => {
      const response = await axios.get(`http://localhost:3001/api/product`)
      setProducts(response.data.products)
    }
    getProduct()
  }, [])

  const handleUserImageUpload = async(event) => {
    const files = event.target.files
    console.log(files[0])
    setUserFile('http://localhost:3001/images/' + files[0].name)
    const myImage = files[0]
    const imageType = /image.*/

    const formData = new FormData()
    formData.append('myFile', files[0])
    console.log(files[0].name)
    await axios.post('http://localhost:3001/saveImage', formData)
    console.log(formData)
    // fetch('/saveImage', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    .then(data => {
      console.log(data.data.path)
    })
    .catch(error => {
      console.error(error)
    })
  }
  // https://flaviocopes.com/file-upload-using-ajax/ : Used this as a guide to set up image uploading
  
  return (
   <div className='App'>
    <UserContext.Provider value={{ posts,
                                   setPosts,
                                   products,
                                   setProducts,
                                   getPostsAPI,
                                   vertUsername,
                                   setVertUsername,
                                   vertId,
                                   setVertId,
                                   userFile,
                                   setUserFile,
                                   handleUserImageUpload
                                }}>
       <header>Find your favorite styles and recycle clothing at the same time</header>
       <Nav />

       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/signup' element={<SignUP/>}/>
          <Route path='/loginpage' element={<LogInPage/>}/>
          <Route path='/logoutpage' element={<LogOutPage/>}/>
       </Routes>
       
       <Footer/>
    </UserContext.Provider>
  
   </div>
  )
}

export default App