import { initParallax, initScrollReveal } from "./animations";

/**
 * Initialize all smooth scrolling and animation utilities
 * Call this function once when the app starts
 */
export const initializeApp = () => {
  // Initialize sticky header
  const cleanupStickyHeader = (() => {
    const header = document.querySelector('header');
    if (!header) return () => {};
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })();
  
  // Initialize anchor links
  const cleanupAnchorLinks = (() => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (!targetId || targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    };
    
    anchorLinks.forEach(link => {
      link.addEventListener("click", handleClick);
    });
    
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener("click", handleClick);
      });
    };
  })();
  
  // Initialize scroll progress
  const cleanupScrollProgress = (() => {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return () => {};
    
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      (progressBar as HTMLElement).style.width = `${scrolled}%`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })();
  
  // Initialize parallax effects
  const cleanupParallax = initParallax();
  
  // Initialize scroll reveal animations
  const cleanupScrollReveal = initScrollReveal();
  
  // Return cleanup function
  return () => {
    if (cleanupStickyHeader) {
      cleanupStickyHeader();
    }
    if (cleanupAnchorLinks) {
      cleanupAnchorLinks();
    }
    if (cleanupScrollProgress) {
      cleanupScrollProgress();
    }
    if (cleanupParallax) {
      cleanupParallax();
    }
    if (cleanupScrollReveal) {
      cleanupScrollReveal();
    }
  };
};

/**
 * Initialize only the essential features for performance
 * Use this for pages where you want minimal animations
 */
export const initializeEssential = () => {
  // Initialize sticky header
  const cleanupStickyHeader = (() => {
    const header = document.querySelector('header');
    if (!header) return () => {};
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })();
  
  // Return cleanup function
  return () => {
    if (cleanupStickyHeader) {
      cleanupStickyHeader();
    }
  };
};

/**
 * Initialize animations for a specific component
 * Use this when you want to control animations at the component level
 */
export const initializeComponentAnimations = (container: HTMLElement) => {
  // Find all elements with animation attributes in this container
  const parallaxElements = container.querySelectorAll("[data-parallax]");
  const revealElements = container.querySelectorAll("[data-reveal]");
  const magneticButtons = container.querySelectorAll("[data-magnetic]");
  
  // Initialize parallax for these elements
  const updateParallax = () => {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || "0.5";
      const yPos = -(scrolled * parseFloat(speed));
      
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener("scroll", updateParallax);
  
  // Initialize reveal animations
  const checkReveal = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const elementVisible = elementTop < windowHeight - 100;
      
      if (elementVisible) {
        element.classList.add("revealed");
      }
    });
  };
  
  window.addEventListener("scroll", checkReveal);
  window.addEventListener("resize", checkReveal);
  checkReveal();
  
  // Initialize magnetic buttons
  const magneticCleanupFunctions: (() => void)[] = [];
  
  magneticButtons.forEach((button) => {
    const strength = parseFloat(button.getAttribute("data-magnetic-strength") || "0.3");
    
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (mouseEvent.clientX - centerX) * strength;
      const deltaY = (mouseEvent.clientY - centerY) * strength;
      
      (button as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    const handleMouseLeave = () => {
      (button as HTMLElement).style.transform = "translate(0px, 0px)";
    };
    
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    
    magneticCleanupFunctions.push(() => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    });
  });
  
  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", updateParallax);
    window.removeEventListener("scroll", checkReveal);
    window.removeEventListener("resize", checkReveal);
    magneticCleanupFunctions.forEach(cleanup => cleanup());
  };
};

/**
 * Add smooth scroll behavior to anchor links dynamically
 * Use this when new content is loaded dynamically
 */
export const refreshAnchorLinks = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });
};

/**
 * Add reveal animation to elements dynamically
 * Use this when new content is loaded dynamically
 */
export const refreshRevealAnimations = () => {
  const revealElements = document.querySelectorAll("[data-reveal]:not(.revealed)");
  
  const checkReveal = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const elementVisible = elementTop < windowHeight - 100;
      
      if (elementVisible) {
        element.classList.add("revealed");
      }
    });
  };
  
  window.addEventListener("scroll", checkReveal);
  window.addEventListener("resize", checkReveal);
  checkReveal();
  
  return () => {
    window.removeEventListener("scroll", checkReveal);
    window.removeEventListener("resize", checkReveal);
  };
};