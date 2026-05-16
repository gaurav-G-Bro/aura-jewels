const INR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const LS_CART = 'aura_cart_v1';
const LS_WISH = 'aura_wishlist_v1';
const LS_COUPON = 'aura_coupon_v1';
const LS_GIFT_WRAP = 'aura_gift_wrap_v1';

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
const money = (n) => INR.format(Number(n || 0));
const discount = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
const getParam = (key) => new URLSearchParams(window.location.search).get(key);
const byId = (id) => STORE_PRODUCTS.find((p) => p.id === id) || STORE_PRODUCTS[0];

function readLS(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function writeLS(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

let cart = readLS(LS_CART, []);
let wishlist = readLS(LS_WISH, []);
let selectedQuickProduct = null;
let activeCoupon = readLS(LS_COUPON, '');
let giftWrapEnabled = readLS(LS_GIFT_WRAP, false);

function productUrl(id) { return `product.html?id=${encodeURIComponent(id)}`; }
function shopUrl(params = {}) {
  const sp = new URLSearchParams(params);
  return `shop.html${sp.toString() ? `?${sp.toString()}` : ''}`;
}

function shell() {
  const header = qs('#site-header');
  if (header) {
    header.innerHTML = `
      <div class="announcement"><span>Get Extra 10% OFF on Orders Above ₹1299 | Code: AURA10</span></div>
      <header class="header">
        <div class="container navbar">
          <nav class="nav-left" aria-label="Primary navigation">
            <button class="nav-icon menu-toggle" data-menu-open aria-label="Open menu">☰</button>
            <div class="nav-item">
              <a class="nav-link" href="shop.html?tag=new">New Arrivals</a>
            </div>
            <div class="nav-item">
              <button class="nav-link">Categories ▾</button>
              <div class="mega">
                <div class="container mega-grid">
                  <a class="mega-card" href="shop.html"><img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80" alt="Jewellery collection"><div><strong>Festival Ready</strong><span>Shop the premium edit</span></div></a>
                  <div class="mega-col">
                    <h4>Shop by Category</h4>
                    ${['Jewellery Sets','Necklaces','Earrings','Bangles','Bracelets','Rings','Anklets','Bags'].map(c => `<a href="${shopUrl({ category: c })}">${c}</a>`).join('')}
                  </div>
                  <div class="mega-col">
                    <h4>By Collection</h4>
                    ${['Kundan Forever','American Diamond','Oxidised Jewellery','Western','Chandbalis','Modern Girl Meenakari'].map(c => `<a href="${shopUrl({ collection: c })}">${c}</a>`).join('')}
                  </div>
                  <div class="mega-col">
                    <h4>By Occasion</h4>
                    ${['Wedding','Sangeet','Mehendi','Reception','Cocktail Party','Daily'].map(o => `<a href="${shopUrl({ occasion: o })}">${o}</a>`).join('')}
                  </div>
                </div>
              </div>
            </div>
            <a class="nav-link" href="shop.html">Shop All</a>
            <a class="nav-link" href="track-order.html">Track Order</a>
          </nav>
          <a class="logo" href="index.html" aria-label="Aarunya Jewels home">
            <span class="logo-mark">AARUNYA</span>
            <span class="logo-sub">Jewels</span>
          </a>
          <div class="nav-right">
            <button class="nav-icon" data-search-open aria-label="Search">⌕</button>
            <a class="nav-icon hide-mobile" href="login.html" aria-label="Login">♡</a>
            <button class="nav-icon" data-wishlist-open aria-label="Wishlist">♥<span class="wish-count">0</span></button>
            <button class="nav-icon" data-cart-open aria-label="Cart">🛍<span class="cart-count">0</span></button>
          </div>
        </div>
      </header>`;
  }

  const footer = qs('#site-footer');
  if (footer) {
    footer.innerHTML = `
      <footer class="footer">
        <div class="newsletter">
          <div class="container newsletter-box">
            <div>
              <span class="eyebrow">Newsletter</span>
              <h2>Premium jewellery drops, styling notes and private sale invites.</h2>
            </div>
            <form class="newsletter-form" data-newsletter>
              <input type="email" placeholder="Enter your email" required>
              <button class="btn gold" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="container footer-main">
          <div>
            <a class="logo" href="index.html"><span class="logo-mark" style="color:#fff">AARUNYA</span><span class="logo-sub">Jewels</span></a>
            <p>A demo jewellery storefront inspired by modern Indian fashion-commerce experiences. No backend, no real payment, and no real order processing.</p>
            <p><strong>Support:</strong> support@aarunyajewels.demo<br><strong>Hours:</strong> Mon-Sat, 10am - 7pm</p>
          </div>
          <div><h4>Help</h4><a href="faq.html">FAQs</a><a href="track-order.html">Order Status</a><a href="returns.html">Raise Return Request</a><a href="policies.html#shipping">Shipping Policy</a><a href="policies.html#return">Return Policy</a></div>
          <div><h4>Information</h4><a href="about.html">About Us</a><a href="contact.html">Contact Us</a><a href="blog.html">Blog</a><a href="policies.html#privacy">Privacy Policy</a><a href="policies.html#terms">Terms & Conditions</a></div>
          <div><h4>Top Categories</h4>${['Bracelets','Earrings','Necklaces','Rings','Anklets','Bags'].map(c => `<a href="${shopUrl({ category: c })}">${c}</a>`).join('')}</div>
        </div>
        <div class="container copyright"><span>© 2026 Aarunya Jewels Demo. All Rights Reserved.</span><span>Instagram · Facebook · WhatsApp</span></div>
      </footer>`;
  }

  const global = qs('#global-ui');
  if (global) {
    global.innerHTML = `
      <div class="overlay" data-overlay></div>
      <aside class="drawer" data-cart-drawer aria-label="Cart drawer">
        <div class="drawer-header"><h3>Your Cart</h3><button class="close-btn" data-close>×</button></div>
        <div class="drawer-body" data-cart-drawer-body></div>
        <div class="drawer-footer" data-cart-drawer-footer></div>
      </aside>
      <aside class="drawer" data-wishlist-drawer aria-label="Wishlist drawer">
        <div class="drawer-header"><h3>Your Wishlist</h3><button class="close-btn" data-close>×</button></div>
        <div class="drawer-body" data-wishlist-body></div>
      </aside>
      <aside class="drawer" data-menu-drawer aria-label="Mobile menu">
        <div class="drawer-header"><h3>Menu</h3><button class="close-btn" data-close>×</button></div>
        <div class="drawer-body">
          <a class="btn secondary full" href="shop.html">Shop All</a><br><br>
          ${['Jewellery Sets','Necklaces','Earrings','Bangles','Bracelets','Rings','Anklets','Bags'].map(c => `<a class="nav-link" style="display:block;padding:12px 0" href="${shopUrl({ category: c })}">${c}</a>`).join('')}
          <hr><a class="nav-link" style="display:block;padding:12px 0" href="about.html">About</a><a class="nav-link" style="display:block;padding:12px 0" href="contact.html">Contact</a><a class="nav-link" style="display:block;padding:12px 0" href="faq.html">FAQs</a>
        </div>
      </aside>
      <div class="modal" data-modal>
        <div class="overlay modal-backdrop" data-modal-close></div>
        <div class="modal-card" data-modal-content></div>
      </div>
      <div class="search-panel" data-search-panel>
        <div class="search-top"><input class="search-input" data-global-search placeholder="Search earrings, kundan, bangles..." autofocus><button class="btn secondary" data-search-close>Close</button></div>
        <div class="search-results" data-search-results></div>
      </div>
      <div class="toast-wrap" data-toast-wrap></div>`;
  }
}

function initGlobalEvents() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-cart-open], [data-wishlist-open], [data-menu-open], [data-close], [data-overlay], [data-modal-close], [data-search-open], [data-search-close]');
    if (!target) return;
    if (target.matches('[data-cart-open]')) openDrawer('cart');
    if (target.matches('[data-wishlist-open]')) openDrawer('wishlist');
    if (target.matches('[data-menu-open]')) openDrawer('menu');
    if (target.matches('[data-close], [data-overlay]')) closeDrawers();
    if (target.matches('[data-modal-close]')) closeModal();
    if (target.matches('[data-search-open]')) openSearch();
    if (target.matches('[data-search-close]')) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDrawers(); closeModal(); closeSearch(); }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.matches('[data-newsletter]')) {
      e.preventDefault();
      e.target.reset();
      toast('Subscribed successfully. This is demo mode only.');
    }
  });

  const globalSearch = qs('[data-global-search]');
  if (globalSearch) {
    globalSearch.addEventListener('input', () => renderSearchResults(globalSearch.value));
  }
}

