// ================= STORAGE KEYS =================
const KEYS = {
    MENU: 'biryani_adda_menu',
    CART: 'biryani_adda_cart',
    ORDERS: 'biryani_adda_orders',
    SETTINGS: 'biryani_adda_settings',
    CUSTOMERS: 'biryani_adda_customers',
    ADMIN: 'biryani_adda_admin'
};

// ================= DEFAULT DATA =================
const DEFAULT_MENU = [
    { id:1, name:'Half Chicken Biryani', category:'biryani', categoryName:'Signature Biryani', price:69, oldPrice:null, image:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', description:'Fragrant basmati rice layered with tender chicken pieces, slow-cooked with royal Hyderabadi spices.', inStock:true, isBestseller:true, tags:['🌶️ Medium Spicy','⚡ 30 min'] },
    { id:2, name:'Full Chicken Biryani', category:'biryani', categoryName:'Signature Biryani', price:119, oldPrice:149, image:'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400', description:'Double portion of our signature biryani. Perfect for 2 people.', inStock:true, isBestseller:false, tags:['🌶️ Medium Spicy','👥 Serves 2'] },
    { id:3, name:'Mutton Biryani', category:'biryani', categoryName:'Signature Biryani', price:149, oldPrice:null, image:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400', description:'Succulent mutton chunks marinated overnight, dum-cooked with saffron-infused basmati rice.', inStock:true, isBestseller:false, tags:['🌶️ Spicy','⭐ Chef\'s Choice'] },
    { id:4, name:'Veg Dum Biryani', category:'biryani', categoryName:'Signature Biryani', price:89, oldPrice:null, image:'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', description:'Fresh seasonal vegetables dum-cooked with saffron-infused basmati rice.', inStock:true, isBestseller:false, tags:['🌿 Pure Veg','🌶️ Mild'] },
    { id:5, name:'Chicken Tikka Kebab', category:'kebab', categoryName:'Kebabs & Starters', price:99, oldPrice:null, image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', description:'Boneless chicken chunks marinated in tandoori masala, grilled to perfection.', inStock:true, isBestseller:false, tags:['🔥 Grilled','8 Pcs'] },
    { id:6, name:'Mutton Seekh Kebab', category:'kebab', categoryName:'Kebabs & Starters', price:129, oldPrice:null, image:'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400', description:'Minced mutton mixed with aromatic spices, skewered and grilled.', inStock:true, isBestseller:false, tags:['🔥 Grilled','6 Pcs'] },
    { id:7, name:'Butter Naan (2 Pcs)', category:'bread', categoryName:'Rice & Bread', price:49, oldPrice:null, image:'https://images.unsplash.com/photo-1615194628288-27c06b2e5a46?w=400', description:'Soft, fluffy tandoor-baked naan brushed with melted butter.', inStock:true, isBestseller:false, tags:['🧈 Butter','🍞 Tandoor'] },
    { id:8, name:'Rumali Roti (2 Pcs)', category:'bread', categoryName:'Rice & Bread', price:39, oldPrice:null, image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', description:'Paper-thin soft roti, hand-tossed and cooked on an inverted tawa.', inStock:true, isBestseller:false, tags:['🍞 Thin','Soft'] },
    { id:9, name:'Butter Chicken Masala', category:'curry', categoryName:'Curries & Gravies', price:159, oldPrice:null, image:'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400', description:'Creamy tomato-based gravy with tender chicken tikka pieces.', inStock:true, isBestseller:false, tags:['🧈 Creamy','🌶️ Mild'] },
    { id:10, name:'Cold Drink 500ml', category:'drink', categoryName:'Drinks', price:40, oldPrice:null, image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', description:'Chilled Coca-Cola, Sprite, or Fanta.', inStock:true, isBestseller:false, tags:['🥤 500ml','❄️ Chilled'] },
    { id:11, name:'Sweet Lassi', category:'drink', categoryName:'Drinks', price:55, oldPrice:null, image:'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400', description:'Thick, creamy yogurt-based drink sweetened with rose syrup.', inStock:true, isBestseller:false, tags:['🥛 Yogurt','🌹 Rose'] },
    { id:12, name:'Double Ka Meetha', category:'dessert', categoryName:'Desserts', price:59, oldPrice:null, image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', description:'Hyderabadi special bread pudding with dry fruits and rabri.', inStock:true, isBestseller:false, tags:['🍰 Sweet','🥜 Nuts'] },
    { id:13, name:'Matka Kulfi', category:'dessert', categoryName:'Desserts', price:45, oldPrice:null, image:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', description:'Traditional Indian ice cream slow-frozen in earthen pots.', inStock:true, isBestseller:false, tags:['🍦 Frozen','🌰 Pistachio'] },
    { id:14, name:'Family Feast Combo', category:'combo', categoryName:'Combos & Offers', price:299, oldPrice:349, image:'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400', description:'1 Full Chicken Biryani + 1 Mutton Biryani + 4 Naan + 2 Drinks + 2 Desserts.', inStock:true, isBestseller:true, tags:['👨‍👩‍👧‍👦 Family','💰 Save ₹50'] },
    { id:15, name:'Couple\'s Special', category:'combo', categoryName:'Combos & Offers', price:169, oldPrice:199, image:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', description:'1 Full Chicken Biryani + 2 Kebabs + 2 Naan + 2 Drinks.', inStock:true, isBestseller:false, tags:['💑 Couple','💰 Save ₹30'] }
];

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
    phone: '+91 98765 43210',
    googleSheetUrl: '',
    deliveryAreas: [
        { name: 'Old City', zone: 'nearby', charge: 0 },
        { name: 'Market Area', zone: 'nearby', charge: 0 },
        { name: 'Station Road', zone: 'nearby', charge: 0 },
        { name: 'Main Bazaar', zone: 'nearby', charge: 0 },
        { name: 'New City', zone: 'city', charge: 20 },
        { name: 'College Road', zone: 'city', charge: 20 },
        { name: 'Bus Stand Area', zone: 'city', charge: 20 },
        { name: 'Hospital Road', zone: 'city', charge: 20 },
        { name: 'Industrial Area', zone: 'outskirts', charge: 40 },
        { name: 'Outer Ring Road', zone: 'outskirts', charge: 40 }
    ]
};

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123'
};

// ================= INIT =================
function init() {
    if (!localStorage.getItem(KEYS.MENU)) localStorage.setItem(KEYS.MENU, JSON.stringify(DEFAULT_MENU));
    if (!localStorage.getItem(KEYS.SETTINGS)) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    if (!localStorage.getItem(KEYS.CART)) localStorage.setItem(KEYS.CART, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.ORDERS)) localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.CUSTOMERS)) localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify({}));
    if (!localStorage.getItem(KEYS.ADMIN)) localStorage.setItem(KEYS.ADMIN, JSON.stringify(DEFAULT_ADMIN));

    checkStoreStatus();
    renderMenu('all');
    updateCartUI();
    setupEventListeners();
}

