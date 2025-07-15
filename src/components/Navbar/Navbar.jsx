import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/Usercontext'
import { CartContext } from '../Context/CartContext'

export default function Navbar() {
  let { numOfCartItems } = useContext(CartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let navigate = useNavigate()
  let { userLogin, setuserLogin } = useContext(UserContext)
  const [counter, setcounter] = useState(0)
  function Logout() {
    localStorage.removeItem('Token')
    setuserLogin(null)
    navigate('/login')
  }


  useEffect(() => {

  }, [])


  return (
    <>
      <nav className='bg-slate-200 static lg:fixed top-0 start-0 end-0 p-1 z-10'>
        <div className="container m-auto flex flex-col md:flex-row justify-between items-center">
          <div className="logo flex justify-between w-full md:w-auto items-center">
            <img src={logo} className='w-50' alt="Logo" />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-green-700">
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* Links menu */}
          <div className={`w-full md:flex md:items-center md:justify-center ${isMenuOpen ? "block" : "hidden"}`}>
            <ul className='flex flex-col md:flex-row items-center justify-center'>
              {userLogin !== null && <>
                <li className='py-2 mx-2 text-xl '><NavLink to='/'>Home</NavLink></li>
                <li className='py-2 mx-2 text-xl'><NavLink to='/products'>Products</NavLink></li>
                <li className='py-2 mx-2 text-xl'><NavLink to='/brands'>Brands</NavLink></li>
                <li className='py-2 mx-2 text-xl'><NavLink to='/categories'>Categories</NavLink></li>
                <li className='py-2 mx-2 text-xl'><NavLink to='/wishlist'>Wishlist</NavLink></li>
                <li className='py-2 mx-2 text-xl relative'>
                  <NavLink to='/cart'>Cart
                    <span className="absolute bottom-5 -end-5  bg-green-500 text-white rounded-full px-2 text-xl">{numOfCartItems}</span>
                  </NavLink>
                </li>
              </>}
            </ul>
          </div>

          {/* Login/Logout & Social */}
          <div className={`md:flex md:items-center ${isMenuOpen ? "block" : "hidden"}`}>
            <ul className='flex flex-col md:flex-row items-center'>
              {userLogin === null ? (
                <>
                  <li><NavLink to='/login' className='py-2 mx-2'>Login</NavLink></li>
                  <li><NavLink to='/register' className='py-2 mx-2'>Register</NavLink></li>
                </>
              ) : (
                <li onClick={Logout}><span className='py-2 mx-2 cursor-pointer text-xl'>Logout</span></li>
              )}
              <li className='flex py-2 mx-2 gap-2'>
                <i className='fab fa-facebook text-blue-700'></i>
                <i className='fab fa-youtube text-red-700'></i>
                <i className='fab fa-twitter text-blue-500'></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
