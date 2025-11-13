// DOM Elements
const menuItemsContainer = document.getElementById('menu-items-container');
const categoryList = document.getElementById('category-list');
const searchInput = document.getElementById('search-item');
const searchBtn = document.getElementById('search-btn');
const orderItems = document.getElementById('order-items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const tableNumber = document.getElementById('table-number');
const orderNumber = document.getElementById('order-number');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.querySelector('.close-modal');
const paymentDetails = document.getElementById('payment-details');
const currentTimeElement = document.getElementById('current-time');
const inventoryModal = document.getElementById('inventory-modal'); // Added missing reference

// State
let currentOrder = {
    items: [],
    table: '',
    type: 'dine-in',
    subtotal: 0,
    tax: 0,
    total: 0,
    status: 'open'
};

// Menu Data loaded from HTML
let menuItems = [];

// Sample menu data - updated to match image filenames
const sampleMenuData = [
    { id: 1, name: 'chicken burger', price: 800, category: 'food', description: 'Juicy chicken burger with fresh veggies' },
    { id: 2, name: 'Margherita Pizza', price: 1000, category: 'food', description: 'Classic pizza with tomato and mozzarella' },
    { id: 3, name: 'French Fries', price: 300, category: 'food', description: 'Crispy golden fries' },
    { id: 4, name: 'Coca Cola', price: 150, category: 'drinks', description: 'Cold refreshing cola' },
    { id: 5, name: 'Iced Tea', price: 200, category: 'drinks', description: 'Freshly brewed iced tea' },
    { id: 6, name: 'Chocolate Cake', price: 450, category: 'desserts', description: 'Rich chocolate cake' },
    { id: 7, name: 'Ice Cream', price: 350, category: 'desserts', description: 'Vanilla ice cream' },
    { id: 8, name: 'Grilled Chicken', price: 1200, category: 'food', description: 'Grilled chicken with spices' },
    { id: 9, name: 'Caesar Salad', price: 700, category: 'food', description: 'Fresh Caesar salad with dressing' },
    { id: 10, name: 'Fresh Orange Juice', price: 300, category: 'drinks', description: 'Freshly squeezed orange juice' },
    { id: 11, name: 'Mineral Water', price: 100, category: 'drinks', description: 'Bottled mineral water' },
    { id: 12, name: 'Tiramisu', price: 500, category: 'desserts', description: 'Classic Italian dessert' }
];

// Function to load menu items
function loadMenuItems() {
    // Get menu data from the HTML script tag
    const menuDataElement = document.getElementById('menuData');
    if (menuDataElement) {
        try {
            menuItems = JSON.parse(menuDataElement.textContent);
            console.log('Loaded menu items:', menuItems);
        } catch (e) {
            console.error('Error parsing menu data:', e);
            // Fallback to sample data if there's an error
            menuItems = sampleMenuData;
        }
    } else {
        // Fallback to sample data if the menuData element is not found
        menuItems = sampleMenuData;
    }
    
    // Render all menu items initially
    renderMenuItems(menuItems);
    
    // Set the first category as active by default
    const firstCategory = document.querySelector('#category-list li');
    if (firstCategory) {
        firstCategory.classList.add('active');
    }
}

// Initialize tooltips
function initializeTooltips() {
    // Simple tooltip initialization
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', (e) => {
            if (element._tooltip) {
                document.body.removeChild(element._tooltip);
                element._tooltip = null;
            }
        });
    });
}

// Function to initialize the application
function init() {
    console.log('Initializing application...');
    loadMenuItems();
    updateCurrentTime();
    generateOrderNumber();
    setInterval(updateCurrentTime, 60000); // Update time every minute
    
    // Set up event listeners
    if (typeof setupEventListeners === 'function') {
        console.log('Setting up event listeners...');
        setupEventListeners();
    } else {
        console.error('setupEventListeners function not found!');
    }
}

// Initialize the application when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // If the document is already loaded, run init immediately
    init();
}