// ================= TIME-BASED STORE STATUS =================
function checkStoreStatus() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    const banner = document.getElementById('storeBanner');
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Maintenance mode check
    if (settings.maintenanceMode) {
        showBanner('🔧 Website under maintenance. Orders temporarily disabled.', '#ef4444');
        return;
    }

    // Parse times
    const parseTime = (t) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const orderStart = parseTime(settings.orderStartTime || '11:00');
    const orderEnd = parseTime(settings.orderEndTime || '22:00');
    const menuStart = parseTime(settings.menuStartTime || '10:00');
    const menuEnd = parseTime(settings.menuEndTime || '23:00');

    // Check if within menu time
    const inMenuTime = currentMinutes >= menuStart && currentMinutes <= menuEnd;
    // Check if within order time
    const inOrderTime = currentMinutes >= orderStart && currentMinutes <= orderEnd;

    if (!inMenuTime) {
        showBanner(`⏰ We are closed. Menu available from ${settings.menuStartTime || '10:00'} to ${settings.menuEndTime || '23:00'}`, '#f59e0b');
        return;
    }

    if (!settings.acceptOrders) {
        showBanner('⏸️ We are currently not accepting new orders.', '#f59e0b');
        return;
    }

    if (!inOrderTime) {
        showBanner(`⏰ Ordering closed. Order time: ${settings.orderStartTime || '11:00'} - ${settings.orderEndTime || '22:00'}. You can browse the menu.`, '#3b82f6');
        return;
    }

    banner.style.display = 'none';
}

function showBanner(text, bgColor) {
    const banner = document.getElementById('storeBanner');
    banner.style.display = 'block';
    banner.style.background = bgColor;
    banner.textContent = text;
}

function canPlaceOrder() {
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const parseTime = (t) => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const orderStart = parseTime(settings.orderStartTime || '11:00');
    const orderEnd = parseTime(settings.orderEndTime || '22:00');

    if (settings.maintenanceMode) return false;
    if (!settings.acceptOrders) return false;
    if (currentMinutes < orderStart || currentMinutes > orderEnd) return false;
    return true;
}

