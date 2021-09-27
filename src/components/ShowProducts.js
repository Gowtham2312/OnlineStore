import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { updateCart } from '../redux-store/cartSlice'
export default function ShowProducts() {

    let { category } = useParams()

    let history = useHistory()
    let dispatch = useDispatch()

    let { register, handleSubmit, formState: { errors } } = useForm()

    let { cartProducts } = useSelector(state => state.cart)
    let cartProduct = JSON.parse(JSON.stringify(cartProducts))

    let isSuccess = JSON.parse(localStorage.getItem('isSuccess'))
    let Success = JSON.parse(localStorage.getItem('Success'))

    let [products, setProducts] = useState([])
    let [data, setdata] = useState()
    let [file, setFile] = useState(null)

    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    function putData(id) {
        setdata(id)
    }

    //adding product to cart
    function addtoCart(prod) {

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

    //Req to delete product
    async function Item(id) {
        let res = await axios.post("/products/delete-product", { id })
        alert("Product deleted")
    }


    //sending the updated-details (form data) of product
    const onFormSubmit = async (prodObj) => {

        prodObj.id = data
        //create formdata obj
        let formData = new FormData();
        //append image to it
        formData.append('photo', file, file.name)
        // append prodObj
        formData.append('prodObj', JSON.stringify(prodObj))
        //HTTP POST
        let response = await axios.post("/products/update-product", formData)
        alert(response.data.message)
        history.push(`/showproducts/${category}`)
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

    //req to view products and add them to state 
    useEffect(async () => {
        let response = await axios.post("/products/view-products", { category })
        let allproducts = response.data;
        setProducts([...allproducts.payload])
    }, [category])

    return (
        <div className='container mt-3'>
            {/* Card */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-2 g-4">
                {
                    // for admin
                    products.map((prod, ind) => {
                        return (
                            <div className='col'>
                                <div class="card h-100 d-flex shadow p-3 bg-white rounded" key={ind}>
                                    <img src={prod.image} className='card-img w-50 h-50 mx-auto mt-2' alt="something" />
                                    <div class="card-body w-100">
                                        <h3 class="card-title ms-2">{prod.productName}</h3>
                                        <h5 className='card-text ms-2'>₹{prod.productPrice}</h5>
                                        <h6 className="card-text ms-1">{prod.productDesc}</h6>
                                    </div>
                                    {
                                        (Success) &&
                                        //for admin 
                                        <div className="d-flex justify-content-between">
                                            <div className = "d-flex">
                                                <button className="btn btn-primary ms-3 mb-1" data-bs-toggle="modal" data-bs-target="#productId" onClick={() => putData(prod.productId)}><i class="far fa-edit"></i></button>
                                                <button className="btn btn-primary ms-2 mb-1" onClick={() => Item(prod.productId)}><i class="fas fa-trash-alt"></i></button>
                                            </div>
                                            <p className="float-end  me-2 mt-1"><b>Id : {prod.productId}</b></p>
                                        </div>
                                    }
                                    {
                                        //for user
                                        (isSuccess === null || isSuccess) && <div className="d-block mx-auto text-center mb-2">
                                            <button className="btn btn-success" onClick={() => addtoCart(prod)}>Add to Cart</button>
                                            <button className="btn me-2" onClick={() => movetoWishlist(prod, ind)}><i class="far fa-heart"></i></button>
                                        </div>
                                    }
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            {/* Modal-for-edit */}
            <div className="modal fade" id="productId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit the Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(onFormSubmit)}>
                                {/* Product ID */}
                                <div className="form-floating mt-4 mb-2 ms-3 me-3 ">
                                    <input type="number"
                                        id="productId"
                                        placeholder="Product Id"
                                        class="form-control"
                                        {...register('productId', { required: true })}
                                    />
                                    <label htmlFor="productId">Product ID</label>
                                </div>

                                <div className="form-floating mb-2 ms-3 me-3">
                                    <input type="text"
                                        id="productName"
                                        placeholder="Product Name"
                                        className="form-control"
                                        {...register('productName', { required: true })} />
                                    <label htmlFor="productName">Product Name</label>
                                </div>
                                <div className="form-floating mb-2 ms-3 me-3">
                                    <input type="number" id="productPrice" placeholder="₹" className="form-control"
                                        {...register('productPrice', { required: true })} />
                                    <label htmlFor="productPrice">Product Price</label>
                                </div>
                                <div className="form-floating mb-2 ms-3 me-3">
                                    <input type="text" id="productDesc" placeholder="Description" className="form-control"
                                        {...register('productDesc', { required: true })} />
                                    <label htmlFor="productDesc">Product description</label>
                                </div>

                                <div class="form-floating mb-3 mt-3 ms-3">
                                    <input type="file" class="form-control-file" id="photo" name="photo" onChange={onFileSelect} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button type="submit" class="btn btn-primary me-3">Save changes</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    <div>
                                        <button type="reset" class="btn btn-primary"><i class="fas fa-sync-alt"></i></button>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            {/* exit modal */}



            {/* for user */}

        </div >
    )
}
