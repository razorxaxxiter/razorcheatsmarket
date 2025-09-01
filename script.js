// Sample product data
const products = [
    {
        id: 1,
        name: "PUBG MOBILE CHEAT",
        videoId: "9FO8uDVJ8As",
        description: "Support ios,ipad,android Non-root & Root",
        prices: {
            weekly: 30000,
            monthly: 50000,
            season: 80000,
            permanent: 250000
        }
    },
    {
        id: 2,
        name: "FREE FIRE CHEAT PANEL",
        videoId: "pyGEVhdnjDI",
        description: "Support ios,android Non-root & Root",
        prices: {
            weekly: 30000,
            monthly: 50000,
            season: 80000,
            permanent: 250000
        }
    },
    {
        id: 3,
        name: "MOBILE LEGENDS CHEATS",
        videoId: "8p409eUOT6M",
        description: "Support ios,android Non-root & Root",
        prices: {
            weekly: 30000,
            monthly: 50000,
            season: 80000,
            permanent: 250000
        }
    }
];

// Cart functionality
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupMobileMenu();
    setupContactForm();
});

// Display products in the grid
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <iframe class="product-image" 
                src="https://www.youtube.com/embed/${product.videoId}?autoplay=0&mute=1&controls=1&rel=0" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="price-options">
                    <div class="price-option">
                        <span class="price-label">Mingguan:</span>
                        <span class="price-value">Rp ${product.prices.weekly.toLocaleString()}</span>
                        <button class="add-to-cart-btn small" onclick="addToCart(${product.id}, 'weekly')">
                            <i class="fab fa-whatsapp"></i> ORDER
                        </button>
                    </div>
                    <div class="price-option">
                        <span class="price-label">Bulanan:</span>
                        <span class="price-value">Rp ${product.prices.monthly.toLocaleString()}</span>
                        <button class="add-to-cart-btn small" onclick="addToCart(${product.id}, 'monthly')">
                            <i class="fab fa-whatsapp"></i> ORDER
                        </button>
                    </div>
                    <div class="price-option">
                        <span class="price-label">Season:</span>
                        <span class="price-value">Rp ${product.prices.season.toLocaleString()}</span>
                        <button class="add-to-cart-btn small" onclick="addToCart(${product.id}, 'season')">
                            <i class="fab fa-whatsapp"></i> ORDER
                        </button>
                    </div>
                    <div class="price-option">
                        <span class="price-label">Permanen:</span>
                        <span class="price-value">Rp ${product.prices.permanent.toLocaleString()}</span>
                        <button class="add-to-cart-btn small" onclick="addToCart(${product.id}, 'permanent')">
                            <i class="fab fa-whatsapp"></i> ORDER
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart functionality
function addToCart(productId, duration) {
    const product = products.find(p => p.id === productId);
    const durationText = {
        'weekly': 'Mingguan', 
        'monthly': 'Bulanan',
        'season': 'Season',
        'permanent': 'Permanen'
    };
    
    // Redirect to WhatsApp based on product
    let whatsappUrl = '';
    let productName = '';
    
    if (product.id === 1) { // PUBG Mobile
        productName = 'pubg';
        whatsappUrl = 'https://wa.me/6283857228661?text=Halo%20saya%20mau%20pesan%20cheat%20pubg';
    } else if (product.id === 2) { // Free Fire
        productName = 'freefire';
        whatsappUrl = 'https://wa.me/6283857228661?text=Halo%20saya%20mau%20pesan%20cheat%20freefire';
    } else if (product.id === 3) { // Mobile Legends
        productName = 'mlbb';
        whatsappUrl = 'https://wa.me/6283857228661?text=Halo%20saya%20mau%20pesan%20cheat%20mlbb';
    }
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification(`${product.name} (${durationText[duration]}) - Redirecting ke WhatsApp!`, 'success');
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart display in sidebar
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">ORDER kosong</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-duration">${item.durationText}</p>
                <p class="cart-item-price">Rp ${item.price.toLocaleString()}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1, '${item.duration}')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1, '${item.duration}')">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.duration}')">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

// Update item quantity in cart
function updateQuantity(productId, change, duration) {
    const item = cart.find(item => 
        item.id === productId && item.duration === duration
    );
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId, duration);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

// Remove item from cart
function removeFromCart(productId, duration) {
    cart = cart.filter(item => 
        !(item.id === productId && item.duration === duration)
    );
    updateCartCount();
    updateCartDisplay();
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
    
    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

// Checkout functionality
function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja kosong!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Show checkout confirmation
    const confirmed = confirm(`Total ORDER: Rp ${total.toLocaleString()}\n\nLanjutkan ke pembayaran?`);
    
    if (confirmed) {
        showNotification('Terima kasih! Pesanan Anda sedang diproses.', 'success');
        cart = [];
        updateCartCount();
        updateCartDisplay();
        toggleCart();
    }
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
            contactForm.reset();
        } else {
            showNotification('Mohon lengkapi semua field!', 'error');
        }
    });
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = '#27ae60';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else {
        notification.style.background = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation to products
function addLoadingAnimation() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.style.opacity = '0';
    productsGrid.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        productsGrid.style.transition = 'all 0.6s ease';
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize loading animation
setTimeout(addLoadingAnimation, 500);
