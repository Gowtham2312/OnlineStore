import React from 'react'

export default function OrderInvoice() {

    // getting order data from localStorage
    let data = JSON.parse(localStorage.getItem("orderdata"))
    let { orderID, orderdata, price } = data

    return (
        <div>
            <h2 className="text-center mt-3 mb-3">OrderID # :{orderID}</h2>
            <table className="table table-hover table-striped">
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
                        orderdata.map((prod, ind) => {
                            return(
                            <tr>
                                <th scope="row">{ind+1}</th>
                                <td>{prod.productName}</td>
                                <td>{prod.pcount}</td>
                                <td> ₹{prod.pcount * prod.productPrice}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
            <div>
                <h2 className="text-center">Total Price : {price} </h2>
            </div>
        </div>
    )
}
