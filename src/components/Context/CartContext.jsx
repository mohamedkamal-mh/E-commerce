import { createContext, useEffect, useState } from "react";
import axios, { all } from "./../../../node_modules/axios/dist/esm/axios";
import toast from "react-hot-toast";

export let CartContext = createContext(0)

export default function CartContextProvider(props) {
    const [products, setproducts] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [cartId, setcartId] = useState(null)
    let token = localStorage.getItem('Token');
    let headers = {
        token: localStorage.getItem('Token')
    }
function resetCart(){
    setcartId(null)
    setnumOfCartItems(0)
    setproducts(null)
    settotalPrice(0)
}

    function AddToCart(prodId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: prodId }, { headers }).then((response) => {
            getUserCartItem()
            return response
        })
            .catch((error) => {
                return error
            })
    }

    function getUserCartItem() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((response) => {
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data.products)
            settotalPrice(response?.data?.data.totalCartPrice)

        })
            .catch((error) => {
                console.log(error);

            })
    }
    
    useEffect(() => {
        if (token) {
            getUserCartItem()

        }

    }, [token])

    function updateCart(prodId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, { count: count }, { headers }).then((response) => {
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data.products)
            settotalPrice(response?.data?.data.totalCartPrice)

            return response
        })
            .catch((error) => {
                return error
            })
    }
    function deleteCartitem(prodId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, { headers }).then((response) => {
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data.products)
            settotalPrice(response?.data?.data.totalCartPrice)
            if (response.data.status === 'success') {
                toast.success('Product Deleted', { position: "top-right" })

            }
            else {
                toast.error('error.........')
            }

            return response
        })
            .catch((error) => {
                return error
            })
    }

    return <CartContext.Provider value={{ AddToCart, numOfCartItems, products, totalPrice, cartId, updateCart, deleteCartitem, setnumOfCartItems, settotalPrice, setproducts , resetCart}}>

        {props.children}
    </CartContext.Provider>

}


