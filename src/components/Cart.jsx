import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Cart() {
  const [cart, setCart] = useState([])

  const getCart = async () => {
    const response = await axios.get("http://localhost:3001/api/cart")
    setCart(response.data.carts)
  }

  useEffect(() => {
    getCart()
  }, [])

  const deleteCart = async (itemId) => {
    await axios.delete(`http://localhost:3001/api/cart/${itemId}`)
    setCart(cart.filter((item) => item._id !== itemId))
  }

  const [updatedCost, setUpdatedCost] = useState(0)

  useEffect(() => {
    const updateOrderSummary = () => {
      let totalPrice = 0
      cart.forEach((item) => {
        totalPrice += item.cost
      })
      setUpdatedCost(parseInt(totalPrice))
    }
    updateOrderSummary()
  }, [cart])

  return (
    <div className="mainCart">
      <div>
        <h1>Your Bag</h1>
      </div>
      <div className="bagNSummary">
        <div className="cartCard">
          {cart.map((item) => (
            <div key={item._id} className="cartC">
               <div className="cartBox">
                  <div>
                    <img src={item.image} alt={item.username} />
                  </div>
                  <div>
                    <p>{item.cost}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteCart(item._id)}>delete</button>
                  </div>
                </div>
            </div>
          ))}
        </div>
          <div className="orderSummary">
             <h1>Order Summary</h1>
             <h2>${updatedCost}</h2>
          </div>
      </div>
    </div>
  )
}
