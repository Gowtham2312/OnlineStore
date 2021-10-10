import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Category from './Category'
export default function ViewProducts() {

    useEffect(async () => {
        let response = await axios.get("/products/view-products")
        let allproducts = response.data;
    }, [])

    return (
        <div>
            <Category />
        </div>
    )
}
