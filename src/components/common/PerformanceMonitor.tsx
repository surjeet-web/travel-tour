import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('🚀 Navigation Timing:', {
            DNS: navEntry.domainLookupEnd - navEntry.domainLookupStart,
            TCP: navEntry.connectEnd - navEntry.connectStart,
            Request: navEntry.responseStart - navEntry.requestStart,
            Response: navEntry.responseEnd - navEntry.responseStart,
            DOM: navEntry.domContentLoadedEventEnd - navEntry.responseEnd,
            Load: navEntry.loadEventEnd - navEntry.loadEventStart,
            Total: navEntry.loadEventEnd - navEntry.fetchStart,
          });
        }

        if (entry.entryType === 'paint') {
          console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
        }

        if (entry.entryType === 'largest-contentful-paint') {
          console.log(`🖼️ LCP: ${entry.startTime.toFixed(2)}ms`);
        }

        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming;
          console.log(`⚡ FID: ${fidEntry.processingStart - fidEntry.startTime}ms`);
        }

        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            console.log(`📐 CLS: ${clsEntry.value}`);
          }
        }
      }
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      observer.observe({ entryTypes: ['navigation', 'paint'] });
    }

    // Resource loading performance
    const resourceObserver = new PerformanceObserver((list) => {
      const resources = list.getEntries();
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0) {
        console.warn('🐌 Slow resources detected:', slowResources.map(r => ({
          name: r.name,
          duration: `${r.duration.toFixed(2)}ms`,
          size: (r as any).transferSize || 'unknown'
        })));
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.log('Resource timing not supported');
    }

    // Memory usage monitoring (if available)
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      console.log('💾 Memory Usage:', {
        used: `${(memoryInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memoryInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memoryInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }

    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  // Monitor bundle size in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const checkBundleSize = async () => {
        try {
          const response = await fetch('/src/main.tsx');
          const text = await response.text();
          console.log(`📦 Main bundle size: ${(text.length / 1024).toFixed(2)} KB`);
        } catch (e) {
          // Ignore in production
        }
      };
      
      checkBundleSize();
    }
  }, []);

  return null;
};

export default PerformanceMonitor;