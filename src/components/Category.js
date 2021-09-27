import React from 'react'
import { useHistory } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
export default function ProductView() {

    let history = useHistory()
    let categories = [{
        prodimg: 'https://cdn-icons-png.flaticon.com/128/2553/2553691.png',
        prodCat: 'Food & Snacks',
        cat: 'snacks'
    },
    {
        prodimg: "https://cdn-icons-png.flaticon.com/128/2921/2921726.png",
        prodCat: 'Fruits & Vegies',
        cat: 'fruits',
    },
    {
        prodimg: 'https://cdn-icons-png.flaticon.com/128/2271/2271006.png',
        prodCat: 'Beverages',
        cat: 'beverages',
    },
    {
        prodimg: 'https://cdn-icons-png.flaticon.com/512/1682/1682360.png',
        prodCat: 'Household items',
        cat: 'household',
    },
    {
        prodimg: 'https://cdn-icons-png.flaticon.com/128/940/940649.png',
        prodCat: 'Baby Care',
        cat: 'babycare',
    },
    {
        prodimg: 'https://cdn2.iconfinder.com/data/icons/mothers-day-2/512/MothersDay-27-512.png',
        prodCat: 'Body Care',
        cat: 'bodycare'
    }
    ]

    function Item(cate) {
        history.push(`/showproducts/${cate}`)
    }

    return (
        <div className="container mb-4">
            <h3 className="text-center mt-5 mb-3"><b>Products Category</b></h3>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                    {
                        categories.map((product, ind) => {
                            return  <div className="col">                                    
                            <div class="card h-100 d-flex cursor-for shadow p-3 bg-white rounded  g-3" key={ind} onClick={() => Item(product.cat)}>
                                <div class="row g-3">
                                    <div className="col-md-4 mt-3 mb-3">
                                        <img src={product.prodimg} class='card-img mt-3 ms-2 groc-size' alt="something" />
                                    </div>
                                    <div className="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title ms-2 mt-3">{product.prodCat}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        })
                    }
            </div>
        </div>
    )
}
