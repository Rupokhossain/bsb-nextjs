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
  {
    id: "oakhill-residence",
    title: "Oakhill Residence",
    category: "New Build & Pool",
    location: "Gulshan-2, Dhaka",
    area: "3,800 sq.ft",
    duration: "60 Days",
    year: "2025",
    image: "/service-1.jpg",
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
  {
    id: "marina-bay-home",
    title: "Marina Bay Home",
    category: "Custom Pool & Deck",
    location: "Bashundhara R/A",
    area: "2,200 sq.ft",
    duration: "45 Days",
    year: "2025",
    image: "/service-3.jpg",
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
  {
    id: "highgrove-house",
    title: "Highgrove House",
    category: "Rooftop Garden",
    location: "Banani, Dhaka",
    area: "1,850 sq.ft",
    duration: "35 Days",
    year: "2024",
    image: "/service-2.jpg",
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
  {
    id: "ridgeline-house",
    title: "Ridgeline House",
    category: "Design & Build",
    location: "Dhanmondi, Dhaka",
    area: "4,200 sq.ft",
    duration: "75 Days",
    year: "2024",
    image: "/service-5.jpg",
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
  {
    id: "poolhouse-pavilion",
    title: "Poolhouse Pavilion",
    category: "Outdoor Living",
    location: "Uttara, Dhaka",
    area: "1,600 sq.ft",
    duration: "30 Days",
    year: "2024",
    image: "/service-4.jpg",
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
  {
    id: "crestwood-courtyard",
    title: "Crestwood Courtyard",
    category: "Commercial / Sky Lounge",
    location: "Cox's Bazar",
    area: "5,100 sq.ft",
    duration: "65 Days",
    year: "2024",
    image: "/about-banner.jpg",
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
];
