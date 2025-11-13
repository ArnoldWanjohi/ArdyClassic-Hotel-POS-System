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

// Show loading overlay
function showLoading(show) {
    const loadingOverlay = document.getElementById('report-loading');
    if (loadingOverlay) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Implementation for showing notifications
    console.log(`[${type}] ${message}`);
}

// Generate sales report
function generateSalesReport() {
    console.log('Generating sales report...');
    showLoading(true);
    
    try {
        const reportContent = document.getElementById('sales-report-content');
        if (!reportContent) return;
        
        // Simulate loading
        setTimeout(() => {
            reportContent.innerHTML = `
                <div class="report-summary">
                    <div class="summary-card">
                        <h5>Total Sales</h5>
                        <p id="total-sales">KSh 0.00</p>
                    </div>
                    <div class="summary-card">
                        <h5>Orders</h5>
                        <p id="total-orders">0</p>
                    </div>
                    <div class="summary-card">
                        <h5>Average Order</h5>
                        <p id="avg-order">KSh 0.00</p>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="sales-chart"></canvas>
                </div>
            `;
            
            // Initialize chart
            updateSalesChart([], []);
            showLoading(false);
        }, 500);
    } catch (error) {
        console.error('Error generating sales report:', error);
        showLoading(false);
    }
}

// Update sales chart
function updateSalesChart(labels, data) {
    const ctx = document.getElementById('sales-chart')?.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (charts.salesChart) {
        charts.salesChart.destroy();
    }

    // Create new chart
    charts.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.length ? labels : ['No data'],
            datasets: [{
                label: 'Sales',
                data: data.length ? data : [0],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
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
                    mode: 'index',
                    intersect: false
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
            }
        }
    });
}

