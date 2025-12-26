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
         setTimeout(() => setIsSubscribed(false), 4000);
      }
   };

   return (
      <>
         <style>{`
            :root {
               --primary-glow: #00BFA5;
               --secondary-glow: #00E5FF;
               --footer-bg: #0F172A;
            }

            .modern-footer {
               background: var(--footer-bg);
               position: relative;
               overflow: hidden;
               padding-top: 100px;
               color: white;
            }

            /* --- Animated Background Shapes --- */
            .shape-emitter {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               pointer-events: none;
               z-index: 1;
            }

            .shape {
               position: absolute;
               border-radius: 50%;
               filter: blur(60px);
               opacity: 0.15;
               animation: float 20s infinite alternate ease-in-out;
            }

            .shape-1 { width: 400px; height: 400px; background: var(--primary-glow); top: -100px; right: -50px; }
            .shape-2 { width: 300px; height: 300px; background: var(--secondary-glow); bottom: -50px; left: -50px; animation-delay: -5s; }

            @keyframes float {
               0% { transform: translate(0, 0) rotate(0deg); }
               100% { transform: translate(50px, 100px) rotate(15deg); }
            }

            /* --- Wave Divider --- */
            .footer-wave {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               line-height: 0;
               transform: rotate(180deg);
            }

            .footer-wave svg {
               position: relative;
               display: block;
               width: calc(100% + 1.3px);
               height: 70px;
            }

            .footer-wave .shape-fill { fill: #ffffff; }

            /* --- Widget Styling --- */
            .footer-content { position: relative; z-index: 5; }

            .modern-footer-widget {
               background: rgba(255, 255, 255, 0.03);
               backdrop-filter: blur(12px);
               border-radius: 24px;
               padding: 40px;
               border: 1px solid rgba(255, 255, 255, 0.08);
               height: 100%;
               transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .modern-footer-widget:hover {
               transform: translateY(-10px);
               background: rgba(255, 255, 255, 0.06);
               border-color: rgba(0, 191, 165, 0.3);
               box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            }

            .footer-logo img {
               max-height: 50px;
               filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));
            }

            /* --- Typography --- */
            .footer-widget-title {
               font-size: 22px;
               font-weight: 800;
               margin-bottom: 30px;
               background: linear-gradient(to right, #fff, #94a3b8);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
            }

            /* --- Animated Links --- */
            .footer-links li { margin-bottom: 15px; }
            .footer-links a {
               color: #94a3b8;
               text-decoration: none;
               display: inline-flex;
               align-items: center;
               transition: 0.3s;
               position: relative;
            }

            .footer-links a::after {
               content: '';
               position: absolute;
               width: 0;
               height: 2px;
               bottom: -4px;
               left: 0;
               background: var(--primary-glow);
               transition: width 0.3s ease;
            }

            .footer-links a:hover { color: #fff; transform: translateX(8px); }
            .footer-links a:hover::after { width: 100%; }

            /* --- Newsletter --- */
            .newsletter-form {
               display: flex;
               background: rgba(0, 0, 0, 0.2);
               border-radius: 16px;
               padding: 8px;
               border: 1px solid rgba(255, 255, 255, 0.1);
               transition: 0.3s;
            }

            .newsletter-form:focus-within {
               border-color: var(--primary-glow);
               box-shadow: 0 0 15px rgba(0, 191, 165, 0.2);
            }

            .newsletter-input {
               background: transparent;
               border: none;
               padding: 12px;
               color: white;
               flex: 1;
               outline: none;
            }

            .newsletter-btn {
               background: var(--primary-glow);
               color: white;
               border: none;
               padding: 10px 20px;
               border-radius: 12px;
               cursor: pointer;
               transition: 0.3s;
               font-weight: 600;
            }

            .newsletter-btn:hover {
               transform: scale(1.05);
               background: #00e676;
            }

            /* --- Success Animation --- */
            .success-msg {
               display: flex;
               align-items: center;
               gap: 10px;
               color: #00e676;
               margin-top: 15px;
               font-weight: 500;
               animation: slideIn 0.5s ease forwards;
            }

            @keyframes slideIn {
               from { opacity: 0; transform: translateY(10px); }
               to { opacity: 1; transform: translateY(0); }
            }

            /* --- Social Icons --- */
            .social-container {
               display: flex;
               gap: 15px;
               margin-top: 30px;
            }

            .social-item {
               width: 45px;
               height: 45px;
               background: rgba(255,255,255,0.05);
               border-radius: 12px;
               display: flex;
               align-items: center;
               justify-content: center;
               color: white;
               transition: 0.4s;
               border: 1px solid rgba(255,255,255,0.1);
            }

            .social-item:hover {
               background: var(--primary-glow);
               transform: translateY(-5px) rotate(8deg);
               border-color: transparent;
            }

            .copyright-bar {
               padding: 30px 0;
               border-top: 1px solid rgba(255,255,255,0.05);
               margin-top: 80px;
               text-align: center;
               color: #64748b;
            }
         `}</style>

         <footer className="modern-footer">
            {/* Background Decorations */}
            <div className="shape-emitter">
               <div className="shape shape-1"></div>
               <div className="shape shape-2"></div>
            </div>

            {/* Wave Divider */}
            <div className="footer-wave">
               <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
               </svg>
            </div>

            <div className="footer-content">
               <div className="container">
                  <div className="row g-4">
                     
                     {/* Brand Section */}
                     <div className="col-xl-4 col-lg-4 col-md-12">
                        <div className="modern-footer-widget">
                           <div className="footer-logo mb-4">
                              <Link to="/">
                                 <img src="/assets/img/logo/logo-white.png" alt="Logo" />
                              </Link>
                           </div>
                           <p className="mb-4" style={{color: '#94a3b8', lineHeight: '1.8'}}>
                              Embark on journeys that redefine your perspective. We create 
                              bespoke travel experiences for the modern explorer.
                           </p>
                           
                           <h4 className="footer-widget-title" style={{fontSize: '18px', marginBottom: '15px'}}>Subscribe to the Muse</h4>
                           <form onSubmit={handleSubscribe} className="newsletter-form">
                              <input 
                                 type="email" 
                                 className="newsletter-input"
                                 placeholder="your@email.com"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                              />
                              <button className="newsletter-btn" type="submit">Join</button>
                           </form>
                           {isSubscribed && (
                              <div className="success-msg">
                                 <i className="fa-solid fa-circle-check"></i>
                                 <span>Welcome to the inner circle!</span>
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Quick Navigation */}
                     <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                        <div className="modern-footer-widget">
                           <h3 className="footer-widget-title">Explore</h3>
                           <ul className="footer-links list-unstyled">
                              <li><Link to="/">Our Story</Link></li>
                              <li><Link to="/travel-packages">Destinations</Link></li>
                              <li><Link to="/car-listing">Luxury Fleet</Link></li>
                              <li><Link to="/contact">Guides</Link></li>
                           </ul>
                        </div>
                     </div>

                     {/* Contact & Support */}
                     <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="modern-footer-widget">
                           <h3 className="footer-widget-title">Concierge</h3>
                           <div className="d-flex align-items-center mb-3">
                              <div className="social-item me-3" style={{width: '35px', height: '35px'}}>
                                 <i className="fa-solid fa-phone" style={{fontSize: '14px'}}></i>
                              </div>
                              <span style={{color: '#94a3b8'}}>+1 (888) TRAVEL</span>
                           </div>
                           <div className="d-flex align-items-center mb-4">
                              <div className="social-item me-3" style={{width: '35px', height: '35px'}}>
                                 <i className="fa-solid fa-envelope" style={{fontSize: '14px'}}></i>
                              </div>
                              <span style={{color: '#94a3b8'}}>hello@tourex.com</span>
                           </div>
                           <div className="social-container">
                              <Link to="#" className="social-item"><i className="fa-brands fa-facebook-f"></i></Link>
                              <Link to="#" className="social-item"><i className="fa-brands fa-instagram"></i></Link>
                              <Link to="#" className="social-item"><i className="fa-brands fa-x-twitter"></i></Link>
                           </div>
                        </div>
                     </div>

                     {/* Location/Hours */}
                     <div className="col-xl-3 col-lg-3 col-md-4">
                        <div className="modern-footer-widget">
                           <h3 className="footer-widget-title">The Studio</h3>
                           <p style={{color: '#94a3b8', fontSize: '15px'}}>
                              58 Street Commercial Road<br />
                              Victoria, Melbourne 3004<br />
                              Australia
                           </p>
                           <hr style={{borderColor: 'rgba(255,255,255,0.1)'}} />
                           <div className="d-flex justify-content-between align-items-center">
                              <span style={{fontSize: '13px', color: '#64748b'}}>MON - FRI</span>
                              <span style={{fontSize: '13px', color: '#00BFA5'}}>09:00 - 18:00</span>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               <div className="copyright-bar">
                  <div className="container">
                     <p className="mb-0">
                        © 2025 <span style={{color: '#fff', fontWeight: '600'}}>Tourex</span>. 
                        Crafted with passion for global citizens. 
                        <Link to="#" className="ms-3 text-secondary">Privacy</Link>
                        <Link to="#" className="ms-3 text-secondary">Terms</Link>
                     </p>
                  </div>
               </div>
            </div>
         </footer>
      </>
   )
}

export default FooterOne;