// Set up event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Category selection
    const categoryItems = document.querySelectorAll('#category-list li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all category items
            categoryItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get the category to filter by
            const category = this.getAttribute('data-category');
            filterMenuItems(category);
        });
    });

    // Table selection
    tableNumber.addEventListener('change', (e) => {
        currentOrder.table = e.target.value;
    });

    // Order type tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentOrder.type = e.target.dataset.tab;
        });
    });

    // Payment buttons - show payment options first
    document.getElementById('pay-cash').addEventListener('click', showPaymentOptions);
    document.getElementById('pay-mpesa').addEventListener('click', showPaymentOptions);
    document.getElementById('pay-card').addEventListener('click', showPaymentOptions);

    // Order actions
    document.getElementById('hold-order').addEventListener('click', holdOrder);
    document.getElementById('clear-order').addEventListener('click', clearOrder);
    document.getElementById('print-receipt').addEventListener('click', printReceipt);

    // Modal close button
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
}

function renderMenuItems(items) {
    if (!menuItemsContainer) {
        console.error('Menu items container not found');
        return;
    }
    
    // Clear existing items
    menuItemsContainer.innerHTML = '';
    
    if (!items || items.length === 0) {
        menuItemsContainer.innerHTML = '<div class="no-items">No menu items found</div>';
        return;
    }
    
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Process each menu item
    items.forEach(item => {
        try {
            // Create menu item element
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.tabIndex = 0; // Make focusable for keyboard navigation
            itemElement.setAttribute('role', 'button');
            itemElement.setAttribute('aria-label', `Add ${item.name} to order`);
            
            // Format the image filename to match the actual image files
            // The images are named like 'Chicken Burger.avif', 'Coca Cola.avif', etc.
            let imageHtml = '';
            
            if (item.name && typeof item.name === 'string') {
                // First check if the image exists with the exact name
                let imageName = item.name.trim();
                let imagePath = `image/${imageName}.avif`;
                
                // Special case for 'chicken burger' which is lowercase in the filename
                if (imageName.toLowerCase() === 'chicken burger') {
                    imagePath = 'image/chicken burger.avif';
                }
                
                // Create image element with direct src
                imageHtml = `
                    <div class="item-image-container">
                        <img 
                            src="${imagePath}" 
                            alt="${item.name}" 
                            class="item-image"
                            onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSJibGFjayI+Jm5ic3A7PC90ZXh0Pjwvc3ZnPg=='">
                        <div class="image-overlay"></div>
                    </div>`;
            } else {
                // Fallback if no item name
                imageHtml = `
                    <div class="item-image-container">
                        <div class="no-image">No Image</div>
                        <div class="image-overlay"></div>
                    </div>`;
            }
            
            // Create item HTML with the image
            itemElement.innerHTML = `
                ${imageHtml}
                <div class="item-details">
                    <h3 class="item-name">${item.name || 'Unnamed Item'}</h3>
                    <div class="item-price">KSh ${(item.price || 0).toFixed(2)}</div>
                    ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
                    <div class="item-category">${item.category || 'Uncategorized'}</div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-sm btn-add" data-id="${item.id}">
                        <i class="fas fa-plus"></i> Add to Order
                    </button>
                </div>
            `;
            
            // Add click handler
            itemElement.addEventListener('click', (e) => {
                // Don't trigger if clicking on the add button (let its own handler handle it)
                if (!e.target.closest('.btn-add')) {
                    addToOrder(item);
                }
            });
            
            // Add keyboard support
            itemElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    addToOrder(item);
                }
            });
            
            // Add button click handler
            const addButton = itemElement.querySelector('.btn-add');
            if (addButton) {
                addButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToOrder(item);
                });
            }
            
            fragment.appendChild(itemElement);
            
        } catch (error) {
            console.error('Error rendering menu item:', error, item);
        }
    });
    
    // Append all items at once for better performance
    menuItemsContainer.appendChild(fragment);
    
    // Initialize any tooltips or other interactive elements
    if (typeof initializeTooltips === 'function') {
        initializeTooltips();
    }
}

// Filter menu items by category
function filterMenuItems(category) {
    // Remove active class from all category buttons
    const categoryButtons = document.querySelectorAll('#category-list li');
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked category
    const activeButton = Array.from(categoryButtons).find(
        btn => btn.getAttribute('data-category') === category
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    let filteredItems = [...menuItems];
    
    // Filter by category
    if (category && category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Apply search filter if there's a search term
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                (item.category && item.category.toLowerCase().includes(searchTerm))
            );
        }
    }
    
    renderMenuItems(filteredItems);
}

