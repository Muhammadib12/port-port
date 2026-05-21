import legalisync from "../assets/projects/legalisync.png";
import radaropportunity from "../assets/projects/radaropportunity.png";
import ghstosre from "../assets/projects/ghstosre.png";
import project1 from "../assets/projects/braudeflix.png";
import project2 from "../assets/projects/ZadCollage.png";
import project3 from "../assets/projects/Portfolio1.png";
import project4 from "../assets/projects/Portfolio2.png";
import project5 from "../assets/projects/GoogleClone.png";
import project6 from "../assets/projects/CRUD-js.png";
import project7 from "../assets/projects/ChatApp.png";
import project8 from "../assets/projects/Netflix2Cloning.png";
import project9 from "../assets/projects/PersonalPortfolio.png";
import project10 from "../assets/projects/RestaurantApp.png";
import project11 from "../assets/projects/Todoappp.png";
import project12 from "../assets/projects/advancedChat.png";
import project13 from "../assets/projects/icspho.jpg";
import project14 from "../assets/projects/math4uo.png";

export const HERO_CONTENT = `I’m a full-stack developer with 2–3 years of experience, known for high performance and fast delivery. My real edge? I leverage AI tools — Claude Code, Codex, and more — at a professional level to accelerate development, eliminate bottlenecks, and push output quality far beyond what traditional workflows allow. I ship smarter, iterate faster, and consistently deliver production-grade solutions that create real business impact.`;

export const ABOUT_TEXT = `I studied Software Practical Engineering at Braude College and graduated with honors. Over the past 2–3 years, I’ve built and shipped multiple full-stack web projects, including production-ready websites and SaaS platforms. I worked as a Full Stack Developer and Developer Manager at Connec — a startup based in Tamra — where I led development end-to-end, managed the technical roadmap, and delivered real-world products including LegaliSync, Opportunity Radar MENA, and GS Luxury. What truly sets me apart is how I work: I use AI tools — Claude Code, Codex, and others — at a professional, strategic level. This lets me build faster, debug smarter, architect better systems, and deliver results that would take others twice the time. It’s not just about knowing the tools — it’s about extracting maximum performance from every hour of work. I also gained earlier experience at SPA Code and completed intensive full-stack courses on Udemy and at ICS College. I specialize in JavaScript/TypeScript, React, Next.js, Node.js/Express, MongoDB, and SQL, and I’m passionate about building products that solve real problems and continuously pushing my engineering standards higher.`;

