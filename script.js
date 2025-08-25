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
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
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
        
        // Skip if targetId is just '#' (invalid selector)
        if (targetId === '#') {
          return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const targetPosition = targetElement.offsetTop;
          
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

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
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
    
    // Initialize CTA buttons
    this.initCTAButtons();
  }

  initCTAButtons() {
    // Handle all CTA buttons that should scroll to contact
    const ctaButtons = document.querySelectorAll('a[href="#contato"]');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contato');
        if (contactSection) {
          const targetPosition = contactSection.offsetTop;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Handle WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Let the default behavior happen (open WhatsApp)
        // But also track the interaction
        console.log('WhatsApp button clicked');
      });
    });
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
    
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
      const nav = document.getElementById('nav');
      const mobileMenuBtn = document.getElementById('mobile-menu-btn');
      if (nav && mobileMenuBtn) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
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
      if (e.key === 'ArrowLeft' && this.isCarouselFocused()) {
        this.stopAutoPlay();
        this.prevSlide();
        this.startAutoPlay();
      } else if (e.key === 'ArrowRight' && this.isCarouselFocused()) {
        this.stopAutoPlay();
        this.nextSlide();
        this.startAutoPlay();
      }
    });
    
    // Touch/swipe support for mobile
    this.initTouchSupport();
  }
  
  isCarouselFocused() {
    const heroSection = document.querySelector('.hero');
    return heroSection && heroSection.contains(document.activeElement);
  }
  
  initTouchSupport() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    heroSection.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    heroSection.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        this.stopAutoPlay();
        
        if (deltaX > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
        
        this.startAutoPlay();
      }
    }, { passive: true });
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