// Handle search
function handleSearch() {
    // Get the currently active category
    const activeCategory = document.querySelector('#category-list li.active')?.getAttribute('data-category') || 'all';
    filterMenuItems(activeCategory);
}

// Add item to order
function addToOrder(item) {
    // Check if item already exists in order
    const existingItem = currentOrder.items.find(i => i.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        currentOrder.items.push({
            ...item,
            quantity: 1
        });
    }
    
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    // Clear current items
    orderItems.innerHTML = '';
    
    if (currentOrder.items.length === 0) {
        orderItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your order is empty</p>
                <p>Add items to get started</p>
            </div>
        `;
        
        // Disable print button when no items
        document.getElementById('print-receipt').disabled = true;
        
        // Reset totals
        currentOrder.subtotal = 0;
        currentOrder.tax = 0;
        currentOrder.total = 0;
        
        updateTotals();
        return;
    }
    
    // Enable print button when there are items
    document.getElementById('print-receipt').disabled = false;
    
    // Calculate totals
    currentOrder.subtotal = currentOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    currentOrder.tax = currentOrder.subtotal * 0.16; // 16% tax
    currentOrder.total = currentOrder.subtotal + currentOrder.tax;
    
    // Render order items
    currentOrder.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">KSh ${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                <span class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></span>
            </div>
        `;
        
        orderItems.appendChild(itemElement);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(btn.dataset.id);
            const item = currentOrder.items.find(i => i.id === itemId);
            
            if (btn.classList.contains('increase')) {
                item.quantity += 1;
            } else if (btn.classList.contains('decrease')) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // Remove item if quantity reaches 0
                    currentOrder.items = currentOrder.items.filter(i => i.id !== itemId);
                }
            }
            
            updateOrderSummary();
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(btn.dataset.id);
            currentOrder.items = currentOrder.items.filter(i => i.id !== itemId);
            updateOrderSummary();
        });
    });
    
    updateTotals();
}

// Update totals display
function updateTotals() {
    subtotalElement.textContent = `KSh ${currentOrder.subtotal.toFixed(2)}`;
    taxElement.textContent = `KSh ${currentOrder.tax.toFixed(2)}`;
    totalElement.textContent = `KSh ${currentOrder.total.toFixed(2)}`;
}

// Show payment options
function showPaymentOptions() {
    // Make sure the payment modal is visible
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'flex';
    }
    
    const paymentOptions = `
        <div class="payment-options-container">
            <h3>Select Payment Method</h3>
            <div class="payment-options">
                <button id="pay-cash" class="btn btn-payment">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>Cash</span>
                </button>
                <button id="pay-mpesa" class="btn btn-payment">
                    <i class="fas fa-mobile-alt"></i>
                    <span>M-Pesa</span>
                </button>
                <button id="pay-card" class="btn btn-payment">
                    <i class="far fa-credit-card"></i>
                    <span>Card</span>
                </button>
                <button id="cancel-payment" class="btn btn-cancel" style="margin-top: 20px;">
                    <i class="fas fa-times"></i> Cancel
                </button>
            </div>
        </div>
    `;
    
    const paymentDetails = document.getElementById('payment-details');
    if (paymentDetails) {
        paymentDetails.innerHTML = paymentOptions;
        
        // Re-attach event listeners
        document.getElementById('pay-cash').addEventListener('click', () => showPaymentModal('cash'));
        document.getElementById('pay-mpesa').addEventListener('click', () => showPaymentModal('mpesa'));
        document.getElementById('pay-card').addEventListener('click', () => showPaymentModal('card'));
        
        // Add cancel button handler
        document.getElementById('cancel-payment').addEventListener('click', () => {
            paymentModal.style.display = 'none';
        });
    }
}

