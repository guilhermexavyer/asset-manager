// Elementos do DOM
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('overlay');
const logoutBtn = document.getElementById('logoutBtn');
const navLinks = document.querySelectorAll('.nav-link');
const submenuLinks = document.querySelectorAll('.submenu-link');
const hasSubmenuItems = document.querySelectorAll('.nav-item.has-submenu');

// Estado da aplicação
let isMobile = window.innerWidth <= 768;
let sidebarCollapsed = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateLayout();
});

// Configuração inicial da aplicação
function initializeApp() {
    // Verificar se é mobile
    checkMobileView();
    
    // Configurar estado inicial do sidebar
    if (isMobile) {
        sidebar.classList.remove('active');
    }
    
    // Adicionar animação de entrada aos cards
    animateCards();
    
    // Configurar tooltips para itens com submenu
    setupSubmenuTooltips();
}

// Configurar event listeners
function setupEventListeners() {
    // Toggle do menu
    menuToggle.addEventListener('click', toggleSidebar);
    
    // Overlay para fechar menu no mobile
    overlay.addEventListener('click', closeSidebar);
    
    // Botão de logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Links de navegação principais
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Links de submenu
    submenuLinks.forEach(link => {
        link.addEventListener('click', handleSubmenuNavigation);
    });
    
    // Itens com submenu
    hasSubmenuItems.forEach(item => {
        const mainLink = item.querySelector('.nav-link');
        mainLink.addEventListener('click', handleSubmenuToggle);
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', handleResize);
    
    // Teclas de atalho
    document.addEventListener('keydown', handleKeyboard);
    
    // Prevenir comportamento padrão dos links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// Toggle do sidebar
function toggleSidebar() {
    if (isMobile) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    } else {
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('collapsed', sidebarCollapsed);
        
        // Salvar preferência no localStorage
        localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
    }
}

// Fechar sidebar
function closeSidebar() {
    if (isMobile) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Verificar se é visualização mobile
function checkMobileView() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== isMobile) {
        // Mudou de desktop para mobile ou vice-versa
        if (isMobile) {
            // Mudou para mobile
            sidebar.classList.remove('collapsed');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Mudou para desktop
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Restaurar estado do sidebar colapsado
            const savedState = localStorage.getItem('sidebarCollapsed');
            if (savedState === 'true') {
                sidebarCollapsed = true;
                sidebar.classList.add('collapsed');
            }
        }
    }
}

// Manipular redimensionamento
function handleResize() {
    checkMobileView();
    updateLayout();
}

// Atualizar layout
function updateLayout() {
    // Ajustar altura dos gráficos se necessário
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        const placeholder = container.querySelector('.chart-placeholder');
        if (placeholder && window.innerWidth < 768) {
            placeholder.style.height = '150px';
        } else if (placeholder) {
            placeholder.style.height = '200px';
        }
    });
}

// Manipular navegação
function handleNavigation(e) {
    e.preventDefault();
    
    // Remover classe active de todos os itens
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adicionar classe active ao item clicado
    const navItem = e.currentTarget.closest('.nav-item');
    navItem.classList.add('active');
    
    // Obter o destino da navegação
    const href = e.currentTarget.getAttribute('href');
    const pageName = href.replace('#', '');
    
    // Atualizar título da página
    updatePageTitle(pageName);
    
    // Simular carregamento de conteúdo
    loadPageContent(pageName);
    
    // Fechar sidebar no mobile após navegação
    if (isMobile) {
        closeSidebar();
    }
    
    // Adicionar feedback visual
    showNavigationFeedback(e.currentTarget);
}

// Atualizar título da página
function updatePageTitle(pageName) {
    const pageTitle = document.querySelector('.page-title');
    const titles = {
        'dashboard': 'Dashboard',
        'ativos': 'Gestão de Ativos',
        'categorias': 'Categorias',
        'localizacao': 'Localização',
        'manutencao': 'Manutenção',
        'relatorios': 'Relatórios',
        'usuarios': 'Usuários',
        'configuracoes': 'Configurações'
    };
    
    pageTitle.textContent = titles[pageName] || 'Dashboard';
}

// Simular carregamento de conteúdo
function loadPageContent(pageName) {
    const contentArea = document.querySelector('.content-area');
    
    // Adicionar efeito de loading
    contentArea.style.opacity = '0.7';
    contentArea.style.pointerEvents = 'none';
    
    // Simular delay de carregamento
    setTimeout(() => {
        contentArea.style.opacity = '1';
        contentArea.style.pointerEvents = 'auto';
        
        // Aqui você poderia carregar conteúdo específico para cada página
        console.log(`Carregando conteúdo para: ${pageName}`);
    }, 300);
}

