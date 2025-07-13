// Elementos do DOM
const sidebarPrincipal = document.getElementById('sidebarPrincipal');
const botaoMenuToggle = document.getElementById('botaoMenuToggle');
const overlayMobile = document.getElementById('overlayMobile');
const botaoLogout = document.getElementById('botaoLogout');
const linksNavegacao = document.querySelectorAll('.link-navegacao');
const linksSubmenu = document.querySelectorAll('.link-submenu');
const itensComSubmenu = document.querySelectorAll('.item-navegacao.tem-submenu');

// Estado da aplicação
let ehMobile = window.innerWidth <= 768;
let sidebarColapsada = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacao();
    configurarEventListeners();
    atualizarLayout();
});

// Configuração inicial da aplicação
function inicializarAplicacao() {
    // Verificar se é mobile
    verificarVisualizacaoMobile();
    
    // Configurar estado inicial do sidebar
    if (ehMobile) {
        sidebarPrincipal.classList.remove('ativo');
    }
    
    // Adicionar animação de entrada aos cards
    animarCards();
    
    // Configurar tooltips para itens com submenu
    configurarTooltipsSubmenu();
    
    // Carregar preferências do usuário
    carregarPreferenciasUsuario();
}

// Configurar event listeners
function configurarEventListeners() {
    // Toggle do menu
    botaoMenuToggle.addEventListener('click', alternarSidebar);
    
    // Overlay para fechar menu no mobile
    overlayMobile.addEventListener('click', fecharSidebar);
    
    // Botão de logout
    botaoLogout.addEventListener('click', manipularLogout);
    
    // Links de navegação principais
    linksNavegacao.forEach(link => {
        link.addEventListener('click', manipularNavegacao);
    });
    
    // Links de submenu
    linksSubmenu.forEach(link => {
        link.addEventListener('click', manipularNavegacaoSubmenu);
    });
    
    // Itens com submenu
    itensComSubmenu.forEach(item => {
        const linkPrincipal = item.querySelector('.link-navegacao');
        linkPrincipal.addEventListener('click', manipularToggleSubmenu);
    });
    
    // Redimensionamento da janela
    window.addEventListener('resize', manipularRedimensionamento);
    
    // Teclas de atalho
    document.addEventListener('keydown', manipularTeclado);
    
    // Prevenir comportamento padrão dos links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// Toggle do sidebar
function alternarSidebar() {
    if (ehMobile) {
        sidebarPrincipal.classList.toggle('ativo');
        overlayMobile.classList.toggle('ativo');
        document.body.style.overflow = sidebarPrincipal.classList.contains('ativo') ? 'hidden' : '';
    } else {
        sidebarColapsada = !sidebarColapsada;
        sidebarPrincipal.classList.toggle('colapsada', sidebarColapsada);
        
        // Fechar todos os submenus quando colapsar
        if (sidebarColapsada) {
            itensComSubmenu.forEach(item => {
                item.classList.remove('aberto');
            });
        }
        
        // Salvar preferência no localStorage
        localStorage.setItem('sidebarColapsada', sidebarColapsada);
    }
}

// Fechar sidebar
function fecharSidebar() {
    if (ehMobile) {
        sidebarPrincipal.classList.remove('ativo');
        overlayMobile.classList.remove('ativo');
        document.body.style.overflow = '';
    }
}

// Verificar se é visualização mobile
function verificarVisualizacaoMobile() {
    const eraMobile = ehMobile;
    ehMobile = window.innerWidth <= 768;
    
    if (eraMobile !== ehMobile) {
        // Mudou de desktop para mobile ou vice-versa
        if (ehMobile) {
            // Mudou para mobile
            sidebarPrincipal.classList.remove('colapsada');
            sidebarPrincipal.classList.remove('ativo');
            overlayMobile.classList.remove('ativo');
            document.body.style.overflow = '';
        } else {
            // Mudou para desktop
            sidebarPrincipal.classList.remove('ativo');
            overlayMobile.classList.remove('ativo');
            document.body.style.overflow = '';
            
            // Restaurar estado do sidebar colapsado
            const estadoSalvo = localStorage.getItem('sidebarColapsada');
            if (estadoSalvo === 'true') {
                sidebarColapsada = true;
                sidebarPrincipal.classList.add('colapsada');
            }
        }
    }
}

// Manipular redimensionamento
function manipularRedimensionamento() {
    const eraMobile = ehMobile;
    verificarVisualizacaoMobile();
    atualizarLayout();
    
    // Se mudou de mobile para desktop, fechar submenus se sidebar estiver colapsado
    if (eraMobile && !ehMobile && sidebarColapsada) {
        itensComSubmenu.forEach(item => {
            item.classList.remove('aberto');
        });
    }
}

// Atualizar layout
function atualizarLayout() {
    // Ajustar altura dos gráficos se necessário
    const containersGrafico = document.querySelectorAll('.container-grafico');
    containersGrafico.forEach(container => {
        const placeholder = container.querySelector('.placeholder-grafico');
        if (placeholder && window.innerWidth < 768) {
            placeholder.style.height = '150px';
        } else if (placeholder) {
            placeholder.style.height = '200px';
        }
    });
}

// Manipular navegação principal
function manipularNavegacao(e) {
    const itemNavegacao = e.currentTarget.closest('.item-navegacao');
    
    // Se o item tem submenu, apenas toggle (não navegar)
    if (itemNavegacao.classList.contains('tem-submenu')) {
        return; // O manipularToggleSubmenu já foi chamado
    }
    
    e.preventDefault();
    
    // Remover classe ativo de todos os itens
    document.querySelectorAll('.item-navegacao').forEach(item => {
        item.classList.remove('ativo');
    });
    document.querySelectorAll('.item-submenu').forEach(item => {
        item.classList.remove('ativo');
    });
    
    // Fechar todos os submenus
    itensComSubmenu.forEach(item => {
        item.classList.remove('aberto');
    });
    
    // Adicionar classe ativo ao item clicado
    itemNavegacao.classList.add('ativo');
    
    // Obter o destino da navegação
    const href = e.currentTarget.getAttribute('href');
    const nomePagina = href.replace('#', '');
    
    // Atualizar título da página
    atualizarTituloPagina(nomePagina);
    
    // Simular carregamento de conteúdo
    carregarConteudoPagina(nomePagina);
    
    // Fechar sidebar no mobile após navegação
    if (ehMobile) {
        fecharSidebar();
    }
    
    // Adicionar feedback visual
    mostrarFeedbackNavegacao(e.currentTarget);
}

// Toggle de submenu
function manipularToggleSubmenu(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const itemNavegacao = e.currentTarget.closest('.item-navegacao.tem-submenu');
    const estaAberto = itemNavegacao.classList.contains('aberto');
    
    // Se o sidebar estiver colapsado no desktop, não abrir submenu
    if (sidebarColapsada && !ehMobile) {
        return;
    }
    
    // Fechar outros submenus
    itensComSubmenu.forEach(item => {
        if (item !== itemNavegacao) {
            item.classList.remove('aberto');
        }
    });
    
    // Toggle do submenu atual
    itemNavegacao.classList.toggle('aberto', !estaAberto);
    
    // Adicionar feedback visual
    mostrarFeedbackNavegacao(e.currentTarget);
}

// Navegação em submenu
function manipularNavegacaoSubmenu(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Remover classe ativo de todos os itens
    document.querySelectorAll('.item-navegacao').forEach(item => {
        item.classList.remove('ativo');
    });
    document.querySelectorAll('.item-submenu').forEach(item => {
        item.classList.remove('ativo');
    });
    
    // Adicionar classe ativo ao item clicado
    const itemSubmenu = e.currentTarget.closest('.item-submenu');
    const itemNavegacaoPai = e.currentTarget.closest('.item-navegacao.tem-submenu');
    
    itemSubmenu.classList.add('ativo');
    itemNavegacaoPai.classList.add('ativo');
    
    // Obter o destino da navegação
    const href = e.currentTarget.getAttribute('href');
    const nomePagina = href.replace('#', '');
    
    // Atualizar título da página
    atualizarTituloPagina(nomePagina);
    
    // Simular carregamento de conteúdo
    carregarConteudoPagina(nomePagina);
    
    // Fechar sidebar no mobile após navegação
    if (ehMobile) {
        fecharSidebar();
    }
    
    // Adicionar feedback visual
    mostrarFeedbackNavegacao(e.currentTarget);
}

// Atualizar título da página
function atualizarTituloPagina(nomePagina) {
    const tituloPagina = document.querySelector('.titulo-pagina');
    const titulos = {
        'dashboard': 'Dashboard',
        'patrimonio': 'Patrimônio',
        'ativos': 'Ativos',
        'licencas': 'Licenças',
        'dominios': 'Domínios',
        'cadastros': 'Cadastros Gerais',
        'categoria-ativos': 'Categoria de Ativos',
        'categoria-licencas': 'Categoria de Licenças',
        'fornecedor': 'Fornecedor',
        'localizacao': 'Localização',
        'pessoa-fisica': 'Pessoa Física',
        'pessoa-juridica': 'Pessoa Jurídica',
        'prestador-servico': 'Prestador de Serviço',
        'usuarios': 'Usuários',
        'manutencao': 'Manutenção',
        'relatorios': 'Relatórios',
        'configuracoes': 'Configurações'
    };
    
    tituloPagina.textContent = titulos[nomePagina] || 'Dashboard';
}

// Simular carregamento de conteúdo
function carregarConteudoPagina(nomePagina) {
    const areaConteudo = document.querySelector('.area-conteudo');
    
    // Adicionar efeito de loading
    areaConteudo.style.opacity = '0.7';
    areaConteudo.style.pointerEvents = 'none';
    
    // Simular delay de carregamento
    setTimeout(() => {
        areaConteudo.style.opacity = '1';
        areaConteudo.style.pointerEvents = 'auto';
        
        // Aqui você poderia carregar conteúdo específico para cada página
        console.log(`Carregando conteúdo para: ${nomePagina}`);
    }, 300);
}

// Feedback visual de navegação
function mostrarFeedbackNavegacao(elemento) {
    elemento.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elemento.style.transform = 'scale(1)';
    }, 150);
}

