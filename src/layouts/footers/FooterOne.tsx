import { Link } from "react-router-dom";
import { useState } from "react";

const FooterOne = () => {
   const [email, setEmail] = useState("");
   const [isSubscribed, setIsSubscribed] = useState(false);
   const [, setIsFocused] = useState(false);

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
            /* Apple-Inspired Design Tokens */
            :root {
               --bg-primary: #000000;
               --bg-secondary: #1c1c1e;
               --text-primary: #f5f5f7;
               --text-secondary: #86868b;
               --accent: #2997ff;
               --accent-hover: #007aff;
               --border-subtle: rgba(255, 255, 255, 0.12);
               --border-focus: rgba(41, 151, 255, 0.4);
               --shadow-glow: rgba(41, 151, 255, 0.15);
            }

            /* Base Footer Styling */
            .apple-footer {
               background: var(--bg-primary);
               color: var(--text-primary);
               font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Inter', sans-serif;
               -webkit-font-smoothing: antialiased;
               -moz-osx-font-smoothing: grayscale;
               border-top: 1px solid var(--border-subtle);
            }

            .apple-footer-container {
               max-width: 980px;
               margin: 0 auto;
               padding: 80px 20px 40px;
            }

            /* Newsletter Section */
            .newsletter-section {
               display: flex;
               flex-direction: column;
               gap: 32px;
               padding-bottom: 40px;
               margin-bottom: 40px;
               border-bottom: 1px solid var(--border-subtle);
            }

            @media (min-width: 768px) {
               .newsletter-section {
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: flex-start;
               }
            }

            .newsletter-brand {
               max-width: 280px;
            }

            .brand-logo {
               display: flex;
               align-items: center;
               gap: 10px;
               margin-bottom: 16px;
            }

            .brand-logo svg {
               width: 28px;
               height: 28px;
               color: var(--text-primary);
            }

            .brand-name {
               font-size: 20px;
               font-weight: 600;
               letter-spacing: -0.02em;
               color: var(--text-primary);
            }

            .brand-description {
               font-size: 13px;
               line-height: 1.5;
               color: var(--text-secondary);
               font-weight: 400;
            }

            .newsletter-form-wrapper {
               width: 100%;
               max-width: 360px;
            }

            .newsletter-label {
               display: block;
               font-size: 12px;
               font-weight: 600;
               text-transform: uppercase;
               letter-spacing: 0.04em;
               color: var(--text-secondary);
               margin-bottom: 12px;
            }

            .newsletter-input-container {
               position: relative;
            }

            .newsletter-input {
               width: 100%;
               background: var(--bg-secondary);
               border: 1px solid transparent;
               border-radius: 12px;
               padding: 14px 48px 14px 18px;
               font-size: 14px;
               color: var(--text-primary);
               outline: none;
               transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
            }

            .newsletter-input::placeholder {
               color: var(--text-secondary);
               opacity: 0.7;
            }

            .newsletter-input:hover {
               border-color: rgba(255, 255, 255, 0.2);
            }

            .newsletter-input:focus {
               border-color: var(--accent);
               box-shadow: 0 0 0 4px var(--shadow-glow);
            }

            .newsletter-submit {
               position: absolute;
               right: 8px;
               top: 50%;
               transform: translateY(-50%);
               width: 36px;
               height: 36px;
               border-radius: 50%;
               border: none;
               background: var(--accent);
               color: white;
               display: flex;
               align-items: center;
               justify-content: center;
               cursor: pointer;
               opacity: 1;
               transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
            }

            .newsletter-submit svg {
               width: 16px;
               height: 16px;
            }

            .newsletter-submit:hover {
               background: var(--accent-hover);
               transform: translateY(-50%) scale(1.05);
            }

            .newsletter-disclaimer {
               margin-top: 12px;
               font-size: 11px;
               color: var(--text-secondary);
            }

            .success-toast {
               position: absolute;
               top: calc(100% + 8px);
               left: 0;
               right: 0;
               background: linear-gradient(135deg, #30d158, #28a745);
               color: white;
               padding: 10px 16px;
               border-radius: 10px;
               font-size: 13px;
               font-weight: 500;
               opacity: 0;
               transform: translateY(-8px);
               transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
               display: flex;
               align-items: center;
               gap: 8px;
            }

            .success-toast.show {
               opacity: 1;
               transform: translateY(0);
            }

            /* Links Grid */
            .links-grid {
               display: grid;
               grid-template-columns: repeat(2, 1fr);
               gap: 32px 24px;
               padding-bottom: 40px;
               border-bottom: 1px solid var(--border-subtle);
            }

            @media (min-width: 768px) {
               .links-grid {
                  grid-template-columns: repeat(4, 1fr);
                  gap: 40px 24px;
               }
            }

            @media (min-width: 1024px) {
               .links-grid {
                  grid-template-columns: repeat(5, 1fr);
               }
            }

            .footer-column h3 {
               font-size: 12px;
               font-weight: 600;
               color: var(--text-primary);
               margin-bottom: 16px;
               letter-spacing: 0.04em;
               text-transform: uppercase;
            }

            .footer-links {
               list-style: none;
               padding: 0;
               margin: 0;
            }

            .footer-links li {
               margin-bottom: 10px;
            }

            .footer-links a {
               font-size: 13px;
               color: var(--text-secondary);
               text-decoration: none;
               transition: all 0.3s ease;
               display: inline-block;
            }

            .footer-links a:hover {
               color: var(--text-primary);
               transform: translateX(4px);
            }

            /* Bottom Section */
            .footer-bottom {
               display: flex;
               flex-direction: column;
               gap: 16px;
               padding-top: 24px;
            }

            @media (min-width: 768px) {
               .footer-bottom {
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
               }
            }

            .footer-meta {
               display: flex;
               flex-wrap: wrap;
               align-items: center;
               gap: 8px 16px;
               font-size: 11px;
               color: var(--text-secondary);
            }

            .footer-meta a {
               color: var(--accent);
               text-decoration: none;
               transition: color 0.3s ease;
            }

            .footer-meta a:hover {
               text-decoration: underline;
            }

            .social-links {
               display: flex;
               gap: 8px;
            }

            .social-link {
               width: 36px;
               height: 36px;
               border-radius: 50%;
               background: var(--bg-secondary);
               display: flex;
               align-items: center;
               justify-content: center;
               color: var(--text-secondary);
               text-decoration: none;
               font-size: 14px;
               transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
               border: 1px solid transparent;
            }

            .social-link:hover {
               background: var(--text-primary);
               color: var(--bg-primary);
               transform: scale(1.08);
               border-color: rgba(255, 255, 255, 0.1);
            }

            /* Animations */
            @keyframes fadeInUp {
               from {
                  opacity: 0;
                  transform: translateY(20px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }

            .animate-fade-in {
               animation: fadeInUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            }

            .delay-1 { animation-delay: 0.1s; }
            .delay-2 { animation-delay: 0.2s; }
            .delay-3 { animation-delay: 0.3s; }
            .delay-4 { animation-delay: 0.4s; }
         `}</style>

         <footer className="apple-footer">
            <div className="apple-footer-container">
               
               {/* Newsletter Section with Brand */}
               <div className="newsletter-section animate-fade-in">
                  <div className="newsletter-brand">
                     <div className="brand-logo">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span className="brand-name">LuxuryTravel</span>
                     </div>
                     <p className="brand-description">
                        Crafted for those who seek extraordinary experiences. 
                        Your journey to perfection begins here.
                     </p>
                  </div>

                  <div className="newsletter-form-wrapper animate-fade-in delay-2">
                     <label className="newsletter-label">Stay Updated</label>
                     <div className="newsletter-input-container">
                        <form onSubmit={handleSubscribe}>
                           <input
                              type="email"
                              className="newsletter-input"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setIsFocused(true)}
                              onBlur={() => setIsFocused(false)}
                              required
                           />
                           <button 
                              type="submit" 
                              className="newsletter-submit"
                              aria-label="Subscribe"
                           >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                           </button>
                        </form>
                        <div className={`success-toast ${isSubscribed ? 'show' : ''}`}>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5"/>
                           </svg>
                           Successfully subscribed
                        </div>
                     </div>
                     <p className="newsletter-disclaimer">
                        Join our exclusive list. No spam, ever.
                     </p>
                  </div>
               </div>

               {/* Links Grid */}
               <div className="links-grid animate-fade-in delay-3">
                  
                  {/* Shop Column */}
                  <div className="footer-column">
                     <h3>Explore</h3>
                     <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/travel-packages">Travel Packages</Link></li>
                        <li><Link to="/car-listing">Car Rentals</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                     </ul>
                  </div>

                  {/* Services Column */}
                  <div className="footer-column">
                     <h3>Experiences</h3>
                     <ul className="footer-links">
                        <li><Link to="#">Adventure Tours</Link></li>
                        <li><Link to="#">Cultural Experiences</Link></li>
                        <li><Link to="#">Luxury Travel</Link></li>
                        <li><Link to="#">Group Tours</Link></li>
                        <li><Link to="#">Custom Packages</Link></li>
                     </ul>
                  </div>

                  {/* Support Column */}
                  <div className="footer-column">
                     <h3>Support</h3>
                     <ul className="footer-links">
                        <li><Link to="#">Help Center</Link></li>
                        <li><Link to="#">Booking Guide</Link></li>
                        <li><Link to="#">Safety Information</Link></li>
                        <li><Link to="#">FAQs</Link></li>
                        <li><Link to="#">Live Chat</Link></li>
                     </ul>
                  </div>

                  {/* Legal Column */}
                  <div className="footer-column">
                     <h3>Legal</h3>
                     <ul className="footer-links">
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms of Service</Link></li>
                        <li><Link to="#">Cookie Policy</Link></li>
                        <li><Link to="#">Accessibility</Link></li>
                     </ul>
                  </div>

                  {/* Company Column */}
                  <div className="footer-column">
                     <h3>Company</h3>
                     <ul className="footer-links">
                        <li><Link to="#">Our Story</Link></li>
                        <li><Link to="#">Careers</Link></li>
                        <li><Link to="#">Press</Link></li>
                        <li><Link to="#">Partners</Link></li>
                     </ul>
                  </div>
               </div>

               {/* Bottom Section */}
               <div className="footer-bottom animate-fade-in delay-4">
                  <div className="footer-meta">
                     <span>Copyright © {new Date().getFullYear()} LuxuryTravel Inc.</span>
                     <span>|</span>
                     <Link to="#">Privacy Policy</Link>
                     <span>|</span>
                     <Link to="#">Terms of Service</Link>
                  </div>
                  
                  <div className="social-links">
                     <Link to="#" className="social-link" aria-label="Twitter">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                     </Link>
                     <Link to="#" className="social-link" aria-label="Instagram">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                     </Link>
                     <Link to="#" className="social-link" aria-label="LinkedIn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                     </Link>
                     <Link to="#" className="social-link" aria-label="YouTube">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                     </Link>
                  </div>
               </div>
            </div>
         </footer>
      </>
   );
};

export default FooterOne;