// Feedback visual de navegação
function showNavigationFeedback(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// Manipular logout
function handleLogout() {
    // Confirmar logout
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        // Adicionar efeito de loading
        logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="logout-text">Saindo...</span>';
        logoutBtn.disabled = true;
        
        // Simular processo de logout
        setTimeout(() => {
            // Limpar dados locais
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirecionar para página de login (simulado)
            alert('Logout realizado com sucesso!');
            
            // Restaurar botão
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i><span class="logout-text">Sair</span>';
            logoutBtn.disabled = false;
            
            // Em uma aplicação real, você redirecionaria para a página de login
            // window.location.href = '/login';
        }, 1500);
    }
}

// Manipular teclas de atalho
function handleKeyboard(e) {
    // Esc para fechar sidebar no mobile
    if (e.key === 'Escape' && isMobile) {
        closeSidebar();
    }
    
    // Ctrl + B para toggle do sidebar
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    
    // Ctrl + L para logout
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        handleLogout();
    }
}

// Animação dos cards
function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Utilitários para dados dinâmicos
function updateCardData(cardIndex, value) {
    const cards = document.querySelectorAll('.card-number');
    if (cards[cardIndex]) {
        cards[cardIndex].textContent = value;
    }
}

// Função para adicionar novos itens à tabela
function addTableRow(data) {
    const tbody = document.querySelector('.data-table tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${data.id}</td>
        <td>${data.nome}</td>
        <td>${data.categoria}</td>
        <td><span class="status ${data.status.toLowerCase()}">${data.statusText}</span></td>
        <td>${data.data}</td>
    `;
    
    // Adicionar animação de entrada
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    tbody.appendChild(row);
    
    // Animar entrada
    setTimeout(() => {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
    }, 100);
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para atualizar dados em tempo real (simulado)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simular atualização de dados
        const randomCard = Math.floor(Math.random() * 4);
        const currentValue = document.querySelectorAll('.card-number')[randomCard]?.textContent;
        
        if (currentValue && currentValue.includes(',')) {
            const numericValue = parseInt(currentValue.replace(/[^\d]/g, ''));
            const variation = Math.floor(Math.random() * 10) - 5; // -5 a +5
            const newValue = numericValue + variation;
            
            if (randomCard < 3) {
                updateCardData(randomCard, newValue.toLocaleString('pt-BR'));
            }
        }
    }, 30000); // Atualizar a cada 30 segundos
}

// Inicializar atualizações em tempo real
setTimeout(simulateRealTimeUpdates, 5000);

// Função para exportar dados (exemplo)
function exportData(format = 'csv') {
    showNotification(`Exportando dados em formato ${format.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        showNotification('Dados exportados com sucesso!', 'success');
    }, 2000);
}

// Adicionar tooltips aos ícones quando o sidebar estiver colapsado
function updateTooltips() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const text = link.querySelector('.nav-text')?.textContent;
        if (text) {
            link.setAttribute('title', text);
        }
    });
}

// Inicializar tooltips
updateTooltips();

// Função para busca (placeholder)
function initializeSearch() {
    // Esta função pode ser expandida para incluir funcionalidade de busca
    console.log('Sistema de busca inicializado');
}

// Carregar preferências do usuário
function loadUserPreferences() {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed === 'true' && !isMobile) {
        sidebarCollapsed = true;
        sidebar.classList.add('collapsed');
    }
}

// Carregar preferências na inicialização
loadUserPreferences();


// Funções para Submenus

// Toggle de submenu
function handleSubmenuToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const navItem = e.currentTarget.closest('.nav-item.has-submenu');
    const isOpen = navItem.classList.contains('open');
    
    // Se o sidebar estiver colapsado no desktop, não abrir submenu
    if (sidebarCollapsed && !isMobile) {
        return;
    }
    
    // Fechar outros submenus
    hasSubmenuItems.forEach(item => {
        if (item !== navItem) {
            item.classList.remove('open');
        }
    });
    
    // Toggle do submenu atual
    navItem.classList.toggle('open', !isOpen);
    
    // Adicionar feedback visual
    showNavigationFeedback(e.currentTarget);
}

