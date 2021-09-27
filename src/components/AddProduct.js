import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

export default function AddProducts() {
    let { register, handleSubmit, formState: { errors } } = useForm()

    let [file, setFile] = useState(null)
    let history = useHistory()

    const onFileSelect = (e) => {
        setFile(e.target.files[0])
    }

    const onFormSubmit = async (prodObj) => {
        
        let forsearch = prodObj.productName.toLowerCase()

        prodObj.forsearch = forsearch

        //product count
        prodObj.pcount = 1

        //for converting and appending the data(prodobj) in json format 
        //create formdata obj
        let formData = new FormData();
        //append image to it
        formData.append('photo', file, file.name)
        // append prodObj
        formData.append('prodObj', JSON.stringify(prodObj))
        //HTTP POST
        let response = await axios.post("/products/add-products", formData)
        alert(response.data.message)
        history.push("/admindashboard/admin/add-products")
        console.log("After product creation", response.data)
    }

    return (
        <div className="d-block center">
            <form onSubmit={handleSubmit(onFormSubmit)}>

                {/* Product Category */}
                <div className="mb-3 mt-4 ms-4 ">
                    <label htmlFor="productCat">
                        <h6>Product Category</h6>
                        <select className="form-select" {...register('productCat', { required: true })}>
                            <option value="fruits">Fruits and Vegetables</option>
                            <option value="household">Household Items</option>
                            <option value="snacks">Food & Snacks</option>
                            <option value="beverages">Beverages</option>
                            <option value="bodycare">Body Care</option>
                            <option value="babycare">Baby Care</option>
                        </select>
                    </label>
                </div>
                {/* {errors.productCat?.type === 'required' && <p class="alert alert-danger">*Product-Category is required</p>} */}

                {/* Product ID */}
                <div className="form-floating mb-3 mt-4 ms-3 ">
                    <input type="number"
                        id="producId"
                        placeholder="Product Id"
                        class="form-control w-50"
                        {...register('productId', { required: true })} />
                    <label htmlFor="productId">Product ID</label>
                </div>
                {errors.productId?.type === 'required' && <p class="alert alert-danger">*ProductId is required</p>}


                {/* Product Name */}
                <div className="form-floating mb-3 mt-4 ms-3 ">
                    <input type="text"
                        id="productName"
                        placeholder="Product Name"
                        class="form-control w-50"
                        {...register('productName', { required: true })} />
                    <label htmlFor="productName">Product Name</label>
                </div>
                {errors.productName?.type === 'required' && <p class="alert alert-danger">*ProductName is required</p>}

                {/* Product Price */}
                <div className="form-floating mb-3 mt-4 ms-3 ">
                    <input type="number" id="productPrice"
                        placeholder="₹"
                        className="form-control w-50"
                        {...register('productPrice', { required: true })} />
                    <label htmlFor="productPrice">Product Price</label>
                </div>
                {errors.productPrice?.type === 'required' && <p class="alert alert-danger">*Product-Price is required</p>}

                {/* Product Description */}
                <div className="form-floating mb-3 mt-4 ms-3 ">
                    <input type="textarea" id="productDesc"
                        placeholder="Description"
                        className="form-control w-50"
                        {...register('productDesc', { required: true })} />
                    <label htmlFor="productPrice">Product Description</label>
                </div>

                <div class="form-floating mb-3 mt-4 ms-3">
                    <input type="file" class="form-control-file" id="photo" name="photo" onChange={onFileSelect} />
                </div>

                <button type="submit" className="btn btn-info mt-3 ms-4">Add Product</button>
            </form>
        </div>
    )
}
