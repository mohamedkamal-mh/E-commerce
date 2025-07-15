import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css';
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import Spinner from '../Spinner/Spinner';
import { wishListContext } from '../Context/WishListContext';
import toast from 'react-hot-toast';


export default function WishList() {
  const [WishList, setWishList ,] = useState([])
  let headers = { token: localStorage.getItem("Token") }
  let{DeleteItemFromWish ,GetWish}=useContext(wishListContext)

 async function GetUserWishList() {
    let response = await GetWish()
    console.log(response);
    setWishList(response?.data.data)
  }
async  function Delete(prodId){
    let response = await DeleteItemFromWish(prodId)
    console.log(response);
    if(response.data.status==='success'){
       GetUserWishList()
      toast.success(response.data.message)
     
    }
  }

  useEffect(() => {
    GetUserWishList()
  }, [])


  return <>
  <div className="bg-gray-100 flex flex-wrap ">
    {WishList?.map( (prod)=>{ return  <div key={prod.id} className="container mx-auto px-4 py-8 w-full md:w-1/2 lg:w-1/3">
    <div className=" -mx-4">
      {/* Product Images */}
      <div className="w-full  px-4 mb-8">
        <img src={prod.imageCover} alt="Product" className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
    
      </div>
      {/* Product Details */}
      <div className="w-full  px-4">
        <h2 className="text-3xl font-bold mb-2">{prod.title}</h2>
        <p className="text-gray-600 mb-4">{prod.brand.name}</p>
        <div className="mb-4">
          <span className="text-2xl font-bold mr-2">{prod.price} EGP</span>
        </div>
       
        <p className="text-gray-700 mb-6">{prod.description}</p>
        
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div className="flex space-x-4 mb-6">
          <button className="bg-green-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </button>
          <button onClick={()=>{Delete(prod.id)}} className="cursor-pointer bg-red-600 flex gap-2 items-center  text-white px-6 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Delete
          </button>
        </div>
       
      </div>
    </div>
  </div>}) }
  
</div>

  </>
}
