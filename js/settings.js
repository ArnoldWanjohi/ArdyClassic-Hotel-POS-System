// Settings Module for Ardyclassic Hotel POS

// Default settings
const defaultSettings = {
    // General Settings
    businessName: 'Ardyclassic Hotel',
    businessAddress: '123 Hotel Street, Nairobi, Kenya',
    businessPhone: '+254 700 000000',
    businessEmail: 'info@ardyclassic.com',
    taxRate: 16,
    
    // Appearance
    theme: 'light', // light, dark, or system
    fontSize: 'medium', // small, medium, large
    
    // Printer Settings
    printerName: 'default',
    receiptHeader: 'Ardyclassic Hotel\n123 Hotel Street, Nairobi\nPhone: +254 700 000000',
    receiptFooter: 'Thank you for your visit!\nwww.ardyclassic.com',
    
    // Users (in a real app, this would be managed by a backend)
    users: [
        { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin', password: 'hashed_password' }
    ]
};

// Current settings
let currentSettings = { ...defaultSettings };

// Initialize settings
function initSettings() {
    console.log('Initializing settings...');
    
    // Load saved settings from localStorage
    loadSettings();
    
    // Setup event listeners
    setupEventListeners();
    
    // Apply current theme
    applyTheme(currentSettings.theme);
    
    console.log('Settings initialized');
}

// Load settings from localStorage
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            currentSettings = { ...defaultSettings, ...JSON.parse(savedSettings) };
            console.log('Loaded settings from localStorage');
        } else {
            // Save default settings if none exist
            saveSettings();
        }
        updateSettingsForm();
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings to localStorage
function saveSettings() {
    try {
        // Update current settings from form
        updateCurrentSettings();
        
        // Save to localStorage
        localStorage.setItem('appSettings', JSON.stringify(currentSettings));
        console.log('Settings saved');
        
        // Show success message
        showNotification('Settings saved successfully', 'success');
        
        // Apply theme if it was changed
        applyTheme(currentSettings.theme);
        
        return true;
    } catch (error) {
        console.error('Error saving settings:', error);
        showNotification('Error saving settings', 'error');
        return false;
    }
}

// Update current settings from form values
function updateCurrentSettings() {
    // General Settings
    currentSettings.businessName = document.getElementById('business-name').value;
    currentSettings.businessAddress = document.getElementById('business-address').value;
    currentSettings.businessPhone = document.getElementById('business-phone').value;
    currentSettings.businessEmail = document.getElementById('business-email').value;
    currentSettings.taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
    
    // Appearance
    const selectedTheme = document.querySelector('.theme-option.active');
    if (selectedTheme) {
        currentSettings.theme = selectedTheme.dataset.theme;
    }
    currentSettings.fontSize = document.getElementById('font-size').value;
    
    // Printer Settings
    currentSettings.printerName = document.getElementById('printer-name').value;
    currentSettings.receiptHeader = document.getElementById('receipt-header').value;
    currentSettings.receiptFooter = document.getElementById('receipt-footer').value;
}

// Update form fields with current settings
function updateSettingsForm() {
    // General Settings
    document.getElementById('business-name').value = currentSettings.businessName;
    document.getElementById('business-address').value = currentSettings.businessAddress;
    document.getElementById('business-phone').value = currentSettings.businessPhone;
    document.getElementById('business-email').value = currentSettings.businessEmail;
    document.getElementById('tax-rate').value = currentSettings.taxRate;
    
    // Appearance
    document.querySelectorAll('.theme-option').forEach(option => {
        if (option.dataset.theme === currentSettings.theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    document.getElementById('font-size').value = currentSettings.fontSize;
    
    // Printer Settings
    document.getElementById('printer-name').value = currentSettings.printerName;
    document.getElementById('receipt-header').value = currentSettings.receiptHeader;
    document.getElementById('receipt-footer').value = currentSettings.receiptFooter;
}

// Apply theme to the app
function applyTheme(theme) {
    // Update current theme in settings
    currentSettings.theme = theme;
    
    // Remove all theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    
    // Apply selected theme
    if (theme === 'system') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
        // Add listener for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);
    } else {
        document.documentElement.classList.add(`theme-${theme}`);
    }
    
    // Apply font size
    applyFontSize(currentSettings.fontSize);
    
    console.log('Theme applied:', theme);
}

// Handle system theme changes
function handleSystemThemeChange(e) {
    if (currentSettings.theme === 'system') {
        document.documentElement.classList.remove('theme-light', 'theme-dark');
        document.documentElement.classList.add(e.matches ? 'theme-dark' : 'theme-light');
    }
}

// Apply font size to the app
function applyFontSize(size) {
    const sizes = {
        'small': '14px',
        'medium': '16px',
        'large': '18px'
    };
    document.documentElement.style.setProperty('--base-font-size', sizes[size] || '16px');
    document.body.style.fontSize = sizes[size] || '16px';
}

// Setup event listeners
function setupEventListeners() {
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = settingsModal.querySelector('.close-modal');
    
    // Open settings modal
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            settingsModal.style.display = 'block';
            updateSettingsForm();
        });
    }
    
    // Close settings modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    
    // Tab switching
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding pane
            document.querySelectorAll('.settings-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            document.getElementById(`${tabId}-settings`).classList.add('active');
        });
    });
    
    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            // Update active state
            document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Apply the selected theme
            applyTheme(theme);
            
            // Update the current settings
            currentSettings.theme = theme;
            
            // Save settings
            saveSettings();
            
            console.log('Theme changed to:', theme);
        });
    });
    
    // Save settings
    const saveBtn = document.getElementById('save-settings');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (saveSettings()) {
                // Close modal after a short delay to show the success message
                setTimeout(() => {
                    settingsModal.style.display = 'none';
                }, 1000);
            }
        });
    }
    
    // Cancel button
    const cancelBtn = document.getElementById('cancel-settings');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            settingsModal.style.display = 'none';
        });
    }
    
    // Test print button
    const testPrintBtn = document.getElementById('test-print');
    if (testPrintBtn) {
        testPrintBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would trigger a test print
            showNotification('Test print functionality would run here', 'info');
        });
    }
    
    // Add user button
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would open a user creation form
            showNotification('Add user functionality would open here', 'info');
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // You can implement a more sophisticated notification system
    console.log(`[${type}] ${message}`);
    alert(`[${type.toUpperCase()}] ${message}`);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // First set the theme to prevent flash of unstyled content
        const savedTheme = localStorage.getItem('appSettings') ? 
            JSON.parse(localStorage.getItem('appSettings')).theme : 'light';
        applyTheme(savedTheme);
        
        // Then initialize the rest
        initSettings();
    });
} else {
    // In case the document is already loaded
    const savedTheme = localStorage.getItem('appSettings') ? 
        JSON.parse(localStorage.getItem('appSettings')).theme : 'light';
    applyTheme(savedTheme);
    setTimeout(initSettings, 0);
}

// Expose functions to global scope if needed
window.settingsModule = {
    initSettings,
    saveSettings,
    getSettings: () => ({ ...currentSettings })
};
