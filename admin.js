// ================= STORAGE KEYS (Same as Frontend) =================
const KEYS = {
    MENU: 'biryani_adda_menu',
    ORDERS: 'biryani_adda_orders',
    SETTINGS: 'biryani_adda_settings',
    CUSTOMERS: 'biryani_adda_customers',
    ADMIN: 'biryani_adda_admin',
    SESSION: 'biryani_adda_admin_session'
};

// ================= DEFAULT DATA =================
const DEFAULT_SETTINGS = {
    discountThreshold: 5,
    discountPercent: 10,
    discountActive: true,
    orderStartTime: '11:00',
    orderEndTime: '22:00',
    menuStartTime: '10:00',
    menuEndTime: '23:00',
    acceptOrders: true,
    maintenanceMode: false,
    upiId: 'biryaniadda@upi',
    upiQrImage: '',
    phone: '+91 98765 43210',
    googleSheetUrl: '',
    deliveryAreas: [
        { name: 'Sakchi', zone: 'nearby', charge: 0 },
        { name: 'Mango', zone: 'nearby', charge: 0 },
        { name: 'Kadma', zone: 'city', charge: 20 },
        { name: 'Sonari', zone: 'city', charge: 20 },
        { name: 'Bistupur', zone: 'outskirts', charge: 40 }
    ]
};

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123'
};


// ===== Loyalty Reward Levels =====

let rewardLevels = JSON.parse(localStorage.getItem('rewardLevels')) || [
    {
        spending: 1000,
        discount: 5
    },
    {
        spending: 3000,
        discount: 10
    },
    {
        spending: 7000,
        discount: 15
    }
];

// ================= INIT =================
function init() {
    // Initialize all storage if empty
    if (!localStorage.getItem(KEYS.MENU)) localStorage.setItem(KEYS.MENU, '[]');
    if (!localStorage.getItem(KEYS.ORDERS)) localStorage.setItem(KEYS.ORDERS, '[]');
    if (!localStorage.getItem(KEYS.SETTINGS)) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    if (!localStorage.getItem(KEYS.CUSTOMERS)) localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify({}));
    if (!localStorage.getItem(KEYS.ADMIN)) localStorage.setItem(KEYS.ADMIN, JSON.stringify(DEFAULT_ADMIN));

    checkSession();
    updateClock();
    loadSettings();
    setInterval(updateClock, 1000);
}

// ================= LOGIN / LOGOUT =================
function checkSession() {
    const session = JSON.parse(localStorage.getItem(KEYS.SESSION) || '{}');
    if (session.loggedIn && (Date.now() - session.timestamp < 86400000)) {
        showAdminPanel();
    }
}

const loginForm = document.getElementById('login-form');

if (loginForm) {

    loginForm.addEventListener('submit', function (e) {

        e.preventDefault();

        const username =
            document.getElementById('username').value.trim();

        const password =
            document.getElementById('password').value;

        const admin = JSON.parse(
            localStorage.getItem(KEYS.ADMIN) || '{}'
        );

        if (
            username === admin.username &&
            password === admin.password
        ) {

            localStorage.setItem(
                KEYS.SESSION,
                JSON.stringify({
                    loggedIn: true,
                    timestamp: Date.now()
                })
            );

            showAdminPanel();

        } else {

            document.getElementById('login-error').textContent =
                'Invalid username or password!';

        }

    });

}

function showAdminPanel() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'block';
    loadAllSections();
}

function logout() {
    localStorage.removeItem(KEYS.SESSION);
    location.reload();
}

