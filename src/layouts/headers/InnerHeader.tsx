import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// Components
import NavMenu from "./Menu/NavMenu";
import Offcanvas from "./Menu/Offcanvas";
import Sidebar from "./Menu/Sidebar";
import HeaderSearch from "./Menu/HeaderSearch";
import HeaderCart from "./Menu/HeaderCart";
import TotalCart from "./Menu/TotalCart";
import UseSticky from "../../hooks/UseSticky";

// Icons
import SearchIcon from "../../svg/SearchIcon";
import CartIconTwo from "../../svg/CartIconTwo";

const InnerHeader = () => {
   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [sidebar, setSidebar] = useState<boolean>(false);
   const [isSearch, setIsSearch] = useState<boolean>(false);

   // Refs for GSAP
   const headerRef = useRef(null);
   const logoRef = useRef(null);
   const menuRef = useRef(null);
   const actionsRef = useRef(null);

   useEffect(() => {
      const tl = gsap.timeline();
      tl.fromTo(logoRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(menuRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(actionsRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
   }, []);

   return (
      <>
         <style>{`
            .tg-header-main {
               position: fixed;
               top: 0;
               width: 100%;
               z-index: 1000;
               padding: 20px 0;
               transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Sticky State - Glassmorphism */
            .header-sticky {
               background: rgba(255, 255, 255, 0.85);
               backdrop-filter: blur(12px);
               padding: 12px 0;
               box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
               border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            .nav-link-wrap {
               margin-left: 60px;
            }

            /* Modern Travel Button */
            .tg-btn-book {
               background: #00BFA5; /* Tropical Teal */
               color: white;
               padding: 12px 28px;
               border-radius: 50px;
               font-weight: 600;
               font-size: 14px;
               transition: 0.3s;
               border: none;
               box-shadow: 0 4px 15px rgba(0, 191, 165, 0.3);
            }

            .tg-btn-book:hover {
               background: #009688;
               transform: translateY(-2px);
               box-shadow: 0 6px 20px rgba(0, 191, 165, 0.4);
               color: white;
            }

            .action-item {
               background: transparent;
               border: none;
               width: 45px;
               height: 45px;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               transition: 0.3s;
               margin-right: 10px;
               color: #1c2b38;
            }

            .action-item:hover {
               background: rgba(0, 191, 165, 0.1);
               color: #00BFA5;
            }

            .cart-badge {
               position: absolute;
               top: 5px;
               right: 5px;
               background: #FF6F61; /* Coral */
               color: white;
               font-size: 10px;
               padding: 2px 6px;
               border-radius: 10px;
            }

            .burger-icon span {
               display: block;
               width: 25px;
               height: 2px;
               background: #1c2b38;
               margin: 5px 0;
               transition: 0.3s;
            }
         `}</style>

         <header className={`tg-header-main ${sticky ? "header-sticky" : ""}`} ref={headerRef}>
            <div className="container">
               <div className="row align-items-center">
                  
                  {/* Logo */}
                  <div className="col-xl-2 col-lg-3 col-5" ref={logoRef}>
                     <div className="logo">
                        <Link to="/">
                           <img src="/assets/img/logo/logo-green.png" alt="Travel Logo" style={{ maxHeight: '45px' }} />
                        </Link>
                     </div>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="col-xl-7 col-lg-6 d-none d-xl-block" ref={menuRef}>
                     <nav className="nav-link-wrap">
                        <NavMenu />
                     </nav>
                  </div>

                  {/* Right Actions */}
                  <div className="col-xl-3 col-lg-3 col-7" ref={actionsRef}>
                     <div className="d-flex align-items-center justify-content-end">
                        
                        {/* Search Trigger */}
                        <button onClick={() => setIsSearch(true)} className="action-item d-none d-sm-flex">
                           <SearchIcon />
                        </button>

                        {/* Cart */}
                        <div className="position-relative d-none d-xl-block">
                           <button className="action-item">
                              <CartIconTwo />
                              <span className="cart-badge"><TotalCart /></span>
                           </button>
                           <HeaderCart />
                        </div>

                        {/* CTA - Book Now */}
                        <Link to="/contact" className="tg-btn-book d-none d-xxl-inline-block ms-3">
                           Book A Trip
                        </Link>

                        {/* Sidebar/Mobile Toggler */}
                        <div className="ms-3 d-flex align-items-center">
                           <button onClick={() => setSidebar(true)} className="action-item d-none d-xl-flex">
                              <div className="burger-icon">
                                 <span></span><span></span><span></span>
                              </div>
                           </button>
                           
                           <button onClick={() => setOffCanvas(true)} className="action-item d-xl-none">
                              <div className="burger-icon">
                                 <span></span><span></span><span></span>
                              </div>
                           </button>
                        </div>

                     </div>
                  </div>

               </div>
            </div>
         </header>

         {/* Overlay Components */}
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
      </>
   );
};

export default InnerHeader;