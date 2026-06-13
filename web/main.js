/* ============================================
   LUXE — Main JavaScript
   ============================================ */

/* ── Cart State ── */
let cartCount = parseInt(localStorage.getItem('luxe_cart') || '0');
updateCartBadge();

/* ── Page Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ── Navbar Scroll ── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

/* ── Mobile Menu ── */
function toggleMenu() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

/* ── Cart ── */
function toggleCart() {
  showToast(`🛒 You have ${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart!`);
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cartCount;
}

function addToCart(name) {
  cartCount++;
  localStorage.setItem('luxe_cart', cartCount);
  updateCartBadge();
  showToast(`🛒 "${name}" added to cart!`);
}

/* ── Toast ── */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── Newsletter ── */
function subscribeNewsletter() {
  const input = document.getElementById('emailInput');
  if (!input) return;
  const val = input.value.trim();
  if (!val || !val.includes('@')) {
    showToast('⚠️ Please enter a valid email address.');
    return;
  }
  showToast('✅ Subscribed! Welcome to LUXE.');
  input.value = '';
}

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================
   PRODUCT DATA
   ============================================ */
const allProducts = [
  // KIDS
  { id: 1,  name: 'Colourful Dino Tee',      cat: 'kids',  price: 18,  oldPrice: 28,  badge: 'Sale',     rating: 4.8, reviews: 142, emoji: '🦕' },
  { id: 2,  name: 'Rainbow Hoodie',           cat: 'kids',  price: 34,  oldPrice: null, badge: 'New',      rating: 4.7, reviews: 98,  emoji: '🌈' },
  { id: 3,  name: 'Adventure Joggers',        cat: 'kids',  price: 24,  oldPrice: 32,  badge: 'Sale',     rating: 4.5, reviews: 67,  emoji: '⛺' },
  { id: 4,  name: 'Star Print Pyjamas',       cat: 'kids',  price: 22,  oldPrice: null, badge: null,       rating: 4.6, reviews: 55,  emoji: '⭐' },
  { id: 5,  name: 'School Smart Chinos',      cat: 'kids',  price: 28,  oldPrice: null, badge: 'New',      rating: 4.4, reviews: 39,  emoji: '📚' },
  { id: 6,  name: 'Mini Puffer Jacket',       cat: 'kids',  price: 52,  oldPrice: 68,  badge: 'Sale',     rating: 4.9, reviews: 211, emoji: '🧥' },
  // MEN
  { id: 7,  name: 'Classic Linen Shirt',      cat: 'men',   price: 58,  oldPrice: 80,  badge: 'Sale',     rating: 4.7, reviews: 330, emoji: '👔' },
  { id: 8,  name: 'Raw Denim Jeans',          cat: 'men',   price: 89,  oldPrice: null, badge: 'New',      rating: 4.8, reviews: 190, emoji: '👖' },
  { id: 9,  name: 'Essential Crewneck',       cat: 'men',   price: 42,  oldPrice: null, badge: null,       rating: 4.6, reviews: 255, emoji: '🧥' },
  { id: 10, name: 'Structured Blazer',        cat: 'men',   price: 128, oldPrice: 160, badge: 'Sale',     rating: 4.9, reviews: 88,  emoji: '🕴' },
  { id: 11, name: 'Cargo Shorts',             cat: 'men',   price: 46,  oldPrice: null, badge: null,       rating: 4.3, reviews: 147, emoji: '🏕️' },
  { id: 12, name: 'Tech Jogger',              cat: 'men',   price: 65,  oldPrice: 85,  badge: 'Sale',     rating: 4.7, reviews: 220, emoji: '🏃' },
  // WOMEN
  { id: 13, name: 'Floral Wrap Dress',        cat: 'women', price: 72,  oldPrice: 95,  badge: 'Sale',     rating: 4.9, reviews: 415, emoji: '🌸' },
  { id: 14, name: 'High-Waist Trousers',      cat: 'women', price: 68,  oldPrice: null, badge: 'New',      rating: 4.7, reviews: 193, emoji: '👗' },
  { id: 15, name: 'Cashmere Turtleneck',      cat: 'women', price: 95,  oldPrice: 125, badge: 'Sale',     rating: 4.8, reviews: 302, emoji: '🧶' },
  { id: 16, name: 'Silk Blouse',              cat: 'women', price: 82,  oldPrice: null, badge: null,       rating: 4.6, reviews: 175, emoji: '✨' },
  { id: 17, name: 'Oversized Blazer',         cat: 'women', price: 110, oldPrice: 140, badge: 'Sale',     rating: 4.8, reviews: 267, emoji: '💼' },
  { id: 18, name: 'Striped Co-Ord Set',       cat: 'women', price: 88,  oldPrice: null, badge: 'New',      rating: 4.7, reviews: 128, emoji: '👘' },
];