// ================= NAVIGATION =================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.dataset.section;

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById('section-' + section).classList.add('active');

        const titles = {
            dashboard: '<i class="fas fa-chart-line"></i> Dashboard',
            menu: '<i class="fas fa-utensils"></i> Menu Management',
            orders: '<i class="fas fa-shopping-bag"></i> Orders',
            discount: '<i class="fas fa-percent"></i> Discount Settings',
            delivery: '<i class="fas fa-map-marker-alt"></i> Delivery Areas',
            timings: '<i class="fas fa-clock"></i> Timings',
            settings: '<i class="fas fa-cog"></i> Settings'
        };
        document.getElementById('page-title').innerHTML = titles[section];

        if (section === 'dashboard') updateDashboard();
        if (section === 'menu') renderMenuTable();
        if (section === 'orders') renderOrdersTable();
        if (section === 'discount') loadDiscountSettings();
        if (section === 'delivery') renderDeliveryAreas();
        if (section === 'timings') loadTimings();
        if (section === 'payment') loadSettings();
        if (section === 'settings') loadSettings();
    });
});

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

// ================= DASHBOARD =================
// ================= DASHBOARD =================

function updateDashboard() {

    const today = new Date();

    const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');

    const filter = document.getElementById('revenue-filter')?.value || 'today';

    let filteredOrders = [];

    if(filter === 'today'){

    if(filter === 'all'){
        filteredOrders = orders;
    }

        filteredOrders = orders.filter(order => {
            const d = new Date(order.time);
            return d.toDateString() === today.toDateString();
        });

    }

    else if(filter === 'yesterday'){

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        filteredOrders = orders.filter(order => {
            const d = new Date(order.time);
            return d.toDateString() === yesterday.toDateString();
        });

    }

    else if(filter === 'date'){

        const selectedDate = document.getElementById('single-date').value;

        filteredOrders = orders.filter(order => {

            const d = new Date(order.time);

            return d.toISOString().split('T')[0] === selectedDate;
        });

    }

    else if(filter === 'range'){

        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        filteredOrders = orders.filter(order => {

            const d = new Date(order.time);

            const orderDate = d.toISOString().split('T')[0];

            return orderDate >= startDate && orderDate <= endDate;

        });

    }

    const totalOrders = filteredOrders.length;

    const pendingOrders = filteredOrders.filter(o => o.status === 'Pending').length;

    const revenue = filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    const customers = new Set(filteredOrders.map(o => o.phone)).size;

    document.getElementById('stat-total-orders').textContent = totalOrders;

    document.getElementById('stat-pending-orders').textContent = pendingOrders;

    document.getElementById('stat-revenue').textContent = '₹' + revenue;

    document.getElementById('stat-customers').textContent = customers;

    const recentTable = document.getElementById('recent-orders-table');

    if(recentTable){

        recentTable.innerHTML = '';

        filteredOrders.slice().reverse().slice(0, 10).forEach(order => {

            recentTable.innerHTML += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${order.phone}</td>
                    <td>${order.area}</td>
                    <td>₹${order.total}</td>
                    <td>${order.discount || 0}</td>
                    <td>${order.status}</td>
                    <td>${timeAgo(order.time)}</td>
                </tr>
            `;

        });

    }

    document.getElementById('pending-badge').textContent = pendingOrders;

}


function timeAgo(isoString) {
    const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + ' min ago';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' hr ago';
    return Math.floor(hours / 24) + ' days ago';
}

// ================= MENU MANAGEMENT =================
function renderMenuTable() {
    const menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');
    const filterCat = document.getElementById('menu-filter-category').value;
    const search = document.getElementById('menu-search').value.toLowerCase();

    const filtered = menu.filter(item => {
        const matchCat = filterCat === 'all' || item.category === filterCat;
        const matchSearch = item.name.toLowerCase().includes(search);
        return matchCat && matchSearch;
    });

    const tbody = document.getElementById('menu-table-body');
    tbody.innerHTML = '';

    filtered.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${item.image || 'https://via.placeholder.com/50?text=No+Image'}" class="table-img" alt="${item.name}"></td>
            <td>
                <strong>${item.name}</strong>
                ${item.isBestseller ? '<br><span style="color:var(--gold);font-size:0.75rem">🔥 Bestseller</span>' : ''}
                <br><small style="color:var(--gray)">${item.description || ''}</small>
            </td>
            <td><span class="status-badge" style="background:rgba(212,175,55,0.15);color:var(--gold)">${item.categoryName || item.category}</span></td>
            <td>
                <strong>₹${item.price}</strong>
                ${item.oldPrice ? '<br><small style="text-decoration:line-through;color:var(--gray)">₹' + item.oldPrice + '</small>' : ''}
            </td>
            <td class="${item.inStock ? 'stock-yes' : 'stock-no'}">
                <label class="switch" style="transform:scale(0.8);vertical-align:middle;margin-right:6px;">
                    <input type="checkbox" ${item.inStock ? 'checked' : ''} onchange="toggleStock(${item.id})">
                    <span class="slider round"></span>
                </label>
                ${item.inStock ? 'Yes' : 'No'}
            </td>
            <td>
                <button class="btn-sm btn-edit" onclick="editMenuItem(${item.id})" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn-sm btn-delete" onclick="deleteMenuItem(${item.id})" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function toggleStock(id) {
    const menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');
    const item = menu.find(m => m.id === id);
    if (item) {
        item.inStock = !item.inStock;
        localStorage.setItem(KEYS.MENU, JSON.stringify(menu));
        renderMenuTable();
        showToast(`${item.name} stock ${item.inStock ? 'enabled' : 'disabled'}`);
    }
}

function openMenuModal(id = null) {
    const modal = document.getElementById('menu-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('menu-form');

    if (id) {
        const menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');
        const item = menu.find(m => m.id === id);
        if (item) {
            title.innerHTML = '<i class="fas fa-edit"></i> Edit Menu Item';
            document.getElementById('menu-item-id').value = item.id;
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-category').value = item.category;
            document.getElementById('item-price').value = item.price;
            document.getElementById('item-old-price').value = item.oldPrice || '';
            document.getElementById('item-image').value = item.image || '';
            document.getElementById('item-description').value = item.description || '';
            document.getElementById('item-tags').value = (item.tags || []).join(', ');
            document.getElementById('item-in-stock').checked = item.inStock;
            document.getElementById('item-bestseller').checked = item.isBestseller || false;
        }
    } else {
        title.innerHTML = '<i class="fas fa-plus"></i> Add Menu Item';
        form.reset();
        document.getElementById('menu-item-id').value = '';
        document.getElementById('item-in-stock').checked = true;
        document.getElementById('item-bestseller').checked = false;
    }

    modal.classList.add('active');
}

function closeMenuModal() {
    document.getElementById('menu-modal').classList.remove('active');
}

function saveMenuItem(e) {
    e.preventDefault();
    const id = document.getElementById('menu-item-id').value;
    let menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');

    const tagsStr = document.getElementById('item-tags').value;
    const categorySelect = document.getElementById('item-category');
    const categoryName = categorySelect.options[categorySelect.selectedIndex].text;

    const itemData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('item-name').value,
        category: document.getElementById('item-category').value,
        categoryName: categoryName,
        price: parseInt(document.getElementById('item-price').value),
        oldPrice: parseInt(document.getElementById('item-old-price').value) || null,
        image: document.getElementById('item-image').value,
        description: document.getElementById('item-description').value,
        inStock: document.getElementById('item-in-stock').checked,
        isBestseller: document.getElementById('item-bestseller').checked,
        tags: tagsStr ? tagsStr.split(',').map(t => t.trim()) : []
    };

    if (id) {
        const idx = menu.findIndex(m => m.id === parseInt(id));
        if (idx !== -1) menu[idx] = itemData;
        showToast('Menu item updated!');
    } else {
        menu.push(itemData);
        showToast('New item added to menu!');
    }

    localStorage.setItem(KEYS.MENU, JSON.stringify(menu));
    closeMenuModal();
    renderMenuTable();
    updateDashboard();
}

function editMenuItem(id) {
    openMenuModal(id);
}

function deleteMenuItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    let menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');
    menu = menu.filter(m => m.id !== id);
    localStorage.setItem(KEYS.MENU, JSON.stringify(menu));
    renderMenuTable();
    updateDashboard();
    showToast('Item deleted');
}

// ================= ORDERS =================
async function renderOrdersTable() {
    const snapshot = await window.getDocs(
    window.collection(window.db, "orders")
);

const orders = [];

snapshot.forEach((docSnap) => {

    const order = docSnap.data();

    order.firebaseId = docSnap.id;

    orders.push(order);

});
    const filterStatus = document.getElementById('order-status-filter').value;

    const filtered = filterStatus === 'all'
        ? orders
        : orders.filter(o => o.status === filterStatus);

    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';

    filtered.forEach(order => {
        const itemsSummary = order.items.map(i => `${i.name} x${i.qty}`).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong style="color:var(--gold)">${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.phone}</td>
            <td>${order.area}</td>
            <td><small style="color:var(--gray)">${itemsSummary.substring(0, 35)}${itemsSummary.length > 35 ? '...' : ''}</small></td>
            <td><strong>₹${order.total}</strong></td>
            <td>${order.discount > 0 ? '<span style="color:var(--green)">-₹' + order.discount + ' (' + order.discountPercent + '%)</span>' : '-'}</td>
            <td>${order.payment}</td>
            <td>
                <select onchange="updateOrderStatus('${order.firebaseId}', this.value)" style="background:var(--black-lighter);color:var(--white);border:1px solid var(--gray-dark);padding:4px 8px;border-radius:4px;font-size:0.85rem;">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Accepted" ${order.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                ${order.lat ? `<a href="https://www.google.com/maps?q=${order.lat},${order.lng}" target="_blank" style="color:var(--gold);"><i class="fas fa-map-marker-alt"></i></a>` : '-'}
            </td>
            <td>
                <button class="btn-sm btn-view" onclick="viewOrder('${order.firebaseId}')" title="View"><i class="fas fa-eye"></i></button>
                <button class="btn-sm btn-delete" onclick="deleteOrder('${order.firebaseId}')" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


function viewOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const content = document.getElementById('order-detail-content');
    const itemsHtml = order.items.map(item => `
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-dark);">
            <span>${item.name} <small style="color:var(--gray)">x${item.qty}</small></span>
            <span>₹${item.price * item.qty}</span>
        </div>
    `).join('');

    content.innerHTML = `
        <div style="padding:20px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px;">
                <div><label style="color:var(--gold);font-size:0.85rem;">Customer</label><p style="margin-top:4px;">${order.customer}</p></div>
                <div><label style="color:var(--gold);font-size:0.85rem;">Phone</label><p style="margin-top:4px;">${order.phone}</p></div>
                <div><label style="color:var(--gold);font-size:0.85rem;">Address</label><p style="margin-top:4px;">${order.address}</p></div>
                <div><label style="color:var(--gold);font-size:0.85rem;">Area</label><p style="margin-top:4px;">${order.area}</p></div>
                <div><label style="color:var(--gold);font-size:0.85rem;">Payment</label><p style="margin-top:4px;">${order.payment}</p></div>
                <div><label style="color:var(--gold);font-size:0.85rem;">Time</label><p style="margin-top:4px;">${new Date(order.time).toLocaleString('en-IN')}</p></div>
            </div>
            ${order.lat ? `<div style="margin-bottom:20px;"><a href="https://www.google.com/maps?q=${order.lat},${order.lng}" target="_blank" style="color:var(--gold);"><i class="fas fa-map"></i> View Customer Location on Google Maps</a></div>` : ''}
        </div>
        <div style="padding:0 20px;">${itemsHtml}</div>
        <div style="padding:20px;background:var(--black-lighter);margin:0 20px 20px;border-radius:10px;">
            <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Subtotal</span><span>₹${order.subtotal}</span></div>
            ${order.discount > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;color:var(--green);"><span>Discount (${order.discountPercent}%)</span><span>-₹${order.discount}</span></div>` : ''}
            ${order.deliveryCharge > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Delivery</span><span>₹${order.deliveryCharge}</span></div>` : ''}
            <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>GST (5%)</span><span>₹${order.gst}</span></div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid var(--gold);margin-top:8px;font-weight:700;color:var(--gold);font-size:1.1rem;">
                <span>Grand Total</span><span>₹${order.total}</span>
            </div>
        </div>
        <div style="padding:0 20px 20px;">
            <label style="color:var(--gold);margin-bottom:10px;display:block;">Update Status</label>
            <select onchange="updateOrderStatus('${order.id}', this.value); closeOrderModal();" style="padding:10px;background:var(--black-lighter);border:1px solid var(--gray-dark);color:var(--white);border-radius:6px;width:100%;">
                <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Accepted" ${order.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                <option value="Out for Delivery" ${order.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
        </div>
    `;

    document.getElementById('order-modal').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('order-modal').classList.remove('active');
}

async function updateOrderStatus(orderId, newStatus) {
const settings = JSON.parse(
    localStorage.getItem(KEYS.SETTINGS) || '{}'
);
await window.updateDoc(
    window.doc(
        window.db,
        "orders",
        orderId
    ),
    {
        status: newStatus
    }
);
console.log(
    "Status Updated In Firebase"
);


    // Google Sheet Status Update
    if(settings.googleSheetUrl){

        fetch(settings.googleSheetUrl, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
    action: 'status_update',
    orderId: orderId,
    status: newStatus
})

        }).catch(err => console.error(err));

    }

    renderOrdersTable();

    updateDashboard();

    showToast(
        'Order status updated to ' + newStatus
    );
}

function deleteOrder(orderId) {
    if (!confirm('Delete this order permanently?')) return;
    let orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    renderOrdersTable();
    updateDashboard();
    showToast('Order deleted');
}

function clearAllOrders() {
    if (!confirm('WARNING: This will delete ALL orders. Continue?')) return;
    localStorage.setItem(KEYS.ORDERS, '[]');
    renderOrdersTable();
    updateDashboard();
    showToast('All orders cleared');
}

// ================= DISCOUNT SETTINGS =================
function loadDiscountSettings() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    document.getElementById('discount-threshold').value = settings.discountThreshold || 5;
    document.getElementById('discount-percent').value = settings.discountPercent || 10;
    document.getElementById('discount-active').checked = settings.discountActive !== false;
    document.getElementById('discount-status-text').textContent = settings.discountActive !== false ? 'Active' : 'Inactive';
    document.getElementById('info-threshold').textContent = settings.discountThreshold || 5;
    document.getElementById('info-percent').textContent = (settings.discountPercent || 10) + '%';
}

