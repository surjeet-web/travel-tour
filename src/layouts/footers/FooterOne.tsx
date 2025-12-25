import { Link } from "react-router-dom";
import { useState } from "react";

const FooterOne = () => {
   const [email, setEmail] = useState("");
   const [isSubscribed, setIsSubscribed] = useState(false);

   const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (email) {
         setIsSubscribed(true);
         setEmail("");
         setTimeout(() => setIsSubscribed(false), 3000);
      }
   };

   return (
      <>
         <style>{`
            .modern-footer {
               background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
               position: relative;
               overflow: hidden;
            }

            .modern-footer::before {
               content: '';
               position: absolute;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               background: url('/assets/img/footer/footer.jpg') center/cover;
               opacity: 0.1;
               z-index: 1;
            }

            .footer-content {
               position: relative;
               z-index: 2;
            }

            .modern-footer-widget {
               background: rgba(255, 255, 255, 0.05);
               backdrop-filter: blur(10px);
               border-radius: 20px;
               padding: 32px;
               border: 1px solid rgba(255, 255, 255, 0.1);
               height: 100%;
               transition: transform 0.3s ease;
            }

            .modern-footer-widget:hover {
               transform: translateY(-5px);
            }

            .footer-logo {
               margin-bottom: 24px;
            }

            .footer-logo img {
               max-height: 50px;
            }

            .footer-description {
               color: rgba(255, 255, 255, 0.8);
               font-size: 16px;
               line-height: 1.6;
               margin-bottom: 32px;
            }

            .modern-newsletter {
               position: relative;
               margin-bottom: 32px;
            }

            .newsletter-form {
               display: flex;
               background: rgba(255, 255, 255, 0.1);
               border-radius: 50px;
               padding: 6px;
               border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .newsletter-input {
               flex: 1;
               background: transparent;
               border: none;
               padding: 12px 20px;
               color: white;
               font-size: 14px;
               outline: none;
            }

            .newsletter-input::placeholder {
               color: rgba(255, 255, 255, 0.6);
            }

            .newsletter-btn {
               background: linear-gradient(135deg, #00BFA5, #009688);
               border: none;
               width: 48px;
               height: 48px;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               cursor: pointer;
               transition: all 0.3s ease;
            }

            .newsletter-btn:hover {
               transform: scale(1.05);
               box-shadow: 0 4px 15px rgba(0, 191, 165, 0.4);
            }

            .success-message {
               position: absolute;
               top: 100%;
               left: 0;
               right: 0;
               background: #10B981;
               color: white;
               padding: 8px 16px;
               border-radius: 8px;
               font-size: 14px;
               margin-top: 8px;
               opacity: 0;
               transform: translateY(-10px);
               transition: all 0.3s ease;
            }

            .success-message.show {
               opacity: 1;
               transform: translateY(0);
            }

            .modern-social {
               display: flex;
               gap: 12px;
            }

            .social-link {
               width: 44px;
               height: 44px;
               background: rgba(255, 255, 255, 0.1);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               color: white;
               text-decoration: none;
               transition: all 0.3s ease;
               border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .social-link:hover {
               background: #00BFA5;
               color: white;
               transform: translateY(-3px);
               box-shadow: 0 6px 20px rgba(0, 191, 165, 0.3);
            }

            .footer-widget-title {
               color: white;
               font-size: 20px;
               font-weight: 700;
               margin-bottom: 24px;
               position: relative;
            }

            .footer-widget-title::after {
               content: '';
               position: absolute;
               left: 0;
               bottom: -8px;
               width: 40px;
               height: 3px;
               background: linear-gradient(135deg, #00BFA5, #009688);
               border-radius: 2px;
            }

            .footer-links {
               list-style: none;
               padding: 0;
               margin: 0;
            }

            .footer-links li {
               margin-bottom: 12px;
            }

            .footer-links a {
               color: rgba(255, 255, 255, 0.8);
               text-decoration: none;
               font-size: 15px;
               transition: all 0.3s ease;
               display: flex;
               align-items: center;
               gap: 8px;
            }

            .footer-links a:hover {
               color: #00BFA5;
               transform: translateX(5px);
            }

            .footer-links a::before {
               content: '→';
               opacity: 0;
               transition: opacity 0.3s ease;
            }

            .footer-links a:hover::before {
               opacity: 1;
            }

            .contact-item {
               display: flex;
               align-items: flex-start;
               gap: 16px;
               margin-bottom: 20px;
               color: rgba(255, 255, 255, 0.8);
               font-size: 15px;
               line-height: 1.6;
            }

            .contact-icon {
               width: 20px;
               height: 20px;
               color: #00BFA5;
               flex-shrink: 0;
               margin-top: 2px;
            }

            .modern-copyright {
               background: rgba(0, 0, 0, 0.3);
               backdrop-filter: blur(10px);
               border-top: 1px solid rgba(255, 255, 255, 0.1);
               padding: 24px 0;
               text-align: center;
               color: rgba(255, 255, 255, 0.8);
               font-size: 14px;
            }

            .modern-copyright a {
               color: #00BFA5;
               text-decoration: none;
               font-weight: 600;
            }

            .modern-copyright a:hover {
               color: white;
            }

            @media (max-width: 768px) {
               .modern-footer-widget {
                  padding: 24px;
                  margin-bottom: 24px;
               }

               .footer-widget-title {
                  font-size: 18px;
               }
            }
         `}</style>

         <footer className="modern-footer">
            <div className="footer-content">
               <div className="container">
                  <div className="tg-footer-top mb-45 pt-80 pb-40">
                     <div className="row">
                        
                        {/* Company Info */}
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                           <div className="modern-footer-widget">
                              <div className="footer-logo">
                                 <Link to="/">
                                    <img src="/assets/img/logo/logo-white.png" alt="Tourex Logo" />
                                 </Link>
                              </div>
                              <p className="footer-description">
                                 Discover the world's most amazing destinations with our expertly curated travel experiences. 
                                 Your adventure begins here.
                              </p>
                              
                              <div className="modern-newsletter">
                                 <form onSubmit={handleSubscribe} className="newsletter-form">
                                    <input 
                                       type="email" 
                                       className="newsletter-input"
                                       placeholder="Enter your email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       required
                                    />
                                    <button className="newsletter-btn" type="submit">
                                       <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M1.52514 8.47486H20.4749M20.4749 8.47486L13.5 1.5M20.4749 8.47486L13.5 15.4497" stroke="white" strokeWidth="1.77778" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                    </button>
                                 </form>
                                 <div className={`success-message ${isSubscribed ? 'show' : ''}`}>
                                    ✓ Successfully subscribed to our newsletter!
                                 </div>
                              </div>
                              
                              <div className="modern-social">
                                 <Link to="#" className="social-link">
                                    <i className="fa-brands fa-facebook-f"></i>
                                 </Link>
                                 <Link to="#" className="social-link">
                                    <i className="fa-brands fa-twitter"></i>
                                 </Link>
                                 <Link to="#" className="social-link">
                                    <i className="fa-brands fa-instagram"></i>
                                 </Link>
                                 <Link to="#" className="social-link">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                 </Link>
                                 <Link to="#" className="social-link">
                                    <i className="fa-brands fa-youtube"></i>
                                 </Link>
                              </div>
                           </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                           <div className="modern-footer-widget">
                              <h3 className="footer-widget-title">Quick Links</h3>
                              <ul className="footer-links">
                                 <li><Link to="/">Home</Link></li>
                                 <li><Link to="/about">About Us</Link></li>
                                 <li><Link to="/travel-packages">Travel Packages</Link></li>
                                 <li><Link to="/car-listing">Car Rentals</Link></li>
                                 <li><Link to="/contact">Contact Us</Link></li>
                              </ul>
                           </div>
                        </div>

                        {/* Services */}
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                           <div className="modern-footer-widget">
                              <h3 className="footer-widget-title">Our Services</h3>
                              <ul className="footer-links">
                                 <li><Link to="#">Adventure Tours</Link></li>
                                 <li><Link to="#">Cultural Experiences</Link></li>
                                 <li><Link to="#">Luxury Travel</Link></li>
                                 <li><Link to="#">Group Tours</Link></li>
                                 <li><Link to="#">Custom Packages</Link></li>
                              </ul>
                           </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                           <div className="modern-footer-widget">
                              <h3 className="footer-widget-title">Get In Touch</h3>
                              
                              <div className="contact-item">
                                 <svg className="contact-icon" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.0013 10.0608C19.0013 16.8486 10.3346 22.6668 10.3346 22.6668C10.3346 22.6668 1.66797 16.8486 1.66797 10.0608C1.66797 7.74615 2.58106 5.52634 4.20638 3.88965C5.83169 2.25297 8.03609 1.3335 10.3346 1.3335C12.6332 1.3335 14.8376 2.25297 16.4629 3.88965C18.0882 5.52634 19.0013 7.74615 19.0013 10.0608Z" stroke="currentColor" strokeWidth="1.73333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.3346 12.9699C11.9301 12.9699 13.2235 11.6674 13.2235 10.0608C13.2235 8.45412 11.9301 7.15168 10.3346 7.15168C8.73915 7.15168 7.44575 8.45412 7.44575 10.0608C7.44575 11.6674 8.73915 12.9699 10.3346 12.9699Z" stroke="currentColor" strokeWidth="1.73333" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 <div>
                                    58 Street Commercial Road<br />
                                    Fratton, Australia
                                 </div>
                              </div>

                              <div className="contact-item">
                                 <i className="fa-sharp fa-solid fa-phone contact-icon"></i>
                                 <div>
                                    <Link to="tel:+1238889999" style={{ color: 'inherit' }}>
                                       +123 888 9999
                                    </Link>
                                 </div>
                              </div>

                              <div className="contact-item">
                                 <svg className="contact-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9987 5.60006V12.0001L16.2654 14.1334M22.6654 12.0002C22.6654 17.8912 17.8897 22.6668 11.9987 22.6668C6.10766 22.6668 1.33203 17.8912 1.33203 12.0002C1.33203 6.10912 6.10766 1.3335 11.9987 1.3335C17.8897 1.3335 22.6654 6.10912 22.6654 12.0002Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 <div>
                                    Mon – Sat: 8 am – 5 pm<br />
                                    Sunday: <span style={{ color: '#00BFA5', fontWeight: '600' }}>CLOSED</span>
                                 </div>
                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="modern-copyright">
                  <div className="container">
                     <span>
                        Copyright © 2024 <Link to="#">Tourex</Link> | All Rights Reserved | 
                        <Link to="#" style={{ marginLeft: '8px' }}>Privacy Policy</Link> | 
                        <Link to="#" style={{ marginLeft: '8px' }}>Terms of Service</Link>
                     </span>
                  </div>
               </div>
            </div>
         </footer>
      </>
   )
}

export default FooterOne
