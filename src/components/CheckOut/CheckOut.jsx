import React, { useContext, useEffect, useState } from 'react'
import style from './CheckOut.module.css'
import { useNavigate } from 'react-router-dom'
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import { useFormik } from 'formik';
import { UserContext } from '../Context/Usercontext';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';


export default function CheckOut() {
  let { userLogin, setuserLogin } = useContext(UserContext)
  let { cartId ,resetCart} = useContext(CartContext)
  const [Loading, setLoading] = useState(false)
  let navigate = useNavigate()
  const [isOnline, setisOnline] = useState(true)
  function payCash(val) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress: val }, { headers: { token: localStorage.getItem("Token") } }).then((response) => {
 if (response.data.status=== 'success') {
        resetCart()
        toast.success("CheckOut Done")
      }

    })
      .catch((error) => {
        console.log(error);



      })




  }
  function payOnline(val) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, { shippingAddress: val }, { headers: { token: localStorage.getItem("Token") } }).then((response) => {
      console.log(response);
      if (response.data.status == 'success') {
        window.location.href=response.data.session.url
      }

    })
      .catch((error) => {
        setLoading(false)
        console.log(error.response.data.message);



      })




  }
function detectPayment(val)
{
  if (isOnline){
    payOnline(val)
  }
  else{
    payCash(val)
  }
}

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: detectPayment,

  })

  useEffect(() => {

  }, [])




  return <>
    <div className="bg-gray-200  flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6 ">
          <div className='text-center '>
            <i className="fa-regular fa-face-smile text-green-500 text-3xl "></i>
          </div>
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-800">
            Sign up for an account
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">details</label>
              <div className="mt-1">
                <input onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} id='details' name="details" type="text" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
              </div>


            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">phone</label>
              <div className="mt-1">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='phone' name="phone" type="tel" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} id='city' name="city" type="text" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
              </div>
            </div>
            <div className='flex flex-wrap justify-between items-center'>
              <div className=' w-1/2 p-2'>              <button onClick={()=>{setisOnline(false)}} type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">Pay Cash  </button>
              </div>
              <div className='w-1/2'>               <button onClick={()=>{setisOnline(true)}} type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">Pay Online  </button>
               </div>
            </div>
          </form>
        </div>
      </div>
    </div>


  </>
}
