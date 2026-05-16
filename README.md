# Aarunya Jewels Static Ecommerce Demo

A premium, frontend-only jewellery ecommerce website inspired by modern Indian fashion-jewellery stores.

## Included pages
- `index.html` - Homepage with hero slider, category cards, occasion shopping and best sellers
- `shop.html` - Product listing with search, filters, sorting and quick view
- `product.html` - Dynamic product details page using `?id=product-id`
- `cart.html` - Cart calculations, quantity controls, coupon and gift wrap
- `checkout.html` - Demo checkout form and demo order confirmation
- `login.html` - UI-only login preview
- `about.html`, `contact.html`, `faq.html`, `track-order.html`, `returns.html`, `policies.html`, `blog.html`

## Features
- Separate HTML, CSS and JS files
- LocalStorage cart and wishlist
- Add to cart, remove, quantity update and cart drawer
- Coupon code: `AURA10` for 10% off orders above ₹1299
- Free shipping above ₹1299, otherwise ₹99
- Gift wrap option
- Quick view product modal
- Search overlay
- Mobile menu and responsive layout
- Product filters by category, occasion, color, price and stock
- Demo checkout message: no real order/payment/backend

## How to run
Open `index.html` directly in a browser, or use VS Code Live Server for the best local preview.

## Customization
- Replace `AARUNYA` in `assets/js/app.js` and HTML titles with your client brand.
- Edit product data in `assets/js/data.js`.
- Replace images with your own URLs or local images.
- Adjust colors in `assets/css/styles.css` inside the `:root` variables.

## Note
This is a frontend-only demo. No real payment, user account, order processing, database or backend API is connected.
