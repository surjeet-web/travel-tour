/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import travel_package_data, { type TravelPackageType } from "../../../data/TravelPackageData";
import Clock from "../../../svg/home-one/Clock";
import User from "../../../svg/home-one/User";
import Location from "../../../svg/home-one/Location";
import Wishlist from "../../../svg/home-one/Wishlist";

const Listing = () => {

   const dispatch = useDispatch();
   // add to wishlist
   const handleAddToWishlist = (item: TravelPackageType) => {
      dispatch(addToWishlist(item));
   };

   return (
      <>
         <style>{`
            .modern-card {
               background: white;
               border-radius: 20px;
               overflow: hidden;
               box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
               transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
               border: 1px solid rgba(0, 0, 0, 0.05);
               position: relative;
            }

            .modern-card:hover {
               transform: translateY(-8px);
               box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
            }

            .modern-card-image {
               position: relative;
               overflow: hidden;
               height: 240px;
            }

            .modern-card-image img {
               width: 100%;
               height: 100%;
               object-fit: cover;
               transition: transform 0.6s ease;
            }

            .modern-card:hover .modern-card-image img {
               transform: scale(1.05);
            }

            .modern-tag {
               position: absolute;
               top: 16px;
               left: 16px;
               background: linear-gradient(135deg, #00BFA5, #009688);
               color: white;
               padding: 6px 14px;
               border-radius: 20px;
               font-size: 12px;
               font-weight: 600;
               text-transform: uppercase;
               letter-spacing: 0.5px;
            }

            .modern-wishlist {
               position: absolute;
               top: 16px;
               right: 16px;
               width: 40px;
               height: 40px;
               background: rgba(255, 255, 255, 0.9);
               backdrop-filter: blur(10px);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               cursor: pointer;
               transition: all 0.3s ease;
               border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .modern-wishlist:hover {
               background: #FF6F61;
               color: white;
               transform: scale(1.1);
            }

            .modern-card-content {
               padding: 24px;
            }

            .modern-meta {
               display: flex;
               gap: 16px;
               margin-bottom: 12px;
            }

            .modern-meta-item {
               display: flex;
               align-items: center;
               gap: 6px;
               font-size: 13px;
               color: #64748B;
               font-weight: 500;
            }

            .modern-meta-item svg {
               width: 16px;
               height: 16px;
               color: #00BFA5;
            }

            .modern-title {
               font-size: 18px;
               font-weight: 700;
               color: #1E293B;
               margin-bottom: 8px;
               line-height: 1.4;
               display: -webkit-box;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;
               overflow: hidden;
            }

            .modern-title a {
               color: inherit;
               text-decoration: none;
               transition: color 0.3s ease;
            }

            .modern-title a:hover {
               color: #00BFA5;
            }

            .modern-location {
               display: flex;
               align-items: center;
               gap: 6px;
               color: #64748B;
               font-size: 14px;
               margin-bottom: 20px;
            }

            .modern-location svg {
               width: 16px;
               height: 16px;
               color: #00BFA5;
            }

            .modern-footer {
               display: flex;
               align-items: center;
               justify-content: space-between;
            }

            .modern-price {
               display: flex;
               flex-direction: column;
            }

            .modern-price-label {
               font-size: 12px;
               color: #64748B;
               margin-bottom: 2px;
            }

            .modern-price-amount {
               font-size: 20px;
               font-weight: 700;
               color: #1E293B;
            }

            .modern-rating {
               display: flex;
               align-items: center;
               gap: 8px;
               background: #F8FAFC;
               padding: 8px 12px;
               border-radius: 12px;
            }

            .modern-rating-star {
               color: #FFC107;
               font-size: 14px;
            }

            .modern-rating-text {
               font-size: 13px;
               font-weight: 600;
               color: #1E293B;
            }

            .modern-rating-reviews {
               font-size: 12px;
               color: #64748B;
            }

            .modern-section-header {
               text-align: center;
               margin-bottom: 60px;
            }

            .modern-subtitle {
               color: #00BFA5;
               font-size: 14px;
               font-weight: 600;
               text-transform: uppercase;
               letter-spacing: 1px;
               margin-bottom: 12px;
            }

            .modern-main-title {
               font-size: 42px;
               font-weight: 800;
               color: #1E293B;
               line-height: 1.2;
               margin-bottom: 16px;
            }

            .modern-cta-btn {
               background: linear-gradient(135deg, #00BFA5, #009688);
               color: white;
               padding: 16px 32px;
               border-radius: 50px;
               font-weight: 600;
               text-decoration: none;
               display: inline-block;
               transition: all 0.3s ease;
               box-shadow: 0 4px 15px rgba(0, 191, 165, 0.3);
               border: none;
            }

            .modern-cta-btn:hover {
               transform: translateY(-2px);
               box-shadow: 0 8px 25px rgba(0, 191, 165, 0.4);
               color: white;
            }

            @media (max-width: 768px) {
               .modern-main-title {
                  font-size: 32px;
               }
               
               .modern-card-content {
                  padding: 20px;
               }
            }
         `}</style>

         <div className="tg-listing-area tg-listing-su-spacing tg-grey-bg-2 pt-120 p-relative">
            <img className="tg-listing-su-shape d-none d-xl-block" src="/assets/img/listing/su/shape-2.png" alt="" />
            <img className="tg-listing-su-shape-2 d-none d-xxl-block" src="/assets/img/listing/su/shape-1.png" alt="" />
            <div className="container">
               
               {/* Modern Section Header */}
               <div className="modern-section-header">
                  <div className="modern-subtitle wow fadeInUp" data-wow-delay=".4s">
                     Explore the world
                  </div>
                  <h2 className="modern-main-title wow fadeInUp" data-wow-delay=".5s">
                     Amazing Travel Packages<br />Around The World
                  </h2>
               </div>

               {/* Modern Cards Grid */}
               <div className="row">
                  {travel_package_data.filter((items) => items.page === "travel_packages").map((item) => (
                     <div key={item.id} className="col-xl-4 col-lg-4 col-md-6 mb-4">
                        <div className="modern-card">
                           
                           {/* Card Image */}
                           <div className="modern-card-image">
                              <Link to={`/package-details/${item.id}`}>
                                 <img src={item.thumb} alt={item.title} />
                              </Link>
                              
                              {/* Tag */}
                              {item.tag && (
                                 <div className="modern-tag">{item.tag}</div>
                              )}
                              
                              {/* Wishlist */}
                              <div className="modern-wishlist" onClick={() => handleAddToWishlist(item)}>
                                 <Wishlist />
                              </div>
                           </div>

                           {/* Card Content */}
                           <div className="modern-card-content">
                              
                              {/* Meta Info */}
                              <div className="modern-meta">
                                 <div className="modern-meta-item">
                                    <Clock />
                                    {item.duration}
                                 </div>
                                 {item.group_size && (
                                    <div className="modern-meta-item">
                                       <User />
                                       {item.group_size}
                                    </div>
                                 )}
                              </div>

                              {/* Title */}
                              <h4 className="modern-title">
                                 <Link to={`/package-details/${item.id}`}>{item.title}</Link>
                              </h4>

                              {/* Location */}
                              <div className="modern-location">
                                 <Location />
                                 {item.destination}, {item.location}
                              </div>

                              {/* Footer */}
                              <div className="modern-footer">
                                 <div className="modern-price">
                                    <div className="modern-price-label">From</div>
                                    <div className="modern-price-amount">${item.price}</div>
                                 </div>
                                 
                                 <div className="modern-rating">
                                    <span className="modern-rating-star">★</span>
                                    <span className="modern-rating-text">{item.rating}</span>
                                    <span className="modern-rating-reviews">{item.total_reviews}</span>
                                 </div>
                              </div>

                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* CTA Button */}
               <div className="text-center mt-5">
                  <Link to="/travel-packages" className="modern-cta-btn">
                     Explore All Packages
                  </Link>
               </div>

            </div>
         </div>
      </>
   )
}

export default Listing
