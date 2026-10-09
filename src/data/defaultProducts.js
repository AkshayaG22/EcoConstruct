export const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    title: "Sustainable Bamboo Flooring Planks",
    category: "Bamboo",
    price: 48.50,
    ecoRating: 5,
    certifications: ["FSC Certified", "Carbon Neutral", "VOC-Free", "LEED Compliant"],
    imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    description: "High-density strand woven architectural bamboo planks offering three times the hardness of red oak with 100% natural, non-toxic bio-resin bonding.",
    specs: {
      dimensions: "920mm x 130mm x 14mm",
      embodiedCarbon: "-4.2 kg CO₂e / m² (Carbon Negative)",
      durability: "Janka Hardness 3,000+ lbf",
      finish: "Zero-VOC Ceramic UV Matte Finish",
      leedContribution: "MR Credit 6 (Rapidly Renewable Materials) & EQ Credit 4.4",
      warranty: "25-Year Residential / 15-Year Commercial"
    },
    stock: 450,
    unit: "sq.m"
  },
  {
    id: "prod-2",
    title: "Recycled Steel Standing Seam Roof Panels",
    category: "Roofing",
    price: 89.00,
    ecoRating: 5,
    certifications: ["Recycled Content", "LEED Compliant", "Carbon Neutral"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-gauge architectural standing seam roofing fabricated from 92% recycled structural steel with cool-roof reflective thermo-coatings.",
    specs: {
      dimensions: "3000mm x 450mm x 0.75mm (24-Gauge)",
      embodiedCarbon: "8.5 kg CO₂e / panel (78% reduction vs virgin steel)",
      durability: "Class 4 Hail Resistance, 140mph Wind Rated",
      finish: "Kynar 500 Cool Roof Coating (SRI 82)",
      leedContribution: "MR Credit 4 (Recycled Content) & SS Credit 7.2 (Heat Island)",
      warranty: "50-Year Structural Lifespan"
    },
    stock: 220,
    unit: "panel"
  },
  {
    id: "prod-3",
    title: "Reclaimed Vintage Barn Oak Planks",
    category: "Timber & Wood",
    price: 64.00,
    ecoRating: 5,
    certifications: ["FSC Certified", "Recycled Content", "Carbon Neutral"],
    imageUrl: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",
    description: "Centuries-old heritage white oak timber salvaged from dismantled historic barns, kiln-sterilized and precision tongue-and-groove milled.",
    specs: {
      dimensions: "Random lengths 1200mm - 2400mm x 150mm x 19mm",
      embodiedCarbon: "-18.4 kg CO₂e / m² (Net Sequestered Carbon)",
      durability: "Dense Old-Growth Grain (Heartwood > 85%)",
      finish: "Natural Linseed Oil & Beeswax Sealant",
      leedContribution: "MR Credit 3 (Materials Reuse) & MR Credit 5",
      warranty: "Lifetime Structural Integrity"
    },
    stock: 180,
    unit: "sq.m"
  },
  {
    id: "prod-4",
    title: "Living Vegetated Roof Sedum Mat Substrate",
    category: "Roofing",
    price: 42.00,
    ecoRating: 5,
    certifications: ["LEED Compliant", "Carbon Neutral", "Recycled Content"],
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    description: "Engineered multi-species Sedum vegetation tile with lightweight recycled expanded clay substrate for superior stormwater mitigation and thermal insulation.",
    specs: {
      dimensions: "1000mm x 1000mm x 80mm",
      embodiedCarbon: "Negative Net Lifecycle (Active Carbon Sequestering)",
      durability: "Extreme Drought & Frost Resistant (-30°C to +45°C)",
      finish: "Live Perennial Sedum Blend (8 hardy varieties)",
      leedContribution: "SS Credit 6.1 (Stormwater) & EA Credit 1 (Energy Optimization)",
      warranty: "10-Year Horticultural Establishment"
    },
    stock: 310,
    unit: "sq.m"
  },
  {
    id: "prod-5",
    title: "Natural Hemp Thermal Insulation Batts",
    category: "Insulation",
    price: 34.50,
    ecoRating: 5,
    certifications: ["VOC-Free", "Carbon Neutral", "LEED Compliant"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "Non-toxic, carbon-negative thermal & acoustic insulation made from renewable hemp fibers treated with natural borate mineral salts.",
    specs: {
      dimensions: "1200mm x 580mm x 100mm (Pack of 6 Batts)",
      embodiedCarbon: "-2.8 kg CO₂e / pack (Hemp sequestering during growth)",
      durability: "R-13 Thermal Resistance / ASTM E84 Class A Fire Rated",
      finish: "Naturally breathable, itch-free non-hazardous fibers",
      leedContribution: "MR Credit 6 & IEQ Credit 4.2 (Low-Emitting Materials)",
      warranty: "30-Year Performance Retention"
    },
    stock: 160,
    unit: "bundle"
  },
  {
    id: "prod-6",
    title: "Ocean-Plastic Composite Decking Interlock Tiles",
    category: "Composites",
    price: 55.00,
    ecoRating: 4,
    certifications: ["Recycled Content", "VOC-Free", "LEED Compliant"],
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
    description: "Weatherproof modular decking tiles manufactured using 95% reclaimed ocean-bound HDPE plastics and reclaimed forestry wood fibers.",
    specs: {
      dimensions: "300mm x 300mm x 22mm (Box covers 1 sq.m)",
      embodiedCarbon: "3.2 kg CO₂e / sq.m (Diverts 42 plastic bottles per tile)",
      durability: "UV Resistant, Slip Resistance Rating R11, Zero Splinters",
      finish: "Deep Woodgrain Embossed Matte Texture",
      leedContribution: "MR Credit 4 (Recycled Content)",
      warranty: "20-Year Anti-Fade & Rot Warranty"
    },
    stock: 520,
    unit: "sq.m"
  }
];

export const CATEGORIES = [
  "All",
  "Timber & Wood",
  "Bamboo",
  "Roofing",
  "Insulation",
  "Recycled Materials",
  "Composites",
  "Custom"
];

export const CERTIFICATIONS = [
  "FSC Certified",
  "Carbon Neutral",
  "VOC-Free",
  "Recycled Content",
  "LEED Compliant"
];

export const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80";
