import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import travel_package_data from "../../../data/TravelPackageData";

const Breadcrumb = () => {
   const { id } = useParams<{ id: string }>();
   const [packageTitle, setPackageTitle] = useState("Package Details");

   useEffect(() => {
      if (id) {
         const foundPackage = travel_package_data.find(pkg => pkg.id === parseInt(id));
         if (foundPackage) {
            setPackageTitle(foundPackage.title);
         }
      }
   }, [id]);

   return (
      <>
         <div className="tg-breadcrumb-spacing-3 include-bg p-relative fix" style={{ backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-2.jpg)` }}>
            <div className="tg-hero-top-shadow"></div>
         </div>
         <div className="tg-breadcrumb-list-2-wrap">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="tg-breadcrumb-list-2">
                        <ul>
                           <li><Link to="/">Home</Link></li>
                           <li><i className="fa-sharp fa-solid fa-angle-right"></i></li>
                           <li><Link to="/travel-packages">Travel Packages</Link></li>
                           <li><i className="fa-sharp fa-solid fa-angle-right"></i></li>
                           <li><span>{packageTitle}</span></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Breadcrumb