function openDrawer(type) {
  closeDrawers(false);
  qs('[data-overlay]')?.classList.add('open');
  document.body.classList.add('locked');
  if (type === 'cart') {
    renderCartDrawer();
    qs('[data-cart-drawer]')?.classList.add('open');
  }
  if (type === 'wishlist') {
    renderWishlistDrawer();
    qs('[data-wishlist-drawer]')?.classList.add('open');
  }
  if (type === 'menu') qs('[data-menu-drawer]')?.classList.add('open');
}
function closeDrawers(unlock = true) {
  qsa('.drawer').forEach(d => d.classList.remove('open'));
  qs('[data-overlay]')?.classList.remove('open');
  if (unlock) document.body.classList.remove('locked');
}
function openModal(html) {
  const modal = qs('[data-modal]');
  const content = qs('[data-modal-content]');
  if (!modal || !content) return;
  content.innerHTML = html;
  modal.classList.add('open');
  document.body.classList.add('locked');
}
function closeModal() {
  qs('[data-modal]')?.classList.remove('open');
  const content = qs('[data-modal-content]');
  if (content) content.innerHTML = '';
  document.body.classList.remove('locked');
}
function openSearch() {
  qs('[data-search-panel]')?.classList.add('open');
  document.body.classList.add('locked');
  renderSearchResults('');
  setTimeout(() => qs('[data-global-search]')?.focus(), 10);
}
function closeSearch() {
  qs('[data-search-panel]')?.classList.remove('open');
  document.body.classList.remove('locked');
}
function toast(message) {
  const wrap = qs('[data-toast-wrap]');
  if (!wrap) return;
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  wrap.appendChild(node);
  setTimeout(() => node.remove(), 3200);
}

