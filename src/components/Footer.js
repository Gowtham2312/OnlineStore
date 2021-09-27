import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="bg-secondary">
                <div className="container-fluid p-4">
                    <div className="row">
                        {/*col- 1 */}
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-white">Categories</h4>
                            <ul className="list-unstyled item">
                                <li><a href="#" class="text-decoration-none text-black">Body care</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Fruits & Vegatables</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Household Items</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Home & Kitchen</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Baby Care</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Food & Snacks</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Beverages</a></li>
                            </ul>
                            
                        </div>
                        
                         {/*col-3 */}
                         <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-white"> Company</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-decoration-none text-black">About</a></li>
                                <li><a href="#" className="text-decoration-none text-black">Careers</a></li>
                                <li><a href="#" className="text-decoration-none text-black">Blog</a></li>
                                
                            </ul>
                            
                        </div>
                        {/*col-4 */}
                        <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-white">For Consumers</h4>
                            <ul className="list-unstyled ">
                                <li><a href="#" class="text-decoration-none text-black">Privacy</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Terms</a></li>
                                <li><a href="#" class="text-decoration-none text-black">FAQs</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Security</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Contact</a></li>
                                
                            </ul>
                            
                        </div>
                        {/*col-5 */}
                        <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-white">For Partners</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" class="text-decoration-none text-black">Partner</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Market</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Warehouse</a></li>
                                <li><a href="#" class="text-decoration-none text-black">Deliver</a></li>
                                
                            </ul>
                            
                        </div>
                        {/*col-6 */}
                        <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-white">Contact Us</h4>
                           
                            <ul className="list-unstyled">
                                <li><i className="fas fa-home ms-3"></i> Nehru Street,HYD</li>
                                <li><i className="fas fa-envelope ms-3"></i> GStore@gmail.com</li>
                                <li><i className="fas fa-phone ms-3"></i> +91 87560 45786</li>
                                <li><i className="fas fa-print ms-3"></i> +00233455678</li>
                            </ul>
                            
                        </div>

                    </div>


                </div>
                <hr />

                <div className="media-icons mt-2 d-flex inline row text-center">
                    
                    <ul class="list-unstyled list-inline">
                        <li class="list-inline-item">
                            <h6 className="text-white">Follow us</h6>
                        </li>
                    <li class="list-inline-item">
                        <a href="#!" class="sbtn btn-large mx-1 mt-1 text-black" title="Facebook">
                        <i class="fab fa-facebook-square fa-2x"></i>
                        </a>
                    </li>
                   
                    <li class="list-inline-item">
                        <a href="#!" class="sbtn btn-large mx-1 mt-1  text-black" title="Twitter">
                        <i class="fab fa-twitter-square fa-2x"></i>
                        </a>
                    </li>
                     <li class="list-inline-item">
                        <a href="#!" class="sbtn btn-large mx-1 mt-1  text-black" title="Linkedin">
                        <i class="fab fa-linkedin fa-2x"></i>
                        </a>
                    </li>
                    <li class="list-inline-item">
                        <a href="#!" class="sbtn btn-large mx-1 mt-1  text-black" title="Youtube">
                        <i class="fab fa-youtube-square fa-2x"></i>
                        </a>
                    </li>

                     </ul>

                </div>



            </footer>
        </div>
    )
}
