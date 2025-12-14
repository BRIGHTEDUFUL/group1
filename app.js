// Mock Data
const mockUsers = [
    { id: 1, username: 'admin', password: 'securePass123', role: 'Admin' },
    { id: 2, username: 'engineer', password: 'engPass456', role: 'Engineer' },
    { id: 3, username: 'security', password: 'secPass789', role: 'Security Analyst' },
    { id: 4, username: 'auditor', password: 'auditPass012', role: 'Compliance Auditor' }
];

const mockCredentials = [
    { id: 1, service: 'GitHub', username: 'admin@example.com', password: 'ghp_a1b2c3d4e5f6g7h8i9j0', lastModified: '2023-05-15T10:30:00Z' },
    { id: 2, service: 'AWS Console', username: 'aws-admin', password: 'awsSecretKey12345!', lastModified: '2023-05-14T14:45:00Z' },
    { id: 3, service: 'Database Server', username: 'db_admin', password: 'dbPassword!@#$', lastModified: '2023-05-10T09:15:00Z' },
    { id: 4, service: 'Google Workspace', username: 'it-support@company.com', password: 'workspacePass7890', lastModified: '2023-05-05T16:20:00Z' },
    { id: 5, service: 'Azure Portal', username: 'azure-admin', password: 'azureSecret!2023', lastModified: '2023-05-18T11:20:00Z' },
    { id: 6, service: 'Slack Admin', username: 'slack-admin@company.com', password: 'slackPass#Secure2023', lastModified: '2023-05-12T08:45:00Z' }
];

const mockAuditLogs = [
    { id: 1, timestamp: '2023-05-15T10:30:00Z', user: 'admin', eventType: 'access', description: 'Viewed GitHub password', ipAddress: '192.168.1.100' },
    { id: 2, timestamp: '2023-05-14T14:45:00Z', user: 'admin', eventType: 'modify', description: 'Updated AWS Console credentials', ipAddress: '192.168.1.100' },
    { id: 3, timestamp: '2023-05-10T09:15:00Z', user: 'engineer', eventType: 'access', description: 'Viewed Database Server password', ipAddress: '192.168.1.101' },
    { id: 4, timestamp: '2023-05-05T16:20:00Z', user: 'admin', eventType: 'login', description: 'Successful login', ipAddress: '192.168.1.100' },
    { id: 5, timestamp: '2023-05-18T11:20:00Z', user: 'security', eventType: 'access', description: 'Viewed Azure Portal password', ipAddress: '192.168.1.102' },
    { id: 6, timestamp: '2023-05-12T08:45:00Z', user: 'auditor', eventType: 'access', description: 'Viewed Slack Admin password', ipAddress: '192.168.1.103' },
    { id: 7, timestamp: '2023-05-19T09:30:00Z', user: 'admin', eventType: 'modify', description: 'Updated Database Server credentials', ipAddress: '192.168.1.100' },
    { id: 8, timestamp: '2023-05-17T15:15:00Z', user: 'engineer', eventType: 'access', description: 'Viewed GitHub password', ipAddress: '192.168.1.101' }
];

// DOM Elements
const currentPage = document.body.classList[0] || window.location.pathname.split('/').pop().replace('.html', '');

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('mfaVerified');
}

function isMfaVerified() {
    return localStorage.getItem('mfaVerified') === 'true';
}

function setMfaVerified(status) {
    localStorage.setItem('mfaVerified', status ? 'true' : 'false');
}

function getCredentials() {
    return JSON.parse(localStorage.getItem('credentials')) || mockCredentials;
}

function saveCredentials(credentials) {
    localStorage.setItem('credentials', JSON.stringify(credentials));
}

function getAuditLogs() {
    return JSON.parse(localStorage.getItem('auditLogs')) || mockAuditLogs;
}

function saveAuditLog(log) {
    const logs = getAuditLogs();
    log.id = logs.length > 0 ? Math.max(...logs.map(l => l.id)) + 1 : 1;
    log.timestamp = new Date().toISOString();
    logs.push(log);
    localStorage.setItem('auditLogs', JSON.stringify(logs));
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is authenticated
    const currentUser = getCurrentUser();
    const mfaVerified = isMfaVerified();
    
    // Enforce login → MFA → dashboard flow
    if (!currentUser) {
        setMfaVerified(false);
        if (!['index', 'login'].includes(currentPage)) {
            window.location.href = 'login.html';
            return;
        }
    } else {
        if (!mfaVerified && currentPage !== 'mfa') {
            window.location.href = 'mfa.html';
            return;
        }
        if (mfaVerified && currentPage === 'mfa') {
            window.location.href = 'dashboard.html';
            return;
        }
        if (['index', 'login'].includes(currentPage)) {
            window.location.href = mfaVerified ? 'dashboard.html' : 'mfa.html';
            return;
        }
    }
    
    // Initialize page-specific functionality
    switch (currentPage) {
        case 'index':
        case 'login':
            initLoginPage();
            break;
        case 'mfa':
            initMfaPage();
            break;
        case 'dashboard':
            initDashboardPage();
            break;
        case 'admin':
            initAdminPage();
            break;
        case 'audit':
            initAuditPage();
            break;
    }
}