function cartItemKey(id, size = 'Default') { return `${id}__${size}`; }
function addToCart(id, qty = 1, size = 'Default') {
  const product = byId(id);
  if (!product || product.stock <= 0) return toast('This product is currently sold out.');
  const key = cartItemKey(id, size);
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty += qty;
  else cart.push({ key, id, qty, size });
  writeLS(LS_CART, cart);
  updateCounts();
  renderCartPage();
  toast(`${product.name} added to cart.`);
}
function updateQty(key, qty) {
  cart = cart.map(i => i.key === key ? { ...i, qty: Math.max(1, qty) } : i);
  writeLS(LS_CART, cart); updateCounts(); renderCartDrawer(); renderCartPage();
}
function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  writeLS(LS_CART, cart); updateCounts(); renderCartDrawer(); renderCartPage();
}
function toggleWishlist(id) {
  if (wishlist.includes(id)) wishlist = wishlist.filter(x => x !== id);
  else wishlist.push(id);
  writeLS(LS_WISH, wishlist);
  updateCounts();
  qsa(`[data-wish-id="${id}"]`).forEach(b => b.classList.toggle('active', wishlist.includes(id)));
  toast(wishlist.includes(id) ? 'Added to wishlist.' : 'Removed from wishlist.');
}
function updateCounts() {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  qsa('.cart-count').forEach(n => n.textContent = cartCount);
  qsa('.wish-count').forEach(n => n.textContent = wishlist.length);
}
function cartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (byId(item.id).price * item.qty), 0);
  // Demo storefront: shipping is shown as Free so the final total matches the product prices.
  const shipping = 0;
  const couponDiscount = activeCoupon.toUpperCase() === 'AURA10' && subtotal >= 1299 ? Math.round(subtotal * 0.1) : 0;
  const giftWrap = giftWrapEnabled ? 49 : 0;
  const total = Math.max(0, subtotal + shipping + giftWrap - couponDiscount);
  return { subtotal, shipping, couponDiscount, giftWrap, total };
}

function productCard(product) {
  return `
    <article class="product-card" data-product-card data-category="${product.category}" data-price="${product.price}">
      <div class="product-media">
        <a class="product-image-link" href="${productUrl(product.id)}" aria-label="View ${product.name}">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/900x900/f9e4dc/7d2734?text=Jewellery'">
        </a>
        <span class="product-badge">${product.badge}</span>
        <div class="product-actions">
          <button type="button" class="quick-btn" data-quick="${product.id}">QUICK VIEW</button>
          <button type="button" class="wish-btn ${wishlist.includes(product.id) ? 'active' : ''}" data-wish-id="${product.id}" aria-label="Wishlist">♥</button>
        </div>
      </div>
      <div class="product-info">
        <a href="${productUrl(product.id)}"><h3>${product.name}</h3></a>
        <div class="rating">★ ${product.rating} <span style="color:var(--muted)">(${product.reviews})</span></div>
        <div class="price-row"><span class="price">${money(product.price)}</span><span class="mrp">${money(product.mrp)}</span><span class="off">${discount(product)}% Off</span></div>
        <button type="button" class="add-btn" data-add="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>${product.stock <= 0 ? 'Sold Out' : 'Add to cart'}</button>
      </div>
    </article>`;
}

function bindProductActions(root = document) {
  qsa('[data-add]', root).forEach(btn => {
    if (btn.dataset.boundAction) return;
    btn.dataset.boundAction = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(btn.dataset.add);
    });
  });
  qsa('[data-quick]', root).forEach(btn => {
    if (btn.dataset.boundAction) return;
    btn.dataset.boundAction = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      quickView(btn.dataset.quick);
    });
  });
  qsa('[data-wish-id]', root).forEach(btn => {
    if (btn.dataset.boundAction) return;
    btn.dataset.boundAction = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(btn.dataset.wishId);
    });
  });
}

