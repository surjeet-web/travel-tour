import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface DataType {
   id: number;
   icon: string;
   title: string;
   count: number;
}

const feature_data: DataType[] = [
   {
      id: 1,
      icon: "/assets/img/about/su/fun-3.png",
      title: "Top Destinations",
      count: 5000,
   },
   {
      id: 2,
      icon: "/assets/img/about/su/fun-2.png",
      title: "Bookings Completed",
      count: 3000
   },
   {
      id: 3,
      icon: "/assets/img/about/su/fun-1.png",
      title: "Happy Travelers",
      count: 8500
   },
]

const About = () => {
   const [counters, setCounters] = useState<number[]>([0, 0, 0]);

   useEffect(() => {
      const animateCounters = () => {
         feature_data.forEach((item, index) => {
            let start = 0;
            const end = item.count;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
               start += increment;
               if (start >= end) {
                  start = end;
                  clearInterval(timer);
               }
               setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = Math.floor(start);
                  return newCounters;
               });
            }, 16);
         });
      };

      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) {
               animateCounters();
               observer.disconnect();
            }
         },
         { threshold: 0.5 }
      );

      const element = document.querySelector('.tg-about-area');
      if (element) observer.observe(element);

      return () => observer.disconnect();
   }, []);

   return (
      <>
         <style>{`
            .modern-about-section {
               background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
               position: relative;
               overflow: hidden;
            }

            .modern-about-content {
               background: white;
               border-radius: 24px;
               padding: 40px;
               box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
               border: 1px solid rgba(0, 0, 0, 0.05);
               position: relative;
               z-index: 2;
            }

            .modern-subtitle {
               color: #00BFA5;
               font-size: 14px;
               font-weight: 700;
               text-transform: uppercase;
               letter-spacing: 1.5px;
               margin-bottom: 16px;
               position: relative;
            }

            .modern-subtitle::after {
               content: '';
               position: absolute;
               left: 0;
               bottom: -8px;
               width: 60px;
               height: 3px;
               background: linear-gradient(135deg, #00BFA5, #009688);
               border-radius: 2px;
            }

            .modern-main-title {
               font-size: 42px;
               font-weight: 800;
               color: #1E293B;
               line-height: 1.2;
               margin-bottom: 24px;
            }

            .modern-description {
               font-size: 16px;
               color: #64748B;
               line-height: 1.7;
               margin-bottom: 40px;
            }

            .modern-stats-grid {
               display: grid;
               grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
               gap: 30px;
               margin-bottom: 40px;
            }

            .modern-stat-card {
               background: linear-gradient(135deg, #00BFA5, #009688);
               color: white;
               padding: 30px 24px;
               border-radius: 20px;
               text-align: center;
               position: relative;
               overflow: hidden;
               transition: transform 0.3s ease;
            }

            .modern-stat-card:hover {
               transform: translateY(-8px);
            }

            .modern-stat-card::before {
               content: '';
               position: absolute;
               top: -50%;
               right: -50%;
               width: 100%;
               height: 100%;
               background: rgba(255, 255, 255, 0.1);
               border-radius: 50%;
               transition: transform 0.6s ease;
            }

            .modern-stat-card:hover::before {
               transform: scale(1.5);
            }

            .stat-icon {
               width: 60px;
               height: 60px;
               margin: 0 auto 20px;
               background: rgba(255, 255, 255, 0.2);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               position: relative;
               z-index: 2;
            }

            .stat-icon img {
               width: 32px;
               height: 32px;
               filter: brightness(0) invert(1);
            }

            .stat-number {
               font-size: 36px;
               font-weight: 800;
               margin-bottom: 8px;
               position: relative;
               z-index: 2;
            }

            .stat-label {
               font-size: 14px;
               font-weight: 600;
               opacity: 0.9;
               position: relative;
               z-index: 2;
            }

            .modern-author-section {
               display: flex;
               align-items: center;
               gap: 30px;
               flex-wrap: wrap;
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

            .modern-author-card {
               display: flex;
               align-items: center;
               gap: 16px;
               background: #F8FAFC;
               padding: 20px;
               border-radius: 16px;
               border: 1px solid rgba(0, 0, 0, 0.05);
            }

            .author-avatar {
               width: 60px;
               height: 60px;
               border-radius: 50%;
               overflow: hidden;
               border: 3px solid white;
               box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            .author-avatar img {
               width: 100%;
               height: 100%;
               object-fit: cover;
            }

            .author-info h5 {
               font-size: 16px;
               font-weight: 700;
               color: #1E293B;
               margin-bottom: 4px;
            }

            .author-info span {
               font-size: 14px;
               color: #64748B;
               font-weight: 500;
            }

            .modern-image-container {
               position: relative;
               border-radius: 24px;
               overflow: hidden;
               box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            }

            .modern-image-container img {
               width: 100%;
               height: auto;
               display: block;
            }

            .floating-element {
               position: absolute;
               background: white;
               padding: 20px;
               border-radius: 16px;
               box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
               z-index: 3;
            }

            .floating-element-1 {
               top: 20px;
               right: 20px;
               background: linear-gradient(135deg, #FF6F61, #E55A4F);
               color: white;
               text-align: center;
            }

            .floating-element-2 {
               bottom: 20px;
               left: 20px;
               background: white;
            }

            @media (max-width: 768px) {
               .modern-main-title {
                  font-size: 32px;
               }
               
               .modern-about-content {
                  padding: 30px 24px;
               }

               .modern-stats-grid {
                  grid-template-columns: 1fr;
                  gap: 20px;
               }

               .modern-author-section {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 20px;
               }
            }
         `}</style>

         <div className="tg-about-area modern-about-section p-relative z-index-1 pb-80">
            <img className="tg-about-su-right-shape d-none d-xl-block" src="/assets/img/about/su/right-shape.png" alt="" />
            <div className="container">
               <div className="row align-items-center">
                  
                  {/* Modern Image Section */}
                  <div className="col-lg-5">
                     <div className="modern-image-container mb-40 wow fadeInLeft" data-wow-delay=".4s">
                        <img src="/assets/img/about/su/thumb.png" alt="About Us" />
                        
                        {/* Floating Elements */}
                        <div className="floating-element floating-element-1">
                           <div style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
                              {counters[0]}+
                           </div>
                           <div style={{ fontSize: '12px', opacity: '0.9' }}>
                              Destinations
                           </div>
                        </div>
                        
                        <div className="floating-element floating-element-2">
                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ 
                                 width: '40px', 
                                 height: '40px', 
                                 background: 'linear-gradient(135deg, #00BFA5, #009688)', 
                                 borderRadius: '50%',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 color: 'white',
                                 fontSize: '18px'
                              }}>
                                 ✓
                              </div>
                              <div>
                                 <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>
                                    Verified Tours
                                 </div>
                                 <div style={{ fontSize: '12px', color: '#64748B' }}>
                                    100% Authentic
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Modern Content Section */}
                  <div className="col-lg-7">
                     <div className="modern-about-content ml-80 mb-30 wow fadeInRight" data-wow-delay=".4s">
                        
                        <div className="modern-subtitle">Who we are</div>
                        
                        <h2 className="modern-main-title">
                           Great Opportunities for Adventure & Travel Await
                        </h2>
                        
                        <p className="modern-description">
                           We're passionate about creating unforgettable travel experiences that connect you with the world's most 
                           amazing destinations. Our expert team curates authentic adventures, ensuring every journey becomes a 
                           cherished memory that lasts a lifetime.
                        </p>

                        {/* Modern Stats Grid */}
                        <div className="modern-stats-grid">
                           {feature_data.map((item, index) => (
                              <div key={item.id} className="modern-stat-card">
                                 <div className="stat-icon">
                                    <img src={item.icon} alt={item.title} />
                                 </div>
                                 <div className="stat-number">{counters[index]}+</div>
                                 <div className="stat-label">{item.title}</div>
                              </div>
                           ))}
                        </div>

                        {/* Modern Author Section */}
                        <div className="modern-author-section">
                           <Link className="modern-cta-btn" to="/about">
                              Discover Our Story
                           </Link>
                           
                           <div className="modern-author-card">
                              <div className="author-avatar">
                                 <img src="/assets/img/about/su/author.jpg" alt="Richard Kemel" />
                              </div>
                              <div className="author-info">
                                 <h5>Richard Kemel</h5>
                                 <span>CEO & Founder</span>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default About
