# Apotica Secure Vault

> A modern, client-side credential management system featuring multi-factor authentication and comprehensive audit logging.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://BRIGHTEDUFUL.github.io/group1/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🔐 Overview

Apotica Secure Vault is a sophisticated password management system that demonstrates enterprise-grade security practices in a fully static, client-side environment. Built with zero backend dependencies, it showcases secure authentication flows, session management, and audit trail functionality—all running entirely in the browser.

## ✨ Key Features

### Security & Authentication
- **Multi-Factor Authentication (MFA)**: 6-digit time-sensitive verification after login
- **Session Management**: Enforced authentication flow with automatic redirects
- **Encrypted Storage**: All credentials stored securely in browser localStorage
- **Audit Logging**: Comprehensive tracking of all access and modification events
- **Auto-Logout Protection**: Password modals with countdown timers for enhanced security

### User Experience
- **Modern Glassmorphism UI**: Sleek, cybersecurity-themed interface with smooth animations
- **Role-Based Access Control**: Admin and user-level permissions
- **Real-Time Search**: Instant credential filtering across services and usernames
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Optimized**: Debounced search, GPU-accelerated animations, reduced blur effects

### Administration
- **Credential Management**: Full CRUD operations for password entries
- **Admin Panel**: Dedicated interface for system administrators
- **Audit Dashboard**: Filterable event logs by type and date range
- **Password Reveal**: Secure, timed password viewing with copy-to-clipboard

## 🚀 Live Demo

**[Launch Apotica Vault →](https://BRIGHTEDUFUL.github.io/group1/)**

### Quick Test
- Enter any username and password to login
- Enter any 6-digit code for MFA verification
- Explore the dashboard, admin panel, and audit logs

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Glassmorphism effects
- **Animations**: Keyframe animations with GPU acceleration
- **Storage**: Browser localStorage API
- **Deployment**: GitHub Pages (static hosting)

## 📋 Application Flow

```
1. Landing Page (index.html) → Auto-redirects to Login
2. Login (login.html) → Accepts any credentials → Proceeds to MFA
3. MFA Verification (mfa.html) → 6-digit code validation → Session established
4. Dashboard (dashboard.html) → Credential vault with search and filters
   ├─ Admin Panel (admin.html) → Manage credentials [Admin only]
   └─ Audit Logs (audit.html) → View security events
```

## 🔒 Security Features

- **No Backend Dependencies**: Eliminates server-side attack vectors
- **Client-Side Encryption**: All data processing happens locally
- **Session Validation**: Strict routing guards prevent unauthorized access
- **Access Logging**: Every password view is recorded with timestamp and user
- **Auto-Hide Passwords**: Timed modals automatically close after 10 seconds
- **Security Scan Animation**: Visual indicator of active monitoring

## 📦 Project Structure

```
.
├── index.html          # Landing page with auto-redirect
├── login.html          # Authentication entry point
├── mfa.html            # Multi-factor verification
├── dashboard.html      # Main credential vault interface
├── admin.html          # Administrative credential management
├── audit.html          # Security event logging dashboard
├── styles.css          # Core styling and glassmorphism effects
├── animations.css      # Keyframe animations and transitions
├── app.js              # Application logic and routing
└── README.md           # Project documentation
```

## 💡 Usage

### For End Users
1. Visit the live demo or open `index.html` in a browser
2. Login with any username/password combination
3. Complete MFA with any 6-digit code
4. Access the credential vault and management features

### For Developers
```bash
# Clone the repository
git clone https://github.com/BRIGHTEDUFUL/group1.git

# Navigate to project directory
cd group1

# Open in browser (no build step required)
open index.html
```

## 🎨 Design Philosophy

Apotica Vault combines cybersecurity aesthetics with modern web design principles:
- **Dark Mode First**: Eye-friendly interface optimized for extended use
- **Glassmorphism**: Layered transparency effects with backdrop blur
- **Smooth Animations**: 60fps transitions with GPU acceleration
- **Micro-interactions**: Hover effects, ripples, and feedback animations
- **Security-Focused UI**: Visual cues emphasizing protection and monitoring

## 📊 Performance Optimizations

- Reduced backdrop-filter blur for improved rendering (12px → 8px)
- Debounced search input (250ms) to minimize DOM operations
- GPU-accelerated animations with `will-change` hints
- Slower animation speeds to reduce CPU load
- Optimized gradient complexity in background effects

## 🤝 Contributing

This is a demonstration project showcasing static web application architecture. Feel free to fork and adapt for your own use cases.

## 📄 License

MIT License - feel free to use this project for learning and demonstration purposes.

## 🔗 Links

- **Live Demo**: [https://BRIGHTEDUFUL.github.io/group1/](https://BRIGHTEDUFUL.github.io/group1/)
- **Repository**: [https://github.com/BRIGHTEDUFUL/group1](https://github.com/BRIGHTEDUFUL/group1)

---

**Note**: This is a demonstration project. For production password management, use established solutions like 1Password, Bitwarden, or LastPass with proper encryption and security audits.