// Utility function to check if device is mobile
function isMobileDevice() {
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Utility function to debounce function calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize the website
const sempreWebsite = new SempreWebsite();

// Add resize listener with debounce
window.addEventListener('resize', debounce(() => {
  sempreWebsite.handleResize();
}, 250));
// Blog Management Class
class BlogManager {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentCategory = 'all';
    this.isLoading = false;
    this.currentArticle = null;
    this.spreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSoWXc-GjWdhWAEzmRHSonk74DKZksqQ373UQrptSbxgDvM3AbYMw3zo951sKWSzrJ7kdGregoQ3v9F/pub?gid=0&single=true&output=csv";
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.blog-nav-btn');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.getAttribute('data-category');
        this.filterPosts(category);
        this.updateActiveButton(e.currentTarget);
      });
    });
  }
  
  updateActiveButton(activeBtn) {
    document.querySelectorAll('.blog-nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }
  
  async loadPosts() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.showLoading();
    
    try {
      const response = await fetch(this.spreadsheetUrl);
      if (!response.ok) {
        throw new Error('Falha ao carregar dados');
      }
      
      const data = await response.text();
      this.posts = this.parseCSVData(data);
      this.filteredPosts = [...this.posts];
      this.renderPosts();
      
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      this.showError();
    } finally {
      this.isLoading = false;
    }
  }
  
  parseCSVData(csvData) {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) return [];
    
    // Parse CSV headers properly
    const headers = this.parseCSVLine(lines[0]).map(h => h.toLowerCase().trim().replace(/"/g, ''));
    const posts = [];
    
    for (let i = 1; i < lines.length; i++) {
      // Handle multi-line records
      let currentLine = lines[i];
      let lineIndex = i;
      
      // Check if we have unclosed quotes (multi-line field)
      while (this.hasUnclosedQuotes(currentLine) && lineIndex + 1 < lines.length) {
        lineIndex++;
        currentLine += '\n' + lines[lineIndex];
      }
      
      // Update the loop index to skip processed lines
      i = lineIndex;
      
      const row = this.parseCSVLine(currentLine);
      if (row.length < headers.length) continue;
      
      const post = {};
      headers.forEach((header, index) => {
        post[header] = row[index] ? this.cleanCSVField(row[index]) : '';
      });
      
      // Validate required fields
      if (post['título'] && post['conteúdo']) {
        posts.push({
          id: post['id'] || i,
          title: post['título'],
          content: post['conteúdo'],
          redacao: post['redação'] || '',
          excerpt: this.createExcerpt(post['conteúdo']),
          date: post['data'] || new Date().toLocaleDateString('pt-BR'),
          author: post['autor'] || 'SEMPRE',
          category: this.normalizeCategory(post['conteúdo']),
          image: post['imagem (opcional)'] || '',
          linkRedacao: post['link (redação)'] || ''
        });
      }
    }
    
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    let i = 0;
    
    while (i < line.length) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i += 2;
          continue;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current);
        current = '';
        i++;
        continue;
      } else {
        current += char;
      }
      
      i++;
    }
    
    // Add the last field
    result.push(current);
    
    return result;
  }
  
  hasUnclosedQuotes(line) {
    let quoteCount = 0;
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote, skip next
          i++;
          continue;
        } else {
          quoteCount++;
          inQuotes = !inQuotes;
        }
      }
    }
    
    // If quote count is odd, we have unclosed quotes
    return quoteCount % 2 !== 0;
  }
  
  cleanCSVField(field) {
    if (!field) return '';
    
    // Remove surrounding quotes
    let cleaned = field.trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1);
    }
    
    // Replace escaped quotes
    cleaned = cleaned.replace(/""/g, '"');
    
    // Clean up extra whitespace but preserve intentional line breaks
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  }
  
  createExcerpt(content, maxLength = 150) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }
  
  normalizeCategory(category) {
    const categoryMap = {
      'gestão': 'gestao',
      'gestao': 'gestao',
      'projetos': 'projetos',
      'terceiro setor': 'terceiro-setor',
      'terceiro-setor': 'terceiro-setor',
      'ong': 'terceiro-setor',
      'social': 'terceiro-setor'
    };
    
    const lowerCategory = category.toLowerCase();
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerCategory.includes(key)) {
        return value;
      }
    }
    return 'gestao';
  }
  
  filterPosts(category) {
    this.currentCategory = category;
    
    if (category === 'all') {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(post => post.category === category);
    }
    
    this.renderPosts();
  }
  
  showLoading() {
    const container = document.getElementById('blog-posts');
    container.innerHTML = `
      <div class="blog-loading">
        <div class="loading-animation">
          <div class="loading-spinner"></div>
          <p class="loading-text">Carregando publicações...</p>
        </div>
      </div>
    `;
  }
  
  showError() {
    const container = document.getElementById('blog-posts');
    container.innerHTML = `
      <div class="blog-error">
        <div class="blog-error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h3 class="blog-error-title">Erro ao carregar posts</h3>
        <p class="blog-error-text">Não foi possível carregar as publicações. Verifique sua conexão e tente novamente.</p>
        <button class="blog-retry-btn" onclick="blogManager.loadPosts()">
          <i class="fas fa-redo"></i>
          Tentar novamente
        </button>
      </div>
    `;
  }
  
  showEmpty() {
    const container = document.getElementById('blog-posts');
    const categoryText = this.currentCategory === 'all' ? 'publicações' : `publicações de ${this.getCategoryName(this.currentCategory)}`;
    
    container.innerHTML = `
      <div class="blog-empty">
        <div class="blog-empty-icon">
          <i class="fas fa-newspaper"></i>
        </div>
        <h3 class="blog-empty-title">Nenhuma publicação encontrada</h3>
        <p class="blog-empty-text">Não há ${categoryText} disponíveis no momento.</p>
      </div>
    `;
  }
  
  getCategoryName(category) {
    const names = {
      'gestao': 'Gestão',
      'projetos': 'Projetos',
      'terceiro-setor': 'Terceiro Setor'
    };
    return names[category] || 'Geral';
  }
  
  renderPosts() {
    const container = document.getElementById('blog-posts');
    
    if (this.filteredPosts.length === 0) {
      this.showEmpty();
      return;
    }
    
    const postsHTML = this.filteredPosts.map((post, index) => `
      <article class="blog-post" style="animation-delay: ${index * 0.1}s">
        <div class="blog-post-image">
          ${post.image ? 
            `<img src="${post.image}" alt="${post.title}" loading="lazy" />` : 
            `<div class="placeholder-icon"><i class="fas fa-newspaper"></i></div>`
          }
        </div>
        <div class="blog-post-content">
          <div class="blog-post-meta">
            <div class="blog-post-date">
              <i class="fas fa-calendar-alt"></i>
              <span>${post.date}</span>
            </div>
            <div class="blog-post-author">
              <i class="fas fa-user"></i>
              <span>${post.author}</span>
            </div>
            <div class="blog-post-category">${this.getCategoryName(post.category)}</div>
          </div>
          
          <h3 class="blog-post-title">${post.title}</h3>
          <p class="blog-post-excerpt">${post.excerpt}</p>
          
          <div class="blog-post-footer">
            ${post.redacao ? 
              `<button class="blog-post-link" onclick="blogManager.showArticle('${post.id}')">
                <span>Artigo completo</span>
                <i class="fas fa-arrow-right"></i>
              </button>` :
              post.linkRedacao ? 
                `<a href="${post.linkRedacao}" target="_blank" rel="noopener" class="blog-post-link">
                  <span>Leia mais</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>` :
                `<span class="blog-post-link" style="cursor: default; color: #6b7280;">
                  <span>Conteúdo disponível</span>
                  <i class="fas fa-info-circle"></i>
                </span>`
            }
          </div>
        </div>
      </article>
    `).join('');
    
    container.innerHTML = postsHTML;
    
    // Trigger animations
    setTimeout(() => {
      const posts = container.querySelectorAll('.blog-post');
      posts.forEach(post => {
        post.style.opacity = '1';
        post.style.transform = 'translateY(0)';
      });
    }, 100);
  }
  
  showArticle(postId) {
    const post = this.posts.find(p => p.id == postId);
    if (!post || !post.redacao) return;
    
    this.currentArticle = post;
    
    // Update URL with article hash
    window.history.pushState({ articleId: postId }, post.title, `#article-${postId}`);
    
    // Hide blog list and show article
    const blogPosts = document.getElementById('blog-posts');
    const blogNav = document.querySelector('.blog-nav');
    const sectionHeader = document.querySelector('#blog .section-header');
    const blogActions = document.querySelector('.blog-actions');
    
    blogPosts.style.display = 'none';
    blogNav.style.display = 'none';
    sectionHeader.style.display = 'none';
    blogActions.style.display = 'none';
    
    // Create and show article view
    this.renderArticle();
  }
  
  renderArticle() {
    const post = this.currentArticle;
    if (!post) return;
    
    const blogSection = document.getElementById('blog');
    
    // Create article container
    const articleHTML = `
      <div id="blog-article" class="blog-article-container">
        <div class="container">
          <!-- Article Header -->
          <div class="article-header">
            <button class="back-to-blog-btn" onclick="blogManager.backToBlog()">
              <i class="fas fa-arrow-left"></i>
              <span>Voltar aos artigos</span>
            </button>
            
            <div class="article-meta">
              <div class="article-category">${this.getCategoryName(post.category)}</div>
              <div class="article-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${post.date}</span>
              </div>
              <div class="article-author">
                <i class="fas fa-user"></i>
                <span>${post.author}</span>
              </div>
            </div>
            
            <h1 class="article-title">${post.title}</h1>
            
            ${post.image ? `
              <div class="article-featured-image">
                <img src="${post.image}" alt="${post.title}" />
              </div>
            ` : ''}
          </div>
          
          <!-- Article Content -->
          <div class="article-content">
            <div class="article-body">
              ${this.formatArticleContent(post.redacao)}
            </div>
            
            ${post.linkRedacao ? `
              <div class="article-external-link">
                <a href="${post.linkRedacao}" target="_blank" rel="noopener" class="external-link-btn">
                  <i class="fas fa-external-link-alt"></i>
                  <span>Ver artigo original</span>
                </a>
              </div>
            ` : ''}
          </div>
          
          <!-- Article Footer -->
          <div class="article-footer">
            <div class="article-share">
              <h4>Compartilhar artigo:</h4>
              <div class="share-buttons">
                <button class="share-btn whatsapp" onclick="blogManager.shareArticle('whatsapp')">
                  <i class="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </button>
                <button class="share-btn facebook" onclick="blogManager.shareArticle('facebook')">
                  <i class="fab fa-facebook"></i>
                  <span>Facebook</span>
                </button>
                <button class="share-btn linkedin" onclick="blogManager.shareArticle('linkedin')">
                  <i class="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </button>
                <button class="share-btn copy" onclick="blogManager.shareArticle('copy')">
                  <i class="fas fa-link"></i>
                  <span>Copiar link</span>
                </button>
              </div>
            </div>
            
            <div class="back-to-blog-footer">
              <button class="cta-button secondary" onclick="blogManager.backToBlog()">
                <i class="fas fa-arrow-left"></i>
                <span>Voltar aos artigos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Insert article HTML
    blogSection.insertAdjacentHTML('beforeend', articleHTML);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update page title
    document.title = `${post.title} - SEMPRE`;
  }
  
  formatArticleContent(content) {
    if (!content) return '';
    
    // Split content by double line breaks for paragraphs only
    let formattedContent = content
      // Replace multiple spaces with single space
      .replace(/\s+/g, ' ')
      // Only split on actual double line breaks, not periods
      .replace(/\n\n+/g, '||PARAGRAPH||')
      .replace(/\n/g, ' ')
      .split('||PARAGRAPH||')
      .filter(p => p.trim());
    
    // If no paragraph breaks found and content is very long, split intelligently
    if (formattedContent.length === 1 && formattedContent[0].length > 800) {
      // Split by sentences but only create new paragraphs after multiple sentences
      const sentences = formattedContent[0].split(/(?<=[.!?])\s+(?=[A-Z])/);
      const paragraphs = [];
      let currentParagraph = '';
      let sentenceCount = 0;
      
      sentences.forEach(sentence => {
        sentenceCount++;
        
        // Only create new paragraph after 3-4 sentences or if getting too long
        if ((sentenceCount >= 3 && currentParagraph.length > 200) || currentParagraph.length + sentence.length > 600) {
          if (currentParagraph) {
            paragraphs.push(currentParagraph.trim());
          }
          currentParagraph = sentence;
          sentenceCount = 1;
        } else {
          currentParagraph += (currentParagraph ? ' ' : '') + sentence;
        }
      });
      
      if (currentParagraph) {
        paragraphs.push(currentParagraph.trim());
      }
      
      // Only use this split if it creates reasonable paragraphs
      if (paragraphs.length > 1 && paragraphs.every(p => p.length > 50)) {
        formattedContent = paragraphs;
      }
    }
    
    return formattedContent.map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      
      // Check if it's an image URL
      if (this.isImageUrl(trimmed)) {
        return `<div class="article-image"><img src="${trimmed}" alt="Imagem do artigo" loading="lazy" /></div>`;
      }
      
      // Check if it's a heading (starts with #)
      if (trimmed.startsWith('#')) {
        const level = (trimmed.match(/^#+/) || [''])[0].length;
        const text = trimmed.replace(/^#+\s*/, '');
        return `<h${Math.min(level + 1, 6)} class="article-heading">${text}</h${Math.min(level + 1, 6)}>`;
      }
      
      // Regular paragraph
      return `<p class="article-paragraph">${trimmed}</p>`;
    }).filter(p => p).join('');
  }
  
  isImageUrl(url) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
           lowerUrl.includes('images.') || 
           lowerUrl.includes('img.') ||
           lowerUrl.includes('photo') ||
           lowerUrl.includes('picture');
  }
  
  backToBlog() {
    // Remove article view
    const articleContainer = document.getElementById('blog-article');
    if (articleContainer) {
      articleContainer.remove();
    }
    
    // Show blog list elements
    const blogPosts = document.getElementById('blog-posts');
    const blogNav = document.querySelector('.blog-nav');
    const sectionHeader = document.querySelector('#blog .section-header');
    const blogActions = document.querySelector('.blog-actions');
    
    if (blogPosts) blogPosts.style.display = 'grid';
    if (blogNav) blogNav.style.display = 'flex';
    if (sectionHeader) sectionHeader.style.display = 'block';
    if (blogActions) blogActions.style.display = 'block';
    
    // Reset page title
    document.title = 'Principais Notícias - Artigos sobre Gestão de Projetos Sociais';
    
    // Update URL back to blog
    window.history.pushState({}, 'Blog', '#blog');
    
    this.currentArticle = null;
  }
  
  shareArticle(platform) {
    if (!this.currentArticle) return;
    
    const post = this.currentArticle;
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt || post.content.substring(0, 150) + '...';
    
    switch (platform) {
      case 'whatsapp':
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${text}\n\n${url}`)}`;
        window.open(whatsappUrl, '_blank');
        break;
        
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/profile.php?id=61579221797589?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
        break;
        
      case 'linkedin':
        const linkedinUrl = `https://www.linkedin.com/in/adm-carlos-coelho-9a3b2733/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank');
        break;
        
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          // Create direct link to article
          const directUrl = `${window.location.origin}${window.location.pathname}#article-${post.id}`;
          navigator.clipboard.writeText(directUrl).then(() => {
            this.showNotification('Link copiado para a área de transferência!', 'success');
          });
        }).catch(() => {
          this.showNotification('Erro ao copiar link', 'error');
        });
        break;
    }
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `blog-notification blog-notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: #ffffff;
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
}

// Initialize blog manager
let blogManager;

// Handle direct article links on page load
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#article-')) {
    const articleId = hash.replace('#article-', '');
    // Show blog first, then the specific article
    mostrarBlog();
    // Wait for blog to load, then show article
    setTimeout(() => {
      if (blogManager && blogManager.posts.length > 0) {
        blogManager.showArticle(articleId);
      } else {
        // If posts aren't loaded yet, wait for them
        const checkPosts = setInterval(() => {
          if (blogManager && blogManager.posts.length > 0) {
            clearInterval(checkPosts);
            blogManager.showArticle(articleId);
          }
        }, 500);
      }
    }, 1000);
  }
});

// Navigation functions
function mostrarHome() {
  // Show all normal sections
  const sectionsToShow = ['inicio', 'sobre', 'servicos', 'momentos', 'depoimentos', 'contato'];
  sectionsToShow.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'block';
  });
  
  // Hide blog and portfolio
  const blogElement = document.getElementById('blog');
  if (blogElement) blogElement.style.display = 'none';
  
  const portfolioElement = document.getElementById('portfolio');
  if (portfolioElement) portfolioElement.style.display = 'none';
  
  // Update page title
  document.title = 'SEMPRE - Gestão de Projetos e Negócios Empresariais';
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarPortfolio() {
  // Hide all normal sections
  const sectionsToHide = ['inicio', 'sobre', 'servicos', 'momentos', 'depoimentos', 'contato'];
  sectionsToHide.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
  });
  
  // Hide blog
  const blogElement = document.getElementById('blog');
  if (blogElement) blogElement.style.display = 'none';
  
  // Show portfolio
  const portfolioElement = document.getElementById('portfolio');
  if (portfolioElement) {
    portfolioElement.style.display = 'block';
    
    // Re-initialize animations for portfolio cards
    const portfolioCards = portfolioElement.querySelectorAll('.service-card');
    portfolioCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'all 0.6s ease';
      }, index * 100);
    });
  }
  
  // Update page title
  document.title = 'Portfólio - Nossos Principais Projetos | SEMPRE';
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarBlog() {
  // Hide all normal sections and portfolio
  const sectionsToHide = ['inicio', 'sobre', 'servicos', 'momentos', 'depoimentos', 'contato'];
  sectionsToHide.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
  });
  
  // Hide portfolio
  const portfolioElement = document.getElementById('portfolio');
  if (portfolioElement) portfolioElement.style.display = 'none';
  
  // Show blog
  const blogElement = document.getElementById('blog');
  if (blogElement) {
    blogElement.style.display = 'block';
    
    // Initialize blog manager if not already done
    if (!blogManager) {
      blogManager = new BlogManager();
    }
    
    // Load posts
    blogManager.loadPosts();
  }
  
  // Update page title
  document.title = 'Principais Notícias - Artigos sobre Gestão de Projetos Sociais';
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Legacy function for compatibility
function carregarPosts() {
  if (blogManager) {
    blogManager.loadPosts();
  }
}
