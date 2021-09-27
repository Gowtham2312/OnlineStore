import React from 'react'
import Category from './Category'
import Carousel from './Carousel'
import ProductCard from './ProductCard'
import Footer from './Footer'
import PreFooter from './PreFooter'
import AnimatedImage from './AnimatedImage'
import Homepic1 from './Homepic1'

export default function Homepage() {

    let checkforcart = JSON.parse(localStorage.getItem("cartdata"))
    let checkforwishlist = JSON.parse(localStorage.getItem("wishlistData"))


    if(checkforcart === null)
    {
        var emptyArray = []
        localStorage.setItem("cartdata", JSON.stringify(emptyArray))
    }
    if(checkforwishlist === null)
    {
        var emptyarr = []
        localStorage.setItem("wishlistData", JSON.stringify(emptyarr))
    }

    return (
        <div>            
            <Homepic1 />
            <Category />
            <AnimatedImage />
            <ProductCard />
            <Carousel /> 
            <PreFooter className="mt-3 mb-3"/>
            <Footer />
            
        </div>
    )
}