function quickView(id) {
  const p = byId(id);
  selectedQuickProduct = p;
  let qvQty = 1;
  const sizes = p.sizes.map((s, idx) => `<button type="button" class="option-pill ${idx === 0 ? 'active' : ''}" data-qv-size="${s}">${s}</button>`).join('');
  openModal(`
    <div class="quick-view">
      <div class="quick-view-media">
        <img src="${p.images[0]}" alt="${p.name}" onerror="this.onerror=null;this.src='https://placehold.co/900x900/f9e4dc/7d2734?text=Jewellery'">
      </div>
      <div class="quick-info">
        <button type="button" class="close-btn" style="float:right" data-modal-close>×</button>
        <span class="badge">${p.badge}</span>
        <h2 class="section-title" style="margin:12px 0">${p.name}</h2>
        <div class="rating">★ ${p.rating} (${p.reviews} reviews)</div>
        <div class="price-row" style="margin:10px 0 16px"><span class="price">${money(p.price)}</span><span class="mrp">${money(p.mrp)}</span><span class="off">${discount(p)}% Off</span></div>
        <p class="section-copy">${p.description}</p>
        <h4>Size</h4><div class="option-pills">${sizes}</div>
        <div class="detail-actions" style="grid-template-columns:120px 1fr">
          <div class="qty-control"><button type="button" data-qv-dec>−</button><span data-qv-qty>1</span><button type="button" data-qv-inc>+</button></div>
          <button type="button" class="btn" data-qv-add="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>${p.stock <= 0 ? 'Sold Out' : 'Add to Cart'}</button>
        </div>
        <a class="btn secondary full" style="margin-top:10px" href="${productUrl(p.id)}">View full details</a>
      </div>
    </div>`);
  qsa('[data-qv-size]').forEach(b => b.addEventListener('click', () => {
    qsa('[data-qv-size]').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  }));
  qs('[data-qv-inc]')?.addEventListener('click', () => { qvQty += 1; qs('[data-qv-qty]').textContent = qvQty; });
  qs('[data-qv-dec]')?.addEventListener('click', () => { qvQty = Math.max(1, qvQty - 1); qs('[data-qv-qty]').textContent = qvQty; });
  qs('[data-qv-add]')?.addEventListener('click', (e) => {
    e.preventDefault();
    const size = qs('[data-qv-size].active')?.dataset.qvSize || 'Default';
    addToCart(id, qvQty, size);
    closeModal();
  });
}

function renderCartDrawer() {
  const body = qs('[data-cart-drawer-body]');
  const footer = qs('[data-cart-drawer-footer]');
  if (!body || !footer) return;
  if (!cart.length) {
    body.innerHTML = `<div class="empty-state"><h3>Your cart is empty</h3><p class="section-copy">Add a piece you love and it will appear here.</p><a class="btn" href="shop.html">Start Shopping</a></div>`;
    footer.innerHTML = '';
    return;
  }
  body.innerHTML = cart.map(item => {
    const p = byId(item.id);
    return `<div class="drawer-item"><img src="${p.images[0]}" alt="${p.name}"><div><h4>${p.name}</h4><p>${item.size} · ${money(p.price)}</p><div class="qty-control" style="margin-top:8px"><button data-dec="${item.key}">−</button><span>${item.qty}</span><button data-inc="${item.key}">+</button></div><br><button class="remove-btn" data-remove="${item.key}">Remove</button></div></div>`;
  }).join('');
  const totals = cartTotals();
  footer.innerHTML = `<div class="summary-line total"><strong>Total</strong><strong>${money(totals.total)}</strong></div><a class="btn full" href="cart.html">View Cart</a><a class="btn secondary full" style="margin-top:10px" href="checkout.html">Checkout</a>`;
  bindCartControls(body);
}
function bindCartControls(root) {
  qsa('[data-inc]', root).forEach(btn => btn.addEventListener('click', () => {
    const item = cart.find(i => i.key === btn.dataset.inc); if (item) updateQty(item.key, item.qty + 1);
  }));
  qsa('[data-dec]', root).forEach(btn => btn.addEventListener('click', () => {
    const item = cart.find(i => i.key === btn.dataset.dec); if (item) updateQty(item.key, Math.max(1, item.qty - 1));
  }));
  qsa('[data-remove]', root).forEach(btn => btn.addEventListener('click', () => removeFromCart(btn.dataset.remove)));
}
function renderWishlistDrawer() {
  const body = qs('[data-wishlist-body]');
  if (!body) return;
  const products = wishlist.map(byId).filter(Boolean);
  body.innerHTML = products.length ? products.map(p => `<div class="drawer-item"><img src="${p.images[0]}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><button class="btn secondary" data-add="${p.id}" style="min-height:38px;padding:8px 13px;margin-top:8px">Add</button><button class="remove-btn" data-wish-id="${p.id}">Remove</button></div></div>`).join('') : `<div class="empty-state"><h3>No wishlist items</h3><p class="section-copy">Tap the heart on any product to save it.</p></div>`;
  bindProductActions(body);
}

