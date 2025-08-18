// SEMPRE - Website JavaScript
// Design limpo inspirado na LinkedBy com cores branco, preto e verde claro

class SempreWebsite {
  constructor() {
    this.isLoaded = false;
    this.particles = null;
    this.universe = null;
    this.heroCarousel = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handleLoading();
  }

  setupEventListeners() {
    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Window Load
    window.addEventListener('load', () => this.onWindowLoad());

    // Scroll Events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16), { passive: true });

    // Resize Events
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));

    // Visibility Change
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  onDOMReady() {
    this.initMobileMenu();
    this.initSmoothScrolling();
    this.initHeroCarousel();
    this.initContactForm();
    this.initAnimations();
  }

  onWindowLoad() {
    this.hideLoadingScreen();
    this.initBackgroundEffects();
    this.isLoaded = true;
  }

  // Loading Screen
  handleLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      this.initLoadingAnimation();
      // Minimum loading time for better UX
      setTimeout(() => {
        if (this.isLoaded) {
          this.hideLoadingScreen();
        }
      }, 2500);
    }
  }

  initLoadingAnimation() {
    this.createLoadingContent();
    this.createFloatingParticles();
    this.startLoadingMessages();
  }

  createLoadingContent() {
    const codeLines = document.getElementById('code-lines');
    if (!codeLines) return;

    const messages = [
      'Iniciando SEMPRE...',
      'Carregando recursos...',
      'Preparando interface...',
      'Quase pronto!'
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'code-line';
        line.textContent = message;
        codeLines.appendChild(line);
      }, index * 500);
    });
  }

  createFloatingParticles() {
    const particlesContainer = document.getElementById('code-particles');
    if (!particlesContainer) return;

    const particles = ['●', '◆', '▲', '■', '♦'];

    // Create 10 floating particles
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, 4000);
      }, i * 200);
    }
  }

  startLoadingMessages() {
    const messageElement = document.querySelector('.loading-message');
    const subMessageElement = document.querySelector('.loading-submessage');
    
    if (!messageElement || !subMessageElement) return;

    const messages = [
      {
        main: 'Preparando experiência profissional',
        sub: 'Carregando recursos...'
      },
      {
        main: 'Configurando interface',
        sub: 'Configurando interface...'
      },
      {
        main: 'Finalizando',
        sub: 'Quase pronto!'
      }
    ];

    let currentIndex = 0;
    
    const updateMessage = () => {
      if (currentIndex < messages.length) {
        messageElement.textContent = messages[currentIndex].main;
        subMessageElement.textContent = messages[currentIndex].sub;
        currentIndex++;
        setTimeout(updateMessage, 800);
      }
    };
    
    updateMessage();
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }

  // Mobile Menu
  initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && nav) {
      mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });

      // Close menu when clicking on links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          nav.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        }
      });
    }
  }

  // Hero Carousel
  initHeroCarousel() {
    this.heroCarousel = new HeroCarousel();
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update active nav link
          this.updateActiveNavLink(targetId);
        }
      });
    });
  }

  updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  // Scroll Handler
  handleScroll() {
    const scrollY = window.scrollY;
    const header = document.getElementById('header');
    
    // Header scroll effect
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Update active section in navigation
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Contact Form
  initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
      
      // Real-time validation
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Captura os dados do formulário
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Cria a mensagem personalizada
    const whatsappMessage = `Olá, meu nome é *${name}*.\nMeu e-mail é *${email}*.\nMeu telefone é *${phone || 'Não informado'}*.\nMensagem: *${message}*`;

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Cria o link do WhatsApp
    const whatsappLink = `https://wa.me/5598987100001?text=${encodedMessage}`;

    // Redireciona para o WhatsApp
    window.open(whatsappLink, '_blank');

    // Reset do formulário
    form.reset();
    
    // Sucesso
    this.showFormSuccess();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Enviar Mensagem</span><i class="fas fa-paper-plane"></i>';
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error
    this.clearFieldError(field);
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'Este campo é obrigatório');
      return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Digite um e-mail válido');
        return false;
      }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        this.showFieldError(field, 'Digite um telefone válido');
        return false;
      }
    }
    
    return true;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '#d1d5db';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  showFormSuccess() {
    this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4ade80' : '#ef4444'};
      color: ${type === 'success' ? '#ffffff' : '#ffffff'};
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // Animations
  initAnimations() {
    // Simple AOS-like functionality
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Background Effects - Simplified
  initBackgroundEffects() {
    // Only initialize if not on mobile for performance
    if (window.innerWidth > 768) {
      this.initCleanBackground();
    }
  }

  initCleanBackground() {
    const canvas = document.getElementById('universe-canvas');
    if (!canvas) return;

    this.universe = new CleanBackground(canvas);
  }

  // Utility Functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  handleResize() {
    // Reinitialize background effects on resize
    if (this.universe) {
      this.universe.handleResize();
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      // Pause animations when tab is not visible
      if (this.universe) this.universe.pause();
    } else {
      // Resume animations when tab becomes visible
      if (this.universe) this.universe.resume();
    }
  }
}

