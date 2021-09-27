import React from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { updateCart } from '../redux-store/cartSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function SingleProduct() {

    let { daata } = useParams()
    let [product, setProduct] = useState([])
    let [value, setValue] = useState(false)

    const dispatch = useDispatch()
    let { cartProducts } = useSelector(state => state.cart)
    let cartProduct = JSON.parse(JSON.stringify(cartProducts))

    let isSuccess = JSON.parse(localStorage.getItem("isSuccess"))

    //ADD to cart
    function Item(prod) {

        let check = JSON.parse(localStorage.getItem("cartdata"))

        let cartdata = []

        var item = null
        var index = null
        check.forEach((element, ind) => {
            if (prod.productId === element.productId) {
                item = element
                index = ind
            }
        });

        console.log("value in cart data is ", item, index)

        //if localStorage is null
        if (check === null) {
            cartdata.push(prod)
            dispatch(updateCart(cartdata))
            localStorage.setItem("cartdata", JSON.stringify(cartdata))

        }
        else if (item !== null) {

            item.pcount = item.pcount + 1

            console.log("item value is ", item)
            check.splice(index, 1, item)
            dispatch(updateCart(check))
            //replacing cartdata array in localstorage with updated array(check)
            localStorage.setItem("cartdata", JSON.stringify(check))
        }
        else {
            check.push(prod)
            dispatch(updateCart(check))
            //replacing cartdata array in localstorage with updated array(check)
            localStorage.setItem("cartdata", JSON.stringify(check))
        }
    }

    //moving to wishlist
    function movetoWishlist(prod, index) {

        if (isSuccess) {

            cartProduct.splice(index, 1)
            dispatch(updateCart(cartProduct))
            localStorage.setItem("cartdata", JSON.stringify(cartProduct))

            let wishlist = JSON.parse(localStorage.getItem("wishlistData"))
            wishlist.push(prod)
            localStorage.setItem("wishlistData", JSON.stringify(wishlist))

        }
        else {
            alert("Please Sign-In")
        }
    }

    useEffect(async () => {
        let response = await axios.post("/products/view-one-product", { daata })
        let allproducts = response.data;
        console.log("allproducts.payload", allproducts.payload)
        if ((allproducts.payload).length === 0) {
            setValue(true)
        }
        else {
            setValue(false)
            setProduct([...allproducts.payload])
        }
    }, [daata])

    return (
        <div>
            {
                (value) ?
                    <div>
                        <h2 className="text-center text-info mt-5">Oops...{daata} in unavailable</h2>
                    </div>
                    :
                    // for admin
                    product.map((prod, ind) => {
                        return (
                            <div className="d-block mx-auto">
                                <h2 className="ms-3 mb-3 mt-3">Searched for {daata} </h2>
                                <div class="card h-100 d-flex ms-5 me-5 w-75 shadow p-3 bg-white rounded" key={ind}>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <img src={prod.image} className='my-auto cartimg' alt="something" />
                                        </div>
                                        <div className="col-8">
                                            <div class="card-body w-100">
                                                <h3 class="card-title ms-2">{prod.productName}</h3>
                                                <h5 className='card-text ms-2'>₹ {prod.productPrice}</h5>
                                                <h6 className="card-text ms-1">{prod.productDesc}</h6>
                                            </div>
                                            <div className="d-flex">
                                                <button className="btn  ms-2 mb-1" onClick={() => Item(prod)}><i class="fas fa-shopping-bag fa-2x"></i></button>
                                                <button className="btn  ms-2 mb-1" onClick={() => movetoWishlist(prod, ind)}><i class="far fa-heart"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}