// Login Page Functions
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Add security scan animation
    const securityScan = document.createElement('div');
    securityScan.className = 'security-scan';
    document.body.appendChild(securityScan);
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    // Bypass actual credential validation - accept any credentials
    // Create a mock user object with the provided username
    const user = {
        id: Math.floor(Math.random() * 1000),
        username: username,
        password: password,
        role: 'Admin' // Default to Admin role for simplicity
    };
    
    // Set the user and proceed to MFA
    setCurrentUser(user);
    setMfaVerified(false);
    window.location.href = 'mfa.html';
}

// MFA Page Functions
function initMfaPage() {
    const inputs = document.querySelectorAll('.mfa-input');
    const verifyBtn = document.getElementById('verifyBtn');
    const resendLink = document.getElementById('resendLink');
    
    // Setup input navigation
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            checkMfaCompletion();
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
    
    // Verify button
    if (verifyBtn) {
        verifyBtn.addEventListener('click', verifyMfaCode);
    }
    
    // Resend link
    if (resendLink) {
        resendLink.addEventListener('click', resendMfaCode);
    }
    
    // Start timer
    startMfaTimer();
    
    // Add security status indicator
    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'security-status';
    statusIndicator.textContent = 'SECURITY SCAN ACTIVE';
    document.querySelector('.mfa-card').prepend(statusIndicator);
}

let mfaTimer;
let mfaSeconds = 60;

function startMfaTimer() {
    const timerText = document.querySelector('.timer-text');
    const progressCircle = document.querySelector('.progress-ring-circle');
    
    // Reset animation
    progressCircle.style.animation = 'none';
    setTimeout(() => {
        progressCircle.style.animation = 'countdown 60s linear forwards';
    }, 10);
    
    mfaTimer = setInterval(() => {
        mfaSeconds--;
        if (timerText) timerText.textContent = `${mfaSeconds}s`;
        
        if (mfaSeconds <= 0) {
            clearInterval(mfaTimer);
            // Add shake animation to inputs
            document.querySelectorAll('.mfa-input').forEach(input => {
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            });
        }
    }, 1000);
}

function checkMfaCompletion() {
    const inputs = document.querySelectorAll('.mfa-input');
    const verifyBtn = document.getElementById('verifyBtn');
    
    const isComplete = Array.from(inputs).every(input => input.value !== '');
    if (verifyBtn) {
        verifyBtn.disabled = !isComplete;
    }
}

function verifyMfaCode() {
    const inputs = document.querySelectorAll('.mfa-input');
    const code = Array.from(inputs).map(input => input.value).join('');
    
    // Accept any six-digit numeric input
    if (code.length === 6 && /^\d+$/.test(code)) {
        clearInterval(mfaTimer);
        setMfaVerified(true);
        // Add audit log
        saveAuditLog({
            user: getCurrentUser().username,
            eventType: 'login',
            description: 'Successful MFA verification',
            ipAddress: '192.168.1.100'
        });
        window.location.href = 'dashboard.html';
    } else {
        // Shake animation for incorrect code
        inputs.forEach(input => {
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
        });
        
        // Clear inputs
        inputs.forEach(input => input.value = '');
        inputs[0].focus();
    }
}

function resendMfaCode() {
    // Reset timer
    clearInterval(mfaTimer);
    mfaSeconds = 60;
    document.querySelector('.timer-text').textContent = '60s';
    
    // Reset inputs
    document.querySelectorAll('.mfa-input').forEach(input => input.value = '');
    document.querySelectorAll('.mfa-input')[0].focus();
    
    // Restart timer
    startMfaTimer();
    
    alert('A new verification code has been sent to your device.');
}

// Dashboard Page Functions
function initDashboardPage() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    // Remove any security scan animation once the user is authenticated
    document.querySelectorAll('.security-scan').forEach(el => el.remove());
    
    // Set user info
    document.getElementById('userName').textContent = currentUser.username;
    
    // Set role badge with appropriate class
    const roleBadge = document.getElementById('userRoleBadge');
    roleBadge.textContent = currentUser.role;
    roleBadge.className = 'role-badge ' + currentUser.role.toLowerCase().replace(' ', '-');
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Populate credentials table
    populateCredentialsTable();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterCredentials);
    }
    
    // Add credential button (Admin only)
    const addCredentialBtn = document.getElementById('addCredentialBtn');
    if (addCredentialBtn) {
        if (currentUser.role !== 'Admin') {
            addCredentialBtn.style.display = 'none';
        } else {
            addCredentialBtn.addEventListener('click', () => {
                window.location.href = 'admin.html';
            });
        }
    }
    
}