/* ── Build Product Card HTML ── */
function buildCard(p) {
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
  const oldPriceHtml = p.oldPrice ? `<span class="price-old">$${p.oldPrice}</span>` : '';
  const badgeHtml    = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';

  return `
    <div class="product-card reveal" data-cat="${p.cat}">
      <div class="product-image">
        <svg width="100%" height="260" viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pg${p.id}" cx="50%" cy="40%">
              <stop offset="0%" style="stop-color:${catColor(p.cat)};stop-opacity:0.2"/>
              <stop offset="100%" style="stop-color:transparent"/>
            </radialGradient>
          </defs>
          <rect width="300" height="260" fill="${catBg(p.cat)}"/>
          <rect width="300" height="260" fill="url(#pg${p.id})"/>
          <text x="150" y="145" text-anchor="middle" font-size="80">${p.emoji}</text>
        </svg>
        ${badgeHtml}
        <div class="product-wishlist" onclick="event.stopPropagation();this.textContent=this.textContent==='🤍'?'❤️':'🤍'">🤍</div>
        <div class="product-quick" onclick="addToCart('${p.name}')">+ Quick Add</div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">$${p.price}</span>
            ${oldPriceHtml}
          </div>
          <button class="btn-add-cart" onclick="addToCart('${p.name}')">+</button>
        </div>
      </div>
    </div>`;
}

function catBg(cat) {
  return cat === 'kids' ? '#1a0a0d' : cat === 'men' ? '#0a0d1a' : '#1a0a15';
}

function catColor(cat) {
  return cat === 'kids' ? '#D72638' : cat === 'men' ? '#3C50D7' : '#D72678';
}

/* ── Render products grid (Home page) ── */
const productsGrid = document.getElementById('productsGrid');
if (productsGrid) {
  productsGrid.innerHTML = allProducts.map(buildCard).join('');
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ── Filter (Home page) ── */
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('#productsGrid .product-card');
  cards.forEach(card => {
    const show = cat === 'all' || cat === 'sale'
      ? (cat === 'sale' ? card.querySelector('.product-badge') !== null : true)
      : card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
  });
}

/* ── Categories Page — inject grids ── */
function renderCategoryGrid(gridId, cat) {
  const el = document.getElementById(gridId);
  if (!el) return;
  const filtered = allProducts.filter(p => p.cat === cat);
  el.innerHTML = filtered.map(buildCard).join('');
  el.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

renderCategoryGrid('kidsGrid',  'kids');
renderCategoryGrid('menGrid',   'men');
renderCategoryGrid('womenGrid', 'women');

/* ── Category Tab Switcher ── */
function switchCategory(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.category-section').forEach(s => s.classList.remove('visible'));
  const target = document.getElementById('cat-' + cat);
  if (target) {
    target.classList.add('visible');
    // Re-observe reveals inside
    target.querySelectorAll('.reveal:not(.in-view)').forEach(el => revealObserver.observe(el));
  }
}
