import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from "./../../../node_modules/axios/dist/esm/axios";
import Spinner from '../Spinner/Spinner';


export default function Brands() {
  const [brands, setbrands] = useState(null)

  function getAllBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then(({data})=>{
      console.log( 'my brands',data?.data);
      setbrands(data?.data)

      

    })
    .catch((error)=>{
      console.log(error);
      
    })
  }

  useEffect(() => {
    getAllBrands()

  }, [])


  return <>
{brands?.length > 0 ?   <div><h2 className='text-center text-4xl text-green-600  my-10'>All Brands</h2>
 
  <div className='flex flex-wrap'>
    {brands?.map((brand)=>{return  <div className="w-1/4 p-2 ">
    <div className=' border-2 rounded-xl border-slate-200 hover:shadow-md hover:shadow-green-300  hover:scale-[1.03] transition-all duration-500 '>
      <img src={brand.image} className='w-full' alt="" />
  <h3 className='text-xl text-black text-center mb-5 border-t-1 pt-2 font-semibold border-t-slate-200'>{brand.name}</h3>
    </div>
  
  </div>})}
  </div></div>
 :<Spinner/> }
  
 
  </>
}
