import React, { useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { CartContext } from '../Context/CartContext'
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';


export default function AllOrders() {
  const [counter, setcounter] = useState(0)
  const [cartId, setcartId] = useState(0)
  const [numOfCartItems, setnumOfCartItems] = useState(0)
  const [products, setproducts] = useState([])
  const [totalPrice, settotalPrice] = useState(0)
  let token = localStorage.getItem('Token');
  let headers = {
    token: localStorage.getItem('Token')
  }

  function getUserCartItem() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((response) => {
      setcartId(response?.data?.cartId)
      setnumOfCartItems(response?.data?.numOfCartItems)
      setproducts(response?.data?.data.products)
      settotalPrice(response?.data?.data.totalCartPrice)

    })
      .catch((error) => {
        console.log(error);

      })
  }



  useEffect(() => {
    getUserCartItem()
  }, [])


  return <> {products ? <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
    <h1 className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]">
      My Orders
    </h1>
    <div className="flex items-start mt-8 gap-6">
      <div className="bg-white p-4 w-[800px] rounded-xl">
        <table className="w-full bg-white rounded-xl">
          <thead>
            <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
              <th className="text-left px-2 py-2">Product</th>
              <th className="px-2 py-2">price</th>
              <th className="px-2 py-2">Quantity</th>
              <th className="px-2 py-2">Subtotal</th>
              <th className="w-7 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {products?.map((prod) => {
              return <tr key={prod.product._id} className="text-center">
                <td className="px-2 py-2 text-left align-top">
                  <img src={prod?.product.imageCover} alt="test" className="w-[100px] mr-2 inline-block h-[100px]" /><span>{prod.product.title}</span>
                </td>
                <td className="px-2 py-2">{prod?.price} EGP</td>
                <td className="p-2 mt-9 bg-white rounded-[170px] border border-[#a0a0a0] justify-around items-center flex">
                  <button onClick={() => { handleUpdate(prod.product._id, prod.count - 1) }}> <svg width={14} height={15} className="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                  <span className="w-10 text-center text-[#191919] text-base font-normal leading-normal">{prod.count}</span>
                  <button onClick={() => { handleUpdate(prod.product._id, prod.count + 1) }}><svg className="cursor-pointer relative" width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg></button>
                </td>
                <td className="px-2 py-2">{(prod.price) * (prod.count)}</td>

              </tr>
            })}


          </tbody>


        </table>
      </div>

    </div>


  </section>
    : null}



  </>

}
