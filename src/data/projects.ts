export interface CompletedProject {
  id: string;
  title: string;
  location: string;
  image: string;
  category?: string;
}

// 📸 12 Completed Corporate & Rooftop Projects (Balanced Showcase)
// ⚠️ No detail pages - pure visual showcase
export const completedProjectsData: CompletedProject[] = [
  {
    id: "bespoke-steel-duplex-villa",
    title: "Bespoke Classical Steel Duplex Villa",
    location: "Dhanmondi, Dhaka.",
    image: "/luxury-steel-duplex-villa.jpg",
    category: "Duplex Villa",
  },
  {
    id: "luxury-steel-pool-villa",
    title: "Luxury Steel Duplex Pool Villa",
    location: "Gulshan-2, Dhaka.",
    image: "/service-3.jpg",
    category: "Duplex Pool Villa",
  },
  {
    id: "pohs-convention-hall",
    title: "POHS Convention Hall & Event Center",
    location: "Mirpur DOHS, Dhaka.",
    image: "/pohs-convention-hall1.webp",
    category: "Convention Hall",
  },
  // {
  //   id: "pohs-convention-facade",
  //   title: "POHS Convention Hall Glass Curtain Facade",
  //   location: "Mirpur DOHS, Dhaka.",
  //   image: "/pohs-convention-hall-perspective.jpg",
  //   category: "Commercial Complex",
  // },
  {
    id: "modern-multistorey-complex",
    title: "Modern 4-Storey Duplex & Residential Complex",
    location: "Uttara Sector 7, Dhaka.",
    image: "/modern-multistorey-building.jpg",
    category: "Duplex & Multi-Storey",
  },
  {
    id: "modern-peb-logistics-facility",
    title: "Modern Industrial PEB Logistics Facility",
    location: "Gazipur, Dhaka.",
    image: "/industrial-peb-warehouse.jpg",
    category: "Industrial PEB",
  },

  {
    id: "skyline-rooftop-lounge",
    title: "Skyline Rooftop Restaurant & Steel Lounge",
    location: "Gulshan-2, Dhaka.",
    image: "/restaurant-design-rooftop.webp",
    category: "Rooftop Restaurant",
  },
  {
    id: "jmi-shankur-auto-tank",
    title: "JMI Shankur Auto Tank Limited.",
    location: "Chattogram.",
    image: "/Steel-Building-Projects.jpg",
    category: "Industrial Steel",
  },
  {
    id: "bioclimatic-rooftop-pergola",
    title: "Bioclimatic Rooftop Pergola & Steel Shed",
    location: "Banani, Dhaka.",
    image: "/p3.jpg",
    category: "Rooftop Structure",
  },
  {
    id: "akij-biri-factory",
    title: "Akij Biri Factory Ltd.",
    location: "Rangpur.",
    image: "/Steel-Building-Projects-2.jpg",
    category: "Factory Shed",
  },
  {
    id: "cantilever-sky-terrace",
    title: "Cantilever Sky Terrace & Glass Pavilion",
    location: "Tejgaon I/A, Dhaka.",
    image: "/r2.jpg",
    category: "Sky Lounge",
  },
  {
    id: "maysha-spining-mill",
    title: "MAYSHA SPINING MILL",
    location: "Gazipur.",
    image: "/Steel-Building-Projects-4.jpg",
    category: "Spinning Mill",
  },
  {
    id: "rooftop-sanctuary-structure",
    title: "Multi-Tiered Rooftop Steel Sanctuary & Shed",
    location: "Baridhara DOHS, Dhaka.",
    image: "/p-7.jpg",
    category: "Rooftop Garden",
  },
  {
    id: "sa-paribahan-building",
    title: "5-Storied Building For SA Paribahan.",
    location: "Kakrail, Gazipur.",
    image: "/Steel-Building-Projects-5.jpg",
    category: "Commercial Steel",
  },
  {
    id: "elevated-rooftop-shed",
    title: "Elevated Rooftop Shed",
    location: "Uttara, Dhaka.",
    image: "/rooftop.jpg",
    category: "Rooftop Shed",
  },
  {
    id: "onion-cold-storage",
    title: "200 MT Onion Cold Storage.",
    location: "Pabna.",
    image: "/Steel-Building-Projects-3.jpg",
    category: "Cold Storage",
  },
  {
    id: "anira-international",
    title: "Anira International Ltd.",
    location: "Dhamrai, Dhaka.",
    image: "/Steel-Building-Projects-7.jpg",
    category: "Industrial PEB",
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  duration: string;
  year: string;
  image: string;
  galleryImages: string[];
  description: string;
  vision: string;
  engineeringHighlight: string;
  highlights: string[];
}

export const projectsData: Project[] = [
  // ==========================================
  // 1. Oakhill Residence
  // ==========================================
  {
    id: "oakhill-residence",
    title: "Oakhill Residence",
    category: "New Build & Pool",
    location: "Gulshan-2, Dhaka",
    area: "3,800 sq.ft",
    duration: "60 Days",
    year: "2025",
    // 📸 Apnar chobi boshanor jonno image path change kore din
    image: "/p1.jpg",
    galleryImages: ["/service-5.jpg", "/about-banner.jpg"],
    description: "A contemporary multi-level architectural villa with integrated reflection pools and cedarwood cladding.",
    vision: "To blend raw concrete geometry with warm vertical timber elements, blurring indoor living with outdoor water features.",
    engineeringHighlight: "Engineered with floating cantilever slabs and 5-layer moisture barrier protection beneath all soil beds.",
    highlights: [
      "Custom sunken fire lounge with perimeter water reflection",
      "Marine-grade concealed cedar wood cladding",
      "Automated architectural wall sconce night illumination",
    ],
  },

  // ==========================================
  // 2. Marina Bay Home
  // ==========================================
  {
    id: "marina-bay-home",
    title: "Marina Bay Home",
    category: "Custom Pool & Deck",
    location: "Bashundhara R/A",
    area: "2,200 sq.ft",
    duration: "45 Days",
    year: "2025",
    image: "/p2.jpg",
    galleryImages: ["/service-4.jpg", "/service-1.jpg"],
    description: "An architectural infinity edge pool looking onto a teak relaxation patio and glass pavilion.",
    vision: "Creating a resort-grade private aquatic sanctuary with whisper-quiet filtration and acoustic water walls.",
    engineeringHighlight: "Dual-circuit variable speed pumps coupled with underwater acoustic damping and zero-overflow gutters.",
    highlights: [
      "Full perimeter knife-edge infinity water spillway",
      "Low-maintenance composite teak pool decking",
      "Color-adaptive underwater LED lighting presets",
    ],
  },

  // ==========================================
  // 3. Highgrove House
  // ==========================================
  {
    id: "highgrove-house",
    title: "Highgrove House",
    category: "Rooftop Garden",
    location: "Banani, Dhaka",
    area: "1,850 sq.ft",
    duration: "35 Days",
    year: "2024",
    image: "/p3.jpg",
    galleryImages: ["/service-7.jpg", "/service-6.jpg"],
    description: "A private penthouse sky terrace featuring bioclimatic motorized pergola, BBQ counter, and lush tropical flora.",
    vision: "Transforming an underutilized rooftop slab into a vibrant, heat-deflecting sky garden.",
    engineeringHighlight: "Lightweight perlite-engineered soil mix keeping roof slab weight well below structural limits.",
    highlights: [
      "Motorized louvered roof with integrated rain sensors",
      "Automated solar-powered micro-drip irrigation",
      "Weather-sealed outdoor kitchen with granite preparation counter",
    ],
  },

  // ==========================================
  // 4. Ridgeline House
  // ==========================================
  {
    id: "ridgeline-house",
    title: "Ridgeline House",
    category: "Design & Build",
    location: "Dhanmondi, Dhaka",
    area: "4,200 sq.ft",
    duration: "75 Days",
    year: "2024",
    image: "/p4.jpg",
    galleryImages: ["/service-1.jpg", "/service-3.jpg"],
    description: "Tiered architectural estate harmonizing natural stone masonry, glass corridors, and landscaped courtyard.",
    vision: "An estate celebrating permanence and tactile materials tailored for multi-generational living.",
    engineeringHighlight: "Deep foundation moisture barriers and seismic structural load verification by certified civil engineers.",
    highlights: [
      "Natural split-face limestone exterior cladding",
      "Floor-to-ceiling thermal break structural glass walls",
      "Central water reflection courtyard with koi pond",
    ],
  },

  // ==========================================
  // 5. Poolhouse Pavilion
  // ==========================================
  {
    id: "poolhouse-pavilion",
    title: "Poolhouse Pavilion",
    category: "Outdoor Living",
    location: "Uttara, Dhaka",
    area: "1,600 sq.ft",
    duration: "30 Days",
    year: "2024",
    image: "/p5.jpg",
    galleryImages: ["/service-3.jpg", "/about-banner.jpg"],
    description: "An open-air cedar entertainment pavilion overlooking a custom inground heated plunge pool.",
    vision: "Seamless luxury entertainment zone connecting outdoor barbecue dining with hydrotherapy pool.",
    engineeringHighlight: "All-weather timber joinery with concealed stainless steel brackets and anti-slip travertine pavers.",
    highlights: [
      "Heated hydrotherapy plunge pool with jacuzzi jets",
      "Integrated audio speakers concealed in landscaping",
      "All-weather motorized drop-down weather screens",
    ],
  },

  // ==========================================
  // 6. Crestwood Courtyard
  // ==========================================
  {
    id: "crestwood-courtyard",
    title: "Crestwood Courtyard",
    category: "Commercial / Sky Lounge",
    location: "Cox's Bazar",
    area: "5,100 sq.ft",
    duration: "65 Days",
    year: "2024",
    image: "/p6.jpg",
    galleryImages: ["/service-2.jpg", "/service-5.jpg"],
    description: "A commercial rooftop boutique resort deck with sunset infinity pool, private cabanas, and bar.",
    vision: "A premier destination rooftop delivering 360-degree skyline views in a resort setting.",
    engineeringHighlight: "Comprehensive wind tunnel load calculations and dual redundancy commercial drainage pumps.",
    highlights: [
      "Resort-grade 40-meter glass infinity edge pool",
      "Private VIP poolside cabanas with custom daybeds",
      "Smart app-controlled dynamic ambient night lighting",
    ],
  },

  // ==========================================
  // 7. Verdant Terrace
  // ==========================================
  {
    id: "verdant-terrace",
    title: "Verdant Terrace",
    category: "Rooftop Sanctuary",
    location: "Baridhara DOHS, Dhaka",
    area: "2,400 sq.ft",
    duration: "40 Days",
    year: "2025",
    // 📸 Apnar chobi public folder e rekhe eikhane boshiye diben
    image: "/p-7.jpg",
    galleryImages: ["/s2.jpg", "/s3.jpg"],
    description: "A private multi-tiered sky terrace integrating a modern glass pavilion, Japanese dry garden, and cantilevered viewing deck.",
    vision: "Crafting an elevated botanical haven above the urban skyline with shaded outdoor living lounges and drought-tolerant greenery.",
    engineeringHighlight: "Lightweight aerated concrete substrates and dual-membrane elastomeric waterproofing rated for high hydrostatic pressure.",
    highlights: [
      "Bespoke Japanese stone water fountain with ambient LED backlighting",
      "Motorized bioclimatic louvered pergola with wind sensor auto-retract",
      "Custom outdoor cocktail bar with honed quartzite countertop",
    ],
  },

  // ==========================================
  // 8. The Glasshouse Villa
  // ==========================================
  {
    id: "the-glasshouse-villa",
    title: "The Glasshouse Villa",
    category: "New Build & Landscape",
    location: "Purbachal, Dhaka",
    area: "5,400 sq.ft",
    duration: "90 Days",
    year: "2025",
    // 📸 Apnar chobi public folder e rekhe eikhane boshiye diben
    image: "/p-8.jpg",
    galleryImages: ["/s5.jpg", "/s6.jpg"],
    description: "An expansive minimalist glass pavilion residence featuring central reflecting ponds, sunken courtyards, and monolithic stone pylons.",
    vision: "Maximizing natural daylight and unobstructed garden vistas through structural glass walls and floating roof planes.",
    engineeringHighlight: "Low-E acoustic insulated double-glazed structural curtain walls with concealed drainage channels.",
    highlights: [
      "Frameless triple-track sliding pocket glass doors",
      "Sunken conversation pit with built-in ethanol fireplace",
      "Integrated subterranean rainwater harvesting and filtration system",
    ],
  },

  // ==========================================
  // 9. Azure Horizon Pool
  // ==========================================
  {
    id: "azure-horizon-pool",
    title: "Azure Horizon Pool",
    category: "Custom Pool & Spa",
    location: "Sylhet Sadar",
    area: "2,800 sq.ft",
    duration: "50 Days",
    year: "2024",
    // 📸 Apnar chobi public folder e rekhe eikhane boshiye diben
    image: "/p-9.jpg",
    galleryImages: ["/service-3.jpg", "/service-4.jpg"],
    description: "A dramatic infinity pool perched on rolling hills, featuring zero-edge perimeter overflow and an adjacent open-air cedar cabana.",
    vision: "Merging hillside landscape architecture with crystalline water reflections and resort-grade lounging zones.",
    engineeringHighlight: "Retaining wall micro-pile reinforcement and computer-balanced hydraulic surge tanks for silent water recirculation.",
    highlights: [
      "Glass-fronted acrylic underwater viewing panel",
      "Submerged sun shelf with in-water loungers and umbrella sleeves",
      "Automated ozone mineral water sanitation system",
    ],
  },

  // ==========================================
  // 10. The Haven Penthouse
  // ==========================================
  {
    id: "the-haven-penthouse",
    title: "The Haven Penthouse",
    category: "Renovation & Additions",
    location: "Gulshan-1, Dhaka",
    area: "3,100 sq.ft",
    duration: "55 Days",
    year: "2024",
    // 📸 Apnar chobi public folder e rekhe eikhane boshiye diben
    image: "/p-10.jpg",
    galleryImages: ["/about2.jpg", "/about-bottom.jpg"],
    description: "A comprehensive penthouse transformation incorporating double-height living areas, smoked oak joinery, and private rooftop plunge pool.",
    vision: "Reinventing an older penthouse into a contemporary, light-filled architectural masterpiece with tactile finishes.",
    engineeringHighlight: "Precision structural beam reinforcement allowing column-free open plan living and high ceiling clearance.",
    highlights: [
      "Bookmatched Calacatta marble fireplace centerpiece",
      "Custom architectural staircase with floating oak treads and glass balustrades",
      "Heated rooftop stainless steel plunge pool with skyline panoramas",
    ],
  },

  // ==========================================
  // 11. Cedar Ridge Retreat
  // ==========================================
  {
    id: "cedar-ridge-retreat",
    title: "Cedar Ridge Retreat",
    category: "Outdoor Living & Pergola",
    location: "Gazipur",
    area: "3,600 sq.ft",
    duration: "45 Days",
    year: "2024",
    // 📸 Apnar chobi public folder e rekhe eikhane boshiye diben
    image: "/p-11.jpg",
    galleryImages: ["/service-7.jpg", "/service-1.jpg"],
    description: "An outdoor culinary pavilion and fire lounge nestled in forested landscape with integrated wood-fired pizza oven and dining terrace.",
    vision: "Creating an authentic farm-to-table outdoor entertaining sanctuary celebrating raw timber and artisanal stonework.",
    engineeringHighlight: "Kiln-dried western red cedar framing treated with marine grade UV-resistant micro-sealer and concealed seismic anchors.",
    highlights: [
      "Wood-fired artisan refractory brick pizza oven and built-in smoker",
      "Hand-chiseled slate paving stones with permeable grass joints",
      "Concealed infrared ceiling patio heaters for year-round warmth",
    ],
  },

  // ==========================================
  // 12. Solis Sky Lounge
  // ==========================================
  {
    id: "solis-sky-lounge",
    title: "Solis Sky Lounge",
    category: "Commercial / Rooftop",
    location: "Tejgaon I/A, Dhaka",
    area: "4,800 sq.ft",
    duration: "60 Days",
    year: "2024",
    // 📸 Apnar chobi public folder e rekhe eikhane boshiye diben
    image: "/p-12.jpg",
    galleryImages: ["/service-2.jpg", "/service-5.jpg"],
    description: "A luxury corporate rooftop retreat designed with private executive pods, drought-resilient vertical green walls, and water features.",
    vision: "Providing urban corporate wellness through biophilic design, panoramic city vistas, and acoustic water soundscapes.",
    engineeringHighlight: "Commercial-grade lightweight substrate planting beds and storm-surge automated drainage overflow valves.",
    highlights: [
      "Automated hydroponic living green wall with 3,000+ tropical plants",
      "Executive conference glass pod with smart switchable privacy glass",
      "Multi-zone ambient audio system with low-frequency acoustic baffles",
    ],
  },
];
