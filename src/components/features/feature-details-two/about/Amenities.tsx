import type { CarRentalType } from "../../../../data/CarRentalData";

interface AmenitiesProps {
   carData: CarRentalType;
}

const Amenities = ({ carData }: AmenitiesProps) => {
   return (
      <div className="tg-tour-about-inner  tg-tour-about-2-inner mb-30">
         <h4 className="tg-tour-about-title mb-10">Amenities</h4>
         <p className="text-capitalize lh-28 mb-15">This {carData.year} {carData.make} {carData.model} comes equipped with modern amenities 
            to ensure your comfort and convenience during your rental period.</p>
         <div className="row">
            <div className="col-lg-12">
               <div className="tg-tour-about-list  tg-tour-about-list-2">
                  <ul>
                     {carData.amenities.map((amenity, index) => (
                        <li key={index}>
                           <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span>
                           <span className="text">{amenity}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Amenities