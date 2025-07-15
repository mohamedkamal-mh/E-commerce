import { createContext, useEffect, useState } from "react";
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import toast from "react-hot-toast";


export let wishListContext = createContext(0)

export default function WishListContextProvider(props) {
    const [WishArray, setWishArray] = useState([])


    let headers = { token: localStorage.getItem("Token") }

    function GetWish() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers }).then((response) => {
            console.log(response.data.data);
            setWishArray(response?.data.data)
            return response 
        })
            .catch((error) => {
                console.log(error);
                return error
            })
    }
    function AddToWish(prodId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: prodId }, { headers }).then((response) => {
            console.log(response?.data);
            if (response.data.status === 'success') {
                toast.success(response.data.message)
            setWishArray(response?.data?.data)
            }

            return response
        })
            .catch((error) => {
                return error
            })
    }

    function DeleteItemFromWish(prodId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, { headers }).then((response) => {
            console.log(response?.data?.data);
            return response
        })
            .catch((error) => {
                return error
            })

    }
    useEffect(()=>{
        
    },[])


    return <wishListContext.Provider value={{ AddToWish, DeleteItemFromWish ,GetWish ,WishArray}}>
        {props.children}
    </wishListContext.Provider>



}