function populateCredentialsTable() {
    const tbody = document.getElementById('credentialsTableBody');
    const credentials = getCredentials();
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    credentials.forEach((cred, index) => {
        const row = document.createElement('tr');
        row.className = 'row-entry';
        row.style.animationDelay = `${index * 0.1}s`;
        
        row.innerHTML = `
            <td>${cred.service}</td>
            <td>${cred.username}</td>
            <td class="password-mask">••••••••</td>
            <td>${formatDate(cred.lastModified)}</td>
            <td class="action-buttons">
                <button class="btn btn-small btn-outline view-btn" data-id="${cred.id}">View</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const credId = parseInt(this.getAttribute('data-id'));
            showPasswordModal(credId);
        });
    });
}

function filterCredentials() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#credentialsTableBody tr');
    
    rows.forEach(row => {
        const service = row.cells[0].textContent.toLowerCase();
        const username = row.cells[1].textContent.toLowerCase();
        
        if (service.includes(searchTerm) || username.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showPasswordModal(credId) {
    const credentials = getCredentials();
    const credential = credentials.find(c => c.id === credId);
    
    if (!credential) return;
    
    // Populate modal
    document.getElementById('modalService').textContent = credential.service;
    document.getElementById('modalUsername').textContent = credential.username;
    document.getElementById('modalPassword').textContent = '••••••••';
    
    // Show modal
    const modal = document.getElementById('passwordModal');
    modal.classList.add('active');
    
    // Add event listeners
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    document.getElementById('revealPasswordBtn').addEventListener('click', () => revealPassword(credential.password));
    document.getElementById('copyPasswordBtn').addEventListener('click', () => copyToClipboard(credential.password));
    
    // Start auto-hide timer
    startAutoHideTimer();
}

let autoHideTimer;

function startAutoHideTimer() {
    let seconds = 10;
    const countdownText = document.getElementById('countdownText');
    const progressCircle = document.querySelector('.countdown-timer .progress-ring-circle');
    
    // Reset animation
    progressCircle.style.animation = 'none';
    setTimeout(() => {
        progressCircle.style.animation = 'countdown 10s linear forwards';
    }, 10);
    
    autoHideTimer = setInterval(() => {
        seconds--;
        if (countdownText) countdownText.textContent = `${seconds}s`;
        
        if (seconds <= 0) {
            clearInterval(autoHideTimer);
            closeModal();
        }
    }, 1000);
}

function revealPassword(password) {
    const passwordSpan = document.getElementById('modalPassword');
    passwordSpan.textContent = password;
    passwordSpan.classList.add('reveal-password');
    
    // Add audit log
    saveAuditLog({
        user: getCurrentUser().username,
        eventType: 'access',
        description: `Viewed password for ${document.getElementById('modalService').textContent}`,
        ipAddress: '192.168.1.100'
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyPasswordBtn');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copy-feedback');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copy-feedback');
        }, 2000);
    });
}

function closeModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('active');
    clearInterval(autoHideTimer);
}

function handleLogout() {
    clearCurrentUser();
    setMfaVerified(false);
    window.location.href = 'login.html';
}

// Admin Page Functions
function initAdminPage() {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'Admin') {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Set user info
    document.getElementById('userRoleBadge').textContent = currentUser.role;
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Form submission
    const credentialForm = document.getElementById('credentialForm');
    if (credentialForm) {
        credentialForm.addEventListener('submit', handleCredentialSubmit);
    }
    
    // Cancel button
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }
    
    // Populate credentials table
    populateAdminCredentialsTable();
}

function populateAdminCredentialsTable() {
    const tbody = document.getElementById('adminCredentialsTableBody');
    const credentials = getCredentials();
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    credentials.forEach((cred, index) => {
        const row = document.createElement('tr');
        row.className = 'row-entry';
        row.style.animationDelay = `${index * 0.1}s`;
        
        row.innerHTML = `
            <td>${cred.service}</td>
            <td>${cred.username}</td>
            <td>${formatDate(cred.lastModified)}</td>
            <td class="action-buttons">
                <button class="btn btn-small btn-outline edit-btn" data-id="${cred.id}">Edit</button>
                <button class="btn btn-small btn-danger delete-btn" data-id="${cred.id}">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const credId = parseInt(this.getAttribute('data-id'));
            editCredential(credId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const credId = parseInt(this.getAttribute('data-id'));
            showDeleteConfirmation(credId);
        });
    });
}

