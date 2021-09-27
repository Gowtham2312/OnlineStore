import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'

import Homepage from './components/Homepage';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import Register from './components/Register';
import Cart from './components/Cart';
import Faq from './components/Faq';
import OrderHistory from './components/OrderHistory'
import EditProfile from './components/EditProfile'
import Wishlist from './components/Wishlist';
import Search from './components/Search'
import AdminDashboard from './components/AdminDashboard';
import SingleProduct from './components/SingleProduct'
import ShowProducts from './components/ShowProducts';
import OrderInvoice from './components/OrderInvoice';

import { useSelector, useDispatch } from 'react-redux'
import { clearUserLoginStatus } from './redux-store/userSlice';
import { clearAdminLoginStatus } from './redux-store/adminSlice'
import { useHistory } from 'react-router-dom'

import { FiLogOut } from 'react-icons/fi'
import { GrCart } from 'react-icons/gr'

import axios from 'axios';

import { useEffect } from 'react';
import { updateCart } from './redux-store/cartSlice'
import { updateImage, updateName } from './redux-store/editSlice'

function App() {

  let { editName, editImage } = useSelector(state => state.edit)

  let { cartProducts } = useSelector(state => state.cart)
  let cartProduct = JSON.parse(JSON.stringify(cartProducts))

  let isSuccess = JSON.parse(localStorage.getItem("isSuccess"))
  let userdata = JSON.parse(localStorage.getItem("userdata"))
  var username = JSON.parse(localStorage.getItem("username"))

  let Success = JSON.parse(localStorage.getItem("Success"))

  let dispatch = useDispatch()
  let history = useHistory()

  async function onUserLogout() {

    let cartdata = JSON.parse(localStorage.getItem("cartdata"))
    let wishlist = JSON.parse(localStorage.getItem("wishlistData"))
    let object = { user: username, list: wishlist, cart: cartdata }
    await axios.post("/users/updatecart", { object })

    localStorage.clear()
    dispatch(clearUserLoginStatus())
    history.push('/')
  }

  function onAdminLogout() {

    localStorage.clear()
    dispatch(clearAdminLoginStatus())

  }

  useEffect(() => {
    let cartdata = JSON.parse(localStorage.getItem("cartdata"))
    dispatch(updateCart(cartdata))
    if (isSuccess) {
      let name = JSON.parse(localStorage.getItem("username"))
      let image = JSON.parse(localStorage.getItem("profilepic"))
      dispatch(updateName(name))
      dispatch(updateImage(image))
    }
  }, [isSuccess])

  return (
    <BrowserRouter>
      <nav class="navbar navbar-expand-md navbar-light bg-primary mx-auto">
        <div class="container-fluid">
          <a class="navbar-brand w-50 text-white" href="/">G-Store<i class="fas fa-store "></i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav ms-auto mb-2 mb-lg-2">

              {/* Search button */}
              <Search class="mt-1" />
              <li class="nav-item me-2">
                <NavLink class="nav-link mt-1" to="/" aria-current="page"><span className="text-white d-flex mt-2"><i class="fas fa-home mt-1 me-1"></i>Home</span></NavLink>
              </li>
              {
                !Success ?
                  <>
                    {
                      isSuccess ?
                        <>
                          {/* Dropdown after login */}
                          <li class="nav-item dropdown mt-1 me-2 mb-2">
                            <a class="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <img src={editImage} width="40px" height="40px" className="rounded-circle  mb-1" /> <b className="text-white mb-1">{editName}</b>
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                              <NavLink to="/editProfile" className="nav-link"><a class="dropdown-item" href="#">Edit Profile</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/orderhistory" className="nav-link "><a class="dropdown-item" href="#">Order History</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/wishlist" className="nav-link"><a class="dropdown-item" href="#">Wishlist</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/faq" className="nav-link"><a class="dropdown-item" href="#">FAQ's</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/" className="nav-link" onClick={onUserLogout}><a class="dropdown-item" href="#">Logout</a></NavLink>
                            </ul>
                          </li>
                        </>
                        :
                        <>
                          {/* Dropdown for login/signup */}
                          <li class="nav-item dropdown mt-2 me-3">
                            <a class="nav-link dropdown-toggle text-white mt-1" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Login/Sign-Up
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                              <NavLink to="/register" className="nav-link"><a class="dropdown-item" href="#">Register</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/userlogin" className="nav-link"><a class="dropdown-item" href="#">User Login</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/adminlogin" className="nav-link"><a class="dropdown-item" href="#">Admin Login</a></NavLink>
                              <li><hr class="dropdown-divider" /></li>
                              <NavLink to="/faq" className="nav-link"><a class="dropdown-item" href="#">FAQ's</a></NavLink>
                            </ul>
                          </li>
                        </>
                    }
                  </>
                  :
                  <>
                    <li class="nav-item mt-2 d-flex">
                      <NavLink to="/admindashboard" className="nav-link text-white w-5 ms-4">Admin</NavLink>
                    </li>
                    <li class="nav-item mt-2 d-flex">
                      <NavLink to="/" className="nav-link text-white w-5 ms-4" onClick={onAdminLogout}>Logout <FiLogOut /></NavLink>
                    </li>
                  </>
              }
              {/* Cart */}
              <li class="nav-item me-2">
                <NavLink class="nav-link mt-1" to="/cart" aria-current="page"><span className="text-white d-flex mt-2"><GrCart size="25px" /><p className="">{cartProduct.length}</p></span></NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* switch */}
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/userlogin">
          <UserLogin />
        </Route >
        <Route path="/adminlogin">
          <AdminLogin />
        </Route >
        <Route path="/admindashboard">
          <AdminDashboard />
        </Route >
        <Route path="/faq">
          <Faq />
        </Route >
        <Route path="/editprofile">
          <EditProfile />
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/orderhistory">
          <OrderHistory />
        </Route >
        <Route path="/invoice">
          <OrderInvoice />
        </Route >
        <Route path="/showproducts/:category">
          <ShowProducts />
        </Route>
        <Route path="/singleproduct/:daata">
          <SingleProduct />
        </Route >
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>


    </BrowserRouter>
  );
}
export default App;