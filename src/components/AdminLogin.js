import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { clearAdminLoginStatus, adminLogin} from '../redux-store/adminSlice'

export default function AdminLogin() {
    let {register, handleSubmit, formState: {errors}} = useForm()

    let { adminObj,Success, isError ,isLoading, invalidLoginMessage } = useSelector(state => state.admin)

    let dispatch = useDispatch(clearAdminLoginStatus)

    let history = useHistory()

    function onLoginFormSubmit(adminObj)
    {
        dispatch(adminLogin(adminObj))
    }
    useEffect(()=>{
        if(Success)
        {
            localStorage.setItem("isSuccess",JSON.stringify(false))
            localStorage.setItem("Success",JSON.stringify(Success))
            history.push(`/admindashboard/${adminObj.adminname}`)
        }
    },[Success])

    return (
        <div className="row mt-5">
            <h1 className="text-center mb-3">Login</h1>
            <form class="col-10 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onLoginFormSubmit)}>
                {invalidLoginMessage && <h1 className="text-center text-danger">{invalidLoginMessage}</h1>}

                <div className="form-floating mb-3">
                    <input className="form-control" type="text"
                                                     name="adminname" 
                                                     id="adminname" 
                                                     placeholder="AdminName" 
                                                     {...register('adminname', { required: true })}
                                                    />
                    <label for="adminname">Admin-Name</label>
                </div>
                {errors.adminname?.type === 'required' && <p class="alert alert-danger">*AdminName is required</p>}

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
                    <button type="submit" class="btn btn-success w-25 d-block mx-auto mb-4">Submit</button>
                </div>          

            </form>

        </div>
    )
}
