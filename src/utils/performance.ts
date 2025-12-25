// Performance optimization utilities

// Debounce function for search inputs and scroll events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events and resize handlers
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "50px",
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Preload images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch DOM updates
export const batchDOMUpdates = (callback: () => void): void => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};

// Memory cleanup for event listeners
export const createCleanupFunction = (
  element: Element | Window,
  event: string,
  handler: EventListener
): (() => void) => {
  element.addEventListener(event, handler);
  return () => element.removeEventListener(event, handler);
};

// Optimize images for different screen sizes
export const getOptimizedImageSrc = (
  baseSrc: string,
  _width: number,
  _quality: number = 80
): string => {
  // This would typically integrate with an image optimization service
  // For now, return the original src
  return baseSrc;
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get device pixel ratio for high-DPI displays
export const getDevicePixelRatio = (): number => {
  return window.devicePixelRatio || 1;
};

// Check if device has limited bandwidth
export const hasLimitedBandwidth = (): boolean => {
  const connection = (navigator as any).connection;
  if (!connection) return false;
  
  return connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' ||
         connection.saveData === true;
};

// Lazy load component with retry logic
export const lazyLoadWithRetry = <T>(
  importFunc: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const attemptLoad = (attempt: number) => {
      importFunc()
        .then(resolve)
        .catch((error) => {
          if (attempt < retries) {
            setTimeout(() => attemptLoad(attempt + 1), 1000 * attempt);
          } else {
            reject(error);
          }
        });
    };
    attemptLoad(1);
  });
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void): void => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Web Vitals tracking
export const trackWebVitals = (): void => {
  // Track Largest Contentful Paint (LCP)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Track First Input Delay (FID)
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', (entry as any).processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });

  // Track Cumulative Layout Shift (CLS)
  let clsValue = 0;
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    });
    console.log('CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};