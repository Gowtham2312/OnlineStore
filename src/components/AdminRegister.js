
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
export default function AdminRegister() {

    let {register, handleSubmit, formState: { errors }} = useForm()

    let [ value , setValue ] = useState(false)

    const onRegisterFormSubmit = async (adminObj) => {
        
        let responseObj = await axios.post("/admin/adminregister", adminObj)

        let payload = responseObj.data;

         if(payload.message === "Admin got added")
         {
            setValue(true)
         }
         else
         {
            //  setUserRegistrationStatus("Username has already taken")
             alert("Adminname has already taken")
         }
    }
    
    return (
        <div class="row mt-5">
            <h1 class="text-center mb-3">Admin-Registration</h1>
            {
               (value) && <h3 className="text-center text-success">Registration Successful <i class="far fa-check-circle"></i></h3>
            }
            <form class="col-10 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onRegisterFormSubmit)}>

                {/* username */}
                <div class="form-floating mb-4">
                    <input type="text"
                           class='form-control'
                           id="adminname"
                           placeholder="Admin Name"
                           {...register('adminname', { required: true })} />
                           <label for="adminname">Admin-Name</label>
                </div>
                {errors.adminname?.type === 'required' && <p class="alert alert-danger">*AdminName is required</p>}

                {/* email */}
                <div class="form-floating mb-4">
                    <input type="email"
                           class='form-control'
                           id="email"
                           placeholder="Stan@gmail.com"
                           {...register('email', { required: true })} />
                           <label for="email">Email</label>
                </div>
                {errors.email?.type === 'required' && <p class="alert alert-danger">*Email is required</p>}

                {/* passowrd */}
               <div class="form-floating mb-4">
                    <input type="password"
                           class='form-control'
                           id="password"
                           placeholder="Password"
                           {...register('password', { required: true })} />
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



