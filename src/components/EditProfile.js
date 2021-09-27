import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import getAxiosWithTokenObj from '../AuthorizedRequest/AxiosRequestWithToken'
import { useDispatch } from 'react-redux'
import { updateImage, updateName } from '../redux-store/editSlice'
import { useHistory } from 'react-router'

export default function EditProfile() {


    let axiosReqWithToken = getAxiosWithTokenObj() 
    
    let userdata = JSON.parse(localStorage.getItem("userdata"))

    let dispatch = useDispatch()
    let history = useHistory()

    let profileimage = JSON.parse(localStorage.getItem("profilepic"))

    let { register, handleSubmit, formState: { errors } } = useForm()

    let [data, setData] = useState([])

    let [value, setValue] = useState(false) //for checking  username existence

    let [updated, setUpdated] = useState(false) //for informing profie image updated

    let [file, setFile] = useState(null)

    const onFileSelect = (e) => {
        setFile(e.target.files[0])
        setUpdated(true)
    }

    const onUpdatedFormSubmit = async (userobj) => {

        var forEditname = userobj.username
        //checking for username existence
        let name = (userobj.username).toLowerCase()
        data.map((users) => {
            if ((users.username).toLowerCase() === name) {
                alert("Username already exists")
            }
            else {
                setValue(true)
            }
        })
        
        if (value) {

            let usernam = JSON.parse(localStorage.getItem("username"))
            //sending already logged in user details
            userobj.usernam = usernam
            //create formdata obj
            let formData = new FormData();
            //append image to it
            formData.append('profilephoto', file, file.name)
            // append prodObj
            formData.append('userobj', JSON.stringify(userobj))
            //HTTP POST
            let response = await axiosReqWithToken.post("/users/update-userdata", formData)

            if(response.data.message === "User got updated"){
                alert(response.data.message)
                localStorage.setItem("username",JSON.stringify(userobj.username))
                dispatch(updateName(forEditname))
              
                let editResp = await axios.post("/users/get-one-user", {forEditname})
               
                let editeduserdata = editResp.data.payload
                dispatch(updateImage(editeduserdata.profilepic))
                localStorage.setItem("profilepic",JSON.stringify(editeduserdata.profilepic))
            }
            if(response.data.message === "Unauthorized request..Please login to continue.." || response.data.message==="Session expired..Relogin to continue."){
                alert(response.data.message)
                localStorage.clear()
                history.push('/')
            }
        }
    }
;
    useEffect(async () => {
        let result = await axios.get("/users/get-users")
        setData([...result.data.payload])
    }, [])
    return (
        <div className="container">
            <h1 className='text-center mt-4 mb-4'> Edit Profile</h1>
            <form class="w-50 mx-auto" onSubmit={handleSubmit(onUpdatedFormSubmit)}>

                {/* Profile Photo */}
                <div class="image-upload d-flex justify-content-center">

                    <label for="profilephoto">

                        <img src={profileimage} width="140px" height="140px" className="rounded-circle" />

                        <div class="notify-badge"><img src="https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png" className="d-block mx-auto" width="18px" height="18px" /></div>
                    </label>

                    <input type='file' id="profilephoto" name="profilephoto" onChange={onFileSelect} />

                </div>
                {
                    (updated) && <h5 className="text-center text-success">Image updated</h5>
                }

                {/* name */}
                <div class="form-floating mb-4">
                    <input type="text"
                        class='form-control'
                        id="name"
                        {...register('name', { required: true })} />
                    <label for="name">Name</label>
                </div>

                {/* username */}
                <div class="form-floating mb-4">
                    <input type="text"
                        class='form-control'
                        id="username"
                        {...register('username', { required: true })} />
                    <label for="username">Username</label>
                </div>

                {/* date of birth */}
                <div class="form-floating mb-4">
                    <input type="date"
                        class='form-control'
                        id="dob"
                        {...register('dob', { required: true })} />
                    <label for="dob">Date of Birth</label>
                </div>

                {/* address */}
                <div class="form-floating mb-4">
                    <input type="textarea"
                        class='form-control'
                        id="address"
                        {...register('address', { required: true })} />
                    <label for="address">Address</label>
                </div>

                <div className="d-block mx-auto text-center">

                    <button type="submit" className="btn btn-success  ms-3 mb-1" ><i class="far fa-edit"></i></button>
                    <button type="reset" className="btn btn-success ms-2 mb-1"><i class="fas fa-sync-alt"></i></button>
                </div>
            </form>

        </div>
    )
}
