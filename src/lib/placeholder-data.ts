export type Product = {
  id: number;
  name: string;
  category: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  details: string[];
  availableSizes?: ('S' | 'M' | 'L' | 'XL')[];
  availableColors?: { name: string; hex: string }[];
  reviews: { average: number; count: number };
  isFeatured?: boolean;
};

export type Category = {
  name: string;
  href: string;
  imageSrc: string;
  description: string;
};

export const categories: Category[] = [
  {
    name: "Clothing",
    href: "/category/clothing",
    imageSrc: "/images/clothe1.jpg",
    description: "Classic and modern clothing for every occasion.",
  },
  {
    name: "Electronics",
    href: "/category/electronics",
    imageSrc: "/images/electronics1.webp",
    description: "The latest and greatest in tech.",
  },
  {
    name: "Accessories",
    href: "/category/accessories",
    imageSrc: "/images/accessories1.avif",
    description: "Complete your look with these accessories.",
  },
  {
    name: "Perfumes",
    href: "/category/perfumes",
    imageSrc: "/images/perfume1.jpg",
    description: "Find your signature scent.",
  },
];

export const products: Product[] = [
  // --- CLOTHING ---
  {
    id: 1,
    name: "Classic Crewneck Tee",
    category: "Clothing",
    href: "#",
    price: "$48.00",
    imageSrc:
      "/images/clothe1.jpg",
    imageAlt: "A classic black crewneck t-shirt on a hanger.",
    description:
      "The perfect foundation for any outfit, our Classic Crewneck Tee is crafted from ultra-soft pima cotton for a premium feel and superior breathability. Its tailored fit is designed to be worn on its own or layered.",
    details: [
      "100% Pima Cotton",
      "Pre-shrunk fabric",
      "Tailored fit",
      "Made in USA",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Grey", hex: "#808080" },
    ],
    reviews: { average: 4.5, count: 117 },
  },
  {
    id: 2,
    name: "Denim Work Jacket",
    category: "Clothing",
    href: "#",
    price: "$125.00",
    imageSrc:
      "/images/clothe2.webp",
    imageAlt: "Man wearing a blue denim jacket.",
    isFeatured: true,
    description:
      "A timeless icon, our Denim Work Jacket is built from rugged 14oz selvedge denim that breaks in beautifully over time. Featuring classic details like welt hand pockets and a custom shank button closure.",
    details: [
      "14oz Selvedge Denim",
      "Unlined for versatility",
      "Two chest pockets, two hand pockets",
      "Adjustable waist tabs",
    ],
    availableSizes: ["S", "M", "L", "XL"],
    reviews: { average: 5, count: 89 },
  },
  {
    id: 3,
    name: "Linen Button-Up Shirt",
    category: "Clothing",
    href: "#",
    price: "$85.00",
    imageSrc:
      "/images/clothe3.avif",
    imageAlt: "A white linen button-up shirt.",
    description:
      "Stay cool and comfortable in our lightweight Linen Button-Up. Made from 100% European flax, it's the perfect breathable choice for warm weather, offering a relaxed yet sophisticated look.",
    details: [
      "100% European Flax Linen",
      "Natural shell buttons",
      "Single chest pocket",
      "Relaxed fit",
    ],
    availableSizes: ["S", "M", "L"],
    reviews: { average: 4, count: 45 },
  },
  {
    id: 4,
    name: "Wool Beanie",
    category: "Clothing",
    href: "#",
    price: "$35.00",
    imageSrc:
      "/images/clothe4.webp",
    imageAlt: "A person wearing a grey wool beanie.",
    description:
      "A versatile essential for cold weather, this beanie is knit from soft, temperature-regulating merino wool. Its classic ribbed design ensures a snug and comfortable fit.",
    details: [
      "100% Merino Wool",
      "Ribbed knit construction",
      "One size fits most",
      "Made in USA",
    ],
    reviews: { average: 4.5, count: 210 },
  },

  // --- ELECTRONICS ---
  {
    id: 5,
    name: "Wireless Over-Ear Headphones",
    category: "Electronics",
    href: "#",
    price: "$249.99",
    imageSrc:
      "/images/electronics1.webp",
    imageAlt: "Sleek black wireless over-ear headphones.",
    isFeatured: true,
    description:
      "Immerse yourself in rich, detailed sound with these premium wireless headphones. Featuring active noise cancellation, a 30-hour battery life, and plush memory foam earcups for all-day comfort.",
    details: [
      "Active Noise Cancellation (ANC)",
      "30-Hour Battery Life",
      "Bluetooth 5.2 Connectivity",
      "Built-in Microphone",
    ],
    availableColors: [
      { name: "Matte Black", hex: "#222222" },
      { name: "Space Grey", hex: "#A9A9A9" },
      { name: "Midnight Blue", hex: "#191970" },
    ],
    reviews: { average: 4, count: 204 },
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    category: "Electronics",
    href: "#",
    price: "$180.00",
    imageSrc:
      "/images/electronics2.avif",
    imageAlt: "A modern mechanical keyboard with RGB lighting.",
    description:
      "Elevate your typing experience with a fully customizable mechanical keyboard. Hot-swappable switches, dynamic RGB backlighting, and a solid aluminum frame provide a premium feel and satisfying tactile feedback.",
    details: [
      "Hot-swappable switch sockets",
      "Per-key RGB lighting",
      "Solid CNC-machined aluminum frame",
      "QMK/VIA compatible",
    ],
    reviews: { average: 5, count: 131 },
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    href: "#",
    price: "$99.50",
    imageSrc:
      "/images/electronics23.webp",
    imageAlt: "A compact black bluetooth speaker.",
    description:
      "Take your music anywhere with this compact yet powerful Bluetooth speaker. A rugged, waterproof design and a 12-hour battery life make it the perfect companion for any adventure.",
    details: [
      "IPX7 Waterproof Rating",
      "12-Hour Battery Life",
      "360-degree sound",
      "Integrated carry strap",
    ],
    reviews: { average: 4.5, count: 350 },
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Electronics",
    href: "#",
    price: "$399.00",
    imageSrc:
      "/images/electronics4.webp",
    imageAlt: "A smart watch displaying the time.",
    description:
      "Stay connected and track your fitness goals with our latest generation smart watch. Features a bright OLED display, advanced health sensors, and seamless smartphone integration.",
    details: [
      "Always-On OLED Display",
      "Heart Rate & Blood Oxygen Sensors",
      "GPS and Cellular models available",
      "Up to 18 hours of battery life",
    ],
    reviews: { average: 4, count: 188 },
  },

  // --- ACCESSORIES ---
  {
    id: 9,
    name: "Leather Strap Watch",
    category: "Accessories",
    href: "#",
    price: "$195.00",
    imageSrc:
      "/images/accessories1.avif",
    imageAlt: "A minimalist watch with a brown leather strap.",
    description:
      "A classic timepiece that combines minimalist design with exceptional craftsmanship. Features a reliable Japanese quartz movement and a genuine leather strap that develops a unique patina over time.",
    details: [
      "Japanese Miyota Quartz Movement",
      "316L Stainless Steel Case",
      "Genuine Leather Strap",
      "5 ATM Water Resistance",
    ],
    reviews: { average: 5, count: 76 },
  },
  {
    id: 10,
    name: "Canvas Backpack",
    category: "Accessories",
    href: "#",
    price: "$90.00",
    imageSrc:
      "/images/accessories2.webp",
    imageAlt: "A sturdy canvas backpack in a neutral color.",
    description:
      "Built for daily commutes and weekend excursions, this backpack is made from durable, water-resistant waxed canvas. It features a padded laptop sleeve and multiple pockets for organization.",
    details: [
      "18oz Waxed Canvas",
      'Padded sleeve fits 15" laptop',
      "Leather accents",
      "Exterior water bottle pockets",
    ],
    reviews: { average: 4, count: 102 },
  },
  {
    id: 11,
    name: "Aviator Sunglasses",
    category: "Accessories",
    href: "#",
    price: "$150.00",
    imageSrc:
      "/images/accessories3.avif",
    imageAlt: "Classic aviator sunglasses.",
    isFeatured: true,
    description:
      "A timeless design that combines classic style with modern technology. Our Aviator Sunglasses feature polarized lenses for superior glare reduction and a lightweight metal frame for comfortable, all-day wear.",
    details: [
      "100% UV Protection Polarized Lenses",
      "Lightweight Stainless Steel Frame",
      "Adjustable Silicone Nose Pads",
      "Includes hard case",
    ],
    availableColors: [
      { name: "Gold", hex: "#FFD700" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Matte Black", hex: "#222222" },
    ],
    reviews: { average: 4.5, count: 98 },
  },
  {
    id: 12,
    name: "Leather Cardholder",
    category: "Accessories",
    href: "#",
    price: "$55.00",
    imageSrc:
      "/images/accesories4.jpg",
    imageAlt: "A slim brown leather cardholder wallet.",
    description:
      "Streamline your essentials with our minimalist leather cardholder. Crafted from full-grain leather, it features four card slots and a central pocket for folded cash, fitting comfortably in any pocket.",
    details: [
      "Full-grain Italian leather",
      "4 exterior card slots",
      "Central cash pocket",
      "Slim profile design",
    ],
    reviews: { average: 5, count: 150 },
  },

  // --- PERFUMES ---
  {
    id: 13,
    name: "Artisan Eau de Parfum",
    category: "Perfumes",
    href: "#",
    price: "$120.00",
    imageSrc:
      "/images/perfume1.jpg",
    imageAlt: "A stylish bottle of artisan perfume.",
    description:
      "A complex and captivating scent inspired by a blooming summer garden. Notes of jasmine, tuberose, and orange blossom create a light yet unforgettable floral fragrance.",
    details: [
      "Notes: Jasmine, Tuberose, Orange Blossom",
      "Eau de Parfum concentration",
      "Unisex fragrance",
      "100ml Bottle",
    ],
    reviews: { average: 4.5, count: 88 },
  },
  {
    id: 14,
    name: "Scented Candle",
    category: "Perfumes",
    href: "#",
    price: "$45.00",
    imageSrc:
      "/images/perfume2.jpg",
    imageAlt: "A scented candle in a glass jar.",

    description:
      "Create a warm and inviting atmosphere with our hand-poured scented candle. Made with a natural soy wax blend and premium fragrance oils for a clean, long-lasting burn.",
    details: [
      "Natural Soy Wax Blend",
      "60-hour burn time",
      "Notes of Sandalwood, Amber, and Vanilla",
      "Hand-poured in small batches",
    ],
    reviews: { average: 5, count: 320 },
  },
  {
    id: 15,
    name: "Oud Wood Fragrance",
    category: "Perfumes",
    href: "#",
    price: "$210.00",
    imageSrc:
      "/images/perfume3.webp",
    imageAlt: "A luxury bottle of Oud Wood fragrance.",
    isFeatured: true,
    description:
      "An exotic and distinctive fragrance featuring rare oud wood, one of the most precious ingredients in a perfumer's arsenal. This scent blends oud with sandalwood and vetiver for a rich, complex, and sensual aroma.",
    details: [
      "Notes: Oud Wood, Sandalwood, Vetiver, Tonka Bean",
      "Eau de Parfum concentration",
      "Unisex fragrance",
      "50ml Bottle",
    ],
    reviews: { average: 5, count: 254 },
  },
  {
    id: 16,
    name: "Fresh Linen Room Spray",
    category: "Perfumes",
    href: "#",
    price: "$38.00",
    imageSrc:
      "/images/perfume4.webp",
    imageAlt: "A bottle of fresh linen room spray.",
    description:
      "Instantly refresh any space with the clean and comforting scent of fresh linen. Perfect for linens, upholstery, or as a general air freshener.",
    details: [
      "Scent of freshly laundered linen",
      "Use on fabrics or in the air",
      "Non-aerosol spray",
      "250ml Bottle",
    ],
    reviews: { average: 4.5, count: 91 },
  },
];