import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import car_rental_data from "../../../data/CarRentalData";

const BreadCrumb = () => {
   const { id } = useParams<{ id: string }>();
   const [carTitle, setCarTitle] = useState("Car Details");

   useEffect(() => {
      if (id) {
         const foundCar = car_rental_data.find(car => car.id === parseInt(id));
         if (foundCar) {
            setCarTitle(`${foundCar.year} ${foundCar.make} ${foundCar.model}`);
         }
      }
   }, [id]);

   return (
      <div className="tg-breadcrumb-list-2 mt-15">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="tg-breadcrumb-list-2 tg-breadcrumb-list-3">
                     <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><i className="fa-sharp fa-solid fa-angle-right"></i></li>
                        <li><Link to="/car-listing">Car Rental</Link></li>
                        <li><i className="fa-sharp fa-solid fa-angle-right"></i></li>
                        <li><span>{carTitle}</span></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BreadCrumb
