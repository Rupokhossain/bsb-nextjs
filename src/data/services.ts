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
  // Foreign key array linking to Project.id in projectsData (Backend-ready relational structure)
  projectIds: string[];
}

export const servicesData: ServiceDetail[] = [
  // 1. Architectural Design
  {
    slug: "architectural-design",
    title: "Architectural Design",
    tagline: "Design-led homes, engineered to build.",
    shortDesc: "Design-led architectural plans, spatial modeling, and buildable concepts.",
    // 📸 Apnar chobi thakle "/services/architectural-design.jpg" eivabe change kore nite parben
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    mainHeadline: "Thoughtful design that makes every square foot count.",
    introParagraph:
      "Great projects start with great design. Our in-house studio shapes light, space and materials into bespoke residences, luxury retreats and architectural spaces that are beautiful to live in and practical to build.",
    subHeadline: "Design and build as one",
    subParagraph1:
      "Because our designers and builders work together, every idea is costed and pressure-tested for buildability as it's drawn.",
    subParagraph2:
      "That means no expensive gap between an ambitious architectural drawing and what can actually be built to budget.",
    projectIds: ["oakhill-residence", "ridgeline-house"],
  },

  // 2. Construction Management
  {
    slug: "construction-management",
    title: "Construction Management",
    tagline: "Your build, managed end to end with full transparency.",
    shortDesc: "Dedicated site supervision, trade coordination, and milestone accountability.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
    mainHeadline: "One team accountable for the whole build.",
    introParagraph:
      "Complex builds need one steady hand. Our construction management keeps schedule, budget, trades and quality under a single dedicated project lead.",
    subHeadline: "Single point of accountability",
    subParagraph1:
      "We coordinate every supplier and trade, run rigorous quality assurance on site, and report to you with photographic progress weekly.",
    subParagraph2:
      "You get real-time budget transparency and the peace of mind that your project will complete on time and on budget.",
    projectIds: ["highgrove-house", "crestwood-courtyard"],
  },

  // 3. Custom Home Building
  {
    slug: "custom-home-building",
    title: "Custom Home Building",
    tagline: "From bare ground to the keys in your hand.",
    shortDesc: "From bare ground to the keys in your hand with guaranteed fixed pricing.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    mainHeadline: "Bespoke residences crafted with fixed pricing and master craftsmanship.",
    introParagraph:
      "We bring custom home visions to life with uncompromising material standards, dedicated engineering oversight, and transparent fixed pricing from day one.",
    subHeadline: "End-to-End Craftsmanship",
    subParagraph1:
      "A single dedicated team handles civil foundation, structural framing, high-end interior joinery, and landscape architecture.",
    subParagraph2:
      "You receive weekly photographic milestone reports and a complete turnkey handover with written 10-year structural warranties.",
    projectIds: ["oakhill-residence", "marina-bay-home"],
  },

  // 4. Kitchens & Bathrooms
  {
    slug: "kitchens-bathrooms",
    title: "Kitchens & Bathrooms",
    tagline: "Precision craftsmanship for the heart of your home.",
    shortDesc: "Custom cabinetry, stone waterfall islands, and spa-inspired master ensuites.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    mainHeadline: "Spaces where everyday rituals meet timeless materials.",
    introParagraph:
      "Kitchens and bathrooms demand the highest precision in the home. From custom bookmatched stone to bespoke oak joinery and concealed acoustic plumbing, we create spaces built for both beauty and daily performance.",
    subHeadline: "Master Joinery & Waterproofing",
    subParagraph1:
      "Every bathroom undergoes multi-stage waterproofing barrier testing before stone or tile installation begins.",
    subParagraph2:
      "Our custom millwork is crafted in-house, ensuring millimeter-precise tolerances and seamless integration with appliances.",
    projectIds: ["highgrove-house", "ridgeline-house"],
  },

  // 5. Outdoor Living
  {
    slug: "outdoor-living",
    title: "Outdoor Living",
    tagline: "Resort-inspired pools, sky gardens, and all-season pavilions.",
    shortDesc: "Architectural swimming pools, luxury rooftop terraces, and bioclimatic pergolas.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    mainHeadline: "Extending your living space seamlessly into the open air.",
    introParagraph:
      "We engineer architectural outdoor spaces that blend indoor comfort with open-air relaxation—including custom swimming pools, sky gardens, sunken fire lounges, and outdoor kitchens.",
    subHeadline: "Engineering Meets Nature",
    subParagraph1:
      "Every swimming pool and rooftop retreat is built with 100% leak-proof structural engineering, silent filtration systems, and marine-grade materials.",
    subParagraph2:
      "From automated pergolas to ambient lighting, our outdoor living spaces are designed to be enjoyed across every season.",
    projectIds: ["crestwood-courtyard", "poolhouse-pavilion"],
  },

  // 6. Renovations & Additions
  {
    slug: "renovations-additions",
    title: "Renovations & Additions",
    tagline: "Transforming existing structures into modern architectural statements.",
    shortDesc: "Heritage restoration, rear pavilion extensions, and complete home reinventions.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    mainHeadline: "Breathing new life into homes while preserving character.",
    introParagraph:
      "Extending or renovating a home requires deep architectural sensitivity and structural ingenuity. We seamlessly merge modern living spaces with existing foundations, ensuring structural harmony.",
    subHeadline: "Seamless Architectural Integration",
    subParagraph1:
      "We resolve heritage guidelines, structural load transfers, and energy efficiency upgrades without compromising character.",
    subParagraph2:
      "Our experienced builders ensure existing structures are fortified while adding light-filled, open-concept living zones.",
    projectIds: ["oakhill-residence", "highgrove-house"],
  },

  // Legacy/Support routes (preserving existing backlinks)
  {
    slug: "rooftop-gardens",
    title: "Rooftop Living & Gardens",
    tagline: "Your rooftop, transformed into a private sky sanctuary.",
    shortDesc: "Design-led green roofs, bioclimatic pergolas, and outdoor lounges.",
    image: "/service-2.jpg",
    mainHeadline: "Biophilic outdoor living engineered for sky terraces.",
    introParagraph:
      "Transforming an empty roof requires specialized civil understanding—from structural load calculations to lightweight biophilic landscaping and automated irrigation.",
    subHeadline: "Precision waterproofing & comfort",
    subParagraph1:
      "Every terrace installation features multi-layer waterproof membrane protection and lightweight soil architecture.",
    subParagraph2:
      "From motorized cedar pergolas to outdoor kitchens, we create all-weather retreats built to last.",
    projectIds: ["highgrove-house", "crestwood-courtyard"],
  },
  {
    slug: "custom-swimming-pools",
    title: "Custom Swimming Pools",
    tagline: "Architectural infinity pools and spas engineered to perfection.",
    shortDesc: "Rooftop infinity edge, heated plunge pools, and inground spas.",
    image: "/service-3.jpg",
    mainHeadline: "Water features engineered with zero-leak precision.",
    introParagraph:
      "Whether designing an acrylic glass-walled rooftop infinity pool or a minimalist inground villa oasis, our engineering team ensures zero water loss and crystal filtration.",
    subHeadline: "Acoustic & Hydraulic Excellence",
    subParagraph1:
      "We calculate water movement, pump acoustics, and multi-stage filtration systems so your pool runs quietly.",
    subParagraph2:
      "Automated saltwater chlorination and submerged LED mood lighting ensure seamless luxury with minimal maintenance.",
    projectIds: ["marina-bay-home", "poolhouse-pavilion"],
  },
];
