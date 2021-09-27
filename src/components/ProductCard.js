import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../redux-store/cartSlice'

export default function ProductCard() {

    let [products, setProduct] = useState([])

    let dispatch = useDispatch()
    
    let { cartProducts } = useSelector(state => state.cart)
    let cartProduct = JSON.parse(JSON.stringify(cartProducts))

    let isSuccess = JSON.parse(localStorage.getItem('isSuccess'))

    //ADD to cart
    async function Item(prod) {

        let check = JSON.parse(localStorage.getItem("cartdata"))

        let cartdata = []    
        var item = null
        var index = null

        check.forEach((element,ind) => {
            if(prod.productId === element.productId){
                item = element
                index  = ind
            }
        });

        //if localStorage is null
        if (check === null) {
            cartdata.push(prod)
            dispatch(updateCart(cartdata))
            await axios.post("/users/update-cartdata",{cartdata})
            localStorage.setItem("cartdata", JSON.stringify(cartdata))

        }
        else if(item !== null) {
            
            item.pcount = item.pcount + 1

            check.splice(index,1,item)
            dispatch(updateCart(check))
            //replacing cartdata array in localstorage with updated array(check)
            localStorage.setItem("cartdata", JSON.stringify(check))
        }
        else{
            check.push(prod)
            dispatch(updateCart(check))
            //replacing cartdata array in localstorage with updated array(check)
            localStorage.setItem("cartdata", JSON.stringify(check))
        }
    }

    //moving to wishlist
    function movetoWishlist(prod , index) {

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
        let response = await axios.get("/products/get-products")
        let allproducts = response.data;
        setProduct([...allproducts.payload])
    }, [])

    return (
        <div className="container mt-3 mb-5">
            <h3 className="text-center mt-4 mb-2">Checkout these <span className="text-success">Fresh</span> Products</h3>
            {/* Card */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4  mt-3 mb-3">
                {
                    products.filter((prods) => (prods.productId <= 110)).map((prod, ind) => {
                        return (
                            <div className='col'>
                                <div class="card h-100 d-flex shadow p-3 bg-white rounded" key={ind}>
                                    <img src={prod.image} className='card-img w-50 h-50 mx-auto mt-2' alt="something" />
                                    <div class="card-body w-100">
                                        <h3 class="card-title ms-2">{prod.productName}</h3>
                                        <h5 className='card-text ms-2'>₹ {prod.productPrice}</h5>
                                    </div>
                                    <div className="d-flex ">
                                        <button className="btn btn-success ms-2 mb-1" onClick={() => Item(prod)}>Add to Cart</button>
                                        <button className="btn ms-3 mb-1" onClick={() => movetoWishlist(prod,ind)}><i class="far fa-heart"></i></button>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}
