// ========================================
// PORTFOLIO PROFISSIONAL - RAPHAEL DEL ROSSE
// ========================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initTypingEffect();
    initProjectCards();
    initFormValidation();
    initSmoothScroll();
    initBackToTop();
});

// ========================================
// NAVBAR - Comportamento ao Scroll
// ========================================
function initNavbar() {
    const navbar = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adiciona sombra ao fazer scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Destaca o link ativo na navegação
    highlightActiveNav();
}

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========================================
// ANIMAÇÕES AO SCROLL - Intersection Observer
// ========================================
function initScrollAnimations() {
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

    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .hero-text, .hero-photo-box, .sobre-container, .contact-content'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// EFEITO DE DIGITAÇÃO - Página Inicial
// ========================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    // Inicia após um pequeno delay
    setTimeout(type, 500);
}

// ========================================
// CARDS DE PROJETOS - Efeitos Interativos
// ========================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Efeito de tilt suave ao passar o mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        // Adiciona transição suave
        card.style.transition = 'transform 0.3s ease';
    });
}

// ========================================
// VALIDAÇÃO DE FORMULÁRIO - Página de Contato
// ========================================
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Pega os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const assunto = document.getElementById('assunto').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validações
        if (!nome || !email || !assunto || !mensagem) {
            showNotification('Por favor, preencha todos os campos!', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Por favor, insira um email válido!', 'error');
            return;
        }
        
        // Simula envio (aqui você integraria com backend)
        showNotification('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
        form.reset();
    });

    // Validação em tempo real dos campos
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#10b981';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = '#f97316';
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Cria nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
    `;
    
    document.body.appendChild(notification);
    
    // Remove após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ========================================
// SMOOTH SCROLL - Rolagem suave
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================
function initBackToTop() {
    // Cria o botão
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    
    // Estilos inline
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-orange, #f97316);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Mostra/esconde baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Ação de clique
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efeito hover
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
        backToTopBtn.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)';
    });
}

// ========================================
// ANIMAÇÕES CSS - Adiciona ao head
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .back-to-top:active {
        transform: scale(0.95) !important;
    }
`;
document.head.appendChild(style);

// ========================================
// CONTADOR DE ESTATÍSTICAS (se existir)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Console personalizado
console.log('%c🚀 Portfolio Raphael Del Rosse', 'font-size: 20px; color: #f97316; font-weight: bold;');
console.log('%c💼 Desenvolvedor Back-End | Python & Django | AWS', 'font-size: 14px; color: #1e3a8a;');
console.log('%c📧 rapharosseprofissional@gmail.com', 'font-size: 12px; color: #64748b;');