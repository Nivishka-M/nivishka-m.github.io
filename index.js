/* ============================================= */
/* CYBERSECURITY PORTFOLIO - 2026 ANIMATIONS    */
/* ============================================= */

/* -----------------------------------------
   Keyboard Accessibility Handler
---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

/* -----------------------------------------
   Back to Top Button
---------------------------------------- */

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered ? "scale(1)" : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
   Matrix Rain Effect
---------------------------------------- */

class MatrixRain {
  constructor() {
    this.canvas = document.getElementById('matrix-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\';
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.init());
  }
  
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  }
  
  animate() {
    // Fade effect
    this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set text style
    this.ctx.fillStyle = '#00ff41';
    this.ctx.font = `${this.fontSize}px JetBrains Mono, monospace`;
    
    for (let i = 0; i < this.drops.length; i++) {
      // Random character
      const char = this.characters[Math.floor(Math.random() * this.characters.length)];
      
      // Draw character
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;
      
      // Occasionally draw brighter characters
      if (Math.random() > 0.98) {
        this.ctx.fillStyle = '#00ffff';
      } else {
        this.ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.5})`;
      }
      
      this.ctx.fillText(char, x, y);
      
      // Reset drop when it reaches bottom
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      
      this.drops[i]++;
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

/* -----------------------------------------
   Typing Effect
---------------------------------------- */

class TypeWriter {
  constructor(element, texts, wait = 3000) {
    this.element = element;
    this.texts = texts;
    this.wait = wait;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    if (this.element) {
      this.type();
    }
  }
  
  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let typeSpeed = this.isDeleting ? 50 : 100;
    
    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

/* -----------------------------------------
   Skill Bar Animation
---------------------------------------- */

class SkillBars {
  constructor() {
    this.progressBars = document.querySelectorAll('.skill__progress');
    this.animated = false;
    
    if (this.progressBars.length > 0) {
      this.observe();
    }
  }
  
  observe() {
    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animate();
          this.animated = true;
        }
      });
    }, options);
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }
  
  animate() {
    this.progressBars.forEach((bar, index) => {
      const progress = bar.getAttribute('data-progress');
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, index * 100);
    });
  }
}

/* -----------------------------------------
   Glitch Effect for Name
---------------------------------------- */

class GlitchEffect {
  constructor(element) {
    this.element = element;
    if (this.element) {
      this.originalText = this.element.getAttribute('data-text') || this.element.textContent;
      this.glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
      this.init();
    }
  }
  
  init() {
    // Initial glitch on load
    setTimeout(() => this.glitch(), 1000);
    
    // Occasional glitch
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.glitch();
      }
    }, 5000);
  }
  
  glitch() {
    const iterations = 10;
    let i = 0;
    
    const interval = setInterval(() => {
      this.element.textContent = this.originalText
        .split('')
        .map((char, index) => {
          if (index < i) return this.originalText[index];
          if (Math.random() > 0.5) {
            return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
          }
          return char;
        })
        .join('');
      
      i += 1;
      
      if (i > this.originalText.length) {
        clearInterval(interval);
        this.element.textContent = this.originalText;
      }
    }, 30);
  }
}

/* -----------------------------------------
   Portfolio Filter Functionality
---------------------------------------- */

class PortfolioFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.work__filter');
    this.workBoxes = document.querySelectorAll('.work__box');
    
    if (this.filterButtons.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.handleFilter(button));
    });
    
    // Add smooth transition styles to work boxes
    this.workBoxes.forEach(box => {
      box.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }
  
  handleFilter(button) {
    // Remove active class from all buttons
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const category = button.getAttribute('data-category');
    
    this.workBoxes.forEach(box => {
      const boxCategories = box.getAttribute('data-category');
      
      if (category === 'all' || boxCategories.includes(category)) {
        box.style.opacity = '1';
        box.style.transform = 'scale(1)';
        box.style.display = 'block';
        setTimeout(() => {
          box.style.opacity = '1';
        }, 50);
      } else {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.8)';
        setTimeout(() => {
          box.style.display = 'none';
        }, 300);
      }
    });
  }
}

/* -----------------------------------------
   Scroll Reveal Animation
---------------------------------------- */

class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.work__box, .tools__category, .skill__category, .contact__card');
    
    if (this.elements.length > 0) {
      this.init();
      this.observe();
    }
  }
  
  init() {
    this.elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }
  
  observe() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    this.elements.forEach(el => observer.observe(el));
  }
}

/* -----------------------------------------
   Smooth Scroll for Navigation
---------------------------------------- */

class SmoothScroll {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav__link');
    
    if (this.navLinks.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

/* -----------------------------------------
   Custom Cursor
---------------------------------------- */

class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorRing = null;
    
    // Only enable on desktop
    if (window.innerWidth > 768) {
      this.create();
      this.init();
    }
  }
  
  create() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--cyber-cyan);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.1s ease;
      box-shadow: 0 0 10px var(--cyber-cyan);
    `;
    
    this.cursorRing = document.createElement('div');
    this.cursorRing.className = 'custom-cursor-ring';
    this.cursorRing.style.cssText = `
      position: fixed;
      width: 30px;
      height: 30px;
      border: 1px solid var(--cyber-cyan);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: all 0.15s ease;
      opacity: 0.5;
    `;
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorRing);
  }
  
  init() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = `${e.clientX - 4}px`;
      this.cursor.style.top = `${e.clientY - 4}px`;
      
      this.cursorRing.style.left = `${e.clientX - 15}px`;
      this.cursorRing.style.top = `${e.clientY - 15}px`;
    });
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work__box, .tools__item, .contact__card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(2)';
        this.cursorRing.style.transform = 'scale(1.5)';
        this.cursorRing.style.borderColor = 'var(--cyber-magenta)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursorRing.style.transform = 'scale(1)';
        this.cursorRing.style.borderColor = 'var(--cyber-cyan)';
      });
    });
  }
}

/* -----------------------------------------
   Initialize Everything
---------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Matrix Rain Background
  new MatrixRain();
  
  // Typing Effect
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    new TypeWriter(typingElement, [
      'Cybersecurity Enthusiast',
      'Secure Systems Developer',
      'Final Year CS&E Undergraduate',
      'Security-First Mindset',
      'Penetration Testing',
      'Cryptography & Encryption'
    ], 2000);
  }
  
  // Glitch Effect
  const glitchElement = document.getElementById('glitch-name');
  new GlitchEffect(glitchElement);
  
  // Portfolio Filter
  new PortfolioFilter();
  
  // Skill Bars
  new SkillBars();
  
  // Scroll Reveal
  new ScrollReveal();
  
  // Smooth Scroll
  new SmoothScroll();
  
  // Custom Cursor
  new CustomCursor();
  
  console.log('%c🔐 Security Mode Activated', 'color: #00ffff; font-size: 20px; font-family: monospace; text-shadow: 0 0 10px #00ffff;');
  console.log('%cNivishka Manchanayake | Cybersecurity Portfolio', 'color: #00ff41; font-size: 14px; font-family: monospace;');
});
