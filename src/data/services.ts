export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  image: string;
  mainHeadline: string;
  introParagraph: string;
  subHeadline: string;
  subParagraph1: string;
  subParagraph2: string;
  // 📋 The exact 8 checklist features from BSB website
  features: string[];
  // Foreign key array linking to Project.id in projectsData
  projectIds: string[];
}

export const servicesData: ServiceDetail[] = [
  // ==========================================
  // 1. Steel Building Services
  // ==========================================
  {
    slug: "steel-building-services",
    title: "Steel Building Services",
    tagline: "Custom design, precision fabrication, and certified steel building erection.",
    shortDesc: "Comprehensive pre-engineered steel building solutions, heavy industrial structural fabrication, installation, and anti-rust protection.",
    image: "/steel-building.jpg",
    mainHeadline: "High-Precision Steel Building Solutions Built to Stand for Generations",
    introParagraph:
      "At Bangladesh Steel Builders Ltd., our Steel Building Services cover the entire lifecycle of industrial and commercial steel infrastructure. From initial custom design and computerized structural analysis to automated factory fabrication, on-site crane erection, and long-lasting anti-corrosion finishing, we deliver certified turnkey solutions.",
    subHeadline: "Certified Engineering, Certified Materials & Guaranteed Handover",
    subParagraph1:
      "Our pre-engineered buildings (PEB) utilize high-tensile steel designed to reduce foundation load, withstand high wind and seismic stresses, and accelerate project handover by up to 50% compared to traditional concrete.",
    subParagraph2:
      "Every steel frame is manufactured under stringent BNBC and AISC standards with ultrasonic weld verification and millimeter-precise bolt connections.",
    features: [
      "Custom Steel Building Design",
      "Pre-engineered Steel Building",
      "Steel Structure Fabrication",
      "Steel Building Installation",
      "Commercial Steel Building Construction",
      "Residential Steel Building",
      "Steel Structure Building Construction",
      "Steel Rust Prevention and Polishing",
    ],
    projectIds: ["oakhill-residence", "marina-bay-home"],
  },

  // ==========================================
  // 2. Rooftop Steel Structure & Sheds (NEW ROOFTOP FOCUS)
  // ==========================================
  {
    slug: "rooftop-steel-structures",
    title: "Rooftop Steel Structure & Sheds",
    tagline: "High-tensile lightweight roof frameworks, weather-sealed sheds, and architectural trusses.",
    shortDesc: "Turnkey rooftop steel shed fabrication, cantilever trusses, heat-reflective corrugated roofing, and weatherproofing for residential and industrial roofs.",
    image: "/service-6.jpg",
    mainHeadline: "Engineered Rooftop Steel Structures Designed for Maximum Safety and Space Utilization",
    introParagraph:
      "Transform underutilized building rooftops into functional, cyclone-resistant, and high-value covered spaces. Bangladesh Steel Builders Ltd. specializes in lightweight, high-tensile steel rooftop structures engineered to distribute weight safely across existing concrete slabs without compromising building foundations.",
    subHeadline: "Certified Structural Load Calculation & Cyclone Wind Resistance",
    subParagraph1:
      "Every rooftop installation is preceded by a structural load audit of the host building. We engineer custom truss frameworks using certified galvanized steel, anti-leak flashings, and thermal insulation to reduce indoor temperatures.",
    subParagraph2:
      "From residential rooftop rain sheds and clothes-drying canopies to commercial factory warehouse rooftop extensions, our crews execute fast, zero-disturbance erection with high-grade elastomeric waterproofing.",
    features: [
      "Custom Rooftop Steel Shed Fabrication",
      "Lightweight High-Tensile Steel Trusses",
      "Curved & Gable Rooftop Roofing Systems",
      "Waterproof Flashings & Rust-Resistant Gutters",
      "Wind-Load Certified Structural Fasteners",
      "Heat-Insulated Sandwich Roofing Panels",
      "Factory & Commercial Roof Extensions",
      "Electrostatic Anti-Corrosion Paint & Coating",
    ],
    projectIds: ["highgrove-house", "the-haven-penthouse"],
  },

  // ==========================================
  // 3. Rooftop Restaurants & Sky Lounges (NEW ROOFTOP FOCUS)
  // ==========================================
  {
    slug: "rooftop-restaurants-lounges",
    title: "Rooftop Restaurant & Sky Lounges",
    tagline: "Panoramic glass pavilions, luxury open-air dining decks, and commercial hospitality structures.",
    shortDesc: "Specialized structural steel frameworks for high-end rooftop restaurants, cafes, acoustic enclosures, panoramic glass pavilions, and open-air decks.",
    image: "/r1.jpg",
    mainHeadline: "Bespoke Rooftop Hospitality Structures Engineered for Luxury & Ambiance",
    introParagraph:
      "Rooftop dining and hospitality venues require specialized engineering that balances dramatic aesthetics with heavy commercial kitchen loads, fire safety regulations, and weather resilience. BSB designs and fabricates turnkey rooftop restaurant frameworks across Dhaka and major commercial centers.",
    subHeadline: "Integrated Glass Enclosures, Floating Decks & Acoustic Dampening",
    subParagraph1:
      "We fabricate elegant column-free steel pavilions with floor-to-ceiling double-glazed thermal break glass walls, offering breathtaking skyline vistas while protecting patrons from extreme heat, heavy monsoons, and wind turbulence.",
    subParagraph2:
      "Our engineers integrate dedicated grease trap supports, reinforced kitchen equipment slabs, acoustic vibration isolation, and ambient concealed architectural lighting channels.",
    features: [
      "Architectural Glass & Steel Pavilions",
      "High-Load Commercial Kitchen Foundations",
      "Acoustic & Vibration Isolated Floor Slabs",
      "Panoramic Skyline Glass Facade Systems",
      "Custom Steel Mezzanines & Dining Decks",
      "Integrated Rain Drainage & Wind Deflectors",
      "Fire-Retardant Structural Protective Coating",
      "BNBC Commercial Compliance & Fast Permitting",
    ],
    projectIds: ["crestwood-courtyard", "solis-sky-lounge"],
  },

  // ==========================================
  // 4. Rooftop Garden, Pergola & Sky Terraces (NEW ROOFTOP FOCUS)
  // ==========================================
  {
    slug: "rooftop-garden-pergola",
    title: "Rooftop Garden, Pergola & Sky Terraces",
    tagline: "Motorized bioclimatic pergolas, luxury sky terrace framing, and green roof infrastructure.",
    shortDesc: "Modern outdoor living structures, motorized bioclimatic aluminum/steel pergolas, water features, lightweight planters, and luxury sky gardens.",
    image: "/p3.jpg",
    mainHeadline: "Luxury Rooftop Living & Biophilic Sky Sanctuaries Engineered to Last",
    introParagraph:
      "Elevate your lifestyle with architecturally stunning rooftop gardens and modern pergolas. We combine high-strength steel and powder-coated aluminum framing with lightweight engineered substrate planting to create breathtaking urban rooftop retreats.",
    subHeadline: "Bioclimatic Louvers, Weatherproof Pergolas & Dual Waterproofing",
    subParagraph1:
      "Our motorized louvered pergolas feature automated weather sensors that close during rainfall and adjust angle for optimal sun shading, providing comfortable outdoor living in all seasons.",
    subParagraph2:
      "We incorporate multi-layer root barriers, drainage membranes, concealed drip irrigation framing, and ambient LED fixtures to create a lush green oasis that safeguards the building from water intrusion.",
    features: [
      "Motorized Louvered Pergolas & Canopies",
      "Multi-Tiered Rooftop Deck Framing",
      "Lightweight Hydroponic Planter Boxes",
      "UV-Protected Tensile Fabric Structures",
      "Dual-Membrane Elastomeric Waterproofing",
      "Concealed LED Sconce & Mood Illumination",
      "All-Weather Powder-Coated Metal Finishes",
      "Wind-Resistant Glass Balustrades & Railings",
    ],
    projectIds: ["highgrove-house", "verdant-terrace"],
  },

  // ==========================================
  // 5. Rooftop Solar Canopies & Walkways (NEW ROOFTOP FOCUS)
  // ==========================================
  {
    slug: "rooftop-solar-canopies",
    title: "Rooftop Solar Canopies & Walkways",
    tagline: "Heavy-duty elevated solar mounting structures, maintenance walkways, and rooftop extensions.",
    shortDesc: "Elevated industrial solar mounting steel frameworks, safety railings, inspection walkways, and structural roof slab reinforcements.",
    image: "/service-3.jpg",
    mainHeadline: "High-Elevation Solar Mounting & Industrial Rooftop Access Frameworks",
    introParagraph:
      "Maximize renewable solar generation without losing usable rooftop floor area. Bangladesh Steel Builders Ltd. designs and erects elevated rooftop solar canopies that suspend solar arrays high above the roof surface, allowing the space below to remain fully utilized for parking, storage, or leisure.",
    subHeadline: "Hot-Dip Galvanized Framing Rated for Severe Wind Gusts",
    subParagraph1:
      "Manufactured with premium hot-dip galvanized steel, our solar canopies withstand coastal winds and aggressive industrial atmospheric conditions with a lifespan exceeding 25 years.",
    subParagraph2:
      "We provide non-penetrating counterweight footing options or certified chemical anchoring, together with anti-slip inspection walkways, lifelines, and safety perimeter balustrades.",
    features: [
      "Elevated Solar Panel Mounting Trusses",
      "Industrial Roof Walkways & Safety Catwalks",
      "Galvanized Hot-Dip Structural Framing",
      "High-Velocity Cyclone Wind Resistance",
      "Existing Slab Load-Bearing Verification",
      "Non-Penetrating & Chemical Anchor Systems",
      "Industrial Sky-Light & Ventilation Vents",
      "Turnkey Engineering & Fabrication Handover",
    ],
    projectIds: ["jmi-shankur-auto-tank", "maysha-spining-mill"],
  },

  // ==========================================
  // 6. Construction Services
  // ==========================================
  {
    slug: "construction-services",
    title: "Construction Services",
    tagline: "Turnkey general contracting, high-rise buildings, and civil infrastructure.",
    shortDesc: "End-to-end construction management for high-rise commercial towers, hospitals, power substations, deep piling, and civil works.",
    image: "/construction.jpg",
    mainHeadline: "Turnkey Civil Infrastructure & Large-Scale Construction Management",
    introParagraph:
      "Our Construction Services division provides single-point management for commercial high-rises, healthcare facilities, industrial manufacturing complexes, and public infrastructure. We combine engineering excellence, certified equipment, and disciplined site coordination to deliver projects on time and within budget.",
    subHeadline: "From Deep Groundwork to Structural Topping Out",
    subParagraph1:
      "We execute deep cast-in-situ foundation piling, reinforced concrete superstructures, electrical substation frameworks, and road infrastructure engineered for heavy operational loads.",
    subParagraph2:
      "With over 17 years of construction leadership in Bangladesh, our site managers enforce rigorous QA/QC inspections and uncompromising safety protocols across every phase.",
    features: [
      "High Rise Building Construction",
      "Residential Building Construction",
      "Hospital Building Construction",
      "Roads and Highway Construction",
      "Bridge & Culvert Construction",
      "Power Plant Construction",
      "Sub Station Construction",
      "Foundation & Piling Service",
    ],
    projectIds: ["highgrove-house", "ridgeline-house"],
  },

  // ==========================================
  // 7. Architectural Services
  // ==========================================
  {
    slug: "architectural-services",
    title: "Architectural Services",
    tagline: "Functional architectural planning, 3D visualization, and interior modeling.",
    shortDesc: "Complete building design, 3D photorealistic BIM modeling, sustainable architecture, interior design, and structural analysis.",
    image: "/Steel-Building-Projects-8.webp",
    mainHeadline: "Visionary Architectural Aesthetics Grounded in Structural Feasibility",
    introParagraph:
      "BSB's Architectural Services team bridges the gap between creative design and engineering reality. We produce comprehensive architectural layouts, 3D visualizations, and municipal zoning documentation that optimize space, natural lighting, and long-term functionality.",
    subHeadline: "Photorealistic 3D Modeling & Sustainable Engineering",
    subParagraph1:
      "Through advanced 3D BIM visualization, clients can virtually inspect their industrial factory or commercial facility before fabrication begins, eliminating costly on-site revisions.",
    subParagraph2:
      "Our architects incorporate climate-resilient sustainable design, optimal structural analysis, and interior layout planning to deliver spaces that are both inspiring and efficient.",
    features: [
      "Interior Design Services",
      "Building Design & Drafting",
      "3D Visualization",
      "Architectural Planning & Zoning",
      "Landscape Architecture",
      "Sustainable Building Design",
      "Renovation & Restoration Design",
      "Structural Analysis",
    ],
    projectIds: ["oakhill-residence", "ridgeline-house"],
  },

  // ==========================================
  // Legacy / Direct Aliases (Ensuring no 404s)
  // ==========================================
  {
    slug: "pre-engineered-steel-buildings",
    title: "Pre-Engineered Steel Buildings (PEB)",
    tagline: "Custom-designed, factory-manufactured steel frameworks.",
    shortDesc: "Turnkey PEB solutions for industrial manufacturing sheds, heavy warehouses, and commercial steel buildings.",
    image: "/s1.jpg",
    mainHeadline: "Pioneering Pre-Engineered Steel Solutions Across Bangladesh",
    introParagraph: "Bangladesh Steel Builders Ltd. designs, fabricates, and erects world-class Pre-Engineered Steel Buildings (PEB).",
    subHeadline: "Engineered for Strength, Speed & Cost Optimization",
    subParagraph1: "Our PEB frameworks reduce construction timelines by up to 50% compared to traditional concrete.",
    subParagraph2: "Every column, rafter, and purlin is precision-manufactured in our certified fabrication facility.",
    features: [
      "Custom Steel Building Design",
      "Pre-engineered Steel Building",
      "Commercial Steel Building Construction",
      "Residential Steel Building",
      "Industrial Factory Sheds & Warehouses",
      "Heavy Load Truss Systems",
    ],
    projectIds: ["oakhill-residence", "marina-bay-home"],
  },
  {
    slug: "structural-steel-fabrication",
    title: "Structural Steel Fabrication & Installation",
    tagline: "Millimeter-precision steel fabrication and certified erection.",
    shortDesc: "Certified fabrication of heavy industrial steel beams, high-tensile trusses, and precision on-site erection.",
    image: "/s2.jpg",
    mainHeadline: "Heavy Industrial Steel Fabrication Built to Last",
    introParagraph: "We specialize in heavy structural steel fabrication and erection for industrial plants and infrastructure.",
    subHeadline: "Master Craftsmanship & Certified Welding",
    subParagraph1: "Our fabrication works adhere strictly to AISC and BNBC engineering standards.",
    subParagraph2: "Dedicated crane fleet and certified rigging crews for safe on-site erection.",
    features: [
      "Steel Structure Fabrication",
      "Steel Building Installation",
      "Steel Structure Building Construction",
      "High-Tensile Beam Welding",
      "Heavy Industrial Rigging",
    ],
    projectIds: ["highgrove-house", "ridgeline-house"],
  },
  {
    slug: "industrial-commercial-construction",
    title: "Industrial & Commercial Construction",
    tagline: "Turnkey civil engineering and high-rise commercial structures.",
    shortDesc: "Comprehensive construction services for high-rise commercial towers and industrial facilities.",
    image: "/s3.jpg",
    mainHeadline: "Turnkey Construction Management from Foundation to Handover",
    introParagraph: "BSB delivers comprehensive general contracting and construction management.",
    subHeadline: "Single Point of Engineering Accountability",
    subParagraph1: "Unified management of steel structures, civil works, and mechanical installations.",
    subParagraph2: "Milestone-driven construction schedule with zero budget creep.",
    features: [
      "High Rise Building Construction",
      "Residential Building Construction",
      "Hospital Building Construction",
      "Commercial Factory Complexes",
    ],
    projectIds: ["oakhill-residence", "highgrove-house"],
  },
];
