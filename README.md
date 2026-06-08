# 💼 Portfolio - Raphael Del Rosse

Portfólio profissional de um Desenvolvedor Back-End especializado em Python, Django e AWS.

## 🌐 Ver Online
👉 [rapharossepro.github.io/meu_portifolio](https://rapharossepro.github.io/meu_portifolio)

## 🚀 Sobre
Estudante de Análise e Desenvolvimento de Sistemas, focado em:
- Desenvolvimento Back-End (Python/Django)
- Cloud Computing (AWS Certified)
- DevOps e Automação
- Inteligência Artificial

## 🛠️ Tecnologias Utilizadas
- HTML5 (Semântico)
- CSS3 (Design Responsivo, Flexbox/Grid, Animações e Variáveis)
- JavaScript (Vanilla JS, DOM Manipulation, ES6+)
- Git & GitHub

## 🏗️ Estrutura do Projeto
O portfólio foi estruturado no formato Multi-Page Application (MPA) para melhor organização das responsabilidades de cada página:
- **`index.html`**: Página inicial (Home) contendo apresentação, efeitos de digitação e chamadas de ação (CTAs).
- **`sobre.html`**: Seção detalhada sobre trajetória profissional, habilidades (skills) e histórico de estudos.
- **`projetos.html`**: Galeria contendo os projetos desenvolvidos, com cards interativos em 3D.
- **`contato.html`**: Página contendo formulário inteligente com validações em tempo real e links sociais.

## 🎨 Estilização e Efeitos (CSS)
Toda a parte visual foi construída de forma manual (sem frameworks), garantindo controle total sobre o design:
- **Design Responsivo (Mobile First):** Uso intensivo de Media Queries para adaptar o layout em dispositivos móveis, tablets e desktops de forma fluída.
- **Flexbox & CSS Grid:** Utilizados de maneira ampla para alinhar conteúdos perfeitamente, como menus de navegação, galerias de cards e estrutura dos formulários.
- **Variáveis CSS:** Padronização global de cores, tipografias e espaçamentos, permitindo manutenção rápida de temas no futuro.
- **Animações e Transições Keyframes:** Efeitos visuais aplicados a botões (hovers dinâmicos), cards e surgimento de componentes de notificação na tela.

## ⚡ Funcionalidades JavaScript (`script.js`)
O código JavaScript centralizado no `script.js` foi encapsulado e organizado em funções específicas, e orquestrado no momento em que o DOM é carregado completamente (`DOMContentLoaded`):

### Navegação e Experiência do Usuário
- **`initNavbar()`**: Monitora a rolagem (scroll) para aplicar sombreamento dinâmico na barra superior, além de identificar a URL e destacar a página ativa no menu via classe CSS (função `highlightActiveNav`).
- **`initSmoothScroll()`**: Intercepta cliques em links internos (âncoras `#`) e executa um deslize suave até a respectiva seção.
- **`initBackToTop()`**: Cria via manipulação de DOM um botão flutuante de "Voltar ao Topo", injeta seus estilos e controla sua visibilidade de acordo com os pixels rolados.
- **`initPageTransitions()`**: Aplica um efeito de "Fade In/Out" ao transitar entre as diferentes páginas do portfólio através da criação de um overlay escuro, ocultando quebras bruscas de carregamento do navegador.

### Dinâmica e Textos Interativos
- **`initGreeting()`**: Função que analisa o horário atual via objeto `Date` e saúda o usuário com ("Bom dia", "Boa tarde", ou "Boa noite"). Também calcula matematicamente (dinamicamente) os anos de estudos em TI.
- **`initTypingEffect()`**: Efeito autoral de digitação que imprime letra por letra os títulos (typewriter effect). Diferencial: a função processa nós de texto validando o fechamento das tags HTML sem quebrá-las visualmente, além de usar atrasos em cascata para sincronizar múltiplas animações de frases.
- **`animateCounter(element, target, duration)`**: Utilitário projetado para animar e aumentar visualmente estatísticas no DOM a partir de 0 até um alvo especificado.

### Animações de Tela
- **`initScrollAnimations()`**: Faz o uso da avançada `IntersectionObserver API` para detectar de forma super performática o momento exato em que um elemento (como um texto de projeto ou imagem) entra na área visível da tela, acionando o gatilho da sua animação (Opacity 1, Translate Y 0).
- **`initProjectCards()`**: Capta o eixo X/Y do ponteiro do mouse nos limites delimitados (BoundingRect) de cada card e calcula uma inclinação baseada no centro, gerando um efeito visual 3D super sofisticado de "Tilt".

### Formulário Dinâmico e Validações (Página de Contato)
- **`initFormValidation()`**: Além de prevenir o envio com campos vazios, valida e-mails em tempo real aplicando Expressões Regulares (Regex). Interage com o usuário alterando a borda dos campos de `input` entre vermelho (inválido/vazio) e verde (válido) enquanto ele digita (eventos blur/focus).
- **`showNotification(message, type)`**: Constrói alertas (Toasts flutuantes) de erro ou sucesso dinamicamente injetando estilos, animações Keyframes e a mensagem via DOM na tela. A função também limpa (remove) o elemento sozinho após os 4 segundos passados (`setTimeout`).
- **`initDynamicForm()`**: Observa com um escutador o campo de opções (select). Caso o usuário tenha interesse em *Oportunidade de Vaga* ou *Freelance*, a função exibe de forma orgânica um campo extra na tela perguntando mais detalhes da proposta.

## 📱 Contato
- **Email:** rapharosseprofissional@gmail.com
- **LinkedIn:** [linkedin.com/in/raphaeldelrosse](https://www.linkedin.com/in/raphaeldelrosse/)
- **GitHub:** [github.com/rapharossepro](https://github.com/rapharossepro)

---

© 2025 - Raphael Del Rosse. Todos os direitos reservados.