// Show payment modal for a specific method
function showPaymentModal(method) {
    // Make sure the payment modal is visible
    const paymentModal = document.getElementById('payment-modal');
    if (!paymentModal) return;
    
    paymentModal.style.display = 'flex';
    if (currentOrder.items.length === 0) {
        alert('Please add items to the order before proceeding to payment.');
        return;
    }
    
    if (!currentOrder.table && currentOrder.type === 'dine-in') {
        alert('Please select a table for this order.');
        return;
    }
    
    let paymentForm = `
        <button id="back-to-payment-options" class="btn btn-secondary" style="margin-bottom: 20px;">
            <i class="fas fa-arrow-left"></i> Back to Payment Options
        </button>
    `;
    
    switch (method) {
        case 'cash':
            paymentForm = `
                <div class="payment-form">
                    <h4>Cash Payment</h4>
                    <p>Total Amount: <strong>KSh ${currentOrder.total.toFixed(2)}</strong></p>
                    <div class="form-group">
                        <label for="amount-tendered">Amount Tendered:</label>
                        <input type="number" id="amount-tendered" class="form-control" min="${currentOrder.total}" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="change">Change:</label>
                        <input type="text" id="change" class="form-control" readonly>
                    </div>
                    <button id="process-payment" class="btn btn-primary">Process Payment</button>
                </div>
            `;
            break;
            
        case 'mpesa':
            paymentForm = `
                <div class="payment-form">
                    <h4>M-Pesa Payment</h4>
                    <p>Total Amount: <strong>KSh ${currentOrder.total.toFixed(2)}</strong></p>
                    <div class="form-group">
                        <label for="phone-number">Phone Number:</label>
                        <input type="tel" id="phone-number" class="form-control" placeholder="e.g., 0712345678" required>
                    </div>
                    <p class="small">You will receive a payment request on your phone</p>
                    <button id="process-payment" class="btn btn-primary">Request Payment</button>
                </div>
            `;
            break;
            
        case 'card':
            paymentForm = `
                <div class="payment-form">
                    <h4>Card Payment</h4>
                    <p>Total Amount: <strong>KSh ${currentOrder.total.toFixed(2)}</strong></p>
                    <div class="form-group">
                        <label for="card-number">Card Number:</label>
                        <input type="text" id="card-number" class="form-control" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiry">Expiry:</label>
                            <input type="text" id="expiry" class="form-control" placeholder="MM/YY" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV:</label>
                            <input type="text" id="cvv" class="form-control" placeholder="123" required>
                        </div>
                    </div>
                    <button id="process-payment" class="btn btn-primary">Process Payment</button>
                </div>
            `;
            break;
    }
    
paymentDetails.innerHTML = paymentForm;
    paymentModal.style.display = 'flex';
    
    // Add event listener to the process payment button
    const processPaymentBtn = document.getElementById('process-payment');
    if (processPaymentBtn) {
        processPaymentBtn.addEventListener('click', () => processPayment(method));
    }
    
    // Add event listener to the back button
    const backButton = document.getElementById('back-to-payment-options');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Show the payment options again
            paymentDetails.innerHTML = '';
            showPaymentOptions();
        });
    }
    
    // Add back button to the form
    const paymentFormElement = document.querySelector('.payment-form');
    if (paymentFormElement) {
        // Remove existing back button if any
        const existingBackButton = document.getElementById('back-to-payment-options');
        if (!existingBackButton) {
            paymentFormElement.insertAdjacentHTML('afterbegin', `
                <button id="back-to-payment-options" class="btn btn-secondary" style="margin-bottom: 20px;">
                    <i class="fas fa-arrow-left"></i> Back to Payment Options
                </button>
            `);
            
            // Add event listener to the back button
            const backButton = document.getElementById('back-to-payment-options');
            if (backButton) {
                backButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPaymentOptions();
                });
            }
        }
    }
    
    // For cash payments, calculate change in real-time
    if (method === 'cash') {
        const amountTendered = document.getElementById('amount-tendered');
        const changeInput = document.getElementById('change');
        
        amountTendered.addEventListener('input', () => {
            const amount = parseFloat(amountTendered.value) || 0;
            const change = amount - currentOrder.total;
            changeInput.value = change >= 0 ? `KSh ${change.toFixed(2)}` : 'Insufficient';
        });
    }
}

// Process payment
function processPayment(method) {
    // In a real app, this would communicate with a payment gateway
    switch (method) {
        case 'cash':
            const amountTendered = parseFloat(document.getElementById('amount-tendered').value) || 0;
            if (amountTendered < currentOrder.total) {
                alert('Amount tendered is less than the total amount.');
                return;
            }
            completeOrder('Cash', amountTendered);
            break;
            
        case 'mpesa':
            const phoneNumber = document.getElementById('phone-number').value.trim();
            if (!phoneNumber) {
                alert('Please enter a valid phone number.');
                return;
            }
            // Simulate M-Pesa request
            alert(`M-Pesa payment request sent to ${phoneNumber}. Awaiting confirmation...`);
            // In a real app, you would wait for confirmation from the payment gateway
            setTimeout(() => {
                completeOrder('M-Pesa', currentOrder.total);
            }, 3000);
            break;
            
        case 'card':
            // In a real app, this would validate the card and process the payment
            alert('Processing card payment...');
            // Simulate successful payment after a short delay
            setTimeout(() => {
                completeOrder('Card', currentOrder.total);
            }, 2000);
            break;
    }
}