// Manipular logout
function manipularLogout() {
    // Confirmar logout
    if (confirm('Tem certeza que deseja sair do sistema?')) {
        // Adicionar efeito de loading
        botaoLogout.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="texto-logout">Saindo...</span>';
        botaoLogout.disabled = true;
        
        // Simular processo de logout
        setTimeout(() => {
            // Limpar dados locais
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirecionar para página de login
            window.location.href = 'login.html';
        }, 1);
    }
}

// Manipular teclas de atalho
function manipularTeclado(e) {
    // Esc para fechar sidebar no mobile ou submenus
    if (e.key === 'Escape') {
        if (ehMobile) {
            fecharSidebar();
        } else {
            fecharTodosSubmenus();
        }
    }
    
    // Ctrl + X para toggle do sidebar
    if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        alternarSidebar();
    }
    
    // Ctrl + L para logout
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        manipularLogout();
    }
}

// Animação dos cards
function animarCards() {
    const cards = document.querySelectorAll('.card-resumo');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Configurar tooltips para itens com submenu quando colapsado
function configurarTooltipsSubmenu() {
    itensComSubmenu.forEach(item => {
        const textoNavegacao = item.querySelector('.texto-navegacao').textContent;
        item.setAttribute('data-tooltip', textoNavegacao);
    });
}

// Função para fechar todos os submenus
function fecharTodosSubmenus() {
    itensComSubmenu.forEach(item => {
        item.classList.remove('aberto');
    });
}

// Carregar preferências do usuário
function carregarPreferenciasUsuario() {
    const estadoSalvo = localStorage.getItem('sidebarColapsada');
    if (estadoSalvo === 'true' && !ehMobile) {
        sidebarColapsada = true;
        sidebarPrincipal.classList.add('colapsada');
    }
}

// Utilitários para dados dinâmicos
function atualizarDadosCard(indiceCard, valor) {
    const cards = document.querySelectorAll('.numero-card');
    if (cards[indiceCard]) {
        cards[indiceCard].textContent = valor;
    }
}

// Função para adicionar novos itens à tabela
function adicionarLinhaTabela(dados) {
    const tbody = document.querySelector('.tabela-dados tbody');
    const linha = document.createElement('tr');
    
    linha.innerHTML = `
        <td>${dados.id}</td>
        <td>${dados.nome}</td>
        <td>${dados.categoria}</td>
        <td><span class="status-item ${dados.status.toLowerCase()}">${dados.textoStatus}</span></td>
        <td>${dados.data}</td>
    `;
    
    // Adicionar animação de entrada
    linha.style.opacity = '0';
    linha.style.transform = 'translateY(20px)';
    tbody.appendChild(linha);
    
    // Animar entrada
    setTimeout(() => {
        linha.style.transition = 'all 0.3s ease';
        linha.style.opacity = '1';
        linha.style.transform = 'translateY(0)';
    }, 100);
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.innerHTML = `
        <i class="fas fa-${tipo === 'sucesso' ? 'check-circle' : tipo === 'erro' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${mensagem}</span>
    `;
    
    // Estilos da notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'sucesso' ? '#10b981' : tipo === 'erro' ? '#ef4444' : '#4F46E5'};
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
        font-family: 'Ubuntu', sans-serif;
    `;
    
    document.body.appendChild(notificacao);
    
    // Animar entrada
    setTimeout(() => {
        notificacao.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notificacao)) {
                document.body.removeChild(notificacao);
            }
        }, 300);
    }, 3000);
}

// Função para atualizar dados em tempo real (simulado)
function simularAtualizacoesTempoReal() {
    setInterval(() => {
        // Simular atualização de dados
        const cardAleatorio = Math.floor(Math.random() * 4);
        const valorAtual = document.querySelectorAll('.numero-card')[cardAleatorio]?.textContent;
        
        if (valorAtual && valorAtual.includes(',')) {
            const valorNumerico = parseInt(valorAtual.replace(/[^\d]/g, ''));
            const variacao = Math.floor(Math.random() * 10) - 5; // -5 a +5
            const novoValor = valorNumerico + variacao;
            
            if (cardAleatorio < 3) {
                atualizarDadosCard(cardAleatorio, novoValor.toLocaleString('pt-BR'));
            }
        }
    }, 30000); // Atualizar a cada 30 segundos
}

// Inicializar atualizações em tempo real
setTimeout(simularAtualizacoesTempoReal, 5000);

// Função para exportar dados (exemplo)
function exportarDados(formato = 'csv') {
    mostrarNotificacao(`Exportando dados em formato ${formato.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        mostrarNotificacao('Dados exportados com sucesso!', 'sucesso');
    }, 2000);
}

// Adicionar tooltips aos ícones quando o sidebar estiver colapsado
function atualizarTooltips() {
    const linksNavegacao = document.querySelectorAll('.link-navegacao');
    
    linksNavegacao.forEach(link => {
        const texto = link.querySelector('.texto-navegacao')?.textContent;
        if (texto) {
            link.setAttribute('title', texto);
        }
    });
}

// Inicializar tooltips
atualizarTooltips();

// Função para busca (placeholder)
function inicializarBusca() {
    // Esta função pode ser expandida para incluir funcionalidade de busca
    console.log('Sistema de busca inicializado');
}

// Inicializar busca
inicializarBusca();

// Função para demonstrar funcionalidades
function demonstrarFuncionalidades() {
    setTimeout(() => {
        mostrarNotificacao('Sistema carregado com sucesso!', 'sucesso');
    }, 1000);
    
    setTimeout(() => {
        mostrarNotificacao('Use Ctrl+X para alternar o menu lateral', 'info');
    }, 2000);
}

// Demonstrar funcionalidades na inicialização
demonstrarFuncionalidades();