// Generate inventory report
function generateInventoryReport() {
    console.log('Generating inventory report...');
    showLoading(true);
    
    try {
        const reportContent = document.getElementById('inventory-report-content');
        if (!reportContent) return;
        
        // Simulate loading
        setTimeout(() => {
            reportContent.innerHTML = `
                <div class="inventory-summary">
                    <div class="inventory-stats">
                        <div class="stat-card">
                            <h5>Total Items</h5>
                            <p id="total-items">0</p>
                        </div>
                        <div class="stat-card">
                            <h5>Low Stock</h5>
                            <p id="low-stock">0</p>
                        </div>
                        <div class="stat-card">
                            <h5>Out of Stock</h5>
                            <p id="out-of-stock">0</p>
                        </div>
                    </div>
                    <div class="inventory-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="inventory-items">
                                <tr>
                                    <td colspan="3" class="text-center">No inventory data available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            showLoading(false);
        }, 500);
    } catch (error) {
        console.error('Error generating inventory report:', error);
        showLoading(false);
    }
}

// Generate payments report
function generatePaymentsReport() {
    console.log('Generating payments report...');
    showLoading(true);
    
    try {
        const reportContent = document.getElementById('payments-report-content');
        if (!reportContent) return;
        
        // Simulate loading
        setTimeout(() => {
            reportContent.innerHTML = `
                <div class="payments-summary">
                    <div class="payment-methods">
                        <div class="method-card">
                            <h5>Cash</h5>
                            <p id="cash-total">KSh 0.00</p>
                        </div>
                        <div class="method-card">
                            <h5>M-Pesa</h5>
                            <p id="mpesa-total">KSh 0.00</p>
                        </div>
                        <div class="method-card">
                            <h5>Card</h5>
                            <p id="card-total">KSh 0.00</p>
                        </div>
                    </div>
                    <div class="payment-transactions">
                        <h4>Recent Transactions</h4>
                        <div class="transactions-list" id="recent-transactions">
                            <p class="text-muted">No recent transactions</p>
                        </div>
                    </div>
                </div>
            `;
            showLoading(false);
        }, 500);
    } catch (error) {
        console.error('Error generating payments report:', error);
        showLoading(false);
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
        
        // Initialize date range picker
        if (typeof $ !== 'undefined' && $.fn.daterangepicker) {
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
                console.log('Date range selected:', start.format('YYYY-MM-DD'), 'to', end.format('YYYY-MM-DD'));
                generateReport();
            });
            
            // Clear date range
            $('input[id="report-date-range"]').on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('');
                generateReport();
            });
        } else {
            console.warn('Date Range Picker not available. Make sure jQuery and daterangepicker are loaded.');
        }
        
        console.log('Report event listeners set up successfully');
    } catch (error) {
        console.error('Error in setupReportsEventListeners:', error);
    }
}

// Initialize reports when DOM is ready
function initReports() {
    if (!checkDependencies()) {
        console.error('Cannot initialize reports: Missing required dependencies');
        return;
    }

    try {
        // Set up event listeners
        setupReportsEventListeners();
        
        // Show sales report by default if we're on the reports page
        if (document.getElementById('reports-modal')) {
            // Initialize with sales report
            const firstTab = document.querySelector('.report-tab');
            if (firstTab) {
                firstTab.classList.add('active');
                showReport(firstTab.dataset.report);
            }
        }
        
        console.log('Reports module initialized successfully');
    } catch (error) {
        console.error('Error initializing reports:', error);
    }
}

// Start initialization when DOM is ready
function initializeReports() {
    // Check if the reports button exists
    const reportsBtn = document.getElementById('reports-btn');
    if (reportsBtn) {
        // Add direct click event listener as a fallback
        reportsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const reportsModal = document.getElementById('reports-modal');
            if (reportsModal) {
                reportsModal.style.display = 'block';
                generateReport();
            }
        });
    }
    
    // Initialize the full reports functionality
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReports);
    } else {
        // In case the document is already loaded
        setTimeout(initReports, 0);
    }
}

// Start the initialization
initializeReports();

// Load reports data from localStorage
function loadReportsData() {
    const savedOrders = localStorage.getItem('completedOrders');
    if (savedOrders) {
        try {
            completedOrders = JSON.parse(savedOrders);
            console.log('Loaded', completedOrders.length, 'completed orders from localStorage');
        } catch (error) {
            console.error('Error parsing saved orders:', error);
        }
    }
}

// Save reports data to localStorage
function saveReportsData() {
    try {
        localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    } catch (error) {
        console.error('Error saving reports data:', error);
    }
}

// Add a completed order to the reports
function addCompletedOrder(order) {
    if (!order || !order.items || !order.items.length) return;
    
    completedOrders.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        items: order.items,
        total: order.total,
        paymentMethod: order.paymentMethod || 'cash',
        customerName: order.customerName || 'Walk-in Customer'
    });
    
    saveReportsData();
}

// Export report data to CSV
function exportReport() {
    try {
        const activeTab = document.querySelector('.report-tab.active');
        if (!activeTab) return;
        
        const reportType = activeTab.dataset.report;
        let csvContent = "data:text/csv;charset=utf-8,";
        let filename = `${reportType}_report_${moment().format('YYYY-MM-DD')}.csv`;
        
        switch(reportType) {
            case 'sales':
                // Add sales report headers
                csvContent += "Date,Order ID,Items,Total,Payment Method\n";
                // Add sales data
                completedOrders.forEach(order => {
                    const date = new Date(order.timestamp).toLocaleString();
                    const items = order.items.map(item => `${item.name} (${item.quantity})`).join('; ');
                    csvContent += `"${date}",${order.id},"${items}",${order.total},${order.paymentMethod}\n`;
                });
                break;
                
            case 'inventory':
                // Add inventory report headers
                csvContent += "Item,Category,Stock,Status\n";
                // This would be populated with actual inventory data
                csvContent += "Sample Item 1,Food,10,In Stock\n";
                csvContent += "Sample Item 2,Drinks,2,Low Stock\n";
                break;
                
            case 'payments':
                // Add payments report headers
                csvContent += "Date,Order ID,Amount,Payment Method,Status\n";
                // Add payment data
                completedOrders.forEach(order => {
                    const date = new Date(order.timestamp).toLocaleString();
                    csvContent += `"${date}",${order.id},${order.total},${order.paymentMethod},Completed\n`;
                });
                break;
        }
        
        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`Exported ${reportType} report`);
    } catch (error) {
        console.error('Error exporting report:', error);
        showNotification('Error exporting report. Please try again.', 'error');
    }
}

// Print current report
function printReport() {
    try {
        const activeTab = document.querySelector('.report-tab.active');
        if (!activeTab) return;
        
        const reportType = activeTab.dataset.report;
        const printWindow = window.open('', '_blank');
        
        // Get the report content to print
        const reportContent = document.getElementById(`${reportType}-report`);
        if (!reportContent) {
            console.error('Report content not found for printing');
            return;
        }
        
        // Create a clean HTML document for printing
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - ${moment().format('YYYY-MM-DD')}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    h1 { color: #2c3e50; margin-bottom: 20px; }
                    .print-header { text-align: center; margin-bottom: 30px; }
                    .print-footer { margin-top: 30px; text-align: center; font-size: 0.9em; color: #777; }
                    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .summary-card { 
                        display: inline-block; 
                        margin: 10px; 
                        padding: 15px; 
                        border: 1px solid #eee; 
                        border-radius: 5px; 
                        min-width: 150px; 
                        text-align: center;
                    }
                    @media print {
                        @page { size: auto; margin: 0; }
                        body { margin: 1.6cm; }
                        .no-print { display: none !important; }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>Ardyclassic Hotel - ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h1>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                </div>
                <div id="print-content">
                    ${reportContent.innerHTML}
                </div>
                <div class="print-footer">
                    <p>Ardyclassic Hotel POS System - ${window.location.hostname}</p>
                </div>
                <script>
                    // Close the print window after printing
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            setTimeout(function() { window.close(); }, 100);
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        
        printWindow.document.close();
    } catch (error) {
        console.error('Error printing report:', error);
        showNotification('Error printing report. Please try again.', 'error');
    }
}

// Add event listener for export button
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('export-report');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReport);
    }
    
    // Add print button event listener
    const printBtn = document.getElementById('print-report');
    if (printBtn) {
        printBtn.addEventListener('click', printReport);
    }
    
    // Add refresh button event listener
    const refreshBtn = document.getElementById('refresh-report');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.report-tab.active');
            if (activeTab) {
                showReport(activeTab.dataset.report);
            }
        });
    }
});

// Expose functions to the global scope for HTML event handlers
window.showReport = showReport;
window.generateReport = generateReport;
window.exportReport = exportReport;
window.printReport = printReport;
