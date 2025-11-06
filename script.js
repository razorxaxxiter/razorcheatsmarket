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

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda secepatnya.');
        contactForm.reset();
    });
}

// Buy button handler - Open Payment Modal
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Set selected product info
        document.getElementById('selectedProduct').textContent = productName;
        document.getElementById('selectedPrice').textContent = productPrice;
        
        // Show modal
        document.getElementById('paymentModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal handler
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('paymentModal').classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
document.getElementById('paymentModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Payment form handler
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Form pembayaran Anda telah dikirim. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi pembayaran.');
        this.reset();
        document.getElementById('paymentModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 255, 255, 0.4)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(feature);
});

// Observe testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add glow effect to logos on hover
document.querySelectorAll('.logo h1').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.textShadow = 'none';
    });
});

// ========== CART SYSTEM ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart
function initCart() {
    updateCartBadge();
    renderCart();
    
    // Cart icon click handler
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            openCart();
        });
    }
    
    // Cart close handler
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', () => {
            closeCart();
        });
    }
    
    // Cart overlay click handler
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            closeCart();
        });
    }
    
    // Checkout button handler
    const cartCheckout = document.getElementById('cartCheckout');
    if (cartCheckout) {
        cartCheckout.addEventListener('click', () => {
            checkoutCart();
        });
    }
}

// Add to cart
function addToCart(productName, packageType, price) {
    const item = {
        id: Date.now(),
        name: productName,
        package: packageType,
        price: price,
        timestamp: new Date().toISOString()
    };
    
    cart.push(item);
    saveCart();
    updateCartBadge();
    renderCart();
    
    // Show notification
    showNotification('Produk ditambahkan ke keranjang!');
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartBadge();
    renderCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const count = cart.length;
        badge.textContent = count;
        if (count === 0) {
            badge.classList.add('hidden');
        } else {
            badge.classList.remove('hidden');
        }
    }
}

// Render cart items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartCheckout = document.getElementById('cartCheckout');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        cartItems.innerHTML = '';
        if (cartTotalPrice) cartTotalPrice.textContent = 'Rp 0';
        if (cartCheckout) cartCheckout.disabled = true;
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartCheckout) cartCheckout.disabled = false;
    
    // Calculate total
    let total = 0;
    cart.forEach(item => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        total += price;
    });
    
    if (cartTotalPrice) {
        cartTotalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    }
    
    // Render items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-header">
                <div class="cart-item-name">${item.name}</div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
            <div class="cart-item-details">Paket: ${item.package}</div>
            <div class="cart-item-price">${item.price}</div>
        </div>
    `).join('');
}

// Open cart
function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartModal) cartModal.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartModal) cartModal.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout cart
function checkoutCart() {
    if (cart.length === 0) {
        alert('Keranjang kosong!');
        return;
    }
    
    // Calculate total
    let total = 0;
    cart.forEach(item => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''));
        total += price;
    });
    
    // Show payment modal
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        // Set cart items info
        const selectedProduct = document.getElementById('selectedProduct');
        if (selectedProduct) {
            selectedProduct.textContent = `${cart.length} item(s) di keranjang`;
        }
        const selectedPrice = document.getElementById('selectedPrice');
        if (selectedPrice) {
            selectedPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }
        
        closeCart();
        paymentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        alert(`Total: Rp ${total.toLocaleString('id-ID')}\n\nSilakan hubungi admin untuk proses pembayaran.`);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize cart on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== PROMO BANNER ==========
const promoBanner = document.getElementById('promoBanner');
const promoClose = document.getElementById('promoClose');
const header = document.querySelector('.header');

if (promoBanner && promoClose) {
    // Check if user has closed promo before
    const promoClosed = localStorage.getItem('promoClosed');
    if (!promoClosed) {
        setTimeout(() => {
            promoBanner.classList.add('show');
            if (header) {
                header.style.top = '60px';
            }
        }, 2000);
    }

    promoClose.addEventListener('click', () => {
        promoBanner.classList.remove('show');
        if (header) {
            header.style.top = '0';
        }
        localStorage.setItem('promoClosed', 'true');
    });
}

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and elements with fade-in class
document.querySelectorAll('.about, .faq, .feature, .testimonial-card, .product-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========== LIVE VISITOR COUNTER ==========
const visitorCountEl = document.getElementById('visitorCount');
const orderCountEl = document.getElementById('orderCount');

if (visitorCountEl) {
    // Get stored visitor count
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 1234;
    
    // Increment on page load (simulate new visitor)
    if (!sessionStorage.getItem('visited')) {
        visitorCount += Math.floor(Math.random() * 5) + 1;
        localStorage.setItem('visitorCount', visitorCount);
        sessionStorage.setItem('visited', 'true');
    }
    
    // Animate counter
    const targetCount = visitorCount;
    let currentCount = targetCount - 50;
    const increment = Math.ceil((targetCount - currentCount) / 20);
    
    const counterInterval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(counterInterval);
        }
        visitorCountEl.textContent = currentCount.toLocaleString('id-ID');
    }, 50);
}

if (orderCountEl) {
    // Get stored order count
    let orderCount = parseInt(localStorage.getItem('orderCount')) || 567;
    
    // Animate counter
    const targetCount = orderCount;
    let currentCount = targetCount - 30;
    const increment = Math.ceil((targetCount - currentCount) / 15);
    
    const counterInterval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(counterInterval);
        }
        orderCountEl.textContent = currentCount.toLocaleString('id-ID');
    }, 50);
}

// ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
