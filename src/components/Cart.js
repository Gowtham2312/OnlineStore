import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { updateCart, updateWishlist } from '../redux-store/cartSlice'
import { useHistory } from 'react-router'

export default function Cart() {

    let { cartProducts } = useSelector(state => state.cart)

    let cartProduct = JSON.parse(JSON.stringify(cartProducts))

    let isSuccess = JSON.parse(localStorage.getItem('isSuccess'))

    let dispatch = useDispatch()
    let history = useHistory()

    //Order summary
    let i = 0, value = 0, dis = 0, total = 0, orderid = 0

    orderid = Math.round(Math.random() * 100) + 1000;

    cartProduct.map((prod) => {
        i = i + ((+prod.productPrice) * (prod.pcount))
    })

    if (i >= 700) {
        value = 0.85
        dis = 15
        total = Math.floor(i * value)
    }
    else {
        value = 0.9
        dis = 10
        total = Math.floor(i * value)
    }
    //

    function decQuantity(ind) {

        let prod = cartProduct[ind]
        prod.pcount = prod.pcount - 1
        if (prod.pcount <= 0) {
            prod.pcount = 1
        }
        else {
            cartProduct.splice(ind, 1, prod)
            dispatch(updateCart(cartProduct))
        }
        // console.log("newCart dec",newCart)

    }

    function incQuantity(ind) {

        let prod = cartProduct[ind]
        prod.pcount = prod.pcount + 1

        cartProduct.splice(ind, 1, prod)
        dispatch(updateCart(cartProduct))

        // console.log("newCart dec",newCart)
    }


    //remove an item
    function removeItem(index) {

        cartProduct.splice(index, 1)

        dispatch(updateCart(cartProduct))
        // localStorage.setItem("cartdata", JSON.stringify(cartitems))
        localStorage.setItem("cartdata", JSON.stringify(cartProduct))
    }

    //Add item to cart 
    function addtoWishlist(index, prod) {

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

    async function Checkout() {
        if (isSuccess === true) {
            if (cartProduct.length === 0) {
                alert("Please add some products to ur cart")
            }
            else {
                let name = JSON.parse(localStorage.getItem("username"))
                let obj = { orderID: orderid, status: "successful", orderdata: cartProduct, price: total }
                localStorage.setItem("orderdata", JSON.stringify(obj))
                let Obj = { name, obj }
                let res = await axios.post("/users/update-orderhistory", { Obj })
                let data = res.data
            }
        }
        else {
            alert("please sign-In")
        }
    }

    function gotoInvoice() {
        history.push("/invoice")
    }


    useEffect(async () => {
        let cartdata = JSON.parse(localStorage.getItem("cartdata"))
        dispatch(updateCart(cartdata))
    }, [isSuccess])

    return (
        <div className="container">

            <div className="row d-flex">
                {
                    (cartProduct.length === 0) &&
                    <div>
                        <h1 className='text-center mt-5'>Oops your cart is empty</h1>
                    </div>
                }
                {/* Cart items */}
                <div className="col-8 mt-4">
                    {
                        (cartProduct.length !== 0) &&

                        cartProduct.map((prod, ind) => {
                            return (
                                <div className='card mt-3 shadow p-3 bg-white rounded' key={ind}>
                                    <div className="row">
                                        <div className="col-4 col-md-6">
                                            <img src={prod.image} className='ms-2 mt-2 cartimg' alt="something" />
                                        </div>
                                        <div className="col-8 col-md-6">
                                            <div class="card-body w-100">
                                                <h3 class="card-title ms-2">{prod.productName}</h3>
                                                <h5 className='card-text ms-2'>₹ {prod.productPrice}</h5>


                                                <button className="btn" onClick={() => decQuantity(ind)}>-</button>{prod.pcount}<button className="btn" title="incrementBtn" onClick={() => incQuantity(ind)}>+</button>
                                            </div>

                                            <div className="d-flex">
                                                <button className="btn btn-primary ms-2 mb-1" onClick={() => removeItem(ind)}>Remove</button>
                                                <button className="btn btn-danger ms-2 mb-1" onClick={() => addtoWishlist(ind, prod)}>Add to Wishlist</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Order Summary */}
                {
                    (cartProduct.length !== 0) &&
                    <div className="col-4 mt-5 " >
                        <div class="card">
                            <div class="card-header text-center bg-dark text-white">
                                Cart summary
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">No. of Items : {cartProduct.length}</li>
                                <li class="list-group-item">Sub-Total :{i}</li>
                                <li class="list-group-item">Discount : {dis}%</li>
                                <li className="list-group-item">Total Price : {i * value}</li>
                            </ul>
                        </div>
                        <button className="btn btn-primary d-block m-auto mt-2" onClick={() => Checkout()} data-bs-toggle="modal" data-bs-target="#example">Checkout</button>
                    </div>
                }
            </div>

            {/* modal for invoice */}
            {
                (isSuccess === true) && 
                <div class="modal fade" id="example" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <h3 className='text-center'>Yay.. Order placed</h3>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary d-block mx-auto" onClick={() => gotoInvoice()}>Check Invoice</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