export const PROJECTS = [
  {
    id: 17,
    title: "GS — Luxury Accessories E-Commerce",
    image: ghstosre,
    url: "https://ghstosre.co.il",
    description:
      "GS is a premium luxury accessories e-commerce website I designed and developed, targeting discerning women who appreciate fine detail and quiet elegance. The site features a curated collection model with a high-end dark aesthetic, multi-language support (Hebrew, English, Arabic), and a personal concierge service via WhatsApp — allowing customers to receive styling advice and pricing within the hour. Every item arrives boxed, ribboned, and hand-finished, reflecting the brand's positioning of 'Luxury is a lifestyle.' Built with a focus on cinematic UI, smooth animations, and a boutique shopping experience.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "WhatsApp API",
      "TypeScript",
      "MongoDB",
    ],
  },
  {
    id: 16,
    title: "Opportunity Radar MENA — Market Intelligence Platform",
    image: radaropportunity,
    url: "https://www.radaropportunity.com",
    description:
      "Opportunity Radar MENA is a full-stack educational market analysis platform I built during my role as Full Stack Manager at the startup Connec. The platform delivers 2–5 daily market intelligence updates across five categories — Regulatory Changes, Capital Inflow Events, Sector Acceleration, Market Stress Events, and Supply-Demand Shifts — targeting the Middle East & North Africa region. Each event goes through an AI-assisted editorial pipeline and is scored by impact, volatility, time horizon, and capital flow. Built with a modern dark UI, the platform serves curious minds seeking to understand how global markets move, without financial advice.",
    technologies: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "TypeScript",
      "OpenAI API",
      "Resend API",
      "REST API",
    ],
  },
  {
    id: 15,
    title: "LegaliSync — Legal Management Platform",
    image: legalisync,
    url: "https://legalisync.com",
    description:
      "LegaliSync is a full-scale organizational legal management SaaS platform I architected and built end-to-end during my role as Full Stack Manager at the startup Connec. The platform enables businesses and individuals to create, send, and collect digital signatures on legally binding agreements — with real-time tracking, version control, immutable audit logs, and instant PDF delivery. Features include identity verification, Cloudflare R2 secure storage, email notifications via Resend, WhatsApp API integration, and SMS alerts, all wrapped in a modern Hebrew-first UI. Shipped to production with a freemium pricing model.",
    technologies: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "html2pdf",
      "Resend API",
      "WhatsApp API",
      "SMS API",
      "Cloudflare R2",
      "TypeScript",
    ],
  },
  {
    id: 14,
    title: "Math4U",
    image: project14,
    description:
      "Math4U is a comprehensive online mathematics learning platform designed to help students master high-school math through structured courses, clear video lessons, and organized learning paths. Built with a powerful admin dashboard, the platform gives students an intuitive experience to explore courses, track their progress, and access learning resources, while enabling administrators to manage courses, lectures, students, and subscriptions efficiently within a secure, real-world system.",
    technologies: [
      "React",
      "TypeScript",
      "CSS Modules",
      "Redux Toolkit",
      "Tailwind CSS",
      "lucide-react",
      "react-hot-toast",
      "RTK Query",
      "WebSocket",
      "MongoDB",
      "Node.js",
      "Express",
      "JWT",
      "S3",
      "Vimeo",
      "Zoho Mail",
    ],
    url: "https://math4uo.com",
  },
  {
    id: 13,
    title: "Nadlan App (Rent)",
    image: project13,
    description:
      "ICS Nadlan is a comprehensive real estate management platform designed to help users effortlessly search for apartments, houses, or rooms for rent or sale. Built with a powerful admin dashboard, the website provides both users and administrators with intuitive tools to manage and explore property listings.",
    technologies: [
      "React",
      "CSS Modules",
      "Redux Toolkit",
      "MongoDB",
      "Node.js",
      "Express",
      "JWT",
      "lucide-react",
      "react-hot-toast",
    ],
    url: "https://frontend-ics-nadlan.vercel.app/",
  },
  {
    id: 11,
    title: "Advanced Chat App",
    image: project12,
    description:
      "An advanced chat application built with modern web technologies. I gained extensive experience in real-time communication with Socket.IO, authentication with JWT, state management with Zustand, media uploads with Cloudinary, and MongoDB for data storage. (Since I am using Render's free plan, the application may take up to half a minute to load.)",
    technologies: [
      "React",
      "Tailwind CSS",
      "Zustand",
      "MongoDB",
      "Cloudinary",
      "Node.js",
      "Express",
      "JWT",
      "Socket.IO",
    ],
    url: "https://advanced-chat-app-en7d.onrender.com/login",
  },
  {
    id: 12,
    title: "Personal Portfolio",
    image: project9,
    description:
      "This is my personal portfolio website. While building it, I improved my UI/UX skills, used Framer Motion for animations, and enhanced my Tailwind CSS expertise.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    url: "home",
  },
  {
    id: 8,
    title: "Advanced Netflix Clone",
    image: project8,
    description:
      "An advanced Netflix clone. I worked with Express, Node.js, MongoDB/Mongoose, REST APIs, JWT authentication, and integrated TMDB + YouTube for content. (Render free plan may cause a short cold start.)",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    url: "https://netflix-mern-clone-3ktp.onrender.com",
  },
  {
    id: 1,
    title: "Netflix Clone (First Project)",
    image: project1,
    description:
      "A Netflix clone featuring a landing page, movie carousel, and movie details. Built as my final university project (grade: 97).",
    technologies: ["HTML", "CSS", "PHP", "Ajax", "MySQL", "JavaScript"],
    url: "https://braudeflix.com/",
  },
  {
    id: 2,
    title: "Zad College Tarshiha",
    image: project2,
    description:
      "A school management website with admin and student versions. Admins can publish posts and manage the system, while students can view posts and access content.",
    technologies: ["HTML", "CSS", "PHP", "MySQL", "JavaScript"],
    url: "https://zadcollage.com/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    image: project3,
    description:
      "A responsive portfolio website with a clean layout and a dark mode toggle.",
    technologies: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    url: "https://muhammadib12.github.io/portfolio2-cloning/",
  },
  {
    id: 4,
    title: "Portfolio Clone",
    image: project4,
    description:
      "A portfolio clone project to improve UI design skills and front-end implementation.",
    technologies: ["HTML", "CSS"],
    url: "https://muhammadib12.github.io/Clone-of-Brittany-Chaing/",
  },
  {
    id: 5,
    title: "Google Clone (Simple)",
    image: project5,
    description:
      "A simple Google UI clone from my early learning stage.",
    technologies: ["HTML", "CSS"],
    url: "https://muhammadib12.github.io/google-clone/",
  },
  {
    id: 6,
    title: "CRUD JS Project",
    image: project6,
    description:
      "A learning project to practice CRUD operations using localStorage and JSON handling.",
    technologies: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    url: "https://muhammadib12.github.io/CRUD-JS-PROJECT/",
  },
  {
    id: 7,
    title: "Simple Chat App",
    image: project7,
    description:
      "My first WebSocket/real-time project. Built as a simple chat without a database, mainly to explore Node.js and real-time communication. (Render free plan may cause a short cold start.)",
    technologies: ["React", "CSS", "SCSS", "Node.js", "Socket.IO"],
    url: "https://simple-chat-react-app.onrender.com/",
  },
  {
    id: 9,
    title: "Restaurant App",
    image: project10,
    description:
      "My first Next.js + TypeScript project. A restaurant app with responsive UI and smooth animations using Framer Motion.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    url: "https://restaurant-ten-rho.vercel.app/",
  },
  {
    id: 10,
    title: "TODO App",
    image: project11,
    description:
      "A backend-focused TODO app. I built REST APIs with Node.js/Express and used SQLite for data storage, improving my API architecture, database interactions, and JWT authentication.",
    technologies: ["Node.js", "Express", "JWT", "SQLite", "HTML", "CSS", "JavaScript"],
    url: "https://todo-app-1-qbhh.onrender.com/",
  },
];

export const CONTACT = {
  address: "Tamra, North Israel",
  phoneNo: "+972 0506567035",
  email: "mohammadibra403@gmail.com",
};
