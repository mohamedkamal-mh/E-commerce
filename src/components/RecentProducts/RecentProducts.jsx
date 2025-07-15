import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../Context/WishListContext';

export default function RecentProducts() {



  let { AddToCart } = useContext(CartContext)
  let { AddToWish ,GetWish ,WishArray} = useContext(wishListContext)
  const [allProducts, setallProducts] = useState(null)

  async function addProdToCart(prodId) {
    let response = await AddToCart(prodId)
    if (response.data.status === 'success') {
      toast.success(response?.data.message, {
        position: 'top-right'
      })
    }



  }
  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({ data }) => {
      setallProducts(data?.data);



    })
      .catch((error) => {
        console.log(error);


      })
  }
  async function AddItemToWish(prodId) {
    let response = await AddToWish(prodId)
    console.log(response);
    if (response?.data?.status === 'success') {
    await GetWish(); 
  }

  }

  useEffect(() => {

    getAllProducts()
    

  }, [])


  return <>
    {allProducts?.length > 0 ? <div className='flex flex-wrap'>

      {allProducts?.map((prod) => {return <div key={prod.id} className=" w-full md:w-1/3 lg:w-1/4 xl:w-1/4 gap-y-3 p-4 overflow-hidden  mt-10">
          <div className=" group p-4 hover:shadow-md hover:shadow-green-700 relative mb-5  ">
            <Link to={`productdetails/${prod.id}/${prod.category.name}`}>
              <img src={prod.imageCover} className='w-full' alt="" />
              <div className='flex flex-wrap items-center justify-between mt-5 '><h2 className='text-green-600 text-xl'>{prod.category.name} </h2>

              </div>
              <h4 className='text-md '>{prod.title.split(' ').slice(0, 2).join(' ')}</h4>
              <div className="price flex felx-wrap justify-between items-center mb-12">
                <h4 className='text-lg '>{prod.price} EGP</h4>
                <span><i className='fas fa-star text-yellow-600 '></i> {prod.ratingsAverage}</span>
              </div>
            </Link>
            <button onClick={() => { addProdToCart(prod._id) }} className=' w-3/4 mybtn text-center text-2xl bg-green-600 rounded-xl text-white p-1 mt-2 absolute bottom-[-50px]   opacity-0 group-hover:bottom-4 group-hover:opacity-100 transition-all duration-300  left-1/2 -translate-x-1/2 '>Add to Cart</button>
            <button onClick={() => { AddItemToWish(prod._id) }} className='cursor-pointer absolute top-10 end-4'>  <i
              className={`fa-solid fa-heart text-2xl ${WishArray.includes(prod._id) ? 'text-red-600' : 'text-slate-900'
                }`}
            ></i>
            </button>
          </div>

        </div>
        console.log('prod._id')

      })}
    </div> : <Spinner />}
  </>
}
