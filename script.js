// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Service Modal Functionality
const modal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

const serviceDetails = {
    captacao: {
        title: 'Captação de Recursos',
        content: `
            <h3>Captação de Recursos</h3>
            <p>Desenvolvemos estratégias personalizadas para captação de recursos, incluindo:</p>
            <ul>
                <li>Identificação de fontes de financiamento adequadas ao seu projeto</li>
                <li>Elaboração de propostas técnicas e comerciais</li>
                <li>Mapeamento de editais e oportunidades</li>
                <li>Desenvolvimento de parcerias estratégicas</li>
                <li>Acompanhamento de processos seletivos</li>
                <li>Gestão de relacionamento com financiadores</li>
            </ul>
            <p>Nossa experiência garante maior assertividade na busca por recursos e sustentabilidade financeira para seu projeto.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    diagnostico: {
        title: 'Diagnóstico de Viabilidade',
        content: `
            <h3>Diagnóstico de Viabilidade</h3>
            <p>Realizamos análise completa da viabilidade do seu projeto:</p>
            <ul>
                <li>Avaliação jurídica e regulatória</li>
                <li>Análise fiscal e tributária</li>
                <li>Estudo de viabilidade técnica</li>
                <li>Análise de riscos e oportunidades</li>
                <li>Avaliação de sustentabilidade financeira</li>
                <li>Relatório executivo com recomendações</li>
            </ul>
            <p>Nosso diagnóstico oferece uma visão clara sobre a viabilidade e os caminhos para o sucesso do seu projeto.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    documental: {
        title: 'Gestão Documental',
        content: `
            <h3>Gestão Documental</h3>
            <p>Organizamos e estruturamos toda a documentação institucional:</p>
            <ul>
                <li>Organização de arquivos físicos e digitais</li>
                <li>Criação de sistemas de controle documental</li>
                <li>Padronização de processos documentais</li>
                <li>Digitalização e backup de documentos</li>
                <li>Controle de versões e atualizações</li>
                <li>Treinamento de equipes para manutenção</li>
            </ul>
            <p>Garantimos que sua organização tenha toda a documentação organizada e acessível quando necessário.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    elaboracao: {
        title: 'Elaboração Técnica de Projetos',
        content: `
            <h3>Elaboração Técnica de Projetos</h3>
            <p>Desenvolvemos projetos completos e profissionais:</p>
            <ul>
                <li>Elaboração de propostas técnicas detalhadas</li>
                <li>Desenvolvimento de orçamentos precisos</li>
                <li>Criação de cronogramas executivos</li>
                <li>Definição de indicadores e metas</li>
                <li>Planos de monitoramento e avaliação</li>
                <li>Adequação às exigências dos financiadores</li>
            </ul>
            <p>Nossos projetos são elaborados com rigor técnico e atendem aos mais altos padrões de qualidade.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    representacao: {
        title: 'Representação Institucional',
        content: `
            <h3>Representação Institucional</h3>
            <p>Representamos sua organização com profissionalismo:</p>
            <ul>
                <li>Representação em reuniões e eventos</li>
                <li>Negociação com órgãos públicos</li>
                <li>Articulação com parceiros privados</li>
                <li>Participação em comitês e conselhos</li>
                <li>Advocacy e defesa de interesses</li>
                <li>Networking estratégico</li>
            </ul>
            <p>Nossa representação fortalece a imagem e amplia as oportunidades para sua organização.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    gestao: {
        title: 'Gestão de Contratos e Projetos',
        content: `
            <h3>Gestão de Contratos e Projetos</h3>
            <p>Coordenamos integralmente a execução de projetos:</p>
            <ul>
                <li>Planejamento e controle de execução</li>
                <li>Gestão de equipes e recursos</li>
                <li>Monitoramento de prazos e entregas</li>
                <li>Controle orçamentário e financeiro</li>
                <li>Gestão de riscos e contingências</li>
                <li>Relatórios periódicos de progresso</li>
            </ul>
            <p>Garantimos que seus projetos sejam executados com eficiência e dentro dos prazos estabelecidos.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    prestacao: {
        title: 'Prestação de Contas',
        content: `
            <h3>Prestação de Contas</h3>
            <p>Elaboramos relatórios completos e transparentes:</p>
            <ul>
                <li>Relatórios técnicos de atividades</li>
                <li>Demonstrativos financeiros detalhados</li>
                <li>Comprovação de aplicação de recursos</li>
                <li>Indicadores de resultados e impacto</li>
                <li>Documentação de evidências</li>
                <li>Adequação às exigências dos financiadores</li>
            </ul>
            <p>Nossos relatórios garantem transparência total e facilitam a renovação de parcerias.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    },
    capacitacao: {
        title: 'Capacitação e Qualificação',
        content: `
            <h3>Capacitação e Qualificação</h3>
            <p>Oferecemos treinamentos especializados para sua equipe:</p>
            <ul>
                <li>Cursos de gestão de projetos</li>
                <li>Treinamentos em captação de recursos</li>
                <li>Capacitação em prestação de contas</li>
                <li>Workshops de planejamento estratégico</li>
                <li>Formação em liderança e gestão</li>
                <li>Certificações profissionais</li>
            </ul>
            <p>Desenvolvemos as competências da sua equipe para maior autonomia e eficiência organizacional.</p>
            <div style="margin-top: 20px;">
                <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">Solicite uma proposta</a>
            </div>
        `
    }
};

function openModal(serviceKey) {
    const service = serviceDetails[serviceKey];
    if (service) {
        modalBody.innerHTML = service.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeServiceModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeServiceModal();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !phone || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Phone validation (Brazilian format)
    const phoneRegex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Por favor, insira um telefone válido.');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .value-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 7) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        
        e.target.value = value;
    });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2c5aa0;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeServiceModal();
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Focus management for modal
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop';
        this.alt = 'Imagem não disponível';
    });
});

console.log('SEMPRE Website loaded successfully!');