function editCredential(credId) {
    const credentials = getCredentials();
    const credential = credentials.find(c => c.id === credId);
    
    if (!credential) return;
    
    // Populate form
    document.getElementById('credentialId').value = credential.id;
    document.getElementById('service').value = credential.service;
    document.getElementById('username').value = credential.username;
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('formTitle').textContent = 'Edit Credential';
    
    // Scroll to form
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
}

function handleCredentialSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('credentialId').value;
    const service = document.getElementById('service').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!service || !username || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const credentials = getCredentials();
    
    if (id) {
        // Edit existing credential
        const index = credentials.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            credentials[index].service = service;
            credentials[index].username = username;
            credentials[index].password = password;
            credentials[index].lastModified = new Date().toISOString();
            
            // Add audit log
            saveAuditLog({
                user: getCurrentUser().username,
                eventType: 'modify',
                description: `Updated credentials for ${service}`,
                ipAddress: '192.168.1.100'
            });
        }
    } else {
        // Add new credential
        const newCredential = {
            id: credentials.length > 0 ? Math.max(...credentials.map(c => c.id)) + 1 : 1,
            service,
            username,
            password,
            lastModified: new Date().toISOString()
        };
        credentials.push(newCredential);
        
        // Add audit log
        saveAuditLog({
            user: getCurrentUser().username,
            eventType: 'modify',
            description: `Added new credentials for ${service}`,
            ipAddress: '192.168.1.100'
        });
    }
    
    // Save credentials
    saveCredentials(credentials);
    
    // Reset form
    resetForm();
    
    // Refresh table
    populateAdminCredentialsTable();
}

function resetForm() {
    document.getElementById('credentialForm').reset();
    document.getElementById('credentialId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Credential';
}

function showDeleteConfirmation(credId) {
    const modal = document.getElementById('confirmationModal');
    modal.classList.add('active');
    
    // Add event listeners
    document.querySelector('#confirmationModal .close-btn').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    document.querySelector('#confirmationModal .modal-overlay').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
        deleteCredential(credId);
        modal.classList.remove('active');
    });
}

function deleteCredential(credId) {
    let credentials = getCredentials();
    const credential = credentials.find(c => c.id === credId);
    
    if (!credential) return;
    
    credentials = credentials.filter(c => c.id !== credId);
    saveCredentials(credentials);
    
    // Add audit log
    saveAuditLog({
        user: getCurrentUser().username,
        eventType: 'delete',
        description: `Deleted credentials for ${credential.service}`,
        ipAddress: '192.168.1.100'
    });
    
    // Refresh table
    populateAdminCredentialsTable();
}

// Audit Page Functions
function initAuditPage() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Set user info
    document.getElementById('userRoleBadge').textContent = currentUser.role;
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Populate audit logs
    populateAuditLogs();
    
    // Filter functionality
    const logTypeFilter = document.getElementById('logTypeFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (logTypeFilter) {
        logTypeFilter.addEventListener('change', filterAuditLogs);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterAuditLogs);
    }
}

function populateAuditLogs() {
    const tbody = document.getElementById('auditLogsTableBody');
    const logs = getAuditLogs();
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Sort logs by timestamp (newest first)
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    logs.forEach((log, index) => {
        const row = document.createElement('tr');
        row.className = 'row-entry';
        row.style.animationDelay = `${index * 0.1}s`;
        
        // Highlight sensitive actions
        if (['access', 'delete'].includes(log.eventType)) {
            row.classList.add('security-event');
        }
        
        row.innerHTML = `
            <td>${formatDate(log.timestamp)}</td>
            <td>${log.user}</td>
            <td>${log.eventType.charAt(0).toUpperCase() + log.eventType.slice(1)}</td>
            <td>${log.description}</td>
            <td>${log.ipAddress}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function filterAuditLogs() {
    const logType = document.getElementById('logTypeFilter').value;
    const dateRange = document.getElementById('dateFilter').value;
    const rows = document.querySelectorAll('#auditLogsTableBody tr');
    
    const now = new Date();
    let startDate = new Date(0);
    
    switch (dateRange) {
        case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
        case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
    }
    
    rows.forEach(row => {
        const eventType = row.cells[2].textContent.toLowerCase();
        const timestamp = new Date(row.cells[0].textContent);
        
        const typeMatch = logType === 'all' || eventType === logType;
        const dateMatch = timestamp >= startDate;
        
        if (typeMatch && dateMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}