function saveDiscountSettings() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    settings.discountThreshold = parseInt(document.getElementById('discount-threshold').value) || 5;
    settings.discountPercent = parseInt(document.getElementById('discount-percent').value) || 10;
    settings.discountActive = document.getElementById('discount-active').checked;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    showToast('Discount settings saved!');
    loadDiscountSettings();
}

document.getElementById('discount-active')?.addEventListener('change', function() {
    document.getElementById('discount-status-text').textContent = this.checked ? 'Active' : 'Inactive';
});

// ================= DELIVERY AREAS =================
function renderDeliveryAreas() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    const areas = settings.deliveryAreas || [];
    const container = document.getElementById('delivery-areas-list');
    container.innerHTML = '';

    // Group by zone
    const zones = {};
    areas.forEach(area => {
        if (!zones[area.zone]) zones[area.zone] = [];
        zones[area.zone].push(area);
    });

    const zoneLabels = {
        nearby: { icon: '🏠', label: 'Nearby', color: 'var(--green)' },
        city: { icon: '🏢', label: 'City Center', color: 'var(--orange)' },
        outskirts: { icon: '🛣️', label: 'Outskirts', color: 'var(--red)' }
    };

    for (const [zone, zoneAreas] of Object.entries(zones)) {
        const meta = zoneLabels[zone] || { icon: '📍', label: zone, color: 'var(--gray)' };
        
        const zoneDiv = document.createElement('div');
        zoneDiv.style.marginBottom = '20px';
        zoneDiv.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;padding:10px;background:var(--black-lighter);border-radius:8px;">
                <span style="font-size:1.2rem;">${meta.icon}</span>
                <span style="font-weight:600;color:${meta.color};">${meta.label}</span>
                <span style="margin-left:auto;color:var(--gray);font-size:0.85rem;">${zoneAreas.length} areas</span>
            </div>
        `;

        const areasGrid = document.createElement('div');
        areasGrid.className = 'area-grid';

        zoneAreas.forEach(area => {
            const div = document.createElement('div');
            div.className = 'area-card';
            div.innerHTML = `
                <h4><i class="fas fa-map-pin" style="color:var(--gold);margin-right:8px;"></i> ${area.name}</h4>
                <button onclick="removeDeliveryArea('${area.name}')" title="Remove area"><i class="fas fa-times"></i></button>
            `;
            areasGrid.appendChild(div);
        });

        zoneDiv.appendChild(areasGrid);
        container.appendChild(zoneDiv);
    }

    // Add new area form
    const addDiv = document.createElement('div');
    addDiv.style.marginTop = '20px';
    addDiv.style.padding = '20px';
    addDiv.style.background = 'var(--black-lighter)';
    addDiv.style.borderRadius = '12px';
    addDiv.style.border = '1px dashed var(--gray-dark)';
    addDiv.innerHTML = `
        <h4 style="color:var(--gold);margin-bottom:12px;"><i class="fas fa-plus-circle"></i> Add New Area</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:10px;align-items:end;">
            <div class="form-group" style="margin:0;">
                <label style="font-size:0.8rem;">Area Name</label>
                <input type="text" id="new-area-name" placeholder="e.g. Bistupur" style="padding:10px;background:var(--black);border:1px solid var(--gray-dark);border-radius:8px;color:var(--white);width:100%;">
            </div>
            <div class="form-group" style="margin:0;">
                <label style="font-size:0.8rem;">Zone</label>
                <select id="new-area-zone" style="padding:10px;background:var(--black);border:1px solid var(--gray-dark);border-radius:8px;color:var(--white);width:100%;">
                    <option value="nearby">Nearby (Free)</option>
                    <option value="city">City Center (₹20)</option>
                    <option value="outskirts">Outskirts (₹40)</option>
                </select>
            </div>
            <div class="form-group" style="margin:0;">
                <label style="font-size:0.8rem;">Delivery Charge (₹)</label>
                <input type="number" id="new-area-charge" value="0" min="0" style="padding:10px;background:var(--black);border:1px solid var(--gray-dark);border-radius:8px;color:var(--white);width:100%;">
            </div>
            <button class="btn-gold" onclick="saveNewArea()" style="padding:10px 20px;"><i class="fas fa-plus"></i> Add</button>
        </div>
    `;
    container.appendChild(addDiv);
}

function saveNewArea() {
    const name = document.getElementById('new-area-name').value.trim();
    const zone = document.getElementById('new-area-zone').value;
    const charge = parseInt(document.getElementById('new-area-charge').value) || 0;

    if (!name) { showToast('Enter area name'); return; }

    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    settings.deliveryAreas = settings.deliveryAreas || [];

    if (settings.deliveryAreas.find(a => a.name.toLowerCase() === name.toLowerCase())) {
        showToast('Area already exists!');
        return;
    }

    settings.deliveryAreas.push({ name, zone, charge });
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    renderDeliveryAreas();
    showToast(`Area "${name}" added`);
}

function addDeliveryArea() {
    document.getElementById('new-area-name')?.focus();
    showToast('Fill the form below to add new area');
}

function removeDeliveryArea(areaName) {
    if (!confirm(`Remove "${areaName}" from delivery areas?`)) return;
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    settings.deliveryAreas = settings.deliveryAreas.filter(a => a.name !== areaName);
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    renderDeliveryAreas();
    showToast('Area removed');
}

// ================= TIMINGS =================
function loadTimings() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    document.getElementById('order-start-time').value = settings.orderStartTime || '11:00';
    document.getElementById('order-end-time').value = settings.orderEndTime || '22:00';
    document.getElementById('menu-start-time').value = settings.menuStartTime || '10:00';
    document.getElementById('menu-end-time').value = settings.menuEndTime || '23:00';
}

function saveTimings() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    settings.orderStartTime = document.getElementById('order-start-time').value;
    settings.orderEndTime = document.getElementById('order-end-time').value;
    settings.menuStartTime = document.getElementById('menu-start-time').value;
    settings.menuEndTime = document.getElementById('menu-end-time').value;
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    showToast('Timings saved! Frontend will update automatically.');
}

// ================= SETTINGS (Payment + Admin + Google Sheets) =================
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN) || '{}');

    // Payment settings
    document.getElementById('upi-id').value = settings.upiId || 'biryaniadda@upi';
    document.getElementById('sheet-url').value = settings.googleSheetUrl || '';
    
    // QR preview
    const qrPreview = document.getElementById('qrPreview');

if (settings.upiQrImage) {

    document.getElementById('qrPreviewBox').style.display = 'block';

    document.getElementById('qrPreview').src =
        settings.upiQrImage;

}

    // Admin credentials
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
}

function savePaymentSettings() {

    const settings = JSON.parse(
        localStorage.getItem(KEYS.SETTINGS) || '{}'
    );

    settings.upiId =
        document.getElementById('upi-id').value.trim();

    settings.googleSheetUrl =
        document.getElementById('sheet-url').value.trim();

    const qrImg =
        document.getElementById('qrPreview');

    if (qrImg && qrImg.src) {
        settings.upiQrImage = qrImg.src;
    }

    localStorage.setItem(
        KEYS.SETTINGS,
        JSON.stringify(settings)
    );

    showToast('Payment settings saved!');
}

function previewQR(input) {

    const file = input.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        document.getElementById('qrPreview').src =
        e.target.result;

        document.getElementById('qrPreviewBox')
            .style.display = 'block';

        const settings = JSON.parse(
            localStorage.getItem(KEYS.SETTINGS) || '{}'
        );

        settings.upiQrImage = e.target.result;

        localStorage.setItem(
            KEYS.SETTINGS,
            JSON.stringify(settings)
        );
    };

    reader.readAsDataURL(file);
}

function removeQR() {

    const settings = JSON.parse(
        localStorage.getItem(KEYS.SETTINGS) || '{}'
    );

    settings.upiQrImage = '';

    localStorage.setItem(
        KEYS.SETTINGS,
        JSON.stringify(settings)
    );

    document.getElementById('qrPreviewBox')
        .style.display = 'none';

    document.getElementById('qr-upload').value = '';
}

function changeAdminPassword() {
    const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN) || '{}');
    const currentPass = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (!currentPass || !newPass || !confirmPass) {
        showToast('Fill all password fields');
        return;
    }

    if (currentPass !== admin.password) {
        showToast('Current password is wrong!');
        return;
    }

    if (newPass !== confirmPass) {
        showToast('New passwords do not match!');
        return;
    }

    if (newPass.length < 4) {
        showToast('Password must be at least 4 characters');
        return;
    }

    admin.password = newPass;
    localStorage.setItem(KEYS.ADMIN, JSON.stringify(admin));
    
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    showToast('Admin password changed successfully!');
}

function changeAdminUsername() {
    const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN) || '{}');
    const newUsername = document.getElementById('admin-username').value.trim();
    
    if (!newUsername) {
        showToast('Username cannot be empty');
        return;
    }

    admin.username = newUsername;
    localStorage.setItem(KEYS.ADMIN, JSON.stringify(admin));
    showToast('Username updated!');
}

function saveSheetUrl() {

    const settings = JSON.parse(
        localStorage.getItem(KEYS.SETTINGS) || '{}'
    );

    settings.googleSheetUrl =
        document.getElementById('sheet-url').value.trim();

    localStorage.setItem(
        KEYS.SETTINGS,
        JSON.stringify(settings)
    );

    showToast('Google Sheet URL Saved Successfully!');

}

// ================= UTILITIES =================
function showToast(message) {

    const toast = document.getElementById('toast');

    if(!toast){
        console.log(message);
        return;
    }

    toast.textContent = message;

    toast.classList.add('show');

    setTimeout(() => {

        toast.classList.remove('show');

    }, 3000);

}
// Close modals on outside click
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
}

// ================= START =================
init();

const revenueFilter = document.getElementById("revenue-filter");

if (revenueFilter) {

    revenueFilter.addEventListener("change", function () {

        handleRevenueFilterUI();

        updateDashboard();

    });

}

document.getElementById("single-date")?.addEventListener("change", updateDashboard);

document.getElementById("start-date")?.addEventListener("change", updateDashboard);

document.getElementById("end-date")?.addEventListener("change", updateDashboard);

// ================= REVENUE FILTER UI =================

function handleRevenueFilterUI() {

    const filter = document.getElementById("revenue-filter").value;

    const singleDate = document.getElementById("single-date");

    const rangeBox = document.getElementById("date-range-box");

    // sab hide
    singleDate.style.display = "none";
    rangeBox.style.display = "none";

    // single date
    if(filter === "date"){
        singleDate.style.display = "block";
    }

    // date range
    if(filter === "range"){
        rangeBox.style.display = "flex";
    }
}

// ================= FILTER INIT =================

document.addEventListener('DOMContentLoaded', () => {

    handleRevenueFilterUI();

    updateDashboard();

});

// ===== REWARD SYSTEM =====

function renderRewardLevels() {

    const container = document.getElementById('reward-levels-list');

    if (!container) return;

    container.innerHTML = '';

    rewardLevels.forEach((reward, index) => {

        container.innerHTML += `
        
        <div class="reward-level-card">

            <div class="reward-level-grid">

                <div>
                    <label>Minimum Spending (₹)</label>
                    <input 
                        type="number" 
                        value="${reward.spending}"
                        onchange="updateRewardSpending(${index}, this.value)"
                    >
                </div>

                <div>
                    <label>Discount Percentage (%)</label>
                    <input 
                        type="number"
                        value="${reward.discount}"
                        onchange="updateRewardDiscount(${index}, this.value)"
                    >
                </div>

                <button 
                    class="btn-outline reward-delete-btn"
                    onclick="deleteRewardLevel(${index})"
                >
                    <i class="fas fa-trash"></i>
                </button>

            </div>

        </div>
        
        `;
    });
}

function addRewardLevel() {

    rewardLevels.push({
        spending: 1000,
        discount: 5
    });

    renderRewardLevels();
}

function deleteRewardLevel(index) {

    rewardLevels.splice(index, 1);

    renderRewardLevels();
}

function updateRewardSpending(index, value) {

    rewardLevels[index].spending = Number(value);
}

function updateRewardDiscount(index, value) {

    rewardLevels[index].discount = Number(value);
}

function saveRewardLevels() {

    rewardLevels.sort((a, b) => a.spending - b.spending);

    localStorage.setItem(
        'rewardLevels',
        JSON.stringify(rewardLevels)
    );

    showToast('Reward settings saved');
}
