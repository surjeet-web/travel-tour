import React, { useState, useEffect } from "react";

// Basic animation variants for components
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "ease-out",
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.4,
      ease: "ease-in",
    }
  }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "ease-out",
    }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: {
      duration: 0.4,
      ease: "ease-in",
    }
  }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "ease-out",
    }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: {
      duration: 0.4,
      ease: "ease-in",
    }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "ease-out",
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "ease-in",
    }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
    }
  }
};

// Custom hooks for animations
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const updateScrollY = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", updateScrollY);
    updateScrollY();
    
    return () => {
      window.removeEventListener("scroll", updateScrollY);
    };
  }, []);
  
  return scrollY;
};

export const useInViewAnimation = (ref: React.RefObject<HTMLElement | HTMLDivElement | null>, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: (options as any).threshold || 0.1,
        rootMargin: (options as any).rootMargin || "0px",
      }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, (options as any).threshold, (options as any).rootMargin]);
  
  return isInView;
};

// Simple animation helpers using CSS transitions
export const animateElement = (
  element: HTMLElement,
  properties: Record<string, string>,
  duration = 300,
  easing = "ease-in-out"
) => {
  const originalTransition = element.style.transition;
  const originalValues: Record<string, string> = {};
  
  // Store original values
  Object.keys(properties).forEach((prop) => {
    originalValues[prop] = element.style.getPropertyValue(prop);
  });
  
  // Apply new values with transition
  element.style.transition = `all ${duration}ms ${easing}`;
  Object.keys(properties).forEach((prop) => {
    element.style.setProperty(prop, properties[prop]);
  });
  
  return () => {
    // Restore original values
    element.style.transition = originalTransition;
    Object.keys(originalValues).forEach((prop) => {
      element.style.setProperty(prop, originalValues[prop]);
    });
  };
};

export const animateHeight = (
  element: HTMLElement,
  fromHeight: string,
  toHeight: string,
  duration = 300
) => {
  return new Promise<void>((resolve) => {
    element.style.height = fromHeight;
    element.style.transition = `height ${duration}ms ease-in-out`;
    
    // Force reflow
    element.offsetHeight;
    
    setTimeout(() => {
      element.style.height = toHeight;
      setTimeout(() => {
        element.style.transition = "";
        resolve();
      }, duration);
    }, 50);
  });
};

export const animateOpacity = (
  element: HTMLElement,
  fromOpacity: number,
  toOpacity: number,
  duration = 300
) => {
  return new Promise<void>((resolve) => {
    element.style.opacity = fromOpacity.toString();
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.opacity = toOpacity.toString();
      setTimeout(() => {
        element.style.transition = "";
        resolve();
      }, duration);
    }, 50);
  });
};

export const animateTransform = (
  element: HTMLElement,
  fromTransform: string,
  toTransform: string,
  duration = 300
) => {
  return new Promise<void>((resolve) => {
    element.style.transform = fromTransform;
    element.style.transition = `transform ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.transform = toTransform;
      setTimeout(() => {
        element.style.transition = "";
        resolve();
      }, duration);
    }, 50);
  });
};

// Stagger animation helper
export const animateStaggeredElements = (
  elements: HTMLElement[],
  animation: (element: HTMLElement, index: number) => void,
  staggerDelay = 100
) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      animation(element, index);
    }, index * staggerDelay);
  });
};

// Parallax scrolling effect
export const initParallax = () => {
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  
  const updateParallax = () => {
    const scrolled = window.scrollY;
    
    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-parallax-speed") || "0.5";
      const yPos = -(scrolled * parseFloat(speed));
      
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener("scroll", updateParallax);
  
  return () => {
    window.removeEventListener("scroll", updateParallax);
  };
};

// Reveal animations on scroll
export const initScrollReveal = () => {
  const revealElements = document.querySelectorAll("[data-reveal]");
  
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
  // Initial check
  checkReveal();
  
  return () => {
    window.removeEventListener("scroll", checkReveal);
    window.removeEventListener("resize", checkReveal);
  };
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  endValue: number,
  duration = 2000,
  prefix = ""
) => {
  return new Promise<void>((resolve) => {
    const startTime = Date.now();
    const startValue = 0;
    
    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
      element.textContent = prefix + currentValue.toString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(updateCounter);
  });
};

// Magnetic button effect
export const initMagneticButton = (element: HTMLElement, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };
  
  const handleMouseLeave = () => {
    element.style.transform = "translate(0px, 0px)";
  };
  
  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);
  
  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};