function renderSearchResults(term) {
  const wrap = qs('[data-search-results]');
  if (!wrap) return;
  const query = term.trim().toLowerCase();
  const results = STORE_PRODUCTS.filter(p => !query || `${p.name} ${p.category} ${p.collection} ${p.occasion} ${p.color}`.toLowerCase().includes(query)).slice(0, 8);
  wrap.innerHTML = results.map(p => `<a class="search-result" href="${productUrl(p.id)}"><img src="${p.images[0]}" alt="${p.name}"><div><strong>${p.name}</strong><p class="section-copy" style="margin:4px 0">${p.category} · ${p.collection}</p><span class="price">${money(p.price)}</span></div><button class="btn secondary" type="button" data-add="${p.id}">Add</button></a>`).join('') || `<div class="empty-state">No products found.</div>`;
  bindProductActions(wrap);
}

function renderHome() {
  if (!qs('[data-home]')) return;
  const heroSlides = qs('[data-hero-slides]');
  if (heroSlides) {
    const slides = [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80'
    ];
    heroSlides.innerHTML = slides.map((src, i) => `<div class="hero-slide ${i === 0 ? 'active' : ''}"><img src="${src}" alt="Premium jewellery look ${i+1}"></div>`).join('') + `<div class="hero-dots">${slides.map((_, i) => `<button class="hero-dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Slide ${i+1}"></button>`).join('')}</div><div class="hero-floating"><div><strong>Festive Gold Edit</strong><span>Curated pieces under ₹1599</span></div><a class="btn gold" href="shop.html">Explore</a></div>`;
    let index = 0;
    const setSlide = (next) => {
      index = next;
      qsa('.hero-slide', heroSlides).forEach((s, i) => s.classList.toggle('active', i === index));
      qsa('.hero-dot', heroSlides).forEach((d, i) => d.classList.toggle('active', i === index));
    };
    qsa('[data-dot]', heroSlides).forEach(d => d.addEventListener('click', () => setSlide(Number(d.dataset.dot))));
    setInterval(() => setSlide((index + 1) % slides.length), 4200);
  }
  const cat = qs('[data-categories]');
  if (cat) cat.innerHTML = CATEGORIES.map(c => `<a class="category-card" href="${shopUrl({ category: c.name })}"><img src="${c.image}" alt="${c.name}"><div class="content"><h3>${c.name}</h3><span>Shop Now →</span></div></a>`).join('');
  const occ = qs('[data-occasions]');
  if (occ) occ.innerHTML = OCCASIONS.map(o => `<a class="occasion-card" href="${shopUrl({ occasion: o.name })}"><img src="${o.image}" alt="${o.name}"><div><span class="eyebrow" style="color:#fff">Occasion</span><h3>${o.name}</h3></div></a>`).join('');
  const best = qs('[data-best-sellers]');
  if (best) { best.innerHTML = STORE_PRODUCTS.slice(0, 8).map(productCard).join(''); bindProductActions(best); }
}

