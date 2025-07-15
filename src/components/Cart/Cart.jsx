import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';


export default function Cart() {
  const [counter, setcounter] = useState(0)
  let { numOfCartItems, products, setproducts, settotalPrice, setnumOfCartItems, totalPrice, cartId, updateCart, deleteCartitem, deleteAllCart } = useContext(CartContext)
  let token = localStorage.getItem("Token")
  let headers = { token }


  async function handleUpdate(prodId, count) {
    let response = await updateCart(prodId, count)
    console.log(response);


  }
  async function handledelte(prodId) {
    let response = await deleteCartitem(prodId)
    console.log(response);


  }
  function handledelteAllItems() {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((response) => {
      console.log(response);

      if (response?.data.message === 'success') {
        toast.success('Product Deleted', { position: "top-right" });
        setnumOfCartItems(0)
        setproducts(0)
        settotalPrice(0)

      }
      else {
        toast.error('error.........')
      }


    })
      .catch((error) => {
        console.log(error);

      })



  }





  return <>
    {products ? <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
      <h1 className="text-center text-[#191919] dark:text-white text-[32px] font-semibold leading-[38px]">
        My Shopping Cart
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
                  <td className="px-2 py-2">
                    <button onClick={() => { handledelte(prod.product._id) }}><svg width={24} className="cursor-pointer" height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit={10} />
                      <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></button>
                  </td>
                </tr>
              })}


            </tbody>
            <tfoot>
              <tr class="border-t border-gray-400">
                <td class="px-2 py-2" colspan="3">
                  <button onClick={handledelteAllItems} className="px-8 cursor-pointer py-3.5 bg-red-600 rounded-[43px] text-white text-md font-semibold className leading-[16px]">
                    Delete Cart            </button>

                </td>
              </tr>
            </tfoot>

          </table>
        </div>
        <div className="w-[424px] bg-white rounded-lg p-6">
          <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
            Cart Total
          </h2>
          <div className="w-[376px] py-3 justify-between items-center flex">
            <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span><span className="text-[#191919] text-base font-semibold leading-tight">{totalPrice} EGP</span>
          </div>
          <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
            <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
          </div>
          <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
            <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Subtotal:</span><span className="text-[#191919] text-sm font-medium leading-[21px]">{totalPrice} EGP</span>
          </div>
          <Link to={'/checkout'}> <button className="w-[376px] text-white mt-5 px-10 py-4 bg-[#00b206] rounded-[44px] gap-4 text-base font-semibold leading-tight">
            Proceed to checkout
          </button></Link>
        </div>
      </div>
      <div className="mt-6 p-5 w-[800px] bg-white rounded-lg border border-[#e6e6e6] justify-start items-center gap-6 inline-flex">
        <h3 className="text-[#191919] w-1/4 text-xl font-medium className leading-[30px]">
          Coupon Code
        </h3>
        <div className="w-full border border-[#e6e6e6]">
          <input placeholder="Enter code" type="text" className="w-2/3 px-6 py-3.5 outline-none bg-white rounded-[46px] text-[#999999] text-base font-normal leading-normal" /><button className="px-10 py-4 bg-[#333333] rounded-[43px] text-white text-base font-semibold leading-tight">
            Apply Coupon
          </button>
        </div>
      </div>
    </section> : <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1920x1080?nature")' }}>
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Oops! No items found</h1>
        <a href="#" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Go Shopping
        </a>
      </div>
    </div>
    }



  </>
}
