// PWA utilities for enhanced app-like experience

export interface PWAInstallPrompt {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

class PWAManager {
  private deferredPrompt: PWAInstallPrompt | null = null;
  private isInstalled = false;
  private swRegistration: ServiceWorkerRegistration | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    // Check if app is already installed
    this.checkInstallStatus();
    
    // Listen for install prompt
    this.setupInstallPrompt();
    
    // Register service worker
    await this.registerServiceWorker();
    
    // Setup update notifications
    this.setupUpdateNotifications();
    
    // Setup offline detection
    this.setupOfflineDetection();
  }

  private checkInstallStatus() {
    // Check if running as PWA
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                     (window.navigator as any).standalone === true ||
                     document.referrer.includes('android-app://');
    
    if (this.isInstalled) {
      console.log('🎉 App is running as PWA');
      document.body.classList.add('pwa-installed');
    }
  }

  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('💾 Install prompt available');
      e.preventDefault();
      this.deferredPrompt = e as any;
      
      // Show custom install button
      this.showInstallButton();
    });

    // Handle successful installation
    window.addEventListener('appinstalled', () => {
      console.log('✅ App installed successfully');
      this.isInstalled = true;
      this.deferredPrompt = null;
      this.hideInstallButton();
      
      // Track installation
      this.trackEvent('pwa_installed');
    });
  }

  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw-advanced.js', {
          scope: '/'
        });
        
        console.log('🔧 Advanced Service Worker registered');
        
        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          this.handleServiceWorkerMessage(event.data);
        });
        
        // Check for updates
        this.swRegistration.addEventListener('updatefound', () => {
          console.log('🔄 Service Worker update found');
          this.handleServiceWorkerUpdate();
        });
        
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }
  }

  private handleServiceWorkerMessage(data: any) {
    switch (data.type) {
      case 'SW_ACTIVATED':
        console.log('✅ Service Worker activated, version:', data.version);
        break;
        
      case 'CACHE_UPDATED':
        console.log('📦 Cache updated');
        break;
        
      default:
        console.log('📨 SW Message:', data);
    }
  }

  private handleServiceWorkerUpdate() {
    const newWorker = this.swRegistration?.installing;
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New version available
        this.showUpdateNotification();
      }
    });
  }

  private setupUpdateNotifications() {
    // Check for updates periodically
    setInterval(() => {
      if (this.swRegistration) {
        this.swRegistration.update();
      }
    }, 60000); // Check every minute
  }

  private setupOfflineDetection() {
    const updateOnlineStatus = () => {
      const isOnline = navigator.onLine;
      document.body.classList.toggle('offline', !isOnline);
      
      if (isOnline) {
        console.log('🌐 Back online');
        this.showToast('Back online! Syncing data...', 'success');
        this.syncOfflineData();
      } else {
        console.log('📴 Gone offline');
        this.showToast('You\'re offline. Don\'t worry, the app still works!', 'info');
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    updateOnlineStatus();
  }

  // Public methods
  public async installApp(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('❌ Install prompt not available');
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log('📱 Install prompt result:', outcome);
      
      if (outcome === 'accepted') {
        this.trackEvent('pwa_install_accepted');
        return true;
      } else {
        this.trackEvent('pwa_install_dismissed');
        return false;
      }
    } catch (error) {
      console.error('❌ Install prompt error:', error);
      return false;
    }
  }

  public isAppInstallable(): boolean {
    return !!this.deferredPrompt;
  }

  public isAppInstalled(): boolean {
    return this.isInstalled;
  }

  public async updateApp(): Promise<void> {
    if (this.swRegistration?.waiting) {
      // Tell the waiting service worker to skip waiting
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload the page to activate the new service worker
      window.location.reload();
    }
  }

  public async clearCache(): Promise<void> {
    if (this.swRegistration?.active) {
      const messageChannel = new MessageChannel();
      
      return new Promise((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            console.log('🗑️ Cache cleared successfully');
            resolve();
          }
        };
        
        this.swRegistration!.active!.postMessage(
          { type: 'CLEAR_CACHE' },
          [messageChannel.port2]
        );
      });
    }
  }

  // UI methods
  private showInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', () => this.installApp());
    } else {
      // Create install button if it doesn't exist
      this.createInstallButton();
    }
  }

  private hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  private createInstallButton() {
    const button = document.createElement('button');
    button.id = 'pwa-install-button';
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Install App
    `;
    button.className = 'pwa-install-btn';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00BFA5, #00ACC1);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 191, 165, 0.3);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      font-size: 14px;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 6px 25px rgba(0, 191, 165, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 20px rgba(0, 191, 165, 0.3)';
    });
    
    button.addEventListener('click', () => this.installApp());
    document.body.appendChild(button);
  }

  private showUpdateNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 300px;
        animation: slideIn 0.3s ease;
      ">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 8px; height: 8px; background: #00BFA5; border-radius: 50%;"></div>
          <strong style="color: #333;">Update Available</strong>
        </div>
        <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">
          A new version is ready. Update now for the latest features!
        </p>
        <div style="display: flex; gap: 8px;">
          <button id="update-now" style="
            background: #00BFA5;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
          ">Update Now</button>
          <button id="update-later" style="
            background: transparent;
            color: #666;
            border: 1px solid #e0e0e0;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
          ">Later</button>
        </div>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(notification);
    
    // Handle buttons
    notification.querySelector('#update-now')?.addEventListener('click', () => {
      this.updateApp();
      notification.remove();
    });
    
    notification.querySelector('#update-later')?.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const colors = {
      success: '#4CAF50',
      error: '#F44336',
      info: '#00BFA5'
    };
    
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${colors[type]};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1002;
      animation: toastSlideUp 0.3s ease;
    `;
    toast.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes toastSlideUp {
        from { transform: translate(-50%, 100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 3000);
  }

  private async syncOfflineData() {
    // Trigger background sync if supported
    if ('serviceWorker' in navigator && 'sync' in (window as any).ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await (registration as any).sync.register('background-sync');
        console.log('🔄 Background sync registered');
      } catch (error) {
        console.error('❌ Background sync failed:', error);
      }
    }
  }

  private trackEvent(eventName: string, data?: any) {
    // Track PWA events for analytics
    console.log('📊 PWA Event:', eventName, data);
    
    // You can integrate with your analytics service here
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', eventName, {
        event_category: 'PWA',
        ...data
      });
    }
  }
}

// Create global PWA manager instance
export const pwaManager = new PWAManager();

// Export utilities
export const PWAUtils = {
  // Check if device supports PWA installation
  canInstall: () => {
    return 'serviceWorker' in navigator && 
           'BeforeInstallPromptEvent' in window;
  },
  
  // Check if running as PWA
  isPWA: () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  },
  
  // Get device type
  getDeviceType: () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android/.test(userAgent)) return 'android';
    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/windows/.test(userAgent)) return 'windows';
    if (/mac/.test(userAgent)) return 'mac';
    return 'unknown';
  },
  
  // Check if device supports notifications
  supportsNotifications: () => {
    return 'Notification' in window && 
           'serviceWorker' in navigator && 
           'PushManager' in window;
  },
  
  // Request notification permission
  requestNotificationPermission: async () => {
    if (!PWAUtils.supportsNotifications()) return false;
    
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
};

export default pwaManager;