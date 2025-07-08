// Configurações e constantes
const CONFIG = {
    DEMO_CREDENTIALS: {
        username: 'admin',
        password: 'admin123'
    },
    LOADING_DURATION: 1500,
    DASHBOARD_URL: 'dashboard.html'
};

// Elementos do DOM
const elements = {
    loginForm: document.getElementById('loginForm'),
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),
    rememberMeCheckbox: document.getElementById('rememberMe'),
    loginButton: document.querySelector('.login-button'),
    buttonText: document.querySelector('.button-text'),
    loadingSpinner: document.querySelector('.loading-spinner')
};

// Estado da aplicação
let isLoading = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadSavedCredentials();
    addInputAnimations();
    setupKeyboardShortcuts();
}

// Event Listeners
function setupEventListeners() {
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.usernameInput.addEventListener('input', clearErrors);
    elements.passwordInput.addEventListener('input', clearErrors);
    elements.usernameInput.addEventListener('blur', validateField);
    elements.passwordInput.addEventListener('blur', validateField);
    
    // Adicionar efeitos visuais
    elements.loginButton.addEventListener('mouseenter', addButtonHoverEffect);
    elements.loginButton.addEventListener('mouseleave', removeButtonHoverEffect);
}

// Manipulação do formulário de login
async function handleLogin(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const username = elements.usernameInput.value.trim();
    const password = elements.passwordInput.value.trim();
    
    // Validação
    if (!validateInputs(username, password)) {
        return;
    }
    
    // Iniciar loading
    startLoading();
    
    try {
        // Simular autenticação
        const isAuthenticated = await authenticateUser(username, password);
        
        if (isAuthenticated) {
            // Salvar credenciais se solicitado
            if (elements.rememberMeCheckbox.checked) {
                saveCredentials(username);
            }
            
            // Sucesso - redirecionar
            showSuccessMessage();
            setTimeout(() => {
                window.location.href = CONFIG.DASHBOARD_URL;
            }, 800);
        } else {
            // Erro de autenticação
            showError('Usuário ou senha incorretos. Tente novamente.');
        }
    } catch (error) {
        showError('Erro de conexão. Tente novamente mais tarde.');
        console.error('Erro de login:', error);
    } finally {
        stopLoading();
    }
}

// Validação de inputs
function validateInputs(username, password) {
    let isValid = true;
    
    // Validar username
    if (!username) {
        showFieldError('username', 'O campo usuário é obrigatório');
        isValid = false;
    } else if (username.length < 3) {
        showFieldError('username', 'O usuário deve ter pelo menos 3 caracteres');
        isValid = false;
    }
    
    // Validar password
    if (!password) {
        showFieldError('password', 'O campo senha é obrigatório');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('password', 'A senha deve ter pelo menos 6 caracteres');
        isValid = false;
    }
    
    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    if (field.id === 'username' && value && value.length < 3) {
        showFieldError('username', 'O usuário deve ter pelo menos 3 caracteres');
    } else if (field.id === 'password' && value && value.length < 6) {
        showFieldError('password', 'A senha deve ter pelo menos 6 caracteres');
    } else {
        clearFieldError(field.id);
    }
}

// Autenticação (simulada)
function authenticateUser(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Para demonstração, aceitar credenciais demo ou qualquer combinação válida
            const isValid = (username === CONFIG.DEMO_CREDENTIALS.username && 
                           password === CONFIG.DEMO_CREDENTIALS.password) ||
                           (username.length >= 3 && password.length >= 6);
            resolve(isValid);
        }, CONFIG.LOADING_DURATION);
    });
}

// Estados de loading
function startLoading() {
    isLoading = true;
    elements.loginButton.disabled = true;
    elements.buttonText.style.display = 'none';
    elements.loadingSpinner.style.display = 'flex';
    elements.loginButton.style.cursor = 'not-allowed';
}

function stopLoading() {
    isLoading = false;
    elements.loginButton.disabled = false;
    elements.buttonText.style.display = 'block';
    elements.loadingSpinner.style.display = 'none';
    elements.loginButton.style.cursor = 'pointer';
}

// Gerenciamento de erros
function showFieldError(fieldId, message) {
    const formGroup = document.getElementById(fieldId).closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    // Adicionar classe de erro
    formGroup.classList.add('error');
    
    // Criar ou atualizar mensagem de erro
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    // Animação de shake
    const input = document.getElementById(fieldId);
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function clearFieldError(fieldId) {
    const formGroup = document.getElementById(fieldId).closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showError(message) {
    // Criar notificação de erro
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function showSuccessMessage() {
    const notification = createNotification('Login realizado com sucesso! Redirecionando...', 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'error' ? '⚠️' : '✅'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Estilos inline para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#EF4444' : '#10B981'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    return notification;
}

// Gerenciamento de credenciais
function saveCredentials(username) {
    try {
        localStorage.setItem('patrimon_remember_username', username);
        localStorage.setItem('patrimon_remember_me', 'true');
    } catch (error) {
        console.warn('Não foi possível salvar as credenciais:', error);
    }
}

function loadSavedCredentials() {
    try {
        const rememberMe = localStorage.getItem('patrimon_remember_me') === 'true';
        const savedUsername = localStorage.getItem('patrimon_remember_username');
        
        if (rememberMe && savedUsername) {
            elements.usernameInput.value = savedUsername;
            elements.rememberMeCheckbox.checked = true;
        }
    } catch (error) {
        console.warn('Não foi possível carregar as credenciais salvas:', error);
    }
}

// Animações e efeitos visuais
function addInputAnimations() {
    const inputs = [elements.usernameInput, elements.passwordInput];
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

function addButtonHoverEffect() {
    if (!isLoading) {
        elements.loginButton.style.transform = 'translateY(-2px) scale(1.02)';
    }
}

function removeButtonHoverEffect() {
    if (!isLoading) {
        elements.loginButton.style.transform = 'translateY(0) scale(1)';
    }
}

// Atalhos de teclado
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Enter para submeter o formulário
        if (event.key === 'Enter' && !isLoading) {
            const activeElement = document.activeElement;
            if (activeElement === elements.usernameInput || activeElement === elements.passwordInput) {
                elements.loginForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape para limpar erros
        if (event.key === 'Escape') {
            clearErrors();
        }
    });
}

// Adicionar animação de shake ao CSS dinamicamente
const shakeAnimation = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
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
`;

// Adicionar estilos de animação ao head
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeAnimation;
document.head.appendChild(styleSheet);

// Função para demonstração - preencher campos automaticamente
function fillDemoCredentials() {
    elements.usernameInput.value = CONFIG.DEMO_CREDENTIALS.username;
    elements.passwordInput.value = CONFIG.DEMO_CREDENTIALS.password;
    
    // Adicionar efeito visual
    [elements.usernameInput, elements.passwordInput].forEach(input => {
        input.style.background = 'rgba(79, 70, 229, 0.1)';
        setTimeout(() => {
            input.style.background = '';
        }, 1000);
    });
}

// Expor função para demonstração (pode ser chamada no console)
window.fillDemo = fillDemoCredentials;

// Log de inicialização
console.log('🔐 Sistema patrimon.io carregado');
console.log('💡 Dica: Use "admin" / "admin123" ou chame fillDemo() no console para preencher automaticamente');

