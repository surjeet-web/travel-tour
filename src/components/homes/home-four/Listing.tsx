/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import car_rental_data, { type CarRentalType } from "../../../data/CarRentalData";
import Button from "../../common/Button";

const Listing = () => {

   const dispatch = useDispatch();
   // add to wishlist
   const handleAddToWishlist = (item: CarRentalType) => {
      dispatch(addToWishlist(item));
   };

   return (
      <>
         <style>{`
            .modern-car-card {
               background: white;
               border-radius: 24px;
               overflow: hidden;
               box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
               transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
               border: 1px solid rgba(0, 0, 0, 0.05);
               position: relative;
            }

            .modern-car-card:hover {
               transform: translateY(-12px);
               box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            }

            .modern-car-image {
               position: relative;
               height: 200px;
               background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
               display: flex;
               align-items: center;
               justify-content: center;
               overflow: hidden;
            }

            .modern-car-image img {
               width: 90%;
               height: auto;
               object-fit: contain;
               transition: transform 0.6s ease;
               filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
            }

            .modern-car-card:hover .modern-car-image img {
               transform: scale(1.05);
            }

            .car-tag {
               position: absolute;
               top: 16px;
               left: 16px;
               background: linear-gradient(135deg, #3B82F6, #1D4ED8);
               color: white;
               padding: 6px 12px;
               border-radius: 16px;
               font-size: 11px;
               font-weight: 700;
               text-transform: uppercase;
               letter-spacing: 0.5px;
            }

            .car-featured {
               position: absolute;
               top: 16px;
               left: 16px;
               background: linear-gradient(135deg, #F59E0B, #D97706);
               color: white;
               padding: 6px 12px;
               border-radius: 16px;
               font-size: 11px;
               font-weight: 700;
               text-transform: uppercase;
               letter-spacing: 0.5px;
               display: flex;
               align-items: center;
               gap: 4px;
            }

            .car-wishlist {
               position: absolute;
               top: 16px;
               right: 16px;
               width: 42px;
               height: 42px;
               background: rgba(255, 255, 255, 0.95);
               backdrop-filter: blur(10px);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               cursor: pointer;
               transition: all 0.3s ease;
               border: 1px solid rgba(255, 255, 255, 0.3);
            }

            .car-wishlist:hover {
               background: #EF4444;
               color: white;
               transform: scale(1.1);
            }

            .modern-car-content {
               padding: 24px;
            }

            .car-price-badge {
               position: absolute;
               top: -15px;
               right: 24px;
               background: linear-gradient(135deg, #10B981, #059669);
               color: white;
               padding: 12px 20px;
               border-radius: 20px;
               box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
               text-align: center;
               min-width: 100px;
            }

            .car-price-old {
               font-size: 12px;
               text-decoration: line-through;
               opacity: 0.8;
               display: block;
            }

            .car-price-new {
               font-size: 18px;
               font-weight: 700;
               display: block;
            }

            .car-price-period {
               font-size: 11px;
               opacity: 0.9;
            }

            .car-title {
               font-size: 20px;
               font-weight: 700;
               color: #1E293B;
               margin-bottom: 12px;
               margin-top: 8px;
            }

            .car-title a {
               color: inherit;
               text-decoration: none;
               transition: color 0.3s ease;
            }

            .car-title a:hover {
               color: #3B82F6;
            }

            .car-rating {
               display: flex;
               align-items: center;
               gap: 8px;
               margin-bottom: 16px;
            }

            .car-stars {
               display: flex;
               gap: 2px;
            }

            .car-star {
               color: #FFC107;
               font-size: 14px;
            }

            .car-reviews {
               font-size: 13px;
               color: #64748B;
               font-weight: 500;
            }

            .car-specs {
               display: grid;
               grid-template-columns: 1fr 1fr;
               gap: 12px;
            }

            .car-spec-item {
               display: flex;
               align-items: center;
               gap: 8px;
               font-size: 13px;
               color: #64748B;
               font-weight: 500;
            }

            .car-spec-item svg {
               width: 16px;
               height: 16px;
               color: #3B82F6;
            }

            .modern-car-section {
               background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
               position: relative;
               overflow: hidden;
            }

            .car-section-header {
               text-align: center;
               margin-bottom: 60px;
            }

            .car-subtitle {
               color: #3B82F6;
               font-size: 14px;
               font-weight: 600;
               text-transform: uppercase;
               letter-spacing: 1px;
               margin-bottom: 12px;
            }

            .car-main-title {
               font-size: 42px;
               font-weight: 800;
               color: #1E293B;
               line-height: 1.2;
               margin-bottom: 16px;
            }

            .car-description {
               font-size: 16px;
               color: #64748B;
               line-height: 1.6;
               max-width: 600px;
               margin: 0 auto;
            }

            .car-cta-btn {
               background: linear-gradient(135deg, #3B82F6, #1D4ED8);
               color: white;
               padding: 16px 32px;
               border-radius: 50px;
               font-weight: 600;
               text-decoration: none;
               display: inline-block;
               transition: all 0.3s ease;
               box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
               border: none;
            }

            .car-cta-btn:hover {
               transform: translateY(-2px);
               box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
               color: white;
            }

            @media (max-width: 768px) {
               .car-main-title {
                  font-size: 32px;
               }
               
               .modern-car-content {
                  padding: 20px;
               }

               .car-specs {
                  grid-template-columns: 1fr;
               }
            }
         `}</style>

         <div className="modern-car-section tg-grey-bg pt-140 pb-130 p-relative z-index-9">
            <img className="tg-listing-2-shape d-none d-sm-block" src="/assets/img/listing/listing-2/shape-1.png" alt="" />
            <img className="tg-listing-2-shape-2 d-none d-xl-block" src="/assets/img/listing/listing-2/shape-2.png" alt="" />
            <img className="tg-listing-2-shape-3 d-none d-sm-block" src="/assets/img/listing/listing-2/shape-3.png" alt="" />
            
            <div className="container">
               
               {/* Modern Section Header */}
               <div className="car-section-header">
                  <div className="car-subtitle wow fadeInUp" data-wow-delay=".4s">
                     Premium Car Rentals
                  </div>
                  <h2 className="car-main-title wow fadeInUp" data-wow-delay=".5s">
                     Find Your Perfect Vehicle
                  </h2>
                  <p className="car-description wow fadeInUp" data-wow-delay=".6s">
                     Choose from our premium fleet of vehicles. Whether you need a compact car for city driving 
                     or a luxury SUV for your adventure, we have the perfect ride for every journey.
                  </p>
               </div>

               {/* Modern Car Cards Grid */}
               <div className="row">
                  {car_rental_data.filter((items) => items.page === "car_rental").map((item) => (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4 wow fadeInUp" data-wow-delay=".3s">
                        <div className="modern-car-card">
                           
                           {/* Car Image */}
                           <div className="modern-car-image">
                              <Link to={`/car-details/${item.id}`}>
                                 <img src={item.thumb} alt={`${item.year} ${item.make} ${item.model}`} />
                              </Link>
                              
                              {/* Featured Badge */}
                              {item.featured && (
                                 <div className="car-featured">
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M6.60156 1L0.601562 8.2H6.00156L5.40156 13L11.4016 5.8H6.00156L6.60156 1Z" stroke="white" strokeWidth="0.857143" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.featured}
                                 </div>
                              )}
                              
                              {/* Tag */}
                              {item.tag && !item.featured && (
                                 <div className="car-tag">{item.tag}</div>
                              )}
                              
                              {/* Wishlist */}
                              <div className="car-wishlist" onClick={() => handleAddToWishlist(item)}>
                                 <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                              </div>
                           </div>

                           {/* Car Content */}
                           <div className="modern-car-content">
                              
                              {/* Price Badge */}
                              <div className="car-price-badge">
                                 {item.original_price && (
                                    <span className="car-price-old">${item.original_price}</span>
                                 )}
                                 <span className="car-price-new">${item.price_per_day}</span>
                                 <span className="car-price-period">/day</span>
                              </div>

                              {/* Title */}
                              <h4 className="car-title">
                                 <Link to={`/car-details/${item.id}`}>
                                    {item.year} {item.make} {item.model}
                                 </Link>
                              </h4>

                              {/* Rating */}
                              <div className="car-rating">
                                 <div className="car-stars">
                                    {[...Array(5)].map((_, index) => (
                                       <span key={index} className={`car-star ${index < Math.floor(item.rating) ? '' : 'text-muted'}`}>
                                          ★
                                       </span>
                                    ))}
                                 </div>
                                 <span className="car-reviews">{item.total_reviews}</span>
                              </div>

                              {/* Specifications */}
                              <div className="car-specs">
                                 <div className="car-spec-item">
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M12.3329 6.7071C12.3329 11.2324 6.55512 15.1111 6.55512 15.1111C6.55512 15.1111 0.777344 11.2324 0.777344 6.7071C0.777344 5.16402 1.38607 3.68414 2.46962 2.59302C3.55316 1.5019 5.02276 0.888916 6.55512 0.888916C8.08748 0.888916 9.55708 1.5019 10.6406 2.59302C11.7242 3.68414 12.3329 5.16402 12.3329 6.7071Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M6.55512 8.64649C7.61878 8.64649 8.48105 7.7782 8.48105 6.7071C8.48105 5.636 7.61878 4.7677 6.55512 4.7677C5.49146 4.7677 4.6292 5.636 4.6292 6.7071C4.6292 7.7782 5.49146 8.64649 6.55512 8.64649Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.location}
                                 </div>
                                 
                                 <div className="car-spec-item">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M8.00175 3.73329V7.99996L10.8462 9.42218M15.1128 8.00003C15.1128 11.9274 11.9291 15.1111 8.00174 15.1111C4.07438 15.1111 0.890625 11.9274 0.890625 8.00003C0.890625 4.07267 4.07438 0.888916 8.00174 0.888916C11.9291 0.888916 15.1128 4.07267 15.1128 8.00003Z" stroke="currentColor" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.transmission}
                                 </div>

                                 <div className="car-spec-item">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M2 8C2 8 4 4 8 4C12 4 14 8 14 8C14 8 12 12 8 12C4 12 2 8 2 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                       <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {item.fuel_type}
                                 </div>

                                 <div className="car-spec-item">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M3 6H13L12 13H4L3 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                       <path d="M6 9V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                       <path d="M10 9V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                       <path d="M5 6V4C5 3.44772 5.44772 3 6 3H10C10.5523 3 11 3.44772 11 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {item.seats} Seats
                                 </div>
                              </div>

                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* CTA Button */}
               <div className="text-center mt-5 wow fadeInUp" data-wow-delay=".7s">
                  <Link to="/car-listing" className="car-cta-btn">
                     <Button text="Explore All Vehicles" />
                  </Link>
               </div>

            </div>
         </div>
      </>
   )
}

export default Listing