// Hero Carousel Class
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.indicators = document.querySelectorAll('.carousel-indicators .indicator');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 6000; // 6 seconds
    
    this.init();
  }
  
  init() {
    if (this.slides.length === 0) return;
    
    this.setupEventListeners();
    this.startAutoPlay();
  }
  
  setupEventListeners() {
    // Navigation buttons
    this.prevBtn?.addEventListener('click', () => {
      this.stopAutoPlay();
      this.prevSlide();
      this.startAutoPlay();
    });
    
    this.nextBtn?.addEventListener('click', () => {
      this.stopAutoPlay();
      this.nextSlide();
      this.startAutoPlay();
    });
    
    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.stopAutoPlay();
        this.goToSlide(index);
        this.startAutoPlay();
      });
    });
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    heroSection?.addEventListener('mouseenter', () => this.stopAutoPlay());
    heroSection?.addEventListener('mouseleave', () => this.startAutoPlay());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.stopAutoPlay();
        this.prevSlide();
        this.startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      }
    });
  }
  
  goToSlide(index) {
    // Remove active class from current slide and indicator
    this.slides[this.currentSlide].classList.remove('active');
    this.indicators[this.currentSlide].classList.remove('active');
    
    // Update current slide
    this.currentSlide = index;
    
    // Add active class to new slide and indicator
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }
  
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }
  
  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Clean Background Class - Professional and minimal
class CleanBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.elements = [];
    this.isRunning = true;
    
    this.init();
    this.animate();
  }

  init() {
    this.handleResize();
    this.createElements();
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createElements() {
    this.elements = [];
    const numElements = Math.min(15, Math.floor((this.canvas.width * this.canvas.height) / 60000));
    
    for (let i = 0; i < numElements; i++) {
      this.elements.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2
      });
    }
  }

  draw() {
    // Clear canvas with clean background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, '#f9fafb');
    gradient.addColorStop(1, '#ffffff');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw clean geometric elements
    this.elements.forEach(element => {
      // Update position
      element.x += Math.cos(element.direction) * element.speed;
      element.y += Math.sin(element.direction) * element.speed;
      
      // Wrap around edges
      if (element.x < 0) element.x = this.canvas.width;
      if (element.x > this.canvas.width) element.x = 0;
      if (element.y < 0) element.y = this.canvas.height;
      if (element.y > this.canvas.height) element.y = 0;
      
      // Draw element
      this.ctx.save();
      this.ctx.globalAlpha = element.opacity;
      this.ctx.fillStyle = '#4ade80';
      this.ctx.beginPath();
      this.ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  animate() {
    if (this.isRunning) {
      this.draw();
    }
    requestAnimationFrame(() => this.animate());
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    this.isRunning = true;
  }
}

// Initialize the website
const sempreWebsite = new SempreWebsite();
