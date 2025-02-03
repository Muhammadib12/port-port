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

export const HERO_CONTENT = `I am a passionate junior full stack developer with a knack for crafting robust and scalable web applications. With 1 year of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, MySQL, and Mongoose. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I began my journey in software development at Braude College, where I studied Software Practical Engineering and graduated with honors. My initial steps into the world of web development were rooted in mastering the fundamentals: HTML, CSS, JavaScript, and PHP. Over time, I honed my skills and built a strong foundation in these technologies.

As my passion for web development grew, I advanced into more complex and dynamic technologies such as React, Node.js, Mongoose, and Express. Currently, I am expanding my expertise by learning React and Next.js to further enhance my skills and create modern, efficient web applications.

I am eager to continue growing professionally, gaining practical experience, and collaborating with a dynamic team to develop cutting-edge user interfaces and innovative solutions. I thrive on challenges, value teamwork, and am committed to delivering impactful results in the field of web development.`;



export const PROJECTS = [
  {
    title: "Cloning Netflix - First Project",
    image: project1,
    description:
      "A clone of the Netflix website, featuring a landing page, movie carousel, and movie details page. This project was built as my final university project, for which I received a grade of 97. ",
    technologies: ["HTML", "CSS", "Php", "Ajax", "MySql","JavaScript"],
    url: 'https://braudeflix.com/'
  },
  {
    title: "Zad Collage Tarshiha",
    image: project2,
    description:
      "I developed this website for a friend to help manage his school on a smaller scale. The application includes two versions: an admin version and a student version. In the admin version, teachers can publish posts and manage the system, while in the student version, students can view the posts shared by their teachers in the posts page. The website also features a promotional interface on the homepage and includes various other functionalities and detailed explanations.",
    technologies: ["HTML", "CSS", "PHP", "MySql","JavaScript"],
    url: 'https://zadcollage.com/'
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "An Advanced portfilio website that I built to showcase my skills and projects. The website features a responsive design, a dark mode toggle, and a contact form.",
    technologies: ["HTML", "CSS", "JavaScript","LocalStorage"],
    url: 'https://muhammadib12.github.io/portfolio2-cloning/'
  },
  {
    title: "Portfolio2 Cloning Website,",
    image: project4,
    description:
      "This is a portfolio application I created as a replica of Brittanys website. The purpose of building this project was to enhance my design skills, improve my website development capabilities, and gain more experience in crafting user interfaces.",
    technologies: ["HTML", "CSS"],
    url: 'https://muhammadib12.github.io/Clone-of-Brittany-Chaing/'
  },
  {
    title: "Google Cloning, (SIMPLE)",
    image: project5,
    description:
      "This is a very simple project that I created and wanted to share, even though it’s small and straightforward. It holds a special place for me as it was one of my early projects. It’s a basic replica of Google’s interface, and while simple, it meant a lot to me at the beginning of my journey.",
    technologies: ["HTML", "CSS"],
    url: 'https://muhammadib12.github.io/google-clone/'
  },
  {
  title: "CRUD JS Project",
    image: project6,
    description:
      "This website was built as a learning project to practice CRUD operations. It simulates a simple inventory management system for a clothing store, phone shop, or any other type of store. The data is stored in localStorage, and through this project, I learned how to handle JSON, work with localStorage, and implement basic CRUD functionalities effectively.",
    technologies: ["HTML", "CSS","JavaScript","LocalStorage"],
    url: 'https://muhammadib12.github.io/CRUD-JS-PROJECT/'
  },
  {
    title: "Simple Chat App",
      image: project7,
      description:
        "This website was my first experience using WebSocket.io, where I gained a deeper understanding of how WebSockets work. It was built as a simple chat application without using a database; instead, messages are managed through an array. The main purpose of this project was to learn and explore Node.js and WebSockets effectively.(Since I am using Render's free plan, the application may take up to half a minute to load. I kindly ask for your patience.)",
      technologies: ["React", "CSS","Scss","Node.js","WebSocket.io"],
      url: 'https://simple-chat-react-app.onrender.com/'
    },
    {
      title: "Advanced Cloning Netflix",
        image: project8,
        description:
          "This website is an advanced replica of Netflix, building upon the initial project. Through this project, I gained valuable experience working with Express, Mongoose, Node.js, and React, as well as integrating RESTful APIs. I used the TMDB API to fetch movie details and display simple videos for each movie from YouTube. Additionally, I delved deeper into implementing JWT for authentication and managing cookies. I’m excited to continue improving my skills in these areas and explore them further in real-world applications.(Since I am using Render's free plan, the application may take up to half a minute to load. I kindly ask for your patience.)",
        technologies: ["React", "CSS","Tailwind CSS","Node.js","WebSocket.io"],
        url: 'https://netflix-mern-clone-3ktp.onrender.com'
      },
      {
        title: "Restaurant App Project",
          image: project10,
          description:
            "This is my first Next.js and TypeScript project, a Restaurant App designed to improve my skills in building scalable and modern web applications. Through this project, I deepened my understanding of Next.js for server-side rendering, TypeScript for better type safety, and Tailwind CSS for efficient styling.               The app showcases a beautifully designed interface with smooth animations powered by Framer Motion, interactive UI elements, and a responsive layout to enhance user experience. By working on this project, I refined my skills in structuring Next.js applications, optimizing performance, and creating reusable React components.",
          technologies: ["Next.js", "Tailwind CSS","Framer Motion"],
          url: 'https://restaurant-ten-rho.vercel.app/'
        },
      {
        title: "Personal Portfolio",
          image: project9,
          description:
            "This website is my personal portfolio, the one you are currently exploring. While building it, I learned new skills, including using Framer Motion in React to create animations and further enhancing my expertise in Tailwind CSS. It also allowed me to refine various aspects of web development and design, making this project a significant step in my learning journey.",
          technologies: ["React", "Tailwind CSS","Framer Motion"],
          url: 'home'
        },
       
];


export const CONTACT = {
  address: "Tamra,Kabul North Israel",
  phoneNo: "+972 0506567035 ",
  email: "mohammadibra403@gmail.com",
};




// USE THIS AFTER ADDING THE EXPERIENCES SECTION

// export const EXPERIENCES = [
//   {
//     year: "2023 - Present",
//     role: "Senior Full Stack Developer",
//     company: "Google Inc.",
//     description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
//     technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
//   },
//   {
//     year: "2022 - 2023",
//     role: "Frontend Developer",
//     company: "Adobe",
//     description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
//     technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
//   },
//   {
//     year: "2021 - 2022",
//     role: "Full Stack Developer",
//     company: "Facebook",
//     description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
//     technologies: ["Python", "Svelte", "Three.js", "Postgres"],
//   },
//   {
//     year: "2020 - 2021",
//     role: "Software Engineer",
//     company: "Paypal",
//     description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
//     technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
//   },
// ];
