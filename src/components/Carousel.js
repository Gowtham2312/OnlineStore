import react from 'react'
export default  function Carousel(){
    return(
        <div className="mt-3 mb-3">          

            {/* carousel */}
            <div id="carouselExampleIndicators" class="carousel slide " data-bs-ride="carousel ">
              <div class="carousel-indicators">
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                   <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
              </div>
            
            {/* Carousel inner */}
             <div class="carousel-inner">
             
              <div class="carousel-item active" data-bs-interval="3000">
               <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,w=1908,h=954/layout-engine/2021-09/Bev_Homepage_8.jpg" title="first carousal" class="d-block w-75 mx-auto" height="400px" alt="carousal image"/>
              </div>
                           
              <div class="carousel-item" data-bs-interval="3000">
                <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,w=1908,h=954/layout-engine/2021-08/Homepage_TOT-3.jpg" class="d-block w-75 mx-auto" height="400px" alt="carousal image"/>
                </div>

                
              <div class="carousel-item" data-bs-interval="3000">
                <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,w=1908,h=954/layout-engine/2021-09/Webp.net-resizeimage1320x660.jpg" class="d-block w-75 mx-auto" height="400px" alt="carousal image"/>
             </div>

                
             <div class="carousel-item" data-bs-interval="3000">
                <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,w=1908,h=954/layout-engine/2021-08/1320x660-5.jpg" class="d-block w-75 mx-auto"  height="400px" alt="carousal image"/>
             </div>


            </div>
             
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
               <span class="visually-hidden">Previous</span>
              </button>
            
            
             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
               <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
             </button>

           </div>
        </div>
    )
}
