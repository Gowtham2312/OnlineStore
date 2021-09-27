import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserLoginStatus, userLogin } from '../redux-store/userSlice'
import { updateCart, updateWishlist } from '../redux-store/cartSlice'
import { updateImage, updateName } from '../redux-store/editSlice'

export default function UserLogin() {
    let { register, handleSubmit, formState: { errors } } = useForm()

    let { userObj, isSuccess, isError, isLoading, invalidLoginMessage } = useSelector(state => state.user)

    let dispatch = useDispatch(clearUserLoginStatus)

    let history = useHistory()


    function onLoginFormSubmit(userObj) {
        dispatch(userLogin(userObj))
    }

    useEffect(() => {
        if (isSuccess) {

            localStorage.setItem("isSuccess", JSON.stringify(isSuccess))
            localStorage.setItem("userdata", JSON.stringify(userObj))

            //username for showing in Navbar and other purposes 
            let username = userObj.username
            dispatch(updateName(username))
            localStorage.setItem("username", JSON.stringify(username))

            //username for showing in Navbar and other purposes 
            let profilepic = userObj.profilepic
            dispatch(updateImage(profilepic))
            localStorage.setItem("profilepic", JSON.stringify(profilepic))

            // adding wishlist from backend to "localStorage" and "redux"
            let wishlist = userObj.wishlist

            dispatch(updateWishlist(wishlist))
            localStorage.setItem("wishlistData", JSON.stringify(wishlist))

            //fetching the items when user is not logged-in
            let cartitems = JSON.parse(localStorage.getItem("cartdata"))

            let cart = userObj.cart

            let usercartdata = cart

            let cartdata = []
            if (usercartdata[0] === undefined && cartitems[0] === undefined) {

                cartdata = []
            }

            else if (cartitems[0] === undefined && usercartdata[0] !== undefined) {
                cartdata = usercartdata
                dispatch(updateCart(cartdata))
                localStorage.setItem("cartdata", JSON.stringify(cartdata))
                console.log("cartdata-1", cartdata)
            }

            else if (cartitems[0] !== undefined && usercartdata[0] === undefined) {
                cartdata = cartitems
                dispatch(updateCart(cartdata))
                localStorage.setItem("cartdata", JSON.stringify(cartdata))
                console.log("cartdata-2", cartdata)
            }
            else {
                cartdata = cartitems.concat(usercartdata)
                dispatch(updateCart(cartdata))
                localStorage.setItem("cartdata", JSON.stringify(cartdata))
                console.log("cartdata-4", cartdata)
            }

            console.log("isUSccess : ", isSuccess)
            history.push("/homepage")
        }
    }, [isSuccess])

    return (
        <div className="row mt-5">
            <h1 className="text-center mb-3">Login</h1>
            <form class="col-10 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onLoginFormSubmit)}>
                {invalidLoginMessage && <h1 className="text-center text-danger">{invalidLoginMessage}</h1>}

                <div className="form-floating mb-3">
                    <input className="form-control" type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        {...register('username', { required: true })}
                    />
                    <label for="name">Username</label>
                </div>
                {errors.username?.type === 'required' && <p class="alert alert-danger">*Username is required</p>}

                <div className="form-floating mb-3">
                    <input className="form-control" type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        {...register('password', { required: true })}
                    />
                    <label for="password">Password</label>
                </div>
                {errors.password?.type === 'required' && <p class="alert alert-danger">*Password is required</p>}

                <div>
                    <button type="submit" class="btn btn-success w-25 d-block mx-auto">Submit</button>
                </div>

            </form>

        </div>
    )
}