function renderShop() {
  const grid = qs('[data-shop-grid]');
  if (!grid) return;
  const initialCategory = getParam('category') || '';
  const initialOccasion = getParam('occasion') || '';
  const initialCollection = getParam('collection') || '';
  const filtersBox = qs('[data-filters]');
  if (filtersBox) {
    const cats = [...new Set(STORE_PRODUCTS.map(p => p.category))];
    const occasions = [...new Set(STORE_PRODUCTS.map(p => p.occasion))];
    const colors = [...new Set(STORE_PRODUCTS.map(p => p.color))];
    filtersBox.innerHTML = `
      <div class="filter-head"><h3>Filter</h3><button class="btn ghost" data-clear-filters style="min-height:38px;padding:8px 12px">Clear</button></div>
      <input class="search-input" data-filter-search placeholder="Search products...">
      <div class="filter-group"><h4>Category</h4>${cats.map(c => `<label><input type="checkbox" data-filter="category" value="${c}" ${c===initialCategory?'checked':''}> ${c}</label>`).join('')}</div>
      <div class="filter-group"><h4>Occasion</h4>${occasions.map(o => `<label><input type="checkbox" data-filter="occasion" value="${o}" ${o===initialOccasion?'checked':''}> ${o}</label>`).join('')}</div>
      <div class="filter-group"><h4>Color</h4>${colors.map(c => `<label><input type="checkbox" data-filter="color" value="${c}"> ${c}</label>`).join('')}</div>
      <div class="filter-group"><h4>Price up to <span data-price-label>₹3000</span></h4><input type="range" min="500" max="3000" step="100" value="3000" data-price-range></div>
      <div class="filter-group"><label><input type="checkbox" data-instock> In stock only</label></div>`;
  }
  const collectionInput = initialCollection;
  if (collectionInput) qs('[data-page-subtitle]') && (qs('[data-page-subtitle]').textContent = `Showing ${collectionInput} collection`);
  function applyFilters() {
    const term = qs('[data-filter-search]')?.value.toLowerCase().trim() || '';
    const max = Number(qs('[data-price-range]')?.value || 3000);
    const inStock = qs('[data-instock]')?.checked;
    const selected = (type) => qsa(`[data-filter="${type}"]:checked`).map(i => i.value);
    const cats = selected('category'), occasions = selected('occasion'), colors = selected('color');
    let products = STORE_PRODUCTS.filter(p => {
      const matchesTerm = !term || `${p.name} ${p.category} ${p.collection} ${p.occasion} ${p.color}`.toLowerCase().includes(term);
      const matchesCategory = !cats.length || cats.includes(p.category);
      const matchesOccasion = !occasions.length || occasions.includes(p.occasion);
      const matchesColor = !colors.length || colors.includes(p.color);
      const matchesPrice = p.price <= max;
      const matchesStock = !inStock || p.stock > 0;
      const matchesCollection = !collectionInput || p.collection === collectionInput;
      return matchesTerm && matchesCategory && matchesOccasion && matchesColor && matchesPrice && matchesStock && matchesCollection;
    });
    const sort = qs('[data-sort]')?.value || 'featured';
    products = [...products].sort((a,b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
    qs('[data-result-count]') && (qs('[data-result-count]').textContent = `${products.length} products`);
    grid.innerHTML = products.length ? products.map(productCard).join('') : `<div class="empty-state" style="grid-column:1/-1"><h3>No products found</h3><p class="section-copy">Try removing filters or searching another keyword.</p></div>`;
    bindProductActions(grid);
  }
  qsa('[data-filter], [data-instock]').forEach(i => i.addEventListener('change', applyFilters));
  qs('[data-filter-search]')?.addEventListener('input', applyFilters);
  qs('[data-sort]')?.addEventListener('change', applyFilters);
  qs('[data-price-range]')?.addEventListener('input', (e) => { qs('[data-price-label]').textContent = money(e.target.value); applyFilters(); });
  qs('[data-clear-filters]')?.addEventListener('click', () => { qsa('[data-filter]').forEach(i => i.checked = false); qs('[data-instock]').checked = false; qs('[data-filter-search]').value = ''; qs('[data-price-range]').value = 3000; qs('[data-price-label]').textContent = money(3000); applyFilters(); });
  qs('[data-mobile-filter]')?.addEventListener('click', () => { qs('[data-filters]')?.classList.add('open'); qs('[data-overlay]')?.classList.add('open'); });
  qs('[data-overlay]')?.addEventListener('click', () => qs('[data-filters]')?.classList.remove('open'));
  applyFilters();
}

function renderProductPage() {
  const root = qs('[data-product-detail]');
  if (!root) return;
  const product = byId(getParam('id'));
  let qty = 1;
  let selectedSize = product.sizes[0] || 'Default';
  root.innerHTML = `
    <div class="gallery">
      <div class="thumb-list">${product.images.map((src, i) => `<button class="thumb ${i===0?'active':''}" data-thumb="${src}"><img src="${src}" alt="${product.name} ${i+1}"></button>`).join('')}</div>
      <div class="main-photo"><img data-main-photo src="${product.images[0]}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/900x900/f9e4dc/7d2734?text=Jewellery'"></div>
    </div>
    <div class="detail-panel">
      <span class="badge">${product.badge}</span>
      <h1>${product.name}</h1>
      <div class="rating">★ ${product.rating} (${product.reviews} verified reviews)</div>
      <div class="price-row" style="margin:14px 0 18px"><span class="price" style="font-size:1.5rem">${money(product.price)}</span><span class="mrp">${money(product.mrp)}</span><span class="off">${discount(product)}% Off</span></div>
      <p class="section-copy">${product.description}</p>
      <h4>Select Size</h4><div class="option-pills">${product.sizes.map((s,i) => `<button class="option-pill ${i===0?'active':''}" data-size="${s}">${s}</button>`).join('')}</div>
      <div class="detail-actions"><div class="qty-control"><button data-qty-dec>−</button><span data-qty>${qty}</span><button data-qty-inc>+</button></div><button class="btn" data-detail-add ${product.stock <= 0 ? 'disabled' : ''}>${product.stock <= 0 ? 'Sold Out' : 'Add to Cart'}</button></div>
      <button class="btn secondary full" data-wish-id="${product.id}">♥ ${wishlist.includes(product.id) ? 'Saved' : 'Add to Wishlist'}</button>
      <div class="spec-grid"><div class="spec"><small>Category</small><strong>${product.category}</strong></div><div class="spec"><small>Collection</small><strong>${product.collection}</strong></div><div class="spec"><small>Plating</small><strong>${product.plating}</strong></div><div class="spec"><small>Base Material</small><strong>${product.material}</strong></div></div>
      <div class="notice">Free shipping over ₹1299. Use coupon <strong>AURA10</strong> for demo discount. Checkout does not process real orders.</div>
      <div class="accordion">
        <div class="accordion-item open"><button class="accordion-trigger">Product Details <span>+</span></button><div class="accordion-content">High quality fashion jewellery with careful finishing. Keep away from perfume, water, and chemicals. Store in a dry pouch after use.</div></div>
        <div class="accordion-item"><button class="accordion-trigger">Shipping & Returns <span>+</span></button><div class="accordion-content">Demo delivery estimate: 3-6 business days. Demo returns can be requested within 7 days on eligible products.</div></div>
        <div class="accordion-item"><button class="accordion-trigger">Demo Notice <span>+</span></button><div class="accordion-content">This is a frontend-only demo. No payment gateway, no real order, and no backend database are connected.</div></div>
      </div>
    </div>`;
  qsa('[data-thumb]').forEach(btn => btn.addEventListener('click', () => { qsa('[data-thumb]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); qs('[data-main-photo]').src = btn.dataset.thumb; }));
  qsa('[data-size]').forEach(btn => btn.addEventListener('click', () => { qsa('[data-size]').forEach(b => b.classList.remove('active')); btn.classList.add('active'); selectedSize = btn.dataset.size; }));
  qs('[data-qty-inc]')?.addEventListener('click', () => { qty++; qs('[data-qty]').textContent = qty; });
  qs('[data-qty-dec]')?.addEventListener('click', () => { qty = Math.max(1, qty - 1); qs('[data-qty]').textContent = qty; });
  qs('[data-detail-add]')?.addEventListener('click', () => addToCart(product.id, qty, selectedSize));
  bindProductActions(root);
  bindAccordions(root);
  const related = qs('[data-related]');
  if (related) { related.innerHTML = STORE_PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.occasion === product.occasion)).slice(0,4).map(productCard).join(''); bindProductActions(related); }
}

function renderCartPage() {
  const root = qs('[data-cart-page]');
  if (!root) return;
  if (!cart.length) {
    root.innerHTML = `<div class="empty-state"><h2>Your cart is empty</h2><p class="section-copy">Browse our collection and add pieces to cart.</p><a class="btn" href="shop.html">Continue Shopping</a></div>`;
    return;
  }
  const totals = cartTotals();
  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-list">${cart.map(item => { const p = byId(item.id); return `<div class="cart-row"><img src="${p.images[0]}" alt="${p.name}"><div><h3>${p.name}</h3><p>${item.size} · ${p.category}</p><div class="qty-control" style="margin-top:10px"><button data-dec="${item.key}">−</button><span>${item.qty}</span><button data-inc="${item.key}">+</button></div></div><div class="cart-side"><strong>${money(p.price * item.qty)}</strong><br><button class="remove-btn" data-remove="${item.key}">Remove</button></div></div>`; }).join('')}</div>
      <aside class="summary-card"><h3>Order Summary</h3><div class="coupon"><input class="form-control" data-coupon placeholder="Coupon code" value="${activeCoupon}"><button class="btn secondary" data-apply-coupon>Apply</button></div><label class="check-row"><input type="checkbox" data-gift-wrap ${giftWrapEnabled ? 'checked' : ''}> Add gift wrap ₹49</label><div data-summary-lines></div><a class="btn full" href="checkout.html">Proceed to Checkout</a><a class="btn secondary full" style="margin-top:10px" href="shop.html">Continue Shopping</a></aside>
    </div>`;
  bindCartControls(root);
  qs('[data-apply-coupon]')?.addEventListener('click', () => {
    const entered = qs('[data-coupon]').value.trim();
    activeCoupon = entered.toUpperCase() === 'AURA10' ? entered : '';
    writeLS(LS_COUPON, activeCoupon);
    renderCartPage();
    toast(entered.toUpperCase() === 'AURA10' ? 'Coupon applied.' : 'Invalid demo coupon. Try AURA10.');
  });
  qs('[data-gift-wrap]')?.addEventListener('change', (e) => {
    giftWrapEnabled = e.target.checked;
    writeLS(LS_GIFT_WRAP, giftWrapEnabled);
    renderSummaryLines();
  });
  renderSummaryLines();
}
function renderSummaryLines() {
  const wrap = qs('[data-summary-lines]');
  if (!wrap) return;
  const t = cartTotals();
  wrap.innerHTML = `<div class="summary-line"><span>Subtotal</span><strong>${money(t.subtotal)}</strong></div><div class="summary-line"><span>Shipping</span><strong>${t.shipping ? money(t.shipping) : 'Free'}</strong></div><div class="summary-line"><span>Gift Wrap</span><strong>${t.giftWrap ? money(t.giftWrap) : money(0)}</strong></div><div class="summary-line"><span>Coupon Discount</span><strong>- ${money(t.couponDiscount)}</strong></div><div class="summary-line total"><span>Total</span><strong>${money(t.total)}</strong></div>`;
}

function renderCheckout() {
  const root = qs('[data-checkout]');
  if (!root) return;
  const totals = cartTotals();
  root.innerHTML = `
    <div class="cart-layout">
      <form class="form-card" data-checkout-form>
        <h2>Delivery Details</h2>
        <div class="form-grid">
          <input class="form-control" placeholder="First name" required>
          <input class="form-control" placeholder="Last name" required>
          <input class="form-control span-2" type="email" placeholder="Email" required>
          <input class="form-control span-2" placeholder="Phone number" required>
          <textarea class="form-control span-2" placeholder="Complete address" required></textarea>
          <input class="form-control" placeholder="City" required>
          <input class="form-control" placeholder="Pincode" required>
          <select class="select-control span-2" required><option value="">Payment Mode</option><option>Cash on Delivery</option><option>UPI Demo</option><option>Card Demo</option></select>
        </div>
        <br><div class="notice">This checkout is for demo purpose only. Submitting the form will not place a real order or collect payment.</div><br>
        <button class="btn full" type="submit">Place Demo Order</button>
      </form>
      <aside class="summary-card"><h3>Review Order</h3>${cart.length ? cart.map(item => { const p = byId(item.id); return `<div class="summary-line"><span>${p.name} × ${item.qty}</span><strong>${money(p.price * item.qty)}</strong></div>`; }).join('') : '<p class="section-copy">Cart is empty.</p>'}<div class="summary-line"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div><div class="summary-line"><span>Shipping</span><strong>Free</strong></div>${totals.giftWrap ? `<div class="summary-line"><span>Gift Wrap</span><strong>${money(totals.giftWrap)}</strong></div>` : ''}${totals.couponDiscount ? `<div class="summary-line"><span>Coupon Discount</span><strong>- ${money(totals.couponDiscount)}</strong></div>` : ''}<div class="summary-line total"><span>Total</span><strong>${money(totals.total)}</strong></div></aside>
    </div>`;
  qs('[data-checkout-form]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNo = `AJ-${Math.floor(100000 + Math.random() * 899999)}`;
    openModal(`<div class="content-card" style="padding:36px;text-align:center"><button class="close-btn" style="float:right" data-modal-close>×</button><span class="badge">Demo Order</span><h2 class="section-title">Thank you!</h2><p class="section-copy" style="margin:auto">Your demo order ${orderNo} has been created for preview only. No payment was taken, no backend was used, and no real order has been placed.</p><br><a class="btn" href="track-order.html?order=${orderNo}">Track Demo Order</a></div>`);
    cart = [];
    writeLS(LS_CART, cart);
    updateCounts();
  });
}

function bindAccordions(root = document) {
  qsa('.accordion-trigger, .faq-question', root).forEach(btn => btn.addEventListener('click', () => btn.parentElement.classList.toggle('open')));
}
function renderFaq() { if (qs('[data-faq]')) bindAccordions(qs('[data-faq]')); }
function renderTrack() {
  const form = qs('[data-track-form]');
  if (!form) return;
  const status = qs('[data-track-status]');
  const orderParam = getParam('order');
  if (orderParam) qs('[data-track-input]').value = orderParam;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = qs('[data-track-input]').value || 'AJ-000000';
    status.innerHTML = `<div class="timeline"><div class="timeline-step"><i>✓</i><div><strong>${val} received</strong><br>This is a demo order tracking result only.</div></div><div class="timeline-step"><i>2</i><div><strong>Packing preview</strong><br>Your frontend demo shows how tracking would appear.</div></div><div class="timeline-step"><i>3</i><div><strong>Delivery preview</strong><br>No real shipment is connected.</div></div></div>`;
  });
}
function bindForms() {
  qsa('[data-demo-form]').forEach(form => form.addEventListener('submit', (e) => { e.preventDefault(); form.reset(); toast('Submitted in demo mode only.'); }));
}

function boot() {
  shell();
  initGlobalEvents();
  updateCounts();
  renderHome();
  renderShop();
  renderProductPage();
  renderCartPage();
  renderCheckout();
  renderFaq();
  renderTrack();
  bindForms();
  bindProductActions(document);
}

document.addEventListener('DOMContentLoaded', boot);
