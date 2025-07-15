import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UsercontextProvider from './components/Context/Usercontext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/Context/CartContext';
import WishListContextProvider from './components/Context/WishListContext';
import toast, { Toaster } from 'react-hot-toast';
import WishList from './components/WishList/WishList';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import CodeConfirm from './components/CodeConfirm/CodeConfirm';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';



let route = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
      { path: 'wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },
      { path: 'checkout', element: <ProtectRoute><CheckOut/></ProtectRoute> },
      { path: 'allorders', element: <ProtectRoute><AllOrders/></ProtectRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'codeconfirm', element: <CodeConfirm /> },
      { path: 'updatepassword', element: <UpdatePassword /> },
      { path: '*', element: <Login/> },
    ]
  }
])


function App() {


  return (

    <>
      <UsercontextProvider>
        <WishListContextProvider>

          <CartContextProvider>

            <RouterProvider router={route}></RouterProvider>
            <Toaster />

          </CartContextProvider>
        </WishListContextProvider>

      </UsercontextProvider>

    </>
  )
}

export default App
