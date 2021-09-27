
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
export default function Register() {

    let {register, handleSubmit, formState: { errors }} = useForm()

    let [ value , setValue ] = useState(false)

    let [ file , setFile ] = useState(null)
    let history = useHistory()
    
    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    const onRegisterFormSubmit = async (userObj) => {
        
        //adding cart property
        userObj.cart = []
        userObj.wishlist = []
        let formData = new FormData();

        formData.append("profilephoto", file , file.name)

        formData.append("userObj",JSON.stringify(userObj))

        let responseObj = await axios.post("/users/register", formData)

        let payload = responseObj.data;

         if(payload.message === "User got added")
         {
             //redirect to login
            history.push("/userlogin")
         }
         else
         {
            //  setUserRegistrationStatus("Username has already taken")
            setValue(true)
            
         }
    }
    
    return (
        <div class="row mt-5">
            <h1 class="text-center mb-3">Register</h1>
            {
              (value) && 
              <div>
                  <h3 className="text-center text-info m-3">Username was already taken</h3>
              </div>
            }
            <form class="col-10 col-sm-8 col-md-6 mx-auto" onSubmit={handleSubmit(onRegisterFormSubmit)}>
                
                {/* name */}
                <div class="form-floating mb-4">
                    <input type="text"
                           class='form-control'
                           id="name"
                           placeholder="Name"
                           {...register('name', { required: true })} />
                           <label for="name">Name</label>
                </div>
                {errors.name?.type === 'required' && <p class="alert alert-danger">*Name is required</p>}

                {/* username */}
                <div class="form-floating mb-4">
                    <input type="text"
                           class='form-control'
                           id="username"
                           placeholder="Username@123"
                           {...register('username', { required: true })} />
                           <label for="username">Username</label>
                </div>
                {errors.username?.type === 'required' && <p class="alert alert-danger">*Username is required</p>}

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

                {/* date of birth */}
                <div class="form-floating mb-4">
                    <input type="date"
                           class='form-control'
                           id="dob"
                           placeholder="Name"
                           {...register('dob', { required: true })} />
                           <label for="dob">Date of Birth</label>
                </div>
                {errors.dob?.type === 'required' && <p class="alert alert-danger">*Date-of-birth is required</p>}
                
                {/* address */}
                <div class="form-floating mb-4">
                    <input type="textarea"
                           class='form-control'
                           id="address"
                           placeholder="Address"
                           {...register('address', { required: true })} />
                           <label for="address">Address</label>
                </div>
                {errors.address?.type === 'required' && <p class="alert alert-danger">*Address is required</p>}

                {/* passowrd */}
               <div class="form-floating mb-4">
                    <input type="password"
                           class='form-control'
                           id="password"
                           placeholder="Password"
                           {...register('password', { required: true })} />
                           <label for="password">Password</label>
                </div>
                {errors.pass?.type === 'required' && <p class="alert alert-danger">*Password is required</p>}
                
                {/* Profile Photo */}
                <div class="form-floating mb-3 mt-4 ms-3">
                    <input type='file' className="form-control-file" id="profilephoto" name="profilephoto" onChange={onFileSelect} />
                </div>

                <div className="d-block mx-auto text-center ">
                    <button type="submit"  title="SubmitBtn" class="btn btn-success w-25 me-3">Submit</button>
                    <button type="reset"  class="btn btn-primary"><i class="fas fa-sync-alt"></i></button>
                </div>
            </form>
        </div>
    )
}



