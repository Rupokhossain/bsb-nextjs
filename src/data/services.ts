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
  // 📋 The exact 8 checklist features
  features: string[];
  // Foreign key array linking to Project.id in projectsData
  projectIds: string[];
}

export const servicesData: ServiceDetail[] = [
  // ==========================================
  // 1. Classical Steel Structure Duplex Building (NIRMAN BSB CORE)
  // ==========================================
  {
    slug: "structure-duplex-building",
    title: "Structure Duplex Building",
    tagline: "Earthquake-resilient steel frame duplex houses, neoclassical luxury villas, and fast-track turnkey residences.",
    shortDesc: "Turnkey luxury steel structure duplex homes and multi-level modern villas. 50% faster construction, column-free interior flexibility, and superior seismic safety.",
    image: "/d1.jpg",
    mainHeadline: "Modern Steel Frame Duplex Buildings Engineered for Luxury, Speed & Safety",
    introParagraph:
      "Nirman BSB pioneers modern residential steel duplex construction across Bangladesh. By replacing heavy, slow concrete columns with certified high-tensile structural steel frames, we build architecturally breathtaking duplex villas that are completed in half the time of traditional RCC construction.",
    subHeadline: "Column-Free Architectural Freedom & Maximum Earthquake Resilience",
    subParagraph1:
      "Our steel frame duplex engineering allows wide, expansive living and dining areas without bulky supporting pillars. Every joint is precision-bolted and seismically tested according to the latest BNBC standards for ultimate earthquake and cyclone protection.",
    subParagraph2:
      "We integrate premium insulated sandwich wall panels, classical front pillars, cantilever steel staircases, panoramic glass facades, and anti-corrosive protective finishes to deliver a home that is whisper-quiet, thermally insulated, and built to last generations.",
    features: [
      "Custom 3D BIM Architectural Duplex Plans",
      "Earthquake & High-Seismic Resistant Steel Frame",
      "50% Faster Construction Timeline than RCC",
      "Expansive Column-Free Living & Lounge Spaces",
      "Neoclassical Pillars & Front Car Porch Design",
      "Acoustic & Thermal Insulated Sandwich Panels",
      "Modern Cantilever Balconies & Glass Railings",
      "Turnkey Design, Fabrication & Site Erection",
    ],
    projectIds: ["bespoke-steel-duplex-villa", "oakhill-residence"],
  },

  // ==========================================
  // 2. Luxury Steel Duplex Pool Villa (NIRMAN BSB CORE)
  // ==========================================
  {
    slug: "luxury-duplex-pool-villa",
    title: "Luxury Duplex Pool Villa",
    tagline: "Bespoke steel frame duplex villas with private swimming pools, composite sun decks, and luxury resort living.",
    shortDesc: "Turnkey luxury steel structure duplex pool villas, cantilever sun decks, outdoor lounge pavilions, and resort-style living spaces built with certified steel durability.",
    image: "/d2.webp",
    mainHeadline: "Resort-Style Modern Duplex Pool Villas Built with Precision Structural Steel",
    introParagraph:
      "Nirman BSB designs and constructs bespoke steel frame duplex villas featuring private swimming pools, cantilever lounge decks, and expansive outdoor entertainment pavilions. By uniting high-tensile earthquake-resilient steel structures with modern architectural luxury, we bring private resort living right into your personal residence.",
    subHeadline: "Private Aquatic Sanctuary & Architectural Steel Pavilion Engineering",
    subParagraph1:
      "Our duplex pool villas integrate deep-ground moisture proofing, automated swimming pool filtration, and cantilevered steel canopy decks that extend seamlessly over the water with zero structural sagging.",
    subParagraph2:
      "Every structural frame is fabricated from high-strength galvanized steel, ensuring lifetime resistance against moisture, humidity, termites, and seismic vibration.",
    features: [
      "Custom Steel Frame Duplex Villa Architecture",
      "Integrated Private Swimming Pool Engineering",
      "Cantilever Sun Decks & Panoramic Lounges",
      "Floor-to-Ceiling Thermal Glass Wall Facades",
      "Earthquake-Resilient Steel Framing (BNBC)",
      "Waterproof Pool Deck Drainage & Recirculation",
      "Concealed LED Sconce & Underwater Illumination",
      "Turnkey Architectural & Structural Handover",
    ],
    projectIds: ["luxury-steel-pool-villa", "oakhill-residence"],
  },

  // ==========================================
  // 3. Duplex & Multi-Storey Residential Construction (NIRMAN BSB CORE)
  // ==========================================
  // {
  //   slug: "duplex-multistorey-construction",
  //   title: "Duplex & Multi-Storey Residential Construction",
  //   tagline: "Architectural design, 3D elevation modeling, and turnkey steel structure construction for multi-level homes.",
  //   shortDesc: "Turnkey architectural planning, 3D elevations, and structural steel construction for modern duplex houses, 4-storey residential apartments, and multi-family buildings.",
  //   image: "/modern-multistorey-building.jpg",
  //   mainHeadline: "Modern Duplex Homes & Multi-Storey Residential Buildings Engineered to Perfection",
  //   introParagraph:
  //     "From luxury private duplex houses to modern 4-storey residential apartment buildings, Nirman BSB provides complete architectural planning, 3D exterior visualization, and certified structural steel construction. We combine optimal living space planning with high-tensile steel frames that reduce foundation weight and accelerate handover by months.",
  //   subHeadline: "Turnkey Design-to-Handover for Multi-Storey Living",
  //   subParagraph1:
  //     "We take care of the entire development process: architectural drafting, municipal structural approvals, 3D photorealistic elevations, soil testing, foundation piling, steel frame erection, and premium interior/exterior finishing.",
  //   subParagraph2:
  //     "Our steel-framed multi-storey structures offer superior earthquake safety, column-free interior floor plans, and flexible apartment divisions tailored to your family's needs.",
  //   features: [
  //     "Custom Duplex & Multi-Storey House Plans",
  //     "Photorealistic 3D Exterior Elevation Modeling",
  //     "Earthquake & Wind-Resistant Structural Steel",
  //     "Space-Optimized Multi-Unit Floor Layouts",
  //     "Modern Cantilever Balconies & Glass Railings",
  //     "Complete Municipal & RAJUK Approval Drawings",
  //     "Turnkey Civil, Steel & Finishing Handover",
  //     "Concealed Utility Ducts & Sound Insulation",
  //   ],
  //   projectIds: ["modern-multistorey-complex", "ridgeline-house"],
  // },

  // ==========================================
  // 4. Prefabricated Steel Villa & Modern Residences
  // ==========================================
  // {
  //   slug: "prefabricated-steel-villa",
  //   title: "Prefabricated Steel Villa & Modern Residences",
  //   tagline: "High-tensile steel frame luxury villas, fast-track turnkey residences, and modern modular architecture.",
  //   shortDesc: "Turnkey prefabricated structural steel villas and modern residential frameworks. 50% faster construction, maximum earthquake resilience, and certified architectural steel durability.",
  //   image: "/steel-building.jpg",
  //   mainHeadline: "High-Precision Steel Frame Residential Villas Engineered for Luxury, Speed & Resilience",
  //   introParagraph:
  //     "Nirman BSB engineers turnkey prefabricated steel structure villas and modern residential complexes. By utilizing precision-fabricated high-tensile steel framing, we deliver architecturally breathtaking residences with zero termite risk, superior seismic safety, and 50% faster completion than traditional masonry.",
  //   subHeadline: "Rapid Steel Frame Assembly & Maximum Structural Safety",
  //   subParagraph1:
  //     "Every steel frame component is fabricated under strict BNBC standards with ultrasonic weld verification and computerized millimeter precision, ensuring flawless on-site bolting with minimal disruption.",
  //   subParagraph2:
  //     "Equipped with insulated sandwich wall panels, high-grade anti-corrosive primer coating, and expansive column-free living layouts, each steel villa delivers lifetime peace of mind with virtually zero maintenance.",
  //   features: [
  //     "High-Tensile Certified Steel Framing (BNBC)",
  //     "50% Faster Completion than Traditional RCC",
  //     "Maximum Earthquake & Cyclone Resilience",
  //     "Expansive Column-Free Interior Floor Plans",
  //     "Thermal & Acoustic Insulated Wall Assemblies",
  //     "100% Termite, Rot, Mold & Fire-Retardant",
  //     "Modern Cantilever Terraces & Panoramic Glass",
  //     "Turnkey Design, Fabrication & Site Erection",
  //   ],
  //   projectIds: ["crestwood-courtyard", "the-haven-penthouse"],
  // },

  // ==========================================
  // 5. Rooftop Steel Structure & Sheds (ROOFTOP SPECIALTY)
  // ==========================================
  {
    slug: "rooftop-structures-sheds",
    title: "Rooftop Structure & Sheds",
    tagline: "High-tensile lightweight roof frameworks, weather-sealed sheds, and architectural trusses.",
    shortDesc: "Turnkey rooftop steel shed fabrication, cantilever trusses, heat-reflective corrugated roofing, and weatherproofing for residential and industrial roofs.",
    image: "/roof-1.jpg",
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
  // 6. Rooftop Restaurants & Sky Lounges (ROOFTOP SPECIALTY)
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
  // 7. Rooftop Garden, Pergola & Sky Terraces (ROOFTOP SPECIALTY)
  // ==========================================
  {
    slug: "rooftop-garden-pergola",
    title: "Rooftop Garden, Pergola & Sky Terraces",
    tagline: "Motorized bioclimatic pergolas, luxury sky terrace framing, and green roof infrastructure.",
    shortDesc: "Modern outdoor living structures, motorized bioclimatic aluminum/steel pergolas, water features, lightweight planters, and luxury sky gardens.",
    image: "/service-7.jpg",
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
  // 8. Commercial & Convention Hall Construction
  // ==========================================
  {
    slug: "convention-hall-services",
    title: "Commercial & Convention Hall Construction",
    tagline: "Grand architectural event centers, acoustic glass facades, and large-span column-free convention hall engineering.",
    shortDesc: "Turnkey structural steel design and general contracting for grand convention centers, commercial community halls, event venues, and modern glass facades.",
    image: "/pohs-convention-hall.jpg",
    mainHeadline: "Grand Convention Halls & Commercial Centers Built with Wide-Span Steel Precision",
    introParagraph:
      "Nirman BSB and Bangladesh Steel Builders Ltd. deliver specialized design and construction for grand event centers, convention halls, auditoriums, and commercial complexes. By leveraging heavy-gauge pre-engineered steel trusses, we create soaring, column-free event spaces with superior acoustics and contemporary glass facades.",
    subHeadline: "Wide-Span Column-Free Engineering & Comprehensive Event Infrastructure",
    subParagraph1:
      "We engineer clear spans exceeding 100 feet without obstructing columns, maximizing guest capacity, banquet banquet flow, and stage sightlines while ensuring maximum BNBC seismic and wind resistance.",
    subParagraph2:
      "From insulated acoustic wall paneling and central HVAC truss mounting to architectural glass curtain walls and grand canopied entrances, we deliver turn-key convention facilities ready for operation.",
    features: [
      "Wide-Span Column-Free Hall Engineering",
      "Modern Architectural Glass Curtain Facades",
      "Acoustic Wall & Ceiling Structural Frameworks",
      "Heavy-Load Mezzanines & Stage Foundations",
      "Central HVAC Ducting & Electrical Truss Racks",
      "Grand Entrance Porch & Canopy Structures",
      "BNBC Commercial Code & Fire Safety Compliance",
      "Turnkey Civil, Steel & Interior Commissioning",
    ],
    projectIds: ["pohs-convention-hall", "pohs-convention-facade"],
  },

  // ==========================================
  // 9. Pre-Engineered Steel Buildings (PEB) & Warehouses
  // ==========================================
  // {
  //   slug: "steel-building-services",
  //   title: "Pre-Engineered Steel Buildings (PEB) & Warehouses",
  //   tagline: "Custom design, precision fabrication, and certified heavy industrial steel building erection.",
  //   shortDesc: "Comprehensive pre-engineered steel building solutions, heavy industrial factory sheds, logistics warehouses, structural fabrication, and anti-rust protection.",
  //   image: "/Steel-Building-Projects-1.jpg",
  //   mainHeadline: "High-Precision Pre-Engineered Steel Warehouses Built to Stand for Generations",
  //   introParagraph:
  //     "At Bangladesh Steel Builders Ltd., our Steel Building Services cover the entire lifecycle of industrial and commercial steel infrastructure. From initial custom design and computerized structural analysis to automated factory fabrication, on-site crane erection, and long-lasting anti-corrosion finishing, we deliver certified turnkey solutions.",
  //   subHeadline: "Certified Engineering, Certified Materials & Guaranteed Handover",
  //   subParagraph1:
  //     "Our pre-engineered buildings (PEB) utilize high-tensile steel designed to reduce foundation load, withstand high wind and seismic stresses, and accelerate project handover by up to 50% compared to traditional concrete.",
  //   subParagraph2:
  //     "Every steel frame is manufactured under stringent BNBC and AISC standards with ultrasonic weld verification and millimeter-precise bolt connections.",
  //   features: [
  //     "Custom PEB Industrial Warehouse Design",
  //     "Pre-Engineered Steel Building Fabrication",
  //     "Heavy Industrial Factory Shed Erection",
  //     "High-Capacity Crane Runway Girders",
  //     "Long-Span Column-Free Logistics Halls",
  //     "Anti-Rust Primer & Epoxy Protective Coating",
  //     "BNBC & AISC Structural Code Certification",
  //     "Turnkey Civil Foundation to Roof Handover",
  //   ],
  //   projectIds: ["modern-peb-logistics-facility", "jmi-shankur-auto-tank"],
  // },

  // ==========================================
  // Legacy / Direct Aliases (Ensuring no 404s for any old links)
  // ==========================================
  {
    slug: "rooftop-solar-canopies",
    title: "Luxury Steel Duplex Pool Villa",
    tagline: "Bespoke steel frame duplex villas with private swimming pools, composite sun decks, and luxury resort living.",
    shortDesc: "Turnkey luxury steel structure duplex pool villas, cantilever sun decks, outdoor lounge pavilions, and resort-style living spaces built with certified steel durability.",
    image: "/service-3.jpg",
    mainHeadline: "Resort-Style Modern Duplex Pool Villas Built with Precision Structural Steel",
    introParagraph:
      "Nirman BSB designs and constructs bespoke steel frame duplex villas featuring private swimming pools, cantilever lounge decks, and expansive outdoor entertainment pavilions.",
    subHeadline: "Private Aquatic Sanctuary & Architectural Steel Pavilion Engineering",
    subParagraph1:
      "Our duplex pool villas integrate deep-ground moisture proofing, automated swimming pool filtration, and cantilevered steel canopy decks.",
    subParagraph2:
      "Every structural frame is fabricated from high-strength galvanized steel, ensuring lifetime resistance against moisture, humidity, and seismic vibration.",
    features: [
      "Custom Steel Frame Duplex Villa Architecture",
      "Integrated Private Swimming Pool Engineering",
      "Cantilever Sun Decks & Panoramic Lounges",
      "Floor-to-Ceiling Thermal Glass Wall Facades",
      "Earthquake-Resilient Steel Framing (BNBC)",
      "Waterproof Pool Deck Drainage & Recirculation",
      "Concealed LED Sconce & Underwater Illumination",
      "Turnkey Architectural & Structural Handover",
    ],
    projectIds: ["luxury-steel-pool-villa", "oakhill-residence"],
  },
  {
    slug: "architectural-services",
    title: "Duplex & Multi-Storey Residential Construction",
    tagline: "Turnkey architectural design, 3D elevation modeling, and structural steel construction for multi-level homes.",
    shortDesc: "Turnkey architectural planning, 3D elevations, and structural steel construction for modern duplex houses, 4-storey residential apartments, and multi-family buildings.",
    image: "/modern-multistorey-building.jpg",
    mainHeadline: "Modern Duplex Homes & Multi-Storey Residential Buildings Engineered to Perfection",
    introParagraph:
      "From luxury private duplex houses to modern 4-storey residential apartment buildings, Nirman BSB provides complete architectural planning, 3D exterior visualization, and certified structural steel construction.",
    subHeadline: "Turnkey Design-to-Handover for Multi-Storey Living",
    subParagraph1:
      "We take care of the entire development process: architectural drafting, municipal structural approvals, 3D photorealistic elevations, soil testing, foundation piling, steel frame erection, and premium finishing.",
    subParagraph2:
      "Our steel-framed multi-storey structures offer superior earthquake safety, column-free interior floor plans, and flexible apartment divisions.",
    features: [
      "Custom Duplex & Multi-Storey House Plans",
      "Photorealistic 3D Exterior Elevation Modeling",
      "Earthquake & Wind-Resistant Structural Steel",
      "Space-Optimized Multi-Unit Floor Layouts",
      "Modern Cantilever Balconies & Glass Railings",
      "Complete Municipal & RAJUK Approval Drawings",
      "Turnkey Civil, Steel & Finishing Handover",
      "Concealed Utility Ducts & Sound Insulation",
    ],
    projectIds: ["modern-multistorey-complex", "ridgeline-house"],
  },
  {
    slug: "construction-services",
    title: "Commercial & Convention Hall Construction",
    tagline: "Grand architectural event centers, acoustic glass facades, and large-span column-free convention hall engineering.",
    shortDesc: "Turnkey structural steel design and general contracting for grand convention centers, commercial community halls, event venues, and modern glass facades.",
    image: "/pohs-convention-hall.jpg",
    mainHeadline: "Grand Convention Halls & Commercial Centers Built with Wide-Span Steel Precision",
    introParagraph:
      "Nirman BSB and Bangladesh Steel Builders Ltd. deliver specialized design and construction for grand event centers, convention halls, auditoriums, and commercial complexes.",
    subHeadline: "Wide-Span Column-Free Engineering & Comprehensive Event Infrastructure",
    subParagraph1:
      "We engineer clear spans exceeding 100 feet without obstructing columns, maximizing guest capacity, banquet flow, and stage sightlines.",
    subParagraph2:
      "From insulated acoustic wall paneling and central HVAC truss mounting to architectural glass curtain walls and grand canopied entrances, we deliver turn-key facilities.",
    features: [
      "Wide-Span Column-Free Hall Engineering",
      "Modern Architectural Glass Curtain Facades",
      "Acoustic Wall & Ceiling Structural Frameworks",
      "Heavy-Load Mezzanines & Stage Foundations",
      "Central HVAC Ducting & Electrical Truss Racks",
      "Grand Entrance Porch & Canopy Structures",
      "BNBC Commercial Code & Fire Safety Compliance",
      "Turnkey Civil, Steel & Interior Commissioning",
    ],
    projectIds: ["pohs-convention-hall", "pohs-convention-facade"],
  },
  {
    slug: "pre-engineered-steel-buildings",
    title: "Pre-Engineered Steel Buildings (PEB)",
    tagline: "Custom-designed, factory-manufactured steel frameworks.",
    shortDesc: "Turnkey PEB solutions for industrial manufacturing sheds, heavy warehouses, and commercial steel buildings.",
    image: "/industrial-peb-warehouse.jpg",
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
    projectIds: ["modern-peb-logistics-facility", "jmi-shankur-auto-tank"],
  },
  {
    slug: "structural-steel-fabrication",
    title: "Structural Steel Fabrication & Installation",
    tagline: "Millimeter-precision steel fabrication and certified erection.",
    shortDesc: "Certified fabrication of heavy industrial steel beams, high-tensile trusses, and precision on-site erection.",
    image: "/curved-roof-steel-shed.jpg",
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
    image: "/pohs-convention-hall-perspective.jpg",
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
    projectIds: ["modern-multistorey-complex", "highgrove-house"],
  },
];