// ================= MENU RENDERING =================
function renderMenu(category) {
    const menu = JSON.parse(localStorage.getItem(KEYS.MENU) || '[]');
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';

    const filtered = category === 'all' ? menu : menu.filter(i => i.category === category);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card' + (item.inStock ? '' : ' out-of-stock');
        card.dataset.category = item.category;

        const badgeHtml = item.isBestseller ? '<div class="menu-card-badge bestseller">🔥 Bestseller</div>' :
                           item.category === 'biryani' && item.name.includes('Veg') ? '<div class="menu-card-badge veg">🌿 Veg</div>' :
                           item.category === 'combo' ? '<div class="menu-card-badge bestseller">🎁 Combo</div>' : '';

        const priceHtml = item.oldPrice
            ? `<span class="menu-price"><span class="original">₹${item.oldPrice}</span>₹${item.price}</span>`
            : `<span class="menu-price">₹${item.price}</span>`;

        const tagsHtml = (item.tags || []).map(t => `<span class="meta-tag">${t}</span>`).join('');

        card.innerHTML = `
            ${badgeHtml}
            <div class="menu-img-wrap">
                <img src="${item.image}" class="menu-img" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                <div class="menu-img-overlay"></div>
            </div>
            <div class="menu-body">
                <div class="menu-header">
                    <span class="menu-title">${item.name}</span>
                    ${priceHtml}
                </div>
                <p class="menu-desc">${item.description}</p>
                <div class="menu-footer">
                    <div class="menu-meta">${tagsHtml}</div>
                    <div class="qty-add-group">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="changeMenuQty(${item.id}, -1)">−</button>
                            <span class="qty-value" id="mqty-${item.id}">1</span>
                            <button class="qty-btn" onclick="changeMenuQty(${item.id}, 1)">+</button>
                        </div>
                        <button class="add-btn" id="add-${item.id}" onclick="addToCart(${item.id})" ${!item.inStock ? 'disabled' : ''}>
                            ${item.inStock ? 'Add' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function changeMenuQty(id, delta) {
    const el = document.getElementById(`mqty-${id}`);
    let val = parseInt(el.textContent) + delta;
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    el.textContent = val;
}

// ================= CART SYSTEM =================
function addToCart(id) {
    if (!canPlaceOrder()) {
        showToast('Orders are currently closed. Please check order timings.');
        return;
    }

    const menu = JSON.parse(localStorage.getItem(KEYS.MENU));
    const item = menu.find(i => i.id === id);
    if (!item || !item.inStock) { showToast('Item out of stock'); return; }

    const qty = parseInt(document.getElementById(`mqty-${id}`).textContent);
    let cart = JSON.parse(localStorage.getItem(KEYS.CART));

    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, qty: qty });
    }

    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    updateCartUI();
    showToast(`${item.name} added to cart`);

    document.getElementById(`mqty-${id}`).textContent = '1';
    const btn = document.getElementById(`add-${id}`);
    if (btn) {
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => { btn.textContent = 'Add'; btn.classList.remove('added'); }, 1500);
    }
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem(KEYS.CART) || '[]');
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    const badge = document.getElementById('cartCount');

    badge.textContent = cart.reduce((sum, c) => sum + c.qty, 0);

    if (!cart.length) {
        body.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <small style="color:var(--text-muted)">Add items from the menu</small>
            </div>`;
        footer.style.display = 'none';
        return;
    }

    let html = '';
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'"></div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${itemTotal}</div>
                    <div class="cart-item-actions">
                        <div class="cart-qty">
                            <button onclick="changeCartQty(${item.id}, -1)">−</button>
                            <span>${item.qty}</span>
                            <button onclick="changeCartQty(${item.id}, 1)">+</button>
                        </div>
                        <div class="cart-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></div>
                    </div>
                </div>
            </div>`;
    });

    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS));
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    
    // Check discount based on phone if entered
    let discount = 0;
    const phone = document.getElementById('chkPhone')?.value || '';
    if (phone && settings.discountActive) {
        const customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '{}');
        if (customers[phone] && customers[phone].orders >= settings.discountThreshold) {
            discount = Math.round(subtotal * settings.discountPercent / 100);
        }
    }

    const delivery = 0; // Will be calculated at checkout based on area
    const total = subtotal + gst - discount;

    document.getElementById('cartSubtotal').textContent = '₹' + subtotal.toFixed(2);
    document.getElementById('cartDelivery').textContent = 'Calculated at checkout';
    document.getElementById('cartGST').textContent = '₹' + gst.toFixed(2);
    document.getElementById('cartTotal').textContent = '₹' + total.toFixed(2);

    const discRow = document.getElementById('discountRow');
    if (discount > 0) {
        discRow.style.display = 'flex';
        document.getElementById('discountPercentDisplay').textContent = settings.discountPercent;
        document.getElementById('cartDiscount').textContent = '-₹' + discount.toFixed(2);
    } else {
        discRow.style.display = 'none';
    }

    body.innerHTML = html;
    footer.style.display = 'block';
}

function changeCartQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem(KEYS.CART));
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty < 1) item.qty = 1;
    if (item.qty > 10) item.qty = 10;
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem(KEYS.CART));
    cart = cart.filter(c => c.id !== id);
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
    updateCartUI();
    showToast('Item removed from cart');
}

function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('open');
    document.getElementById('cartDrawer').classList.toggle('open');
    const isOpen = document.getElementById('cartDrawer').classList.contains('open');
    document.body.style.overflow =
    isOpen ? 'hidden' : 'auto';

document.documentElement.style.overflow =
    isOpen ? 'hidden' : 'auto';
}

// ================= DISCOUNT CHECK =================
function checkDiscountOnPhone() {
    const phone = document.getElementById('chkPhone').value.trim();
    const msg = document.getElementById('discountMsg');
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');

    if (phone.length === 10 && settings.discountActive) {
        const customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '{}');
        if (customers[phone] && customers[phone].orders >= settings.discountThreshold) {
            msg.style.display = 'block';
            document.getElementById('checkoutDiscountPercent').textContent = settings.discountPercent;
            // Recalculate checkout total
            recalculateCheckoutTotal();
        } else {
            msg.style.display = 'none';
        }
    } else {
        msg.style.display = 'none';
    }
    recalculateCheckoutTotal();
}

// ================= CHECKOUT =================
function openCheckout() {
    if (!canPlaceOrder()) {
        showToast('Orders are currently closed. Please check order timings.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem(KEYS.CART));
    if (!cart || !cart.length) { showToast('Your cart is empty'); return; }

    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS));

    // Build delivery area options from admin settings
    const select = document.getElementById('deliveryArea');
    select.innerHTML = '<option value="">Select your area...</option>';

    const zones = {};
    (settings.deliveryAreas || []).forEach(area => {
        if (!zones[area.zone]) zones[area.zone] = [];
        zones[area.zone].push(area);
    });

    const zoneLabels = { 
        nearby: '🏠 Nearby (Free Delivery)', 
        city: '🏢 City Center (₹20)', 
        outskirts: '🛣️ Outskirts (₹40)' 
    };
    
    for (const [zone, areas] of Object.entries(zones)) {
        const group = document.createElement('optgroup');
        group.label = zoneLabels[zone] || zone;
        areas.forEach(area => {
            const opt = document.createElement('option');
            opt.value = JSON.stringify(area);
            opt.textContent = area.name;
            group.appendChild(opt);
        });
        select.appendChild(group);
    }

    // Add outside option
    const outOpt = document.createElement('option');
    outOpt.value = 'outside';
    outOpt.textContent = '❌ Outside Delivery Zone';
    select.appendChild(outOpt);

    // Update UPI
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
 document.getElementById('upiIdDisplay').textContent =
settings.upiId || 'biryaniadda@upi';

const qrImg = document.getElementById('upiQrImg');

if (settings.upiQrImage &&
    settings.upiQrImage.startsWith('data:image')) {

    qrImg.src = settings.upiQrImage;
    qrImg.style.display = 'block';

} else {

    qrImg.style.display = 'none';

}

    recalculateCheckoutTotal();
    toggleCart();
    document.getElementById('checkoutOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function recalculateCheckoutTotal() {
    const cart = JSON.parse(localStorage.getItem(KEYS.CART) || '[]');
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}');
    const areaVal = document.getElementById('deliveryArea').value;
    
    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    
    let delivery = 0;
    let discount = 0;

    // Calculate delivery charge
    if (areaVal && areaVal !== 'outside') {
        try {
            const area = JSON.parse(areaVal);
            delivery = area.charge || 0;
        } catch(e) {}
    }

    // Calculate discount
    const phone = document.getElementById('chkPhone')?.value.trim() || '';
    if (phone.length === 10 && settings.discountActive) {
        const customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '{}');
        if (customers[phone] && customers[phone].orders >= settings.discountThreshold) {
            discount = Math.round(subtotal * settings.discountPercent / 100);
        }
    }

    const total = subtotal + gst + delivery - discount;

    // Update bill display
    document.getElementById('billSubtotal').textContent = '₹' + subtotal.toFixed(2);
    document.getElementById('billDelivery').textContent = delivery > 0 ? '₹' + delivery : 'FREE';
    document.getElementById('billGST').textContent = '₹' + gst.toFixed(2);
    document.getElementById('checkoutTotal').textContent = '₹' + total.toFixed(2);

    const discRow = document.getElementById('billDiscountRow');
    if (discount > 0) {
        discRow.style.display = 'flex';
        document.getElementById('billDiscount').textContent = '-₹' + discount.toFixed(2);
    } else {
        discRow.style.display = 'none';
    }
}

function closeCheckout() {

    document.getElementById('checkoutOverlay')
        .classList.remove('open');

    document.body.style.overflow = 'auto';

    document.documentElement.style.overflow = 'auto';

}

function selectPayment(el, method) {
    document.querySelectorAll('.payment-card').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('upiBox').style.display = method === 'upi' ? 'block' : 'none';
}

function copyUpi() {
    const upi = document.getElementById('upiIdDisplay').textContent;
    navigator.clipboard.writeText(upi).then(() => showToast('UPI ID copied!'));
}

function updateDeliveryInfo() {
    const val = document.getElementById('deliveryArea').value;
    const info = document.getElementById('deliveryInfo');
    const areaError = document.getElementById('areaError');

    areaError.style.display = 'none';

    if (val === 'outside') {
        info.className = 'delivery-info reject';
        info.innerHTML = '<i class="fas fa-times-circle"></i> <span>❌ Sorry, we do not deliver to this area</span>';
        recalculateCheckoutTotal();
        return;
    }
    
    if (!val) {
        info.className = 'delivery-info';
        info.innerHTML = '<i class="fas fa-info-circle"></i> <span>Select an area to see delivery charges</span>';
        recalculateCheckoutTotal();
        return;
    }

    try {
        const area = JSON.parse(val);
        info.className = area.charge > 0 ? 'delivery-info charge' : 'delivery-info';
        info.innerHTML = area.charge > 0
            ? `<i class="fas fa-info-circle"></i> <span>⚠️ ₹${area.charge} delivery charge will be added</span>`
            : `<i class="fas fa-check-circle"></i> <span>✅ Free delivery for your area!</span>`;
    } catch(e) {}

    recalculateCheckoutTotal();
}

function getLiveLocation() {
    const btn = document.querySelector('.location-btn');
    if (!navigator.geolocation) {
        showToast('GPS not supported');
        return;
    }
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting location...';
    navigator.geolocation.getCurrentPosition(pos => {
        document.getElementById('chkLat').value = pos.coords.latitude;
        document.getElementById('chkLng').value = pos.coords.longitude;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Location captured!';
        btn.style.background = 'rgba(34,197,94,0.15)';
        btn.style.borderStyle = 'solid';
        showToast('Location captured successfully');
    }, err => {
        btn.innerHTML = '<i class="fas fa-map-pin"></i> Share Current Location via GPS';
        showToast('Location access denied');
    });
}

// ================= PLACE ORDER =================
function placeOrder() {
    if (!canPlaceOrder()) {
        showToast('Orders are currently closed');
        return;
    }

    const fname = document.getElementById('chkFname').value.trim();
    const lname = document.getElementById('chkLname').value.trim();
    const phone = document.getElementById('chkPhone').value.trim();
    const address = document.getElementById('chkAddress').value.trim();
    const areaVal = document.getElementById('deliveryArea').value;

    if (!fname || !lname || !phone || !address) {
        showToast('Please fill all required fields');
        return;
    }
    if (phone.length !== 10) { 
        showToast('Enter valid 10-digit phone number'); 
        return; 
    }
    if (!areaVal || areaVal === 'outside') {
        document.getElementById('areaError').style.display = 'block';
        showToast('Please select a valid delivery area');
        return;
    }

    const area = JSON.parse(areaVal);
    const cart = JSON.parse(localStorage.getItem(KEYS.CART));
    const settings = JSON.parse(localStorage.getItem(KEYS.SETTINGS));

    const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const gst = Math.round(subtotal * 0.05 * 100) / 100;
    const delivery = area.charge || 0;

    // Check repeat customer discount
    let discount = 0;
    const customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS) || '{}');
    if (settings.discountActive && customers[phone]) {
        if (customers[phone].orders >= settings.discountThreshold) {
            discount = Math.round(subtotal * settings.discountPercent / 100);
        }
    }

    const total = Math.round((subtotal + gst + delivery - discount) * 100) / 100;

    const orderId = 'BIR-' + Math.floor(1000 + Math.random() * 9000);
    const payType = document.querySelector('.payment-card.selected')?.nextElementSibling ? 'upi' : 'cod';
    // Actually check
    const cards = document.querySelectorAll('.payment-card');
    let paymentMethod = 'Cash on Delivery';
    cards.forEach(c => {
        if (c.classList.contains('selected')) {
            const txt = c.querySelector('span')?.textContent || '';
            paymentMethod = txt;
        }
    });

    const order = {
        id: orderId,
        customer: fname + ' ' + lname,
        phone: phone,
        address: address,
        landmark: document.getElementById('chkLandmark').value.trim(),
        area: area.name,
        areaZone: area.zone,
        deliveryCharge: delivery,
        items: cart.map(c => ({ name: c.name, qty: c.qty, price: c.price })),
        subtotal: subtotal,
        gst: gst,
        discount: discount,
        discountPercent: discount > 0 ? settings.discountPercent : 0,
        total: total,
        payment: paymentMethod,
        status: 'Pending',
        lat: document.getElementById('chkLat').value,
        lng: document.getElementById('chkLng').value,
        time: new Date().toISOString()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS));
    orders.unshift(order);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));

    // Save Order To Firebase

window.addDoc(
  window.collection(window.db, "orders"),
  order
)
.then(() => {

    console.log(
        "Order Saved To Firebase"
    );

})
.catch((err) => {

    console.error(
        "Firebase Error",
        err
    );

});

    // Update customer history
    if (!customers[phone]) customers[phone] = { orders: 0, name: fname + ' ' + lname };
    customers[phone].orders += 1;
    localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(customers));

    // Send to Google Sheets if configured
    if (settings.googleSheetUrl) {
        sendToGoogleSheet(order, settings.googleSheetUrl);
    }

    // Clear cart
    localStorage.setItem(KEYS.CART, JSON.stringify([]));
    updateCartUI();

// Show success popup
closeCheckout();

document.getElementById('successOrderId').textContent =
'ORDER #' + orderId;

document.getElementById('successOverlay')
    .classList.add('open');

document.body.style.overflow = 'hidden';

setTimeout(() => {

    closeSuccess();

}, 4000);

    // Reset form
    document.getElementById('chkFname').value = '';
    document.getElementById('chkLname').value = '';
    document.getElementById('chkPhone').value = '';
    document.getElementById('chkAddress').value = '';
    document.getElementById('chkLandmark').value = '';
    document.getElementById('deliveryArea').value = '';
    document.getElementById('discountMsg').style.display = 'none';
    document.getElementById('chkLat').value = '';
document.getElementById('chkLng').value = '';

document.getElementById('deliveryInfo').innerHTML =
'<i class="fas fa-info-circle"></i> <span>Select an area to see delivery charges</span>';

document.getElementById('upiBox').style.display = 'none';
}

// ================= GOOGLE SHEETS INTEGRATION =================
function sendToGoogleSheet(order, sheetUrl) {

    const data = {

        orderId: order.id,
        date: new Date(order.time).toLocaleString('en-IN'),
        customer: order.customer,
        phone: order.phone,
        address: order.address,
        area: order.area,
        items: order.items.map(i =>
            `${i.name} x${i.qty}`
        ).join(', '),

        subtotal: order.subtotal,
        discount: order.discount,
        delivery: order.deliveryCharge,
        gst: order.gst,
        total: order.total,
        payment: order.payment,
        status: order.status

    };

    fetch(sheetUrl, {

        method: 'POST',

        mode: 'no-cors',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    })
    .catch(err => {

        console.log(
            'Google Sheet Sync Failed',
            err
        );

    });

}

function closeSuccess() {

    document.getElementById('successOverlay')
        .classList.remove('open');

    document.getElementById('checkoutOverlay')
        .classList.remove('open');

    document.getElementById('cartOverlay')
        .classList.remove('open');

    document.getElementById('cartDrawer')
        .classList.remove('open');

    document.body.style.overflow = 'auto';

    document.documentElement.style.overflow = 'auto';

    updateCartUI();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderMenu(this.dataset.cat);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    document.getElementById('chkPhone')?.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
}

// ================= UTILITIES =================
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ================= START =================
init();
