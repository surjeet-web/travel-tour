interface ModernLoaderProps {
   size?: 'small' | 'medium' | 'large';
   color?: 'primary' | 'white' | 'dark';
   text?: string;
}

const ModernLoader = ({ 
   size = 'medium', 
   color = 'primary', 
   text = 'Loading...' 
}: ModernLoaderProps) => {

   return (
      <>
         <style>{`
            .modern-loader-container {
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               gap: 16px;
               padding: 40px;
            }

            .modern-spinner {
               position: relative;
               display: inline-block;
            }

            .spinner-ring {
               width: 48px;
               height: 48px;
               border: 3px solid rgba(0, 191, 165, 0.2);
               border-top: 3px solid #00BFA5;
               border-radius: 50%;
               animation: spin 1s linear infinite;
            }

            .spinner-ring.small {
               width: 24px;
               height: 24px;
               border-width: 2px;
            }

            .spinner-ring.large {
               width: 64px;
               height: 64px;
               border-width: 4px;
            }

            .spinner-ring.white {
               border-color: rgba(255, 255, 255, 0.2);
               border-top-color: white;
            }

            .spinner-ring.dark {
               border-color: rgba(31, 41, 55, 0.2);
               border-top-color: #1F2937;
            }

            .spinner-dots {
               display: flex;
               gap: 4px;
               margin-top: 8px;
            }

            .spinner-dot {
               width: 6px;
               height: 6px;
               background: #00BFA5;
               border-radius: 50%;
               animation: pulse 1.4s ease-in-out infinite both;
            }

            .spinner-dot.white {
               background: white;
            }

            .spinner-dot.dark {
               background: #1F2937;
            }

            .spinner-dot:nth-child(1) { animation-delay: -0.32s; }
            .spinner-dot:nth-child(2) { animation-delay: -0.16s; }
            .spinner-dot:nth-child(3) { animation-delay: 0s; }

            .loader-text {
               font-size: 14px;
               font-weight: 500;
               color: #64748B;
               text-align: center;
            }

            .loader-text.white {
               color: rgba(255, 255, 255, 0.8);
            }

            .loader-text.dark {
               color: #1F2937;
            }

            @keyframes spin {
               0% { transform: rotate(0deg); }
               100% { transform: rotate(360deg); }
            }

            @keyframes pulse {
               0%, 80%, 100% {
                  transform: scale(0);
                  opacity: 0.5;
               }
               40% {
                  transform: scale(1);
                  opacity: 1;
               }
            }

            /* Page overlay loader */
            .page-loader-overlay {
               position: fixed;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               background: rgba(255, 255, 255, 0.95);
               backdrop-filter: blur(8px);
               z-index: 9999;
               display: flex;
               align-items: center;
               justify-content: center;
            }

            .page-loader-content {
               background: white;
               padding: 40px;
               border-radius: 20px;
               box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
               text-align: center;
               border: 1px solid rgba(0, 0, 0, 0.05);
            }
         `}</style>

         <div className="modern-loader-container">
            <div className="modern-spinner">
               <div className={`spinner-ring ${size} ${color}`}></div>
               <div className="spinner-dots">
                  <div className={`spinner-dot ${color}`}></div>
                  <div className={`spinner-dot ${color}`}></div>
                  <div className={`spinner-dot ${color}`}></div>
               </div>
            </div>
            {text && (
               <div className={`loader-text ${color}`}>
                  {text}
               </div>
            )}
         </div>
      </>
   );
};

// Page overlay loader component
export const PageLoader = ({ text = 'Loading amazing experiences...' }: { text?: string }) => (
   <>
      <style>{`
         .page-loader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
         }

         .page-loader-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            text-align: center;
            border: 1px solid rgba(0, 0, 0, 0.05);
         }
      `}</style>
      
      <div className="page-loader-overlay">
         <div className="page-loader-content">
            <ModernLoader size="large" text={text} />
         </div>
      </div>
   </>
);

export default ModernLoader;