// Complete the order
function completeOrder(paymentMethod, amountPaid) {
    // In a real app, you would save the order to a database here
    const orderData = {
        ...currentOrder,
        paymentMethod,
        amountPaid,
        status: 'completed',
        timestamp: new Date().toISOString(),
        orderNumber: document.getElementById('order-number').textContent
    };
    
    console.log('Order completed:', orderData);
    
    // Update inventory with the ordered items
    if (currentOrder.items && currentOrder.items.length > 0) {
        updateInventoryForOrder(currentOrder.items);
    }
    
    // Add to reports
    if (typeof updateCompleteOrderForReports === 'function') {
        updateCompleteOrderForReports(orderData);
    }
    
    // Show success message
    alert(`Payment of KSh ${amountPaid.toFixed(2)} received via ${paymentMethod}. Thank you!`);
    
    // Close the payment modal
    paymentModal.style.display = 'none';
    
    // Print receipt
    printReceipt();
    
    // Start a new order
    startNewOrder();
}

// Print receipt
function printReceipt() {
    if (currentOrder.items.length === 0) {
        alert('No items in the order to print.');
        return;
    }
    
    // In a real app, this would open a print dialog with a nicely formatted receipt
    // For now, we'll just show an alert with the receipt details
    let receipt = `=== ARDYCLASSIC HOTEL ===\n`;
    receipt += `Order #${orderNumber.textContent}\n`;
    receipt += `Date: ${new Date().toLocaleString()}\n`;
    receipt += `Table: ${currentOrder.table || 'N/A'}\n`;
    receipt += `Type: ${currentOrder.type === 'dine-in' ? 'Dine In' : 'Take Away'}\n`;
    receipt += '----------------------------\n';
    
    currentOrder.items.forEach(item => {
        receipt += `${item.name} x${item.quantity}   KSh ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    receipt += '----------------------------\n';
    receipt += `Subtotal:   KSh ${currentOrder.subtotal.toFixed(2)}\n`;
    receipt += `Tax (10%):  KSh ${currentOrder.tax.toFixed(2)}\n`;
    receipt += `Total:      KSh ${currentOrder.total.toFixed(2)}\n`;
    receipt += '============================\n';
    receipt += 'Thank you for dining with us!\n';
    receipt += '============================';
    
    // In a real app, this would open the print dialog
    console.log('Printing receipt...');
    console.log(receipt);
    
    // For demo purposes, show the receipt in an alert
    alert('Printing receipt...\n\n' + receipt);
}

// Hold order
function holdOrder() {
    if (currentOrder.items.length === 0) {
        alert('No items in the order to hold.');
        return;
    }
    
    // In a real app, this would save the order to a database with status 'on-hold'
    const orderData = {
        ...currentOrder,
        status: 'on-hold',
        timestamp: new Date().toISOString()
    };
    
    console.log('Order held:', orderData);
    
    // Start a new order
    startNewOrder();
    
    alert('Order has been held. You can retrieve it later.');
}

// Clear order
function clearOrder() {
    if (confirm('Are you sure you want to clear the current order?')) {
        startNewOrder();
    }
}

// Start a new order
function startNewOrder() {
    currentOrder = {
        items: [],
        table: '',
        type: 'dine-in',
        subtotal: 0,
        tax: 0,
        total: 0,
        status: 'open'
    };
    
    // Reset UI
    orderItems.innerHTML = `
        <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <p>Your order is empty</p>
            <p>Add items to get started</p>
        </div>
    `;
    
    // Reset form elements
    tableNumber.value = '';
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === 'dine-in') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update totals
    updateTotals();
    
    // Generate a new order number
    generateOrderNumber();
}

// Generate a random order number
function generateOrderNumber() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    orderNumber.textContent = randomNum;
    return randomNum;
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };
    currentTimeElement.textContent = now.toLocaleDateString('en-US', options);
}