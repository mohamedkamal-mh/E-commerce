import React, { useContext, useEffect, useState } from 'react'
import style from './ForgetPassword.module.css'
import { Navigate, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { UserContext } from '../Context/Usercontext';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";


export default function ForgetPassword() {
  let { userLogin, setuserLogin } = useContext(UserContext)
  const [Loading, setLoading] = useState(false)
  let navigate = useNavigate()
  async function submitForm(val) {
    setLoading(true)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val).then(({ data }) => {
      setLoading(false)
      console.log(data);
      if (data.statusMsg == 'success') {
        toast.success(data?.message)
        navigate('/codeconfirm')
      }

    })
      .catch((error) => {
        setLoading(false)
        console.log(error.response.data.message);



      })




  }

  let validate = Yup.object().shape({
    email: Yup.string().required('E-mail is required').email('Invalid E-mali'),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitForm,
    validationSchema: validate

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
            Reset Password          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
   
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name="email" type="email" autoComplete="email-address" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
              </div>
              {formik.errors.email && formik.touched.email ? <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center  max-w-lg">
                <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                  <path fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                  </path>
                </svg>
                <span className="text-red-800"> {formik.errors.email}. </span>
              </div> : null}
            </div>
          
           
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">{Loading ? <i className='fas fa-spinner fa-spin'></i> : "Send"}         
                   </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  </>
}