// Navegação em submenu
function handleSubmenuNavigation(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Remover classe active de todos os itens
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adicionar classe active ao item clicado
    const submenuItem = e.currentTarget.closest('.submenu-item');
    const parentNavItem = e.currentTarget.closest('.nav-item.has-submenu');
    
    submenuItem.classList.add('active');
    parentNavItem.classList.add('active');
    
    // Obter o destino da navegação
    const href = e.currentTarget.getAttribute('href');
    const pageName = href.replace('#', '');
    
    // Atualizar título da página
    updatePageTitle(pageName);
    
    // Simular carregamento de conteúdo
    loadPageContent(pageName);
    
    // Fechar sidebar no mobile após navegação
    if (isMobile) {
        closeSidebar();
    }
    
    // Adicionar feedback visual
    showNavigationFeedback(e.currentTarget);
}

// Configurar tooltips para itens com submenu quando colapsado
function setupSubmenuTooltips() {
    hasSubmenuItems.forEach(item => {
        const navText = item.querySelector('.nav-text').textContent;
        item.setAttribute('data-tooltip', navText);
    });
}

// Atualizar função de navegação principal para lidar com submenus
function handleNavigation(e) {
    const navItem = e.currentTarget.closest('.nav-item');
    
    // Se o item tem submenu, apenas toggle (não navegar)
    if (navItem.classList.contains('has-submenu')) {
        return; // O handleSubmenuToggle já foi chamado
    }
    
    e.preventDefault();
    
    // Remover classe active de todos os itens
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Fechar todos os submenus
    hasSubmenuItems.forEach(item => {
        item.classList.remove('open');
    });
    
    // Adicionar classe active ao item clicado
    navItem.classList.add('active');
    
    // Obter o destino da navegação
    const href = e.currentTarget.getAttribute('href');
    const pageName = href.replace('#', '');
    
    // Atualizar título da página
    updatePageTitle(pageName);
    
    // Simular carregamento de conteúdo
    loadPageContent(pageName);
    
    // Fechar sidebar no mobile após navegação
    if (isMobile) {
        closeSidebar();
    }
    
    // Adicionar feedback visual
    showNavigationFeedback(e.currentTarget);
}

// Atualizar função updatePageTitle para incluir novos títulos
function updatePageTitle(pageName) {
    const pageTitle = document.querySelector('.page-title');
    const titles = {
        'dashboard': 'Dashboard',
        'patrimonio': 'Patrimônio',
        'ativos': 'Ativos',
        'licencas': 'Licenças',
        'dominios': 'Domínios',
        'cadastros': 'Cadastros Gerais',
        'categoria': 'Categoria',
        'localizacao': 'Localização',
        'pessoa-fisica': 'Pessoa Física',
        'pessoa-juridica': 'Pessoa Jurídica',
        'usuarios': 'Usuários',
        'prestador-servico': 'Prestador de Serviço',
        'fornecedor': 'Fornecedor',
        'manutencao': 'Manutenção',
        'relatorios': 'Relatórios',
        'configuracoes': 'Configurações'
    };
    
    pageTitle.textContent = titles[pageName] || 'Dashboard';
}

// Fechar submenus quando sidebar é colapsado
function toggleSidebar() {
    if (isMobile) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    } else {
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('collapsed', sidebarCollapsed);
        
        // Fechar todos os submenus quando colapsar
        if (sidebarCollapsed) {
            hasSubmenuItems.forEach(item => {
                item.classList.remove('open');
            });
        }
        
        // Salvar preferência no localStorage
        localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
    }
}

// Atualizar função de redimensionamento para lidar com submenus
function handleResize() {
    const wasMobile = isMobile;
    checkMobileView();
    updateLayout();
    
    // Se mudou de mobile para desktop, fechar submenus se sidebar estiver colapsado
    if (wasMobile && !isMobile && sidebarCollapsed) {
        hasSubmenuItems.forEach(item => {
            item.classList.remove('open');
        });
    }
}

// Função para fechar todos os submenus
function closeAllSubmenus() {
    hasSubmenuItems.forEach(item => {
        item.classList.remove('open');
    });
}

// Adicionar ao handleKeyboard para fechar submenus com Esc
function handleKeyboard(e) {
    // Esc para fechar sidebar no mobile ou submenus
    if (e.key === 'Escape') {
        if (isMobile) {
            closeSidebar();
        } else {
            closeAllSubmenus();
        }
    }
    
    // Ctrl + B para toggle do sidebar
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    
    // Ctrl + L para logout
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        handleLogout();
    }
}

