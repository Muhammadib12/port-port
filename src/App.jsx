import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
// import Experience from './components/Experience.jsx'
import Projects from "./components/Projects.jsx";
import ProjectsShowcase from "./components/ProjectsShowcase.jsx";
import ProjectsScreen from "./components/ProjectsScreen.jsx";
import BestProjects from "./components/BestProjects.jsx";
import ContactForm from "./components/ContactForm.jsx";
import BackgroundFX from "./components/BackgroundFX.jsx";
import Contact from "./components/Contact.jsx";
import Recomanded from "./components/Recomanded.jsx";

const API_BASE = "https://backtoport.onrender.com";

function App() {
  useEffect(() => {
    const url = new URL("/api/track", API_BASE);
    url.searchParams.set(
      "path",
      window.location.pathname + window.location.search,
    );
    url.searchParams.set("ref", document.referrer || "-");
    url.searchParams.set("ua", navigator.userAgent || "-");

    // طلب خفيف؛ keepalive حتى لو أغلق المستخدم التبويب بسرعة
    const res = fetch(url.toString(), {
      method: "GET",
      mode: "cors",
      keepalive: true,
      cache: "no-store",
    }).catch(() => {});
    console.log(res);
  }, []);

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-yellow-400 selection:text-black" style={{ background: '#050505' }}>
      {/* Scanline overlay */}
      <div className="scanline" />
      <BackgroundFX />

      {/* Background grid */}
      <div className="fixed top-0 -z-10 h-full w-full">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,215,0,0.07), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <Hero />
        <About />
        <Recomanded />
        <Technologies />
        {/* <Experience /> */}
        <BestProjects />
        <ProjectsScreen />
        <ProjectsShowcase />
        <ContactForm />
        <Contact />
      </div>
    </div>
  );
}

export default App;
