import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import Spinner from '../Spinner/Spinner';


export default function Categories() {
  const [Categories, setCategories] = useState(null)

  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({ data }) => {
      console.log('mydata', data?.data);
      setCategories(data?.data)

    })
      .catch((error) => {
        console.log(error);

      })

  }
  useEffect(() => {
    getAllCategories()

  }, [])


  useEffect(() => {

  }, [])


  return <>

   {Categories?.length > 0 ? <div className="flex flex-wrap">
      {Categories?.map((Cate) => {
        return <div className='group w-1/3 p-4 mt-5'>
          <div className=' border-2 rounded-2xl overflow-hidden  border-slate-200 group-hover:shadow-md group-hover:shadow-green-300 group-hover:scale-[1.03] transition-all duration-500'>
            <div className="overflow-hidden">      <img src={Cate.image} className='w-full h-[300px] scale-[1.4] ' alt="" />
            </div>
            <div className="title">
              <h3 className='text-center text-2xl font-semibold my-5'>
                {Cate.name}

              </h3>
            </div>

          </div>

        </div>
      })}


    </div>
:<Spinner/>}
  </>
}
