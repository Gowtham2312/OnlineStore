import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart, updateWishlist } from '../redux-store/cartSlice';

export default function Wishlist() {

    let { userWishlist } = useSelector(state => state.cart)

    let userwishList = JSON.parse(JSON.stringify(userWishlist))

    let dispatch = useDispatch()

    let isSuccess = JSON.parse(localStorage.getItem("isSuccess"))


    function removeItem(index) {

        userwishList.splice(index, 1)

        dispatch(updateWishlist(userwishList))

        localStorage.setItem("wishlistData", JSON.stringify(userwishList))
    }

    //ADD item to cart 
    function addtoCart(prod,index) {
        //first removing from  wishlist
        userwishList.splice(index, 1)

        dispatch(updateWishlist(userwishList))
        localStorage.setItem("wishlistData", JSON.stringify(userwishList))
        

        //now adding to cart
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
     
        if (item !== null) {

            item.pcount = item.pcount + 1

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

    useEffect(() => {

        let wishlistData = JSON.parse(localStorage.getItem("wishlistData"))
        dispatch(updateWishlist(wishlistData))

    }, [])

    return (
        <div className="container bg-container">
            <h1 className="text-center mt-5 mb-3">Wishlist</h1>
            {

                (isSuccess !== null || isSuccess === false) ?

                    (userwishList.length !== 0) ?
                        userwishList.map((prod, ind) => {
                            return (
                                <div className='card  mt-2 shadow p-3 bg-white rounded' key={ind}>
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-sm-2">
                                        <div className="col">
                                            <img src={prod.image} className=' ms-5 m-auto  cartimg' alt="something" />
                                        </div>
                                        <div className="col">
                                            <div class="card-body">
                                                <div className='row row-cols-md-2 row-cols-sm-1 row-cols-1 d-flex flex-md-wrap'>

                                                    <div className="col">
                                                        <h3 class="card-title ms-2">{prod.productName}</h3>
                                                        <h5 className='card-text ms-2'>₹ {prod.productPrice}</h5>
                                                    </div>
                                                    <div className="col mt-2 ">
                                                        <button className="btn ms-2 mb-1" title="delete" onClick={() => removeItem(ind)}><i class="far fa-trash-alt fa-2x"></i></button>
                                                        <button className="btn ms-2 mb-1" title="add to cart" onClick={() => addtoCart(prod, ind)}><i class="fas fa-shopping-bag fa-2x"></i></button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                        :
                        <div className="text-center mt-5">
                            <h1>Your wishlist is Empty</h1>
                        </div>

                        :

                        <div >
                            <h3 className="text-center text-dark mt-5">Please Sign-In</h3>
                        </div>

            }
        </div>
    )
}
