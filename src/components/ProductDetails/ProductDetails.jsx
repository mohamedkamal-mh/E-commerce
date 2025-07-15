import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import axios from "./../../../node_modules/axios/dist/esm/axios";
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Slider from "react-slick";



export default function ProductDetails() {
  let { id, category } = useParams()
  const [ProductDetails, setProductDetails] = useState(null)
  const [relatedDetails, setrelatedDetails] = useState(null)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({ data }) => {
      console.log(data.data);

      setProductDetails(data?.data)
    })
      .then((error) => {
        console.log(error);

      })
  }
  function RelatedProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({ data }) => {
      console.log(data?.data);
      let related = data?.data.filter((prod) => { return prod.category.name === category })
      console.log('RELATED', related);
      setrelatedDetails(related)



    })
  }

  useEffect(() => {
    getProductDetails()
    RelatedProducts()

  }, [id])


  return <>
    {ProductDetails ? <div className="flex flex-wrap items-center">
      <div className="w-full md:w-1/4 p-4">
        <Slider {...settings}>
          {ProductDetails?.images.map((src) => {
            return <img src={src} className='w-full ' alt="" />
          })}
        </Slider>

      </div>
      <div className="w-full md:w-3/4 p-3">
        <h3 className='text-3xl font-bold text-black my-2'>{ProductDetails.title}</h3>
        <h4 className='text-xl  text-slate-400 my-2'>{ProductDetails.description}</h4>
        <h4 className='text-xl  text-green-400 my-2'>{ProductDetails.brand.name}</h4>
        <div className="price flex felx-wrap justify-between items-center my-4">
          <h4 className='text-lg font-bold'>{ProductDetails.price} EGP</h4>
          <span><i className='fas fa-star text-green-600 '></i> {ProductDetails.ratingsAverage}</span>
        </div>
        <div><button className='w-full text-center text-2xl bg-green-600 rounded-xl text-white p-1 mt-2 '>Add to Cart</button></div>

      </div>

    </div> : <Spinner />}
    <div>
      <h2 className='my-11 text-3xl text-green-600 font-bold ms-10'>Related Products</h2>
      <div className="flex flex-wrap">
        {relatedDetails?.map((prod) => {
          return <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 gap-y-3">
            <div className="product p-3">
              <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
                <img src={prod.imageCover} className='w-full' alt="" />
                <h2 className='text-green-600 text-xl'>{prod.category.name}</h2>
                <h4 className='text-lg font-bold'>{prod.title.split(' ').slice(0, 2).join(' ')}</h4>
                <div className="price flex felx-wrap justify-between items-center ">
                  <h4 className='text-lg font-bold'>{prod.price} EGP</h4>
                  <span><i className='fas fa-star text-green-600 '></i> {prod.ratingsAverage}</span>
                </div>
              </Link>
              <div><button className='w-full text-center text-2xl bg-green-600 rounded-xl text-white p-1 mt-2 '>Add to Cart</button></div>

            </div>
          </div>
        }
        )}

      </div>
    </div>
  </>
}
