export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

// ============================================================
// 📸 TEAM MEMBERS DATA (12 Members in 3 Rows of 4 Columns):
// Apnar chobi public folder e rekhe eikhane path change kore din
// (e.g. "/team1.png", "/team2.png", etc.)
// ============================================================
export const teamMembers: TeamMember[] = [
  // --- ROW 1 (Screenshot 1) ---
  {
    id: "marcus-hale",
    name: "Marcus Hale",
    role: "Founder & Principal Builder",
    specialty: "Architectural Design",
    image: "/team1.png",
  },
  {
    id: "daniel-reyes",
    name: "Daniel Reyes",
    role: "Lead Architect",
    specialty: "Renovations & Additions",
    image: "/team2.png",
  },
  {
    id: "nathan-brooks",
    name: "Nathan Brooks",
    role: "Design Director",
    specialty: "Kitchens & Bathrooms",
    image: "/team3.png",
  },
  {
    id: "owen-carter",
    name: "Owen Carter",
    role: "Senior Project Manager",
    specialty: "Custom Home Building",
    image: "/team4.png",
  },

  // --- ROW 2 (Screenshot 2) ---
  {
    id: "ethan-walsh",
    name: "Ethan Walsh",
    role: "Construction Manager",
    specialty: "Outdoor Living",
    image: "/team5.png",
  },
  {
    id: "cole-bennett",
    name: "Cole Bennett",
    role: "Site Superintendent",
    specialty: "Construction Management",
    image: "/team6.png",
  },
  {
    id: "liam-foster",
    name: "Liam Foster",
    role: "Interior Designer",
    specialty: "Kitchens & Bathrooms",
    image: "/team7.png",
  },
  {
    id: "ryan-mercer",
    name: "Ryan Mercer",
    role: "Estimator & Quantity Surveyor",
    specialty: "Custom Home Building",
    // 📸 Apnar chobi thakle public folder e /team8.png rekhe eikhane "/team8.png" diye diben
    image: "/team8.png",
  },

  // --- ROW 3 (Screenshot 3) ---
  {
    id: "jack-sullivan",
    name: "Jack Sullivan",
    role: "Master Carpenter",
    specialty: "Architectural Design",
    image: "/team9.png",
  },
  {
    id: "adam-pierce",
    name: "Adam Pierce",
    role: "Client Experience Lead",
    specialty: "Renovations & Additions",
    image: "/team10.png",
  },
  {
    id: "noah-whitfield",
    name: "Noah Whitfield",
    role: "Sustainability Consultant",
    specialty: "Outdoor Living",
    image: "/team11.png",
  },
  {
    id: "caleb-morrison",
    name: "Caleb Morrison",
    role: "Landscape & Outdoor Lead",
    specialty: "Construction Management",
    image: "/team12.png",
  },
];
