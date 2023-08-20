import UserContext from "../UserContext"
import React, { useState, useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import heroImage from '../images/hero.png'
import { Link } from "react-router-dom"
import heroSearch from '../images/heroSearch.png'


export default function Product () {

    const { products, setProducts,vertUsername, setVertUsername, vertId,setVertId } = useContext(UserContext)

    console.log(products)
    let initialState = {
        username: vertUsername,
        cost: '',
        image:''
    }
    const [formState, setFormState] = useState(initialState)
    const [file, setFile] = useState('')

   const handleChange  = event => {
      setFormState({...formState, [event.target.id]: event.target.value})
   }

   const handleImageUpload = async(event) => {
    const files = event.target.files
    console.log(files[0])
    setFile(files[0].name)
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

   const handleSubmit = event => {
     event.preventDefault()

     const postNewProduct = async() => {
        const response = await axios.post(`http://localhost:3001/api/product`, {...formState, username:formState.username, cost:formState.cost, image: 'http://localhost:3001/images/' + file})

      setProducts([...products, response.data])
        location.reload()
     }
     postNewProduct()
    }

   const deleteProduct = async(productId) => {
    const response = await axios.delete(`http://localhost:3001/api/product/${productId}`)

    setProducts(products.filter((product) => product._id != productId))
   }
   const inputRef = useRef(null)
   const [image, setImage] = useState('')

   const handleImageClick = (event) => {
      inputRef.current.click()
   }

   function handleImage(e) {
    const file = e.target.files[0]
    console.log(file)
    setImage(file)
   }

//add to cart function section 



const [selected, setSelected] = useState(null) 


  const addToCart = async (product) => {

    const cartItem = {
                          username: product.username.username,
                          image: product.image,
                          cost: product.cost
                     }
                   
   const response = await axios.post(`http://localhost:3001/api/cart`, cartItem)
    //  console.log(response.data)
    window.location.reload()
    
  }
    const [cart, setCart] = useState([])
  const getCart = async () => {
    const response = await axios.get(`http://localhost:3001/api/cart`)
    setCart(response.data.carts)
  
  }

  useEffect(() => {
    getCart()
 
  }, [])

  useEffect(() => {
    const sellNow = document.getElementsByClassName('sellNow')[0];
    const formProduct = document.getElementsByClassName('formProduct')[0];
  
    const sellNowFunction = () => {
      if (formProduct.style.display === 'none') {
        formProduct.style.display = 'block';
    
      } else {
        formProduct.style.display = 'none';
      }
    };

    formProduct.style.display = 'none'
    
  
    sellNow.addEventListener('click', sellNowFunction);
  
    return () => {
      sellNow.removeEventListener('click', sellNowFunction);
    };
  }, []);


  const isProductIncart = (product) => {
    console.log('hello');
    let result = false;
    for (let i = 0; i < cart.length; i++) {
      console.log(cart[i].username, product.username);
      if (cart[i].cost === product.cost) {
        result = true
      }
      console.log(result)
    
    }
    return result;
  };
  
 return(
  <div className="mainContainer">
    <div className="heroNForm">
      <div className="mainTop">
        <div className="heroImage">
                 <img className='hero' src={heroImage}
                  /> 
              <div className="heroContent">
                     <div className="heroHeadings">
                        <h1>Your Style, Your Way</h1>
                        <p>Find vintage inspiration and modern style online</p>
                     </div>
                  <div className="heroInput">
                     <input placeholder="Search anything"/>
                     <Link><img className="heroSearch" src={heroSearch} /></Link>
                  </div>
             </div>
            <div  className="borderBlack">
             <button className="sellNow">Sell Now</button>
         </div>
        </div>
       
          
        <div className="formProduct"
             style={{ display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'}}>
            <form onSubmit={handleSubmit}>
              <div>
                    <h3>{vertUsername}</h3>
                    <input onChange={handleChange}
                            value={formState.cost}
                            id='cost'
                            type='text'
                            placeholder="Price of item"
                            className="descriptionInput"/>
              </div>
          <div className="uploadNButton">            
              <div onClick={handleImageClick}>
                      <img src='./src/images/upload.png'/>
                      <input type="file"
                           ref={inputRef}
                           id="fileUpload" onChange={(event)=> {
                            handleImageUpload(event)
                           }}
                           value={image}
                           style={{ display: 'none' }}
                            />
               </div>
               <div>
                   <button type='submit'>Post</button>
              </div>
          </div>
            </form>
        </div>
    </div>
  </div>

       <div className='mainPostContainer'>
             {products.slice().reverse().map((product, idx) => {

                return (
                <div className="product"
                 
                      key={idx}
                      id={idx}>
                <div className="userNDelete">
                    <h2>{product.username}</h2>
                    <button onClick={() => deleteProduct(product._id)}>x</button>
                </div>
                <div>
                    <img src={product.image}/>
                    <p>{product.cost}</p>
                    { isProductIncart(product) ? 
                    <button disabled>Sold Out</button>
                    :
                    <button className="addtocart" onClick={() => addToCart( product)}>Add To Cart</button>
                    }
                 </div>
                    
                </div>
                )
       })}

      </div>
 </div>
    
)
}