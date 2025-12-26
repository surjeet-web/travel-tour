/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type JSX } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper/modules";

interface TravelTestimonialData {
  id: number;
  name: string;
  designation: string;
  description: string;
  profileImage: string;
  location?: string;
  rating?: number;
  tripType?: string;
  backgroundImage?: string;
}

// Sample travel testimonial data with local image paths
const travel_testi_data: TravelTestimonialData[] = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Marketing Director",
    description: "Traxeego crafted the most extraordinary honeymoon experience for us. From the private villa overlooking the Maldives' crystal waters to the curated sunset cruise, every moment felt like a dream.",
    profileImage: "/assets/img/testimonial/tes-4/tes-1.png",
    location: "Maldives",
    rating: 5,
    tripType: "Honeymoon",
    backgroundImage: "/assets/img/testimonial/travel/destination-1.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    designation: "Entrepreneur",
    description: "As someone who values both luxury and authenticity, Traxeego exceeded all expectations. Their Swiss Alps adventure combined five-star accommodations with off-the-beaten-path experiences.",
    profileImage: "/assets/img/testimonial/tes-4/tes-2.png",
    location: "Switzerland",
    rating: 5,
    tripType: "Adventure",
    backgroundImage: "/assets/img/testimonial/travel/destination-2.jpg",
  },
  {
    id: 3,
    name: "Emma Thompson",
    designation: "Creative Director",
    description: "The Kyoto cultural immersion program was masterfully designed. Traxeego connected us with local artisans, arranged private tea ceremonies, and secured reservations at hidden gem restaurants.",
    profileImage: "/assets/img/testimonial/tes-4/tes-3.png",
    location: "Japan",
    rating: 5,
    tripType: "Cultural",
    backgroundImage: "/assets/img/testimonial/travel/destination-3.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    designation: "Investment Banker",
    description: "Corporate retreats have never been this seamless. Traxeego handled everything from luxury villa bookings in Provence to team-building activities in the vineyards.",
    profileImage: "/assets/img/testimonial/tes-4/tes-4.png",
    location: "France",
    rating: 5,
    tripType: "Corporate",
    backgroundImage: "/assets/img/testimonial/travel/destination-4.jpg",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    designation: "Photographer",
    description: "I wanted to capture Iceland's raw beauty, and Traxeego delivered the perfect itinerary. Every shot I took became a masterpiece. They understood a photographer's needs perfectly.",
    profileImage: "/assets/img/testimonial/tes-4/tes-2.png",
    location: "Iceland",
    rating: 5,
    tripType: "Photography",
    backgroundImage: "/assets/img/testimonial/travel/destination-5.jpg",
  },
  {
    id: 6,
    name: "James Wilson",
    designation: "Family Vacationer",
    description: "Traveling with three children might sound chaotic, but Traxeego made it magical. The family safari in Kenya was educational, exciting, and comfortable all at once.",
    profileImage: "/assets/img/testimonial/tes-4/tes-1.png",
    location: "Kenya",
    rating: 5,
    tripType: "Family",
    backgroundImage: "/assets/img/testimonial/travel/destination-6.jpg",
  },
];

// Swiper settings for the main testimonial slider
const testimonialSetting = {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 0,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: false,
  navigation: {
    prevEl: ".tg-travel-testi-prev",
    nextEl: ".tg-travel-testi-next",
  },
  modules: [Navigation, Autoplay],
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5 justify-center mb-20">
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`fas fa-star ${i < rating ? 'text-warning' : 'text-body-secondary'}`}
          style={i < rating ? { color: '#FFD700' } : { color: '#d1d5db' }}
        ></i>
      ))}
    </div>
  );
};

