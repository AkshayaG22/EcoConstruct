# EcoConstruct Pro 🌿

**EcoConstruct Pro** is a production-grade, mobile-first Progressive Web App (PWA) and responsive desktop e-commerce platform for sustainable construction and eco-friendly building materials.

---

## 🌟 Key Features

### 1. Progressive Web App (PWA) & Offline Ready
- **Installable Standalone App**: Configured with `manifest.json`, Web App Manifest standards, standalone display mode, and custom icons.
- **Service Worker (`sw.js`)**: Implements stale-while-revalidate and network-first caching for offline access to material specifications on remote job sites.
- **Cross-Platform Support**: Includes explicit install prompts and step-by-step guidance for iOS Safari ("Add to Home Screen") and Android Chrome.

### 2. Dynamic Product Management (Admin Modal)
- Accessible **"+ Add Product"** trigger in top navigation and mobile bottom bar.
- Form inputs supporting:
  - Product Title
  - Category dropdown (*Timber & Wood, Bamboo, Roofing, Insulation, Recycled Materials, Composites, Custom*)
  - Unit Price ($ USD or ₹ INR)
  - Unit Metric (*sq.m, sq.ft, panel, bundle, block, linear ft, ton*)
  - Interactive Eco-Rating (1 to 5 Stars)
  - Sustainability Certifications checkboxes (*FSC Certified, Carbon Neutral, VOC-Free, Recycled Content, LEED Compliant*)
  - Image URL with instant live preview and one-click default eco stock fallback
  - Short Description & Detailed Technical Specifications (*Dimensions, Embodied Carbon, Durability / R-Value, LEED Credits, Warranty*)
- Dynamic additions immediately persist to browser `localStorage` and appear at the top of the catalog.

### 3. Product Catalog, Search & Filtering
- Pre-populated with 6 default high-performance materials:
  1. *Sustainable Bamboo Flooring Planks* (Bamboo)
  2. *Recycled Steel Standing Seam Roof Panels* (Roofing)
  3. *Reclaimed Vintage Barn Oak Planks* (Timber & Wood)
  4. *Living Vegetated Roof Sedum Mat Substrate* (Roofing)
  5. *Natural Hemp Thermal Insulation Batts* (Insulation)
  6. *Ocean-Plastic Composite Decking Interlock Tiles* (Composites)
- Real-time text search across titles, descriptions, and categories.
- Category filter pills with smooth horizontal scrolling.
- Eco-Rating filter toggles (*All, 4+ Stars, 5 Stars*).
- Multi-certification filters (*FSC Certified, Carbon Neutral, VOC-Free, etc.*).
- Technical Specs modal preview with LEED v4.1 credits and embodied carbon analysis.

### 4. Interactive Shopping Cart
- Slide-out drawer on desktop, smooth bottom-sheet modal on mobile.
- Item quantity increment/decrement (`-` and `+`) with auto removal at 0.
- Item removal with confirmation modal.
- Transparent calculation breakdown:
  - **Subtotal**: $\sum (\text{Price} \times \text{Quantity})$
  - **Free Shipping Threshold**: Free over $100 (visual animated progress bar; standard $15.99 otherwise).
  - **Estimated Tax**: 8.75% of Subtotal.
  - **Total**: Subtotal + Shipping + Tax.
- Persistent badge showing live item count.

### 5. Multi-Step Checkout & Payment Simulation
- **Step 1: Shipping Address**: Jobsite recipient details, street address, city, state, PIN/ZIP, phone.
- **Step 2: Shipping Method**: Standard Green Shipping (EV freight rail) vs. Express Zero-Emission (Solar-charged priority courier).
- **Step 3: Payment Method Tabs**:
  - *Credit / Debit Card*: Interactive virtual card preview, auto-spaced 16-digit card number formatting, MM/YY expiry, CVV.
  - *UPI / QR Code*: Realistic scannable QR code preview and mock UPI ID input (`builder@okaxis`).
  - *Cash on Delivery / Green Trade Credit*: Net-30 credit for USGBC/LEED registered contractors.
- **Step 4: Order Summary Review**: Real-time line-item review and embodied carbon diversion metric.
- **1-Second Simulated Processing State**: Animated emerald spinner reserving circular inventory.
- **Order Confirmed Modal**:
  - Festive eco confetti celebration (`canvas-confetti`).
  - Unique generated Order ID (e.g. `ECO-849201`).
  - Shipping site details and estimated delivery timeline.
  - Carbon offset certificate registration badge.
  - Printable receipt generator.
  - Persistent order storage in `localStorage`.

---

## 🎨 Design & Aesthetic System
- **Emerald Green Primary**: `#059669`
- **Slate Dark Neutral**: `#0F172A`
- **Card Surfaces**: `#1E293B` & `#F8FAFC`
- **Subtle Dividers**: `#334155` & `#E2E8F0`
- **Typography**: Inter Sans, high-legibility numerals
- **Touch-Friendly**: Minimum 48dp touch targets on all buttons and mobile bottom navigation.
- **Environmental Metrics**: *"Over 2.4M tons of waste diverted from landfills"*, *"1,850+ LEED Projects"*.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm install
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```
The server runs locally at: `http://localhost:3000/`.
