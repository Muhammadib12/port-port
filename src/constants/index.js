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

export const HERO_CONTENT = `I’m a full-stack developer with 2–3 years of hands-on experience building robust, scalable web applications. I’ve delivered multiple real-world projects, including production websites, and gained strong startup experience at SPA Code. I specialize in modern front-end development with React.js and powerful back-end systems using Node.js/Express, TypeScript, MongoDB, and SQL. I’m a fast learner who loves shipping clean, maintainable solutions that deliver real business value and great user experiences.`;

export const ABOUT_TEXT = `I studied Software Practical Engineering at Braude College and graduated with honors. Over the past 2–3 years, I’ve built and shipped multiple full-stack web projects, including production-ready websites, strengthening my skills in JavaScript/TypeScript, React, Node.js/Express, MongoDB, and SQL. I gained valuable startup experience at SPA Code, working in a fast-paced environment and delivering features end-to-end. I also completed several intensive full-stack courses on Udemy and at ICS College. I’m passionate about building high-quality products, collaborating with teams, and continuously improving my engineering skills.`;

export const PROJECTS = [
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
