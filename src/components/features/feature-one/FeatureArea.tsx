"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import FeatureTop from "./FeatureTop"
import FeatureSidebar from "./FeatureSidebar";
import ReactPaginate from "react-paginate";
import UseProducts from "../../../hooks/UseProducts";
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import travel_package_data, { type TravelPackageType } from "../../../data/TravelPackageData";
import LazyImage from "../../common/LazyImage";

// Memoized card component for better performance
const TravelPackageCard = memo(({ 
  item, 
  onAddToWishlist 
}: { 
  item: TravelPackageType; 
  onAddToWishlist: (item: TravelPackageType) => void;
}) => (
  <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 tg-grid-full">
    <div className="tg-listing-card-item tg-listing-4-card-item mb-25 modern-card">
      <div className="tg-listing-card-thumb tg-listing-2-card-thumb mb-15 fix p-relative modern-card-image">
        <Link to={`/package-details/${item.id}`}>
          <LazyImage 
            src={item.thumb} 
            alt={item.title}
            className="tg-card-border w-100"
            loading="lazy"
          />
          
          {item.tag && (
            <span className="tg-listing-item-price-discount shape modern-tag">
              {item.tag}
            </span>
          )}
          
          {item.featured && (
            <span className="tg-listing-item-price-discount shape-3 modern-featured">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.60156 1L0.601562 8.2H6.00156L5.40156 13L11.4016 5.8H6.00156L6.60156 1Z" stroke="white" strokeWidth="0.857143" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item.featured}
            </span>
          )}
          
          {item.recommended && (
            <span className="tg-listing-item-price-discount offer-btm shape-2 modern-recommended">
              {item.recommended}
            </span>
          )}
        </Link>
        
        <div className="tg-listing-2-price modern-price-badge">
          {item.original_price && <del>${item.original_price}</del>}
          <span className="new">${item.price}</span>
          <span className="shift">/person</span>
        </div>
      </div>
      
      <div className="tg-listing-card-content p-relative modern-card-content">
        <h4 className="tg-listing-card-title mb-5 modern-title">
          <Link to={`/package-details/${item.id}`}>{item.title}</Link>
        </h4>
        
        <span className="tg-listing-card-duration-map d-inline-block modern-location">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3329 6.7071C12.3329 11.2324 6.55512 15.1111 6.55512 15.1111C6.55512 15.1111 0.777344 11.2324 0.777344 6.7071C0.777344 5.16402 1.38607 3.68414 2.46962 2.59302C3.55316 1.5019 5.02276 0.888916 6.55512 0.888916C8.08748 0.888916 9.55708 1.5019 10.6406 2.59302C11.7242 3.68414 12.3329 5.16402 12.3329 6.7071Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.55512 8.64649C7.61878 8.64649 8.48105 7.7782 8.48105 6.7071C8.48105 5.636 7.61878 4.7677 6.55512 4.7677C5.49146 4.7677 4.6292 5.636 4.6292 6.7071C4.6292 7.7782 5.49146 8.64649 6.55512 8.64649Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {item.destination}, {item.location}
        </span>
        
        <div className="tg-listing-card-review mb-10 modern-rating">
          <Rating initialValue={item.rating} size={16} readonly={true} />
          <span className="tg-listing-rating-percent">({item.total_reviews} Reviews)</span>
        </div>
        
        <div className="tg-listing-avai d-flex align-items-center justify-content-between modern-actions">
          <Link className="tg-listing-avai-btn modern-book-btn" to={`/package-details/${item.id}`}>
            Book Now
          </Link>
          <div className="tg-listing-item-wishlist modern-wishlist">
            <button 
              onClick={() => onAddToWishlist(item)} 
              className="wishlist-btn"
              aria-label="Add to wishlist"
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
));

TravelPackageCard.displayName = 'TravelPackageCard';

