import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function OrderHistory() {

    let [products, setproducts] = useState([])

    let [ data , setdata ] = useState([])

    let isSuccess = JSON.parse(localStorage.getItem("isSuccess"))

    function setData(prod) {
        setdata(prod)
    }

    useEffect(async () => {
        if (isSuccess) {
            let username = JSON.parse(localStorage.getItem("username"))
            let name = username
            console.log("name",name)
            let res = await axios.post("/users/get-orderhistory", { name })
            let alldata = res.data
            setproducts([...alldata.payload.orders])
        }
    }, [isSuccess])

    return (
        <div className="container">
            <h1 className="text-center mt-3 mb-4">Order History</h1>
            {
                (isSuccess !== null || isSuccess) ?
                    products.map((prod, ind) => {
                        return (
                            <div class="card mb-3  mt-2 shadow p-3 bg-white rounded" key={ind}>
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        {
                                            (prod.orderdata.length === 1) ?
                                                <div>
                                                    <img src={(prod.orderdata[0]).image} class="d-block mx-auto cart-img" width="90rem" height="90rem" alt="Image of " />
                                                </div>

                                                :
                                                <div className="text-center mt-3">
                                                    <p onClick={()=>setData(prod.orderdata)} data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-clipboard-list fa-3x"></i></p>
                                                </div>
                                        }
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">

                                            {/* level-1 */}

                                            <div className="row">
                                                <div className="col">

                                                    {/* level-1(a) */}
                                                    <div className="row">

                                                        <div className="col">
                                                            <p ><b>Order id # :</b> {prod.orderID} </p>
                                                        </div>
                                                        <div className="col">
                                                            <p><b>No. of items : </b>{prod.orderdata.length}</p>
                                                        </div>

                                                    </div>
                                                    {/* level-1(b) */}
                                                    <div className="row">

                                                        <div className="col">
                                                            <h5 className='text-center mt-2'><b>Price : ₹ {prod.price}</b></h5>
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="col">
                                                    <h4 className="ms-4">Status</h4>
                                                    <p className="text-success ms-4"><b>{prod.status}</b></p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div>
                        <h3 className='text-center mt-5'>Please Sign-In</h3>
                    </div>
            }

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header"> 
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table className="table table-hover table-info table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Serial No.</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((prod, ind) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{ind + 1}</th>
                                                    <td>{prod.productName}</td>
                                                    <td>{prod.pcount}</td>
                                                    <td>₹{prod.productPrice}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}