// Reports Module for Ardyclassic Hotel POS

// Store completed orders for reporting
let completedOrders = [];
let charts = {}; // To store chart instances

// Check if required libraries are loaded
function checkDependencies() {
    if (typeof $ === 'undefined' || typeof moment === 'undefined' || typeof Chart === 'undefined') {
        console.error('Required libraries not loaded. Make sure jQuery, moment.js, and Chart.js are included.');
        return false;
    }
    return true;
}

// Generate sales report (placeholder)
function generateSalesReport() {
    console.log('Generating sales report...');
    const reportContent = document.getElementById('sales-report-content');
    if (reportContent) {
        reportContent.innerHTML = '<p>Sales report will be displayed here.</p>';
    }
}

// Generate inventory report (placeholder)
function generateInventoryReport() {
    console.log('Generating inventory report...');
    const reportContent = document.getElementById('inventory-report-content');
    if (reportContent) {
        reportContent.innerHTML = '<p>Inventory report will be displayed here.</p>';
    }
}

// Generate payments report (placeholder)
function generatePaymentsReport() {
    console.log('Generating payments report...');
    const reportContent = document.getElementById('payments-report-content');
    if (reportContent) {
        reportContent.innerHTML = '<p>Payments report will be displayed here.</p>';
    }
}

// Show specific report type
function showReport(reportType) {
    try {
        console.log('Showing report:', reportType);
        
        // Hide all report content divs
        document.querySelectorAll('.report-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected report content
        const reportSection = document.getElementById(`${reportType}-report`);
        if (reportSection) {
            reportSection.style.display = 'block';
            console.log('Found report section for:', reportType);
            
            // Generate the specific report
            switch(reportType) {
                case 'sales':
                    generateSalesReport();
                    break;
                case 'inventory':
                    generateInventoryReport();
                    break;
                case 'payments':
                    generatePaymentsReport();
                    break;
            }
        } else {
            console.error('Report section not found for:', reportType);
        }
        
        // Update active tab
        document.querySelectorAll('.report-tab').forEach(tab => {
            if (tab.dataset.report === reportType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Error in showReport:', error);
    }
}

// Generate report based on current selection
function generateReport() {
    try {
        const activeTab = document.querySelector('.report-tab.active');
        if (!activeTab) {
            // If no active tab, activate the first one
            const firstTab = document.querySelector('.report-tab');
            if (firstTab) {
                firstTab.classList.add('active');
                showReport(firstTab.dataset.report);
            }
            return;
        }
        
        const reportType = activeTab.dataset.report;
        console.log('Generating report for:', reportType);
        showReport(reportType);
    } catch (error) {
        console.error('Error in generateReport:', error);
    }
}
        console.log('Generating report for:', reportType);
        showReport(reportType);
    } catch (error) {
        console.error('Error in generateReport:', error);
    }
}

// Show specific report type
function showReport(reportType) {
    try {
        console.log('Showing report:', reportType);
        
        // Hide all report content divs
        document.querySelectorAll('.report-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected report content
        const reportSection = document.getElementById(`${reportType}-report`);
        if (reportSection) {
            reportSection.style.display = 'block';
            console.log('Found report section for:', reportType);
            
            // Generate the specific report
            switch(reportType) {
                case 'sales':
                    generateSalesReport();
                    break;
                case 'inventory':
                    generateInventoryReport();
                    break;
                case 'payments':
                    generatePaymentsReport();
                    break;
            }
        } else {
            console.error('Report section not found for:', reportType);
        }
        
        // Update active tab
        document.querySelectorAll('.report-tab').forEach(tab => {
            if (tab.dataset.report === reportType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Error in showReport:', error);
    }
}

// Initialize reports
function initReports() {
    if (!checkDependencies()) {
        console.error('Cannot initialize reports: Missing required dependencies');
        return;
    }

    try {
        // Initialize date range picker
        $('input[id="report-date-range"]').daterangepicker({
            startDate: moment().startOf('day'),
            endDate: moment().endOf('day'),
            ranges: {
               'Today': [moment().startOf('day'), moment().endOf('day')],
               'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
               'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            alwaysShowCalendars: true,
            opens: 'left',
            locale: {
                format: 'YYYY-MM-DD',
                cancelLabel: 'Clear'
            }
        }, function(start, end, label) {
            generateReport();
        });
        
        // Clear date range
        $('input[id="report-date-range"]').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
            generateReport();
        });
        
        // Load reports data from localStorage if available
        loadReportsData();
        
        // Set up event listeners for reports
        setupReportsEventListeners();
        
        // Show sales report by default
        showReport('sales');
        
        // Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();
        
        console.log('Reports module initialized successfully');
    } catch (error) {
        console.error('Error initializing reports:', error);
    }
}

// Generate sales report
function generateSalesReport() {
    console.log('Generating sales report...');
    const reportContent = document.getElementById('sales-report-content');
    if (reportContent) {
        reportContent.innerHTML = '<p>Sales report will be displayed here.</p>';
    }
}

// Generate inventory report
function generateInventoryReport() {
    console.log('Generating inventory report...');
    const reportContent = document.getElementById('inventory-report-content');
    if (reportContent) {
        reportContent.innerHTML = '<p>Inventory report will be displayed here.</p>';
    }
}

// Generate payments report
function generatePaymentsReport() {
    console.log('Generating payments report...');
    const reportContent = document.getElementById('payments-report-content');
    if (reportContent) {
        reportContent.innerHTML = '<p>Payments report will be displayed here.</p>';
    }
}

// Initialize everything when the DOM is fully loaded
function initializeReportsModule() {
    // First, check dependencies
    if (!checkDependencies()) {
        console.error('Cannot initialize reports: Missing required dependencies');
        return;
    }
    
    // Then set up event listeners
    try {
        setupReportsEventListeners();
        console.log('Reports module initialized successfully');
        
        // Show sales report by default if we're on the reports page
        if (document.getElementById('reports-modal')) {
            showReport('sales');
        }
    } catch (error) {
        console.error('Error initializing reports module:', error);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReportsModule);
} else {
    // In case the document is already loaded
    setTimeout(initializeReportsModule, 0);
}

// Load reports data from localStorage
function loadReportsData() {
    const savedOrders = localStorage.getItem('completedOrders');
    if (savedOrders) {
        completedOrders = JSON.parse(savedOrders);
    }
}

// Save reports data to localStorage
function saveReportsData() {
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
}

// Add a completed order to the reports
function addCompletedOrder(order) {
    completedOrders.push(order);
    saveReportsData();
}

// Set up event listeners for reports
function setupReportsEventListeners() {
    try {
        console.log('Setting up report event listeners...');
        
        // Get references to DOM elements
        const reportsModal = document.getElementById('reports-modal');
        const reportsBtn = document.getElementById('reports-btn');
        
        if (!reportsBtn) {
            console.error('Reports button not found. Please make sure your reports button has id="reports-btn"');
            return;
        }
        
        if (!reportsModal) {
            console.error('Reports modal not found. Please make sure your reports modal has id="reports-modal"');
            return;
        }
        
        // Store references in the window object for debugging
        window.reportsModal = reportsModal;
        window.reportsBtn = reportsBtn;
        
        // Open reports modal
        reportsBtn.onclick = function(e) {
            try {
                e.preventDefault();
                console.log('Reports button clicked');
                reportsModal.style.display = 'block';
                generateReport();
            } catch (error) {
                console.error('Error in reports button click handler:', error);
            }
        };
        
        // Close reports modal
        const closeBtn = reportsModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                try {
                    e.preventDefault();
                    console.log('Close button clicked');
                    reportsModal.style.display = 'none';
                } catch (error) {
                    console.error('Error in close button click handler:', error);
                }
            };
        } else {
            console.error('Close button (class="close-modal") not found in reports modal');
        }
        
        // Close modal when clicking outside
        window.onclick = function(e) {
            try {
                if (e.target === reportsModal) {
                    console.log('Clicked outside modal, closing');
                    reportsModal.style.display = 'none';
                }
            } catch (error) {
                console.error('Error in window click handler:', error);
            }
        };
        
        // Tab click handlers
        const tabs = document.querySelectorAll('.report-tab');
        console.log(`Found ${tabs.length} report tabs`);
        
        tabs.forEach(tab => {
            tab.onclick = function(e) {
                try {
                    e.preventDefault();
                    const reportType = this.dataset.report;
                    console.log('Tab clicked, showing report:', reportType);
                    showReport(reportType);
                } catch (error) {
                    console.error('Error in tab click handler:', error);
                }
            };
        });
        
        console.log('Report event listeners set up successfully');
    } catch (error) {
        console.error('Error in setupReportsEventListeners:', error);
    }
}

// Show the selected report
function showReport(reportType) {
    // Hide all report contents
    document.querySelectorAll('.report-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show the selected report
    const reportContent = document.getElementById(`${reportType}-report`);
    if (reportContent) {
        reportContent.classList.add('active');
    }
    
    // Generate the report
    generateReport();
}

// Generate the current report
function generateReport() {
    const activeReport = document.querySelector('.report-content.active');
    if (!activeReport) return;
    
    const reportType = activeReport.id.replace('-report', '');
    
    switch(reportType) {
        case 'sales':
            generateSalesReport();
            break;
        case 'inventory':
            generateInventoryReport();
            break;
        case 'payments':
            generatePaymentsReport();
            break;
    }
}

// Generate sales report with interactive charts
async function generateSalesReport() {
    showLoading(true);
    
    try {
        const dateRange = $('input[id="report-date-range"]').data('daterangepicker');
        const startDate = dateRange.startDate.format('YYYY-MM-DD');
        const endDate = dateRange.endDate.format('YYYY-MM-DD');
        
        // Filter orders by date range
        const filteredOrders = completedOrders.filter(order => {
            const orderDate = order.timestamp.split('T')[0];
            return orderDate >= startDate && orderDate <= endDate;
        });
        
        // Calculate totals
        const totalSales = filteredOrders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = filteredOrders.length;
        const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
        
        // Update the UI with animation
        animateValue('total-sales', 0, totalSales, 1000, 'KSh ');
        animateValue('total-orders', 0, totalOrders, 1000);
        animateValue('avg-order-value', 0, avgOrderValue, 1000, 'KSh ');
        
        // Group orders by date for the chart
        const salesByDate = {};
        const currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);
        
        // Initialize all dates in range with 0 sales
        while (currentDate <= endDateObj) {
            const dateStr = currentDate.toISOString().split('T')[0];
            salesByDate[dateStr] = 0;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Add actual sales
        filteredOrders.forEach(order => {
            const orderDate = order.timestamp.split('T')[0];
            if (salesByDate.hasOwnProperty(orderDate)) {
                salesByDate[orderDate] += order.total;
            } else {
                salesByDate[orderDate] = order.total;
            }
        });
        
        // Prepare data for the chart
        const labels = Object.keys(salesByDate);
        const data = Object.values(salesByDate);
        
        // Update or create the chart
        updateSalesChart(labels, data);
        
        // Update sales table with animation
        const tbody = document.getElementById('sales-report-data');
        tbody.innerHTML = '';
        
        // Sort by date descending
        const sortedOrders = [...filteredOrders].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        // Add a small delay for each row for a nice animation effect
        sortedOrders.forEach((order, index) => {
            setTimeout(() => {
                const tr = document.createElement('tr');
                tr.style.opacity = '0';
                tr.style.animation = 'fadeIn 0.3s forwards';
                
                const orderDate = new Date(order.timestamp);
                const dateStr = orderDate.toLocaleDateString();
                const timeStr = orderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const itemsList = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');
                
                tr.innerHTML = `
                    <td>${dateStr} ${timeStr}</td>
                    <td>${order.orderNumber || 'N/A'}</td>
                    <td>${itemsList}</td>
                    <td>KSh ${order.total.toLocaleString()}</td>
                    <td>${order.paymentMethod || 'N/A'}</td>
                `;
                
                tbody.appendChild(tr);
            }, index * 50); // 50ms delay between each row
        });
        
    } catch (error) {
        console.error('Error generating sales report:', error);
        showNotification('Error generating sales report. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Update or create the sales chart
function updateSalesChart(labels, data) {
    const ctx = document.getElementById('sales-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (charts.salesChart) {
        charts.salesChart.destroy();
    }
    
    // Create new chart
    charts.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Sales',
                data: data,
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgba(52, 152, 219, 1)',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return `KSh ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'KSh ' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Animate value changes
function animateValue(elementId, start, end, duration, prefix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (elementId.includes('sales') || elementId.includes('value') || elementId.includes('payments')) {
            element.textContent = prefix + value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        } else {
            element.textContent = value.toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Show/hide loading overlay
function showLoading(show) {
    const loadingOverlay = document.getElementById('report-loading');
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // You can implement a more sophisticated notification system here
    alert(`${type.toUpperCase()}: ${message}`);
}

// Generate inventory report
function generateInventoryReport() {
    const inventory = window.inventory || [];
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => item.stock > 0 && item.stock <= item.reorderLevel).length;
    const outOfStockItems = inventory.filter(item => item.stock <= 0).length;
    
    // Update the UI
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('low-stock-count').textContent = lowStockItems;
    document.getElementById('out-of-stock-count').textContent = outOfStockItems;
    
    // Update inventory table
    const tbody = document.getElementById('inventory-report-data');
    tbody.innerHTML = '';
    
    inventory.forEach(item => {
        const tr = document.createElement('tr');
        let status = '';
        let statusClass = '';
        
        if (item.stock <= 0) {
            status = 'Out of Stock';
            statusClass = 'status-out-of-stock';
        } else if (item.stock <= item.reorderLevel) {
            status = 'Low Stock';
            statusClass = 'status-low-stock';
        } else {
            status = 'In Stock';
            statusClass = 'status-in-stock';
        }
        
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category || 'N/A'}</td>
            <td>${item.stock}</td>
            <td>${item.reorderLevel || 'N/A'}</td>
            <td><span class="status-indicator ${statusClass}"></span>${status}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Generate payments report
function generatePaymentsReport() {
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;
    
    // Filter orders by date range
    const filteredOrders = completedOrders.filter(order => {
        const orderDate = order.timestamp.split('T')[0];
        return orderDate >= startDate && orderDate <= endDate;
    });
    
    // Calculate payment totals
    const paymentTotals = {
        total: 0,
        cash: 0,
        mpesa: 0,
        card: 0
    };
    
    filteredOrders.forEach(order => {
        paymentTotals.total += order.total;
        const method = order.paymentMethod ? order.paymentMethod.toLowerCase() : 'cash';
        
        if (method.includes('cash')) {
            paymentTotals.cash += order.total;
        } else if (method.includes('mpesa') || method.includes('mobile')) {
            paymentTotals.mpesa += order.total;
        } else {
            paymentTotals.card += order.total;
        }
    });
    
    // Update the UI
    document.getElementById('total-payments').textContent = `KSh ${paymentTotals.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('cash-payments').textContent = `KSh ${paymentTotals.cash.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('mpesa-payments').textContent = `KSh ${paymentTotals.mpesa.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('card-payments').textContent = `KSh ${paymentTotals.card.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    // TODO: Initialize/update chart if needed
}

// Export the current report
function exportReport() {
    const activeReport = document.querySelector('.report-content.active');
    if (!activeReport) return;
    
    const reportType = activeReport.id.replace('-report', '');
    let content = '';
    let filename = '';
    
    switch(reportType) {
        case 'sales':
            content = generateCSVFromTable('sales-report-data');
            filename = `sales-report-${new Date().toISOString().split('T')[0]}.csv`;
            break;
        case 'inventory':
            content = generateCSVFromTable('inventory-report-data');
            filename = `inventory-report-${new Date().toISOString().split('T')[0]}.csv`;
            break;
        case 'payments':
            // For payments, we'll create a custom CSV
            const startDate = document.getElementById('report-start-date').value;
            const endDate = document.getElementById('report-end-date').value;
            const totalPayments = document.getElementById('total-payments').textContent;
            const cashPayments = document.getElementById('cash-payments').textContent;
            const mpesaPayments = document.getElementById('mpesa-payments').textContent;
            const cardPayments = document.getElementById('card-payments').textContent;
            
            content = `Payment Summary Report\n`;
            content += `Date Range: ${startDate} to ${endDate}\n\n`;
            content += `Total Payments,${totalPayments}\n`;
            content += `Cash,${cashPayments}\n`;
            content += `M-Pesa,${mpesaPayments}\n`;
            content += `Card,${cardPayments}\n`;
            
            filename = `payments-summary-${new Date().toISOString().split('T')[0]}.csv`;
            break;
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Helper function to generate CSV from a table
function generateCSVFromTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return '';
    
    const rows = table.getElementsByTagName('tr');
    let csv = [];
    
    // Get headers
    const headers = [];
    const headerCells = rows[0].getElementsByTagName('th');
    for (let i = 0; i < headerCells.length; i++) {
        headers.push(`"${headerCells[i].textContent.replace(/"/g, '""')}"`);
    }
    csv.push(headers.join(','));
    
    // Get rows
    for (let i = 1; i < rows.length; i++) {
        const row = [];
        const cells = rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cells.length; j++) {
            // Remove any status indicators or other HTML elements
            const cellText = cells[j].textContent.replace(/\s+/g, ' ').trim();
            row.push(`"${cellText.replace(/"/g, '""')}"`);
        }
        
        csv.push(row.join(','));
    }
    
    return csv.join('\n');
}

// Update the completeOrder function to add orders to reports
function updateCompleteOrderForReports(order) {
    // Add the order to completed orders
    addCompletedOrder(order);
    
    // If the reports modal is open, refresh the reports
    const reportsModal = document.getElementById('reports-modal');
    if (reportsModal && reportsModal.style.display === 'block') {
        generateReport();
    }
}