const FeatureArea = () => {
   const dispatch = useDispatch();
   const { setProducts } = UseProducts();
   const [isListView, setIsListView] = useState(false);

   const itemsPerPage = 9;
   const [itemOffset, setItemOffset] = useState(0);
   
   // Memoize filtered products for better performance
   const filteredProducts = useMemo(() => 
     travel_package_data.filter((item: TravelPackageType) => item.page === "travel_packages"),
     []
   );
   
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
   const currentItems = useMemo(() => 
     filteredProducts.slice(itemOffset, itemOffset + itemsPerPage),
     [filteredProducts, itemOffset, itemsPerPage]
   );

   const startOffset = itemOffset + 1;
   const endOffset = Math.min(itemOffset + itemsPerPage, filteredProducts.length);
   const totalItems = filteredProducts.length;

   const handlePageClick = useCallback(({ selected }: { selected: number }) => {
      const newOffset = selected * itemsPerPage;
      setItemOffset(newOffset);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }, [itemsPerPage]);

   const handleAddToWishlist = useCallback(
      (item: TravelPackageType) => {
         dispatch(addToWishlist(item));
      },
      [dispatch]
   );

   const handleListViewClick = useCallback(() => {
      setIsListView(true);
   }, []);
   
   const handleGridViewClick = useCallback(() => {
      setIsListView(false);
   }, []);

   return (
      <>
        <style>{`
          .modern-card {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .modern-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }
          
          .modern-card-image {
            position: relative;
            overflow: hidden;
            border-radius: 16px 16px 0 0;
          }
          
          .modern-card-image img {
            transition: transform 0.3s ease;
          }
          
          .modern-card:hover .modern-card-image img {
            transform: scale(1.05);
          }
          
          .modern-tag {
            background: linear-gradient(135deg, #00BFA5, #00ACC1);
            border-radius: 12px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            color: white;
            border: none;
          }
          
          .modern-featured {
            background: linear-gradient(135deg, #FF6B35, #F7931E);
            border-radius: 12px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            color: white;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          .modern-recommended {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 12px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            color: white;
          }
          
          .modern-price-badge {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 8px 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .modern-card-content {
            padding: 20px;
          }
          
          .modern-title a {
            color: #1a1a1a;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          .modern-title a:hover {
            color: #00BFA5;
          }
          
          .modern-location {
            color: #666;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .modern-rating {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .modern-actions {
            margin-top: 16px;
          }
          
          .modern-book-btn {
            background: linear-gradient(135deg, #00BFA5, #00ACC1);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
          }
          
          .modern-book-btn:hover {
            background: linear-gradient(135deg, #00ACC1, #0097A7);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 191, 165, 0.3);
            color: white;
          }
          
          .modern-wishlist .wishlist-btn {
            background: rgba(0, 191, 165, 0.1);
            border: 2px solid rgba(0, 191, 165, 0.2);
            border-radius: 12px;
            padding: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #00BFA5;
          }
          
          .modern-wishlist .wishlist-btn:hover {
            background: #00BFA5;
            color: white;
            transform: scale(1.1);
          }
          
          .tg-listing-grid-area {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
          }
          
          @media (max-width: 768px) {
            .modern-card {
              margin-bottom: 20px;
            }
            
            .modern-card-content {
              padding: 16px;
            }
          }
        `}</style>
        
        <div className="tg-listing-grid-area mb-85 pt-80">
          <div className="container">
            <div className="row">
              <FeatureSidebar setProducts={setProducts} />
              <div className="col-xl-9 col-lg-8">
                <div className="tg-listing-item-box-wrap ml-10">
                  <FeatureTop
                    startOffset={startOffset}
                    endOffset={Math.min(endOffset, totalItems)}
                    totalItems={totalItems}
                    setProducts={setProducts}
                    isListView={isListView}
                    handleListViewClick={handleListViewClick}
                    handleGridViewClick={handleGridViewClick}
                  />
                  <div className="tg-listing-grid-item">
                    <div className={`row list-card ${isListView ? 'list-card-open' : ''}`}>
                      {currentItems.map((item: TravelPackageType) => (
                        <TravelPackageCard
                          key={item.id}
                          item={item}
                          onAddToWishlist={handleAddToWishlist}
                        />
                      ))}
                    </div>
                    <div className="tg-pagenation-wrap text-center mt-50 mb-30">
                      <nav>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel={<i className="p-btn">Next Page</i>}
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          pageCount={totalPages}
                          previousLabel={<i className="p-btn">Previous Page</i>}
                          renderOnZeroPageCount={null}
                        />
                      </nav>
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

export default FeatureArea