// Single testimonial card component
const TravelTestimonialCard = ({ data }: { data: TravelTestimonialData }) => {
  return (
    <div className="tg-travel-testimonial-card">
      {/* Background Image */}
      <div 
        className="tg-travel-testimonial-bg"
        style={{ 
          backgroundImage: `url(${data.backgroundImage || '/assets/img/testimonial/travel/default.jpg'})`,
        }}
      >
        <div className="tg-travel-testimonial-overlay"></div>
      </div>

      {/* Content */}
      <div className="tg-travel-testimonial-content">
        {/* Trip Type Badge */}
        {data.tripType && (
          <div className="tg-travel-trip-badge">
            <i className="fas fa-paper-plane mr-2" style={{ fontSize: '12px' }}></i>
            {data.tripType}
          </div>
        )}

        {/* Location */}
        {data.location && (
          <div className="tg-travel-location">
            <i className="fas fa-map-marker-alt mr-2" style={{ fontSize: '14px' }}></i>
            {data.location}
          </div>
        )}

        {/* Quote Icon */}
        <div className="tg-travel-quote-icon mb-25">
          <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.28571 44H17.1429L25.7143 26.4V0H0V26.4H12.8571L4.28571ZM38.5714 44H51.4286L60 26.4V0H34.2857V26.4H47.1429L38.5714 44Z" fill="rgba(255,255,255,0.3)" />
          </svg>
        </div>

        {/* Description */}
        <p className="tg-travel-testimonial-desc mb-20">
          "{data.description}"
        </p>

        {/* Rating */}
        {data.rating && <StarRating rating={data.rating} />}

        {/* Profile */}
        <div className="tg-travel-testimonial-profile">
          <div className="tg-travel-avatar">
            <img src={data.profileImage} alt={data.name} />
          </div>
          <div className="tg-travel-info">
            <h5 className="tg-travel-name">{data.name}</h5>
            <span className="tg-travel-designation">{data.designation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TravelTestimonial = () => {
  return (
    <section className="tg-travel-testimonial-area pt-160 pb-100">
      <div className="container">
        {/* Section Header */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="tg-travel-section-header text-center mb-60">
              <div className="tg-travel-section-tag mb-25">
                <i className="fas fa-star" style={{ fontSize: '14px' }}></i>
                Traveler Stories
              </div>
              <h2 className="tg-travel-section-title mb-15">
                Discover What Our <span style={{ fontWeight: 300 }}>Travelers</span> Say
              </h2>
              <p className="tg-travel-section-subtitle">
                Real stories from real travelers who have experienced the Traxeego difference. 
                Every review is a testament to our commitment to extraordinary journeys.
              </p>
            </div>
          </div>
        </div>

        {/* Main Slider */}
        <div className="tg-travel-main-slider">
          <Swiper {...testimonialSetting} className="swiper-container tg-travel-testimonial-active">
            {travel_testi_data.map((item) => (
              <SwiperSlide key={item.id}>
                <TravelTestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div className="tg-travel-slider-nav">
            <button className="tg-travel-nav-btn tg-travel-testi-prev">
              <i className="fas fa-arrow-left" style={{ fontSize: '16px' }}></i>
            </button>
            <button className="tg-travel-nav-btn tg-travel-testi-next">
              <i className="fas fa-arrow-right" style={{ fontSize: '16px' }}></i>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="tg-travel-stats">
          <div className="tg-travel-stat">
            <div className="tg-travel-stat-value">50K+</div>
            <div className="tg-travel-stat-label">Happy Travelers</div>
          </div>
          <div className="tg-travel-stat">
            <div className="tg-travel-stat-value">98%</div>
            <div className="tg-travel-stat-label">Satisfaction Rate</div>
          </div>
          <div className="tg-travel-stat">
            <div className="tg-travel-stat-value">120+</div>
            <div className="tg-travel-stat-label">Destinations</div>
          </div>
          <div className="tg-travel-stat">
            <div className="tg-travel-stat-value">24/7</div>
            <div className="tg-travel-stat-label">Concierge Support</div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .tg-travel-testimonial-area {
          position: relative;
          overflow: hidden;
        }
        
        .tg-travel-section-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f8f9fa;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .tg-travel-section-title {
          font-size: 48px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
        }
        
        @media (max-width: 768px) {
          .tg-travel-section-title {
            font-size: 32px;
          }
        }
        
        .tg-travel-section-subtitle {
          font-size: 18px;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        
        .tg-travel-main-slider {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .tg-travel-testimonial-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          min-height: 550px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          margin: 0 auto;
        }
        
        .tg-travel-testimonial-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }
        
        .tg-travel-testimonial-card:hover .tg-travel-testimonial-bg {
          transform: scale(1.05);
        }
        
        .tg-travel-testimonial-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.3) 40%,
            rgba(0,0,0,0.85) 100%
          );
        }
        
        .tg-travel-testimonial-content {
          position: relative;
          z-index: 2;
          padding: 45px 45px 35px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 550px;
        }
        
        .tg-travel-trip-badge {
          position: absolute;
          top: 25px;
          left: 25px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
        }
        
        .tg-travel-location {
          position: absolute;
          top: 25px;
          right: 25px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          display: flex;
          align-items: center;
        }
        
        .tg-travel-quote-icon svg {
          opacity: 0.5;
        }
        
        .tg-travel-testimonial-desc {
          font-size: 20px;
          line-height: 1.7;
          color: #fff;
          font-weight: 300;
        }
        
        @media (max-width: 768px) {
          .tg-travel-testimonial-desc {
            font-size: 17px;
          }
          
          .tg-travel-testimonial-content {
            padding: 35px 30px 30px;
          }
        }
        
        .tg-travel-testimonial-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 25px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }
        
        .tg-travel-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }
        
        .tg-travel-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .tg-travel-info {
          flex: 1;
        }
        
        .tg-travel-name {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        
        .tg-travel-designation {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }
        
        /* Navigation Styles */
        .tg-travel-slider-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }
        
        .tg-travel-nav-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
          color: #333;
        }
        
        .tg-travel-nav-btn:hover {
          background: #7C37FF;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(124, 55, 255, 0.3);
        }
        
        .tg-travel-nav-btn.swiper-button-disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .tg-travel-nav-btn.swiper-button-disabled:hover {
          background: #fff;
          color: #333;
          transform: none;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        
        /* Stats Section */
        .tg-travel-stats {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px 60px;
          margin-top: 60px;
          padding-top: 60px;
          border-top: 1px solid rgba(0,0,0,0.08);
        }
        
        .tg-travel-stat {
          text-align: center;
        }
        
        .tg-travel-stat-value {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 10px;
        }
        
        .tg-travel-stat-label {
          font-size: 13px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
          .tg-travel-stat-value {
            font-size: 32px;
          }
          
          .tg-travel-stats {
            gap: 30px 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default TravelTestimonial;
