import React from 'react'

export default function PreFooter() {
    return (
        <div className="container margins">
            <div className="row row-cols-1 row-cols-sm-3 row-cols-sm-2 ms-3 mb-3 mt-4">
                <div className="col d-flex">
                    <img src="https://icon-library.com/images/best-price-icon/best-price-icon-8.jpg" className="pre-size" alt="bestprice" />
                    <div>
                        <h5>Best Prices & Offers</h5>
                        <p>
                            Best Prices & Offers
                            Cheaper prices than your local supermarket, great cashback offers to top it off.
                        </p>
                    </div>
                </div>
                <div className="col d-flex">
                    <img src="https://cdn-icons-png.flaticon.com/512/645/645084.png" className="pre-size" alt="easy return" />
                    <div>
                        <h5>Easy Returns</h5>
                        <p>Not satisfied with a product? Return it at the doorstep & get a refund within hours.</p>
                    </div>
                </div>
                <div className="col d-flex">
                    <img src="https://www.pinclipart.com/picdir/big/35-357754_vector-royalty-free-product-crate-package-parcel-fa.png" className="pre-size" alt="easy return" />
                    <div>
                        <h5>Wide Assortment</h5>
                        <p>Choose from wide range of products across food, personal care, household & other categories.</p>
                    </div>
                </div>
            </div>
            <h5 className="mt-2  mb-2 ms-4">Online grocery shopping in India</h5>
            <p className="ms-4 me-3 mb-4">Shop on the go and buy groceries, fresh fruits & vegetables, cakes & other bakery items, meats & seafood, cosmetics, mobiles & accessories, electronics and baby care products. We get it all delivered at your doorstep within hours. You not only save time but also money with our best prices & offers.</p>
        </div>
    )
}
