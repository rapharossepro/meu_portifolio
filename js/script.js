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
    initDynamicForm();
    initGreeting();
    initPageTransitions();
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
// MENSAGEM DINÂMICA (IF / ELSE e ARITMÉTICA)
// ========================================
function initGreeting() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;

    const hour = new Date().getHours();
    let greeting = "";

    // Aula: Condicionais e if/else
    if (hour >= 5 && hour < 12) {
        greeting = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde";
    } else {
        greeting = "Boa noite";
    }

    // Aula: Operadores Aritméticos
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const expYears = currentYear - startYear;

    // Usando innerHTML para manipulação de DOM
    heroTitle.innerHTML = `${greeting}! <br> Eu sou Raphael Del Rosse`;
    
    console.log(`Operador aritmético - Tempo de estudos de TI: ${expYears} anos.`);
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
        '.project-card, .hero-text, .sobre-container, .contact-content'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// EFEITO DE DIGITAÇÃO - Home e Sobre
// ========================================
function initTypingEffect() {
    // Seleciona os títulos e textos principais da Home e da página Sobre
    const elements = document.querySelectorAll(
        '.hero-text h1, .hero-subtitle, .hero-description p, ' +
        '.sobre-container h1, .sobre-container p, .sobre-container ul li, .sobre-container h2'
    );

    if (elements.length === 0) return;

    elements.forEach((el, index) => {
        const html = el.innerHTML;
        el.innerHTML = '';
        el.style.opacity = '1';
        
        let i = 0;
        
        setTimeout(() => {
            function type() {
                if (i < html.length) {
                    // Se encontrar uma tag HTML, insere ela inteira de uma vez para não quebrar a formatação (ex: <strong>)
                    if (html.charAt(i) === '<') {
                        let tag = '';
                        while (html.charAt(i) !== '>' && i < html.length) {
                            tag += html.charAt(i);
                            i++;
                        }
                        tag += '>';
                        el.innerHTML += tag;
                        i++;
                        type(); // Processa o próximo caractere sem delay
                    } else {
                        el.innerHTML += html.charAt(i);
                        i++;
                        setTimeout(type, 15); // 15ms: Bem rápido para que textos longos fluam bem
                    }
                }
            }
            type();
        }, 300 + (index * 250)); // Efeito cascata: começa o 1º em 300ms, o 2º em 550ms, etc.
    });
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
                input.style.borderColor = '#ef4444'; // red erro
            } else {
                input.style.borderColor = '#10b981'; // green ok
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--accent-red)';
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
// FORMULÁRIO DINÂMICO (MANIPULAÇÃO DE DOM)
// ========================================
function initDynamicForm() {
    const motivoSelect = document.getElementById('motivo');
    const divDetalhes = document.getElementById('div-detalhes');
    
    if(motivoSelect && divDetalhes) {
        // Event listener dinâmico
        motivoSelect.addEventListener('change', function() {
            if(this.value === 'freelance' || this.value === 'vaga') {
                divDetalhes.style.display = 'flex';
                divDetalhes.style.animation = 'slideInRight 0.3s ease';
            } else {
                divDetalhes.style.display = 'none';
            }
        });
    }
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
        background: var(--accent-red, #dc2626);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
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
        backToTopBtn.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1)';
        backToTopBtn.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
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
console.log('%c🚀 Portfolio Raphael Del Rosse', 'font-size: 20px; color: #dc2626; font-weight: bold;');
console.log('%c💼 Desenvolvedor Back-End | Python & Django | AWS', 'font-size: 14px; color: #f3f4f6;');
console.log('%c📧 rapharosseprofissional@gmail.com', 'font-size: 12px; color: #9ca3af;');

// Aula: Exemplo de Switch-case
let dayOfWeek = new Date().getDay();
let dayName = "";
switch(dayOfWeek) {
    case 0: dayName = "Domingo"; break;
    case 1: dayName = "Segunda-feira"; break;
    case 2: dayName = "Terça-feira"; break;
    case 3: dayName = "Quarta-feira"; break;
    case 4: dayName = "Quinta-feira"; break;
    case 5: dayName = "Sexta-feira"; break;
    case 6: dayName = "Sábado"; break;
}
console.log(`%cHoje é ${dayName}. Ótimo dia para programar!`, 'color: #dc2626; font-style: italic;');

// ========================================
// TRANSIÇÃO DE PÁGINAS (Efeito fade de vídeo)
// ========================================
function initPageTransitions() {
    // Cria o elemento de overlay (cortina)
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // Remove a cortina quando a página carrega
    requestAnimationFrame(() => {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.pointerEvents = 'none', 500);
        }, 50);
    });

    // Intercepta os cliques nos links internos
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');

            // Ignora links externos, novas abas, links com âncora e contatos diretos
            if (target === '_blank' || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) {
                return;
            }

            e.preventDefault();
            
            // Ativa a cortina
            overlay.style.pointerEvents = 'all';
            overlay.style.opacity = '1';

            // Redireciona a página após a animação de escurecimento (500ms)
            setTimeout(() => window.location.href = href, 500);
        });
    });

    // Corrige problema de tela preta caso o usuário use o botão de "Voltar" do navegador (bfcache)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        }
    });
}