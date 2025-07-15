import React, { useEffect ,useState} from 'react'
import style from './CategorySlider.module.css'
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import Slider from 'react-slick';


export default function CategorySlider() {
  const [Categories, setCategories] = useState(null)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  function getAllCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
    setCategories(data?.data)
    
  })
  .catch((error)=>{
    console.log(error);
    
  })

  }
  useEffect(()=>{
    getAllCategories()

  },[])


  return <>
  <div>
    <h2 className='text-2xl font-bold'>Shop all Categories</h2>
    <Slider {...settings}>
      {Categories?.map((cat)=>{return <div><img className='h-[200px] p-2' src={cat.image} alt={cat.name}/>
      <h4 className='text-center'>{cat.name}</h4></div>})}


    </Slider>
  </div>
  
  </>
}
