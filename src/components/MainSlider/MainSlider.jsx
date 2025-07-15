import React, { useEffect ,useState} from 'react'
import style from './MainSlider.module.css'
import img1 from'./../../assets/images/slider-image-3.jpeg'
import img2 from'./../../assets/images/slider-image-2.jpeg'
import img3 from'./../../assets/images/slider-image-1.jpeg'
import img4 from'./../../assets/images/grocery-banner-2.jpeg'
import img5 from'./../../assets/images/slider-2.jpeg'
import Slider from 'react-slick'
export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  const [counter, setcounter] = useState(0)

  useEffect(()=>{

  },[])


  return <>
    <div className='flex flex-wrap'>
      <div className="w-3/4">
      <Slider {...settings}>
        <img className='h-[400px] ' src={img1} alt="" />
        <img className='h-[400px] ' src={img2} alt="" />
        <img className='h-[400px] ' src={img3} alt="" />
      </Slider>
      </div>
      <div className="w-1/4">
      <img className='h-[200px]' src={img4} alt="" />
      <img className='h-[200px]' src={img5} alt="" />
      </div>
    </div>
  
  </>
}
