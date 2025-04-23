document.addEventListener('DOMContentLoaded', () => {
    const formsContainer = document.getElementById('forms');
    const resultsContainer = document.getElementById('results');
    const tabs = document.querySelectorAll('#sidebar li');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            resultsContainer.innerHTML = ''; // Clear previous results
            if (tabName === 'product-type') {
                renderProductTypeForm();
            } else if (tabName === 'supplier') {
                renderSupplierForm();
            } else if (tabName === 'purchase') {
                renderPurchaseForm();
            } else if (tabName === 'shipping-purchase') {
                renderShippingPurchaseForm();
            } else if (tabName === 'batch') {
                renderBatchForm();
            } else if (tabName === 'search-product') {
                renderSearchProductForm();
            } else if (tabName === 'move-inventory') {
                renderMoveInventoryForm();
            } else if (tabName === 'product-description') {
                renderProductDescriptionForm();
            } else if (tabName === 'sale') {
                renderSaleForm();
            } else if (tabName === 'inventory-levels') {
                renderInventoryLevelsStackedChart();
            } else if (tabName === 'inventory-turnover') {
                renderInventoryTurnoverChart();
            } else if (tabName === 'inventory-lifespan') {
                renderInventoryLifespanChart();
            } else if (tabName === 'shipping') {
                renderShippingForm();
            } else if (tabName === 'sales-report') {
                renderSalesReport(); // Handle the new sales report tab
            } else if (tabName === 'orders-report') {
                renderOrdersReport(); // Handle the new orders report tab
            } else if (tabName === 'reorder-points') {
                renderReorderPoints(); // Handle the new reorder points tab
            } else if (tabName === 'inventory-tracking') {
                renderInventoryTracking(); // Handle the inventory tracking tab
            } else if (tabName === 'stock-over-time') {
                renderStockOverTimeForm();
            } else if (tabName === 'order-arrival-time-accuracy') {
                renderOrderArrivalTimeAccuracyForm();
            } else if (tabName === 'item-timeline') {
                renderItemTimelineForm();
            } else if (tabName === 'item-profit') {
                renderItemProfitReportForm();
            } else if (tabName === 'insert-individual-product') {
                renderInsertIndividualProductForm();
            }
        });
    });

    // Render forms and handle submissions
    function renderProductTypeForm() {
        formsContainer.innerHTML = `
            <h2>Add Product Type</h2>
            <form id="productTypeForm">
                <input type="text" name="productName" placeholder="Product Name" required>
                <input type="text" name="category" placeholder="Category">
                <input type="number" name="weight" placeholder="Weight">
                <input type="text" name="size" placeholder="Size">
                <input type="text" name="material" placeholder="Material">
                <label><input type="checkbox" name="secured"> Secured</label>
                <label><input type="checkbox" name="refrigerated"> Refrigerated</label>
                <label><input type="checkbox" name="hazardous"> Hazardous</label>
                <input type="number" name="minDesiredQuantity" placeholder="Minimum Desired Quantity">
                <input type="number" name="maxCapacityInBin" placeholder="Max Capacity in Bin">
                <select name="productStatus">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <textarea name="description" placeholder="Product Description"></textarea>
                <button type="submit">Add Product Type</button>
            </form>
        `;

        const form = document.getElementById('productTypeForm');
        form.addEventListener('submit', handleProductTypeSubmit);
    }

    async function handleProductTypeSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const productTypeData = {};

        formData.forEach((value, key) => {
            productTypeData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:5000/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productTypeData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Product Type added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }

    function renderSupplierForm() {
        formsContainer.innerHTML = `
            <h2>Add Supplier</h2>
            <form id="supplierForm">
                <input type="text" name="supplierName" placeholder="Supplier Name" required>
                <input type="text" name="phone" placeholder="Phone">
                <input type="email" name="email" placeholder="Email">
                <input type="text" name="address" placeholder="Address">
                <input type="text" name="paymentTerms" placeholder="Payment Terms">
                <input type="number" name="leadTime" placeholder="Lead Time (days)">
                <label><input type="checkbox" name="preferredSupplier"> Preferred Supplier</label>
                <button type="submit">Add Supplier</button>
            </form>
        `;

        const form = document.getElementById('supplierForm');
        form.addEventListener('submit', handleSupplierSubmit);
    }

    async function handleSupplierSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const supplierData = {};

        formData.forEach((value, key) => {
            supplierData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:5000/api/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Supplier added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }

    function renderPurchaseForm() {
        formsContainer.innerHTML = `
            <h2>Submit Purchase</h2>
            <form id="purchaseForm">
                <input type="number" name="supplierId" placeholder="Supplier ID" required>
                <input type="number" name="productTypeId" placeholder="Product Type ID" required>
                <input type="number" name="quantityPurchased" placeholder="Quantity Purchased" required>
                <input type="date" name="dateOrdered" placeholder="Date Ordered" required>
                <input type="date" name="estimatedDeliveryDate" placeholder="Estimated Delivery Date" required>
                <input type="number" name="purchasePrice" placeholder="Purchase Price" required>
                <input type="text" name="purchaseNumber" placeholder="Purchase Number" required>
                <button type="submit">Submit Purchase</button>
            </form>
        `;

        const form = document.getElementById('purchaseForm');
        form.addEventListener('submit', handlePurchaseSubmit);
    }

    async function handlePurchaseSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const purchaseData = {};

        formData.forEach((value, key) => {
            purchaseData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:5000/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Purchase added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }

    function renderShippingPurchaseForm() {
        formsContainer.innerHTML = `
            <h2>Add Shipment</h2>
            <form id="shippingPurchaseForm">
                <input type="number" name="purchaseId" placeholder="Purchase ID" required>
                <input type="number" name="shippingId" placeholder="Shipping ID" required>
                <input type="number" name="quantityShipped" placeholder="Quantity Shipped" required>
                <input type="date" name="actualDeliveryDate" placeholder="Actual Delivery Date" required>
                <button type="submit">Add Shipping for Purchase</button>
            </form>
        `;

        const form = document.getElementById('shippingPurchaseForm');
        form.addEventListener('submit', handleShippingPurchaseSubmit);
    }

    async function handleShippingPurchaseSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const shippingPurchaseData = {};

        formData.forEach((value, key) => {
            shippingPurchaseData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:5000/api/shipping_purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shippingPurchaseData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Shipping for purchase added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }

    function renderBatchForm() {
        formsContainer.innerHTML = `
            <h2>Add Batch</h2>
            <form id="batchForm">
                <input type="number" name="purchaseShippingID" placeholder="Purchase Shipping ID" required>
                <input type="text" name="batchNumber" placeholder="Batch Number" required>
                <input type="date" name="productionDate" placeholder="Production Date" required>
                <input type="date" name="expirationDate" placeholder="Expiration Date" required>
                <input type="number" name="quantityPerBatch" placeholder="Quantity Per Batch" required>
                <button type="submit">Add Batch</button>
            </form>
        `;

        const form = document.getElementById('batchForm');
        form.addEventListener('submit', handleBatchSubmit);
    }

    async function handleBatchSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const batchData = {};

        formData.forEach((value, key) => {
            batchData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:5000/api/batch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(batchData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Batch added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }

    function renderSearchProductForm() {
        formsContainer.innerHTML = `
            <h2>Search Product</h2>
            <form id="searchProductForm">
                <input type="text" name="searchId" placeholder="Enter Product ID" required>
                <button type="submit">Search</button>
            </form>
        `;

        const form = document.getElementById('searchProductForm');
        form.addEventListener('submit', handleSearchProductSubmit);
    }

    async function handleSearchProductSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const searchId = new FormData(form).get('searchId');

        try {
            const response = await fetch(`http://localhost:5000/api/search?searchId=${searchId}`, {
                method: 'GET',
            });

            if (response.ok) {
                const product = await response.json();
                displaySearchResults(product);
            } else {
                const error = await response.json();
                alert(error.message || 'Product not found.');
            }
        } catch (error) {
            console.error('Error searching product:', error);
            alert('An error occurred while searching. Please try again.');
        }
    }

    function displaySearchResults(product) {
        resultsContainer.innerHTML = `
            <h2>Search Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Batch ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Weight</th>
                        <th>Size</th>
                        <th>Material</th>
                        <th>Product Status</th>
                        <th>Current Bin</th>
                        <th>Location</th>
                        <th>Sale ID</th>
                        <th>Date Sold</th>
                        <th>Sale Price</th>
                        <th>Purchase ID</th>
                        <th>Supplier ID</th>
                        <th>Minimum Desired Quantity</th>
                        <th>Quantity Purchased</th>
                        <th>Purchase Price</th>
                        <th>Date Ordered</th>
                        <th>Estimated Delivery Date</th>
                        <th>Actual Delivery Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${product.ProductID || 'N/A'}</td>
                        <td>${product.BatchID || 'N/A'}</td>
                        <td>${product.ProductName || 'N/A'}</td>
                        <td>${product.Description || 'N/A'}</td>
                        <td>${product.Category || 'N/A'}</td>
                        <td>${product.Weight || 'N/A'}</td>
                        <td>${product.Size || 'N/A'}</td>
                        <td>${product.Material || 'N/A'}</td>
                        <td>${product.ProductStatus || 'N/A'}</td>
                        <td>${product.CurrentBin || 'N/A'}</td>
                        <td>${product.Location || 'N/A'}</td>
                        <td>${product.SaleID || 'N/A'}</td>
                        <td>${product.DateSold || 'N/A'}</td>
                        <td>${product.SalePrice || 'N/A'}</td>
                        <td>${product.PurchaseID || 'N/A'}</td>
                        <td>${product.SupplierID || 'N/A'}</td>
                        <td>${product.MinimumDesiredQuantity || 'N/A'}</td>
                        <td>${product.QuantityPurchased || 'N/A'}</td>
                        <td>${product.PurchasePrice || 'N/A'}</td>
                        <td>${product.DateOrdered || 'N/A'}</td>
                        <td>${product.EstimatedDeliveryDate || 'N/A'}</td>
                        <td>${product.ActualDeliveryDate || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
    


    function renderMoveInventoryForm() {
        formsContainer.innerHTML = `
            <h2>Move Inventory</h2>
            <form id="moveInventoryForm">
                <input type="number" name="productId" placeholder="Product ID" required>
                <input type="number" name="binFromId" placeholder="From Bin ID" required>
                <input type="number" name="binToId" placeholder="To Bin ID" required>
                <input type="date" name="dateMoved" placeholder="Date Moved" required>
                <button type="submit">Move Inventory</button>
            </form>
        `;
    
        const form = document.getElementById('moveInventoryForm');
        form.addEventListener('submit', handleMoveInventorySubmit);
    }

    async function handleMoveInventorySubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const moveInventoryData = {};
    
        formData.forEach((value, key) => {
            moveInventoryData[key] = value;
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/move-inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(moveInventoryData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Inventory moved successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }
    
    function renderProductDescriptionForm() {
        formsContainer.innerHTML = `
            <h2>Add or Update Product Description</h2>
            <form id="productDescriptionForm">
                <input type="number" name="productTypeID" placeholder="Product Type ID" required>
                <textarea name="description" placeholder="Enter Product Description" required></textarea>
                <button type="submit">Add Description</button>
            </form>
        `;
    
        const form = document.getElementById('productDescriptionForm');
        form.addEventListener('submit', handleProductDescriptionSubmit);
    }

    
    async function handleProductDescriptionSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const productDescriptionData = {};
    
        formData.forEach((value, key) => {
            productDescriptionData[key] = value;
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/product-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDescriptionData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Product description added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }

    function renderSaleForm() {
        formsContainer.innerHTML = `
            <h2>Record Sale</h2>
            <form id="saleForm">
                <input type="text" name="saleNumber" placeholder="Sale Number" required>
                <input type="number" name="saleProductId" placeholder="Product ID" required>
                <input type="number" name="salePrice" placeholder="Sale Price" required>
                <input type="date" name="dateSold" placeholder="Date Sold" required>
                <button type="submit">Record Sale</button>
            </form>
        `;
    
        const form = document.getElementById('saleForm');
        form.addEventListener('submit', handleSaleSubmit);
    }

    
    async function handleSaleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const saleData = {};
    
        formData.forEach((value, key) => {
            saleData[key] = value;
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/sale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Sale recorded successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }
    

    let inventoryLevelsInstance;
    
    async function renderInventoryLevelsStackedChart() {
        const reportsContainer = document.getElementById('reports');
        reportsContainer.innerHTML = `
            <h2>Inventory Levels</h2>
            <form id="categoryFilterForm">
                <label for="category">Select Category:</label>
                <select id="category" name="category" required>
                    <option value="" disabled selected>Loading categories...</option>
                </select>
                <button type="submit">Filter</button>
            </form>
            <canvas id="inventoryLevelsChart"></canvas>
        `;
    
        // Fetch categories and populate dropdown
        const categoryDropdown = document.getElementById('category');
        try {
            const categoryResponse = await fetch('http://localhost:5000/api/getCategory', {
                method: 'GET',
            });
    
            if (categoryResponse.ok) {
                const categories = await categoryResponse.json();
    
                // Clear existing options and populate with fetched categories
                categoryDropdown.innerHTML = '<option value="" disabled selected>Select Category</option>';
                categories.forEach(cat => {
                    categoryDropdown.innerHTML += `<option value="${cat.Category}">${cat.Category}</option>`;
                });
            } else {
                const error = await categoryResponse.json();
                alert(`Error fetching categories: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('An error occurred while fetching categories. Please try again.');
        }
    
        const form = document.getElementById('categoryFilterForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const category = categoryDropdown.value;
    
            try {
                const response = await fetch(`http://localhost:5000/api/inventory-levels?Category=${encodeURIComponent(category)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    renderStackedBarChart(data, 'inventoryLevelsChart', 'Inventory Levels by Product');
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.error || 'An error occurred.'}`);
                }
            } catch (error) {
                console.error('Error fetching inventory levels:', error);
                alert('An error occurred while fetching inventory levels. Please try again.');
            }
        });
    }
    
    
    
    
    function renderStackedBarChart(data, canvasId, title) {
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (inventoryLevelsInstance) {
            inventoryLevelsInstance.destroy()
        }
    
        // Extract the labels and datasets
        const labels = data.map(item => item.name);
        const currentCapacities = data.map(item => item.current_capacity);
        const maxCapacities = data.map(item => item.max_capacity);
    
        console.log("Labels:", labels); // Debugging log
        console.log("Current Capacities:", currentCapacities); // Debugging log
        console.log("Max Capacities:", maxCapacities); // Debugging log
    
        inventoryLevelsInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Current Capacity',
                        data: currentCapacities,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                    {
                        label: 'Max Capacity',
                        data: maxCapacities,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: title,
                    },
                },
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true },
                },
            },
        });
    }


    let inventoryTurnoverInstance;

    async function renderInventoryTurnoverChart() {
        const reportsContainer = document.getElementById('reports');
        reportsContainer.innerHTML = `
            <h2>Inventory Turnover</h2>
            <canvas id="inventoryTurnoverChart"></canvas>
        `;
    
        try {
            const response = await fetch('http://localhost:5000/api/inventory-turnover', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                const turnoverRatio = data.total_sales;

                console.log("Turnover data:", data);

    
                renderBarChart(
                    'inventoryTurnoverChart',
                    ['Turnover Ratio'],
                    [turnoverRatio],
                    'Inventory Turnover (COGS / Avg Inventory)'
                );
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred while fetching inventory turnover data.'}`);
            }
        } catch (error) {
            console.error('Error fetching inventory turnover:', error);
            alert('An error occurred while fetching inventory turnover data. Please try again.');
        }
    }
    
    function renderBarChart(canvasId, labels, data, title) {
        const ctx = document.getElementById(canvasId).getContext('2d');

        if (inventoryTurnoverInstance) {
            inventoryTurnoverInstance.destroy()
        }

        inventoryTurnoverInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ratio',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }

    let inventoryLifespanInstance;

    async function renderInventoryLifespanChart() {
        const reportsContainer = document.getElementById('reports');

        if (!reportsContainer) {
            console.error('Error: reportsContainer is null.');
            return;
        }
    
        reportsContainer.innerHTML = `
            <h2>Inventory Lifespan</h2>
            <select id="lifespanFilter">
                <option value="all_time">All Time</option>
                <option value="last_year">Last Year</option>
                <option value="last_month">Last Month</option>
            </select>
            <button id="fetchLifespanData">Filter</button>
            <canvas id="lifespanChart"></canvas>
            <div id="overExpirationItems"></div>
        `;
    
        const fetchAndRenderData = async () => {
            const filterOption = document.getElementById('lifespanFilter').value;
            try {
                const response = await fetch(`http://localhost:5000/api/inventory-lifespan?filter=${filterOption}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log("Lifespan data:", data); // Debugging
    
                    const labels = data.map(item => item.productName);
                    const avgDaysData = data.map(item => item.avgDaysInInventory);
                    const maxDaysData = data.map(item => item.maxDaysInInventory);
                    const overExpirationData = data.filter(item => item.totalItems > 0);
    
                    // Render the chart
                    const ctx = document.getElementById('lifespanChart').getContext('2d');

                    if (inventoryLifespanInstance) {
                        inventoryLifespanInstance.destroy();
                    }

                    inventoryLifespanInstance = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Average Days in Inventory',
                                    data: avgDaysData,
                                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                    borderColor: 'rgba(75, 192, 192, 1)',
                                    borderWidth: 1,
                                },
                                {
                                    label: 'Max Days in Inventory',
                                    data: maxDaysData,
                                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Inventory Lifespan (Days)',
                                },
                            },
                            scales: {
                                x: { beginAtZero: true },
                                y: { beginAtZero: true },
                            },
                        },
                    });
    
                    // Render over-expiration items
                    const overExpirationDiv = document.getElementById('overExpirationItems');
                    overExpirationDiv.innerHTML = `
                        <h3>Items Over Expiration</h3>
                        <ul>
                            ${overExpirationData
                                .map(
                                    item =>
                                        `<li>${item.productName}: ${item.totalItems} items expired</li>`
                                )
                                .join('')}
                        </ul>
                    `;
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.error || 'Failed to fetch inventory lifespan data.'}`);
                }
            } catch (error) {
                console.error('Error fetching inventory lifespan data:', error);
                alert('An error occurred while fetching inventory lifespan data. Please try again.');
            }
        };
    
        // Attach event listener for filtering
        document.getElementById('fetchLifespanData').addEventListener('click', fetchAndRenderData);
    
        // Fetch and render initial data
        fetchAndRenderData();
    }



    function renderShippingForm() {
        formsContainer.innerHTML = `
            <h2>Add Shipping</h2>
            <form id="shippingForm">
                <input type="text" name="shippingMethod" placeholder="Shipping Method" required>
                <input type="number" name="shippingCost" placeholder="Shipping Cost" required>
                <input type="text" name="trackingNumber" placeholder="Tracking Number" required>
                <input type="text" name="carrier" placeholder="Carrier" required>
                <button type="submit">Add Shipping</button>
            </form>
        `;
    
        const form = document.getElementById('shippingForm');
        form.addEventListener('submit', handleShippingSubmit);
    }

    
    
    async function handleShippingSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const shippingData = {};
    
        formData.forEach((value, key) => {
            shippingData[key] = value;
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shippingData),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Shipping record added successfully!');
                form.reset();
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    }
    
    

    function renderSalesReport() {
        const tableHTML = `
            <h2>Sales Report</h2>
            <table id="salesReportTable">
                <thead>
                    <tr>
                        <th>Sale Number</th>
                        <th>Sale ID</th>
                        <th>Product Type ID</th>
                        <th>Product Name</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody id="salesReportBody">
                    <!-- Data will be injected here -->
                </tbody>
            </table>
        `;
        resultsContainer.innerHTML = tableHTML;
    
        fetchSalesReport();
    }
    
    async function fetchSalesReport() {
        try {
            const response = await fetch('http://localhost:5000/api/sales-report');
            const data = await response.json();
    
            const salesReportBody = document.getElementById('salesReportBody');
            salesReportBody.innerHTML = data.map(item => `
                <tr>
                    <td>${item.saleNumber}</td>
                    <td>${item.saleId}</td>
                    <td>${item.productTypeId}</td>
                    <td>${item.productName}</td>
                    <td>${item.salePrice}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching sales report:', error);
            alert('An error occurred while fetching the sales report.');
        }
    }

    function renderOrdersReport() {
        const tableHTML = `
            <h2>Orders Report</h2>
            <label>
                <input type="checkbox" id="undeliveredOrdersToggle"> Show Only Undelivered Orders
            </label>
            <table id="ordersReportTable">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Type</th>
                        <th>Quantity</th>
                        <th>Expected Delivery Date</th>
                        <th>Actual Delivery Date</th>
                        <th>Date Ordered</th>
                        <th>Purchase Price</th>
                    </tr>
                </thead>
                <tbody id="ordersReportBody">
                    <!-- Data will be dynamically inserted -->
                </tbody>
            </table>
        `;
        resultsContainer.innerHTML = tableHTML;
    
        const toggle = document.getElementById('undeliveredOrdersToggle');
        toggle.addEventListener('change', () => fetchOrdersReport(toggle.checked));
        fetchOrdersReport();
    }
    
    async function fetchOrdersReport(undeliveredOnly = false) {
        try {
            const response = await fetch(`http://localhost:5000/api/orders-report?undelivered=${undeliveredOnly}`);
            const data = await response.json();
    
            const ordersReportBody = document.getElementById('ordersReportBody');
            ordersReportBody.innerHTML = data.map(order => `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.productType}</td>
                    <td>${order.quantity}</td>
                    <td>${order.expectedDeliveryDate}</td>
                    <td>${order.actualDeliveryDate || 'Pending'}</td>
                    <td>${order.dateOrdered}</td>
                    <td>${order.purchasePrice}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching orders report:', error);
            alert('An error occurred while fetching the orders report.');
        }
    }
    

    function renderReorderPoints() {
        const tableHTML = `
            <h2>Reorder Points</h2>
            <label for="reorderSort">Sort By:</label>
            <select id="reorderSort">
                <option value="alphabetical">Alphabetical</option>
                <option value="category">Category</option>
                <option value="remaining_quantity">Remaining Quantity</option>
            </select>
            <table id="reorderPointsTable">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Current Quantity</th>
                        <th>Reorder Point</th>
                    </tr>
                </thead>
                <tbody id="reorderPointsBody">
                    <!-- Data will be dynamically inserted -->
                </tbody>
            </table>
        `;
        resultsContainer.innerHTML = tableHTML;
    
        const sortDropdown = document.getElementById('reorderSort');
        sortDropdown.addEventListener('change', () => fetchReorderPoints(sortDropdown.value));
        fetchReorderPoints(); // Initial fetch with default sorting
    }
    
    async function fetchReorderPoints(sortBy = 'alphabetical') {
        try {
            const response = await fetch(`http://localhost:5000/api/reorder-points?sort_by=${sortBy}`);
            const data = await response.json();
    
            const reorderPointsBody = document.getElementById('reorderPointsBody');
            reorderPointsBody.innerHTML = data.map(item => `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.category}</td>
                    <td>${item.currentQuantity} ${
                        item.currentQuantity >= item.reorderPoint ? '(No Reorder Needed)' : '(Reorder Needed)'
                    }</td>
                    <td>${item.reorderPoint}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching reorder points:', error);
            alert('An error occurred while fetching the reorder points.');
        }
    }

    


    function renderInventoryTracking() {
        const tableHTML = `
            <h2>Inventory Tracking</h2>
            <table id="inventoryTrackingTable">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Product Type ID</th>
                        <th>Product Name</th>
                        <th>Batch Number</th>
                        <th>Building</th>
                        <th>Floor</th>
                        <th>Location</th>
                        <th>Bin Name</th>
                        <th>Date Arrived</th>
                    </tr>
                </thead>
                <tbody id="inventoryTrackingBody">
                    <!-- Data will be dynamically inserted here -->
                </tbody>
            </table>
        `;
        resultsContainer.innerHTML = tableHTML;
    
        fetchInventoryTracking(); // Fetch the data on render
    }
    
    async function fetchInventoryTracking() {
        try {
            const response = await fetch('http://localhost:5000/api/inventory-tracking');
            const data = await response.json();
    
            const inventoryTrackingBody = document.getElementById('inventoryTrackingBody');
            inventoryTrackingBody.innerHTML = data.map(item => `
                <tr>
                    <td>${item.itemId}</td>
                    <td>${item.productTypeId}</td>
                    <td>${item.productName}</td>
                    <td>${item.batchNumber}</td>
                    <td>${item.building}</td>
                    <td>${item.floor}</td>
                    <td>${item.locationName}</td>
                    <td>${item.binName}</td>
                    <td>${item.dateArrived}</td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Error fetching inventory tracking data:', error);
            alert('An error occurred while fetching inventory tracking data.');
        }
    }
    



    function renderStockOverTimeForm() {
        formsContainer.innerHTML = `
            <h2>Stock Over Time</h2>
            <form id="stockOverTimeForm">
                <label for="group_by">Group By:</label>
                <select name="group_by" id="group_by">
                    <option value="item">Item</option>
                    <option value="category">Category</option>
                    <option value="total">Total</option>
                </select>
    
                <label for="time_range">Time Range:</label>
                <select name="time_range" id="time_range">
                    <option value="daily">Daily</option>
                    <option value="monthly" selected>Monthly</option>
                </select>
    
                <label for="start_date">Start Date:</label>
                <input type="date" id="start_date" name="start_date" required>
    
                <label for="end_date">End Date:</label>
                <input type="date" id="end_date" name="end_date" required>
    
                <button type="submit">Generate Report</button>
            </form>
    
            <div id="stockOverTimeGraphContainer">
                <canvas id="stockOverTimeChart"></canvas>
            </div>
        `;
    
        const form = document.getElementById('stockOverTimeForm');
        form.addEventListener('submit', handleStockOverTimeSubmit);
    }

    
    async function handleStockOverTimeSubmit(event) {
        event.preventDefault();
    
        const form = event.target;
        const formData = new FormData(form);
    
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            params.append(key, value);
        });
    
        try {
            const response = await fetch(`http://localhost:5000/api/stock-over-time?${params.toString()}`);
            const data = await response.json();
    
            if (response.ok) {
                renderStockOverTimeChart(data);
            } else {
                alert(`Error: ${data.error || 'Unable to fetch data.'}`);
            }
        } catch (error) {
            console.error('Error fetching stock over time data:', error);
            alert('An error occurred while fetching the report.');
        }
    }
    

    let stockOverTimeChartInstance; // Global variable to store the chart instance

    function renderStockOverTimeChart(data) {
        const ctx = document.getElementById('stockOverTimeChart').getContext('2d');

        // Destroy previous chart instance if it exists
        if (stockOverTimeChartInstance) {
            stockOverTimeChartInstance.destroy();
        }
    
        // Process data for Chart.js
        const labels = [...new Set(data.map(item => item.time_period))]; // Extract unique time periods
        const groupedData = {};
    
        data.forEach(item => {
            if (!groupedData[item.group_name]) {
                groupedData[item.group_name] = [];
            }
            groupedData[item.group_name].push(item.total_quantity);
        });
    
        const datasets = Object.keys(groupedData).map(group => ({
            label: group,
            data: groupedData[group],
            fill: false,
            borderColor: getRandomColor(), // Helper function to generate random colors
            tension: 0.1
        }));
    
        stockOverTimeChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Stock Over Time'
                    }
                }
            }
        });
    }
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    

    function renderOrderArrivalTimeAccuracyForm() {
        formsContainer.innerHTML = `
            <h2>Order Arrival Time Accuracy</h2>
            <form id="orderArrivalTimeAccuracyForm">
                
    
                <button type="submit">Generate Report</button>
            </form>
    
            <div id="orderArrivalTimeAccuracyTableContainer">
                <table id="orderArrivalTimeAccuracyTable">
                    <thead>
                        <tr>
                            <th>Supplier</th>
                            <th>Total (Avg. Days)</th>
                            <th>Year (Avg. Days)</th>
                            <th>Month (Avg. Days)</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `;
    
        const form = document.getElementById('orderArrivalTimeAccuracyForm');
        form.addEventListener('submit', handleOrderArrivalTimeAccuracySubmit);
    }
    
    

    async function handleOrderArrivalTimeAccuracySubmit(event) {
        event.preventDefault();
    
        const form = event.target;
        const formData = new FormData(form);
    
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            params.append(key, value);
        });
    
        try {
            const response = await fetch(`http://localhost:5000/api/order-arrival-time-accuracy?${params.toString()}`);
            const data = await response.json();
    
            if (response.ok) {
                renderOrderArrivalTimeAccuracyTable(data);
            } else {
                alert(`Error: ${data.error || 'Unable to fetch data.'}`);
            }
        } catch (error) {
            console.error('Error fetching order arrival time accuracy data:', error);
            alert('An error occurred while fetching the report.');
        }
    }
    
    function renderOrderArrivalTimeAccuracyTable(data) {
        const tableBody = document.querySelector('#orderArrivalTimeAccuracyTable tbody');
        tableBody.innerHTML = ''; // Clear previous data
    
        data.forEach(row => {
            console.log('Row data:', row); // Debug: Log the row to identify the issue
    
            // Parse values and handle null or undefined cases
            const total = row.Total !== null && row.Total !== undefined ? parseFloat(row.Total).toFixed(2) : 'N/A';
            const year = row.Year !== null && row.Year !== undefined ? parseFloat(row.Year).toFixed(2) : 'N/A';
            const month = row.Month !== null && row.Month !== undefined ? parseFloat(row.Month).toFixed(2) : 'N/A';
    
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.SupplierName || 'Unknown'}</td>
                <td>${total}</td>
                <td>${year}</td>
                <td>${month}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
    
    
    function renderItemTimelineForm() {
        formsContainer.innerHTML = `
            <h2>Item Timeline</h2>
            <form id="itemTimelineForm">
                <input type="text" name="productID" placeholder="Product ID" required>
                <button type="submit">Get Timeline</button>
            </form>
            <div id="itemTimelineResults"></div>
        `;
    
        const form = document.getElementById('itemTimelineForm');
        form.addEventListener('submit', handleItemTimelineSubmit);
    }

    
    async function handleItemTimelineSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const productID = formData.get('productID');
    
        try {
            const response = await fetch(`http://localhost:5000/api/item-timeline?productID=${productID}`, {
                method: 'GET',
            });
    
            if (response.ok) {
                const data = await response.json();
                renderItemTimelineResults(data);
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error fetching item timeline:', error);
            alert('An error occurred while fetching the item timeline. Please try again.');
        }
    }

    

    function renderItemTimelineResults(data) {
        const resultsContainer = document.getElementById('itemTimelineResults');
        resultsContainer.innerHTML = `
            <h3>Stock Movements</h3>
            <table>
                <thead>
                    <tr>
                        <th>StockTrackingID</th>
                        <th>Bin From</th>
                        <th>Bin To</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.stock_movements.map(movement => `
                        <tr>
                            <td>${movement.StockTrackingID || 'N/A'}</td>
                            <td>${movement.BinFrom || 'N/A'}</td>
                            <td>${movement.BinTo || 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
    
            <h3>Product Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Type</th>
                        <th>Purchase Price Per Unit</th>
                        <th>Sale Price</th>
                        <th>Batch ID</th>
                        <th>Expiration Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.product_details.map(detail => `
                        <tr>
                            <td>${detail.ProductName || 'N/A'}</td>
                            <td>${detail.PurchasePricePerUnit != null ? `$${parseFloat(detail.PurchasePricePerUnit).toFixed(2)}` : 'N/A'}</td>
                            <td>${detail.SalePrice != null ? `$${parseFloat(detail.SalePrice).toFixed(2)}` : 'N/A'}</td>
                            <td>${detail.BatchID || 'N/A'}</td>
                            <td>${detail.ExpirationDate || 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    function renderItemProfitReportForm() {
        formsContainer.innerHTML = `
            <h2>Item Profit Report</h2>
            <form id="itemProfitForm">
                <input type="text" name="ProductType" placeholder="Enter Product Type" required>
                <button type="submit">Generate Report</button>
            </form>
            <div id="itemProfitResults"></div>
        `;
    
        const form = document.getElementById('itemProfitForm');
        form.addEventListener('submit', handleItemProfitReportSubmit);
    }

    
    async function handleItemProfitReportSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const productType = formData.get('ProductType');
    
        try {
            const response = await fetch(`http://localhost:5000/api/item-profit?ProductType=${encodeURIComponent(productType)}`, {
                method: 'GET',
            });
    
            if (response.ok) {
                const data = await response.json();
                renderItemProfitResults(data);
            } else {
                const error = await response.json();
                alert(`Error: ${error.error || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error fetching item profit report:', error);
            alert('An error occurred while fetching the report. Please try again.');
        }
    }
    
    


    function renderItemProfitResults(data) {
        const resultsContainer = document.getElementById('itemProfitResults');
        const { product_profit_details, average_profit } = data;
    
        const table = `
            <h3>Item Profit Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Purchase Cost</th>
                        <th>Sale Cost</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    ${product_profit_details.map(detail => `
                        <tr>
                            <td>${detail.ProductID}</td>
                            <td>$${(detail.PurchaseCost ? parseFloat(detail.PurchaseCost).toFixed(2) : 'N/A')}</td>
                            <td>$${(detail.SaleCost ? parseFloat(detail.SaleCost).toFixed(2) : 'N/A')}</td>
                            <td>$${(detail.Profit ? parseFloat(detail.Profit).toFixed(2) : 'N/A')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <h3>Average Profit</h3>
            <p><strong>Previous Month:</strong> $${(average_profit[0]?.AvgMonth ? parseFloat(average_profit[0].AvgMonth).toFixed(2) : 'N/A')}</p>
            <p><strong>Previous Year:</strong> $${(average_profit[0]?.AvgYear ? parseFloat(average_profit[0].AvgYear).toFixed(2) : 'N/A')}</p>
        `;
    
        resultsContainer.innerHTML = table;
    }
    
    

    function renderInsertIndividualProductForm() {
        formsContainer.innerHTML = `
            <h2>Insert Serialized Product</h2>
            <form id="individualProductForm">
                <input type="text" name="ProductID" placeholder="Product ID" required>
                <input type="text" name="ProductTypeID" placeholder="Product Type ID" required>
                <input type="text" name="BatchID" placeholder="Batch ID" required>
                <button type="submit">Insert Product</button>
            </form>
            <div id="insertProductResult"></div>
        `;
    
        const form = document.getElementById('individualProductForm');
        form.addEventListener('submit', handleIndividualProductSubmit);
    }

    
    async function handleIndividualProductSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const productData = {};
    
        formData.forEach((value, key) => {
            productData[key] = value;
        });
    
        try {
            const response = await fetch('http://localhost:5000/api/insert-individual-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
    
            const resultContainer = document.getElementById('insertProductResult');
    
            if (response.ok) {
                const result = await response.json();
                resultContainer.innerHTML = `<p style="color: green;">${result.message || 'Product inserted successfully!'}</p>`;
                form.reset();
            } else {
                const error = await response.json();
                resultContainer.innerHTML = `<p style="color: red;">Error: ${error.error || 'An error occurred.'}</p>`;
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            const resultContainer = document.getElementById('insertProductResult');
            resultContainer.innerHTML = `<p style="color: red;">An error occurred while submitting the form. Please try again.</p>`;
        }
    }
    




});
