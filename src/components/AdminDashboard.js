import React from 'react'
import { BrowserRouter, NavLink, Route, Switch , useParams, useRouteMatch } from 'react-router-dom'
import AddProduct from './AddProduct'
import ViewProduct from './ViewProduct'
import AdminRegister from './AdminRegister'
import ShowProducts from './ShowProducts'
import AdminLogin from './AdminLogin'

export default function AdminDashboard() {

    let { username } = useParams()
    let { url, path} =  useRouteMatch()
    
    return (
        <div>
             <BrowserRouter>
                <ul className="nav nav-pills d-flex justify-content-evenly mt-5">
                    <li className="nav-item">
                    <NavLink className="nav-link "  to={`${url}/adminregister`}>AdminRegistration</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link "  to={`${url}/add-products`}>AddProducts</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link"  to={`${url}/view-products`}>ViewProducts</NavLink>
                    </li>
                </ul>

                <Switch>
                    <Route path={`${path}/adminregister`}>
                        <AdminRegister />
                    </Route>
                    <Route path={`${path}/add-products`}>
                        <AddProduct />
                    </Route>
                    <Route path={`${path}/view-products`}>
                        <ViewProduct />
                    </Route>
                    <Route path="/adminlogin">
                        <AdminLogin />
                    </Route>
                    <Route path="/showproducts/:category">
                        <ShowProducts />
                    </Route>
                    
                 </Switch>
            </BrowserRouter>
        </div>
    )
}
