import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
// import Experience from './components/Experience.jsx'
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Recomanded from "./components/Recomanded.jsx";
const API_BASE = "https://backtoport.onrender.com";
function App() {
  useEffect(() => {
    const url = new URL("/api/track", API_BASE);
    url.searchParams.set(
      "path",
      window.location.pathname + window.location.search
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
    <div className="overflow-x-hidden  text-neutral-300 antialiased selection:bg-green-300 selection:text-black">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <About />
        <Recomanded />
        <Technologies />
        {/* <Experience /> */}
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
