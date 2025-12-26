import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import '../public/assets/scss/main.scss'
import App from './App.tsx'
import { initializeApp } from './utils/init'
import { trackWebVitals } from './utils/performance'

// Performance optimizations
const optimizePerformance = () => {
  // Enable passive event listeners
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
  document.addEventListener('wheel', () => {}, { passive: true });
  
  // Optimize images loading
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      (img as HTMLImageElement).src = (img as HTMLImageElement).dataset.src!;
    });
  }
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Register service worker for caching
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw-advanced.js');
      console.log('🚀 Advanced SW registered: ', registration);
    } catch (error) {
      console.log('❌ SW registration failed: ', error);
    }
  }
};

// Initialize performance optimizations
optimizePerformance();

// Initialize smooth scrolling and animations
const cleanup = initializeApp();

// Initialize performance tracking
trackWebVitals();

// Register service worker
registerServiceWorker();

// Preload critical resources for instant loading
const preloadCriticalResources = () => {
  // Only preload resources that will actually be used
  const criticalCSS = [
    '/assets/css/bootstrap.min.css'
  ];
  
  criticalCSS.forEach(href => {
    // Check if already preloaded
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      link.onload = () => {
        // Convert to stylesheet after loading
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    }
  });

  // Preload critical fonts that are actually used
  const criticalFonts = [
    '/assets/fonts/fa-solid-900.woff2'
  ];
  
  criticalFonts.forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

// Initialize critical resources
preloadCriticalResources();

// Optimize rendering
const root = createRoot(document.getElementById('root')!, {
  // Enable concurrent features for better performance
  identifierPrefix: 'tourex-'
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  cleanup();
});

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Monitor bundle size and performance in development
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
      }
    }
  });
  
  try {
    observer.observe({ entryTypes: ['measure'] });
  } catch (e) {
    console.log('Performance observer not supported');
  }
}