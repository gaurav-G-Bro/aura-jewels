const STORE_PRODUCTS = [
  {
    id: 'ruby-kundan-set',
    name: 'Ruby Kundan Floral Jewellery Set',
    category: 'Jewellery Sets',
    collection: 'Kundan Forever',
    occasion: 'Wedding',
    color: 'Ruby',
    plating: 'Gold Plated',
    material: 'Brass',
    gemstone: 'Kundan',
    price: 1299,
    mrp: 4599,
    rating: 4.8,
    reviews: 186,
    stock: 18,
    badge: 'Sale',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A graceful gold-plated jewellery set with ruby accents and a festive kundan-inspired finish for weddings, receptions, and family functions.'
  },
  {
    id: 'rose-dahlia-set',
    name: 'Dream Dahlia Rose Gold American Diamond Set',
    category: 'Jewellery Sets',
    collection: 'American Diamond',
    occasion: 'Reception',
    color: 'Rose Gold',
    plating: 'Rose Gold Plated',
    material: 'Alloy',
    gemstone: 'American Diamond',
    price: 1524,
    mrp: 4849,
    rating: 4.7,
    reviews: 214,
    stock: 11,
    badge: 'Best Seller',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A rose-gold statement set crafted for modern celebrations, cocktail nights, and premium gifting.'
  },
  {
    id: 'floral-bangles',
    name: 'Dual Tone Floral American Diamond Bangles',
    category: 'Bangles',
    collection: 'Vajrabh',
    occasion: 'Festive',
    color: 'Gold',
    plating: 'Gold Plated',
    material: 'Brass',
    gemstone: 'American Diamond',
    price: 1076,
    mrp: 2364,
    rating: 4.6,
    reviews: 98,
    stock: 7,
    badge: 'Limited',
    sizes: ['2.4', '2.6', '2.8'],
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A set of floral bangles with polished dual-tone details and sparkling stone work.'
  },
  {
    id: 'rose-floral-ring',
    name: 'Rose Gold Floral Adjustable Finger Ring',
    category: 'Rings',
    collection: 'Western',
    occasion: 'Party',
    color: 'Rose Gold',
    plating: 'Rose Gold Plated',
    material: 'Alloy',
    gemstone: 'Crystal',
    price: 510,
    mrp: 1130,
    rating: 4.5,
    reviews: 72,
    stock: 24,
    badge: 'Sale',
    sizes: ['Adjustable'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A feminine adjustable ring with floral accents, perfect for gifting or everyday sparkle.'
  },
  {
    id: 'pearl-drop-earrings',
    name: 'Pearl Beads Gold Plated Drop Earrings',
    category: 'Earrings',
    collection: 'Traditional Earrings',
    occasion: 'Sangeet',
    color: 'Pearl',
    plating: 'Gold Plated',
    material: 'Brass',
    gemstone: 'Pearl',
    price: 735,
    mrp: 1899,
    rating: 4.9,
    reviews: 143,
    stock: 21,
    badge: 'New',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Elegant pearl drop earrings that add a soft traditional glow to sarees, gowns, and festive wear.'
  },
  {
    id: 'silver-oxidised-anklets',
    name: 'Antique Oxidised Silver Broad Anklets Set',
    category: 'Anklets',
    collection: 'Oxidised Jewellery',
    occasion: 'Daily',
    color: 'Silver',
    plating: 'Silver Plated',
    material: 'German Silver',
    gemstone: 'No Gemstone',
    price: 865,
    mrp: 2397,
    rating: 4.4,
    reviews: 87,
    stock: 0,
    badge: 'Sold Out',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A bold oxidised anklet pair made for Indo-western styling and ethnic everyday looks.'
  },
  {
    id: 'green-meenakari-choker',
    name: 'Green Meenakari Choker Necklace Set',
    category: 'Necklaces',
    collection: 'Modern Girl Meenakari',
    occasion: 'Mehendi',
    color: 'Green',
    plating: 'Gold Plated',
    material: 'Brass',
    gemstone: 'Meenakari',
    price: 1346,
    mrp: 9299,
    rating: 4.8,
    reviews: 302,
    stock: 15,
    badge: 'Hot',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A rich green choker set with meenakari-inspired detailing, created for mehendi and festive functions.'
  },
  {
    id: 'pink-stone-bracelet',
    name: 'Pink Stone Rose Gold Bracelet',
    category: 'Bracelets',
    collection: 'Cocktail Margarita',
    occasion: 'Cocktail Party',
    color: 'Pink',
    plating: 'Rose Gold Plated',
    material: 'Alloy',
    gemstone: 'American Diamond',
    price: 687,
    mrp: 2000,
    rating: 4.6,
    reviews: 119,
    stock: 32,
    badge: 'Sale',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A delicate rose-gold bracelet with pink stone accents for parties and premium western outfits.'
  },
  {
    id: 'maroon-chandbali',
    name: 'Maroon Kundan Chandbali Earrings',
    category: 'Earrings',
    collection: 'Chandbalis',
    occasion: 'Festive',
    color: 'Maroon',
    plating: 'Gold Plated',
    material: 'Brass',
    gemstone: 'Kundan',
    price: 899,
    mrp: 2199,
    rating: 4.7,
    reviews: 165,
    stock: 19,
    badge: 'Trending',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Statement chandbalis with maroon stone detailing and a traditional golden finish.'
  },
  {
    id: 'bridal-maangtikka',
    name: 'Pearl Kundan Bridal Maangtikka',
    category: 'Maangtikka',
    collection: 'Kundan Forever',
    occasion: 'Wedding',
    color: 'White',
    plating: 'Gold Plated',
    material: 'Brass',
    gemstone: 'Pearl',
    price: 945,
    mrp: 2499,
    rating: 4.8,
    reviews: 76,
    stock: 12,
    badge: 'Wedding Pick',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A bridal-inspired maangtikka with pearl and kundan details for traditional occasions.'
  },
  {
    id: 'minimal-mangalsutra',
    name: 'Minimal Black Bead Mangalsutra Necklace',
    category: 'Mangalsutra',
    collection: 'Daily Wear',
    occasion: 'Daily',
    color: 'Black',
    plating: 'Gold Plated',
    material: 'Alloy',
    gemstone: 'No Gemstone',
    price: 799,
    mrp: 1799,
    rating: 4.5,
    reviews: 55,
    stock: 25,
    badge: 'Daily Wear',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A minimal mangalsutra with modern proportions and a lightweight daily-wear finish.'
  },
  {
    id: 'embroidered-potli',
    name: 'Embroidered Festive Potli Bag',
    category: 'Bags',
    collection: 'Festive Bags',
    occasion: 'Reception',
    color: 'Beige',
    plating: 'NA',
    material: 'Fabric',
    gemstone: 'Artificial Stones',
    price: 1199,
    mrp: 2499,
    rating: 4.3,
    reviews: 38,
    stock: 17,
    badge: 'New',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A festive potli bag with embroidered detailing to pair with lehengas, sarees, and reception wear.'
  }
];

const CATEGORIES = [
  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80' },
  { name: 'Bangles', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80' },
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?auto=format&fit=crop&w=900&q=80' },
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80' },
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80' },
  { name: 'Anklets', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80' },
  { name: 'Maangtikka', image: 'https://images.unsplash.com/photo-1561828995-aa79a2db86dd?auto=format&fit=crop&w=900&q=80' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80' }
];

const OCCASIONS = [
  { name: 'Cocktail Party', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Sangeet', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Bridesmaid', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Mehendi', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80' },
  { name: 'Reception', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80' }
];
