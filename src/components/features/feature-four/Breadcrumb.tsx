
const Breadcrumb = () => {
   return (
      <div className="tg-breadcrumb-spacing-3 include-bg p-relative fix" style={{ backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-2.jpg)` }}>
         <div className="tg-hero-top-shadow"></div>
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="breadcrumb-content text-center">
                     <h1>Car Rental</h1>
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item"><a href="/">Home</a></li>
                           <li className="breadcrumb-item active" aria-current="page">Car Rental</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Breadcrumb
