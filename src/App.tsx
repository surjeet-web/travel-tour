import { HelmetProvider } from "react-helmet-async"
import { Suspense } from "react"
import AppNavigation from "./navigation/Navigation"
import { Provider } from 'react-redux'
import store from "./redux/store"
import PerformanceMonitor from "./components/common/PerformanceMonitor"
import ModernLoader from "./components/common/ModernLoader"

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/assets/css/bootstrap.min.css';
  document.head.appendChild(criticalCSS);
  
  // Preload critical fonts
  const criticalFont = document.createElement('link');
  criticalFont.rel = 'preload';
  criticalFont.as = 'font';
  criticalFont.type = 'font/woff2';
  criticalFont.crossOrigin = 'anonymous';
  criticalFont.href = '/assets/fonts/fa-solid-900.woff2';
  document.head.appendChild(criticalFont);
};

// Initialize performance optimizations
if (typeof window !== 'undefined') {
  preloadCriticalResources();
  
  // Enable passive event listeners for better scroll performance
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
}

function App() {
  return (
    <>
      <Provider store={store}>
        <HelmetProvider>
          <Suspense fallback={
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}>
              <ModernLoader size="large" text="Loading amazing experiences..." />
            </div>
          }>
            <AppNavigation />
          </Suspense>
          {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        </HelmetProvider>
      </Provider>
    </>
  )
}

export default App