import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Rocket,
  Send,
  User,
  X,
} from "lucide-react";
import { content, getCapabilities, languages, profile } from "../data/siteContent";

const WEB3FORMS_KEY = "907c3994-877e-48fb-aa46-0bb2d7d4577b";
const RATE_LIMIT_MS = 60_000;

const motionTokens = {
  ease: [0.22, 1, 0.36, 1],
  viewport: { once: true, amount: 0.22 },
  section: {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  },
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.075, delayChildren: 0.06 } },
  },
  item: {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
  },
  image: {
    hidden: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" },
    visible: { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
};

const navIds = ["work", "services", "about", "experience", "contact"];

function isTouchDevice() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-32% 0px -56% 0px", threshold: 0.01 },
      );
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, [ids]);

  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function FadeIn({ as = motion.div, className = "", children, delay = 0, ...props }) {
  const reduceMotion = useReducedMotion();
  const Element = as;
  return (
    <Element
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={motionTokens.viewport}
      variants={motionTokens.item}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Element>
  );
}

function Stagger({ as = motion.div, className = "", children, ...props }) {
  const reduceMotion = useReducedMotion();
  const Element = as;
  return (
    <Element
      className={className}
      variants={motionTokens.stagger}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={motionTokens.viewport}
      {...props}
    >
      {children}
    </Element>
  );
}

function MotionSection({ id, className = "", children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={`site-section ${className}`}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={motionTokens.viewport}
      variants={motionTokens.section}
    >
      {children}
    </motion.section>
  );
}

function AnimatedHeading({ children, as = "h1" }) {
  const Element = motion[as];
  const reduceMotion = useReducedMotion();
  const words = String(children).split(" ");

  if (reduceMotion) return <Element>{children}</Element>;

  return (
    <Element className="animated-heading" aria-label={children}>
      {words.map((word, index) => (
        <motion.span
          aria-hidden="true"
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.58, delay: 0.2 + index * 0.045, ease: motionTokens.ease }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Element>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <Stagger className="section-header">
      <motion.span className="eyebrow" variants={motionTokens.item}>{eyebrow}</motion.span>
      <motion.h2 variants={motionTokens.item}>{title}</motion.h2>
      {text && <motion.p variants={motionTokens.item}>{text}</motion.p>}
    </Stagger>
  );
}

function Button({ children, variant = "primary", as = "button", className = "", ...props }) {
  const Element = motion[as] || motion.button;
  return (
    <Element
      className={`btn btn-${variant} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16 }}
      {...props}
    >
      <span>{children}</span>
    </Element>
  );
}

function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="language-switcher" aria-label="Language selector">
      <Globe2 size={15} />
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          className={lang === item.code ? "active" : ""}
          aria-pressed={lang === item.code}
          onClick={() => setLang(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Navbar({ copy, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navIds);
  const scrolled = useScrolled();
  const navItems = [
    [copy.nav.work, "work"],
    [copy.nav.services, "services"],
    [copy.nav.about, "about"],
    [copy.nav.experience, "experience"],
    [copy.nav.contact, "contact"],
  ];

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: motionTokens.ease }}
    >
      <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); handleNav("home"); }}>
        <motion.span className="brand-mark" whileHover={{ rotate: -8, scale: 1.04 }} whileTap={{ scale: 0.96 }}>MI</motion.span>
        <span>{profile.shortName}</span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <button key={id} type="button" className={active === id ? "active" : ""} onClick={() => handleNav(id)}>
            {label}
            {active === id && <motion.span className="nav-indicator" layoutId="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <Button variant="ghost" onClick={() => handleNav("contact")}>{copy.nav.hire}</Button>
        <Button onClick={() => handleNav("contact")}>{copy.nav.project} <ArrowRight size={16} /></Button>
      </div>

      <button
        type="button"
        className="mobile-menu-button"
        aria-label={open ? copy.nav.menuClose : copy.nav.menuOpen}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }}>{open ? <X size={22} /> : <Menu size={22} />}</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <LanguageSwitcher lang={lang} setLang={setLang} />
            {navItems.map(([label, id]) => (
              <button key={id} type="button" onClick={() => handleNav(id)}>{label}</button>
            ))}
            <div className="mobile-nav-ctas">
              <Button variant="ghost" onClick={() => handleNav("contact")}>{copy.nav.hire}</Button>
              <Button onClick={() => handleNav("contact")}>{copy.nav.project}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function ProductCanvas({ copy }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.5 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);

  const handleMove = (event) => {
    if (reduceMotion || isTouchDevice()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="product-canvas"
      aria-label={copy.hero.canvasTitle}
      style={reduceMotion ? undefined : { rotateX, rotateY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.68, delay: 0.46, ease: motionTokens.ease }}
    >
      <div className="canvas-topline">
        <span>{copy.hero.canvasTitle}</span>
        <span className="live-dot">{copy.hero.availableShort}</span>
      </div>
      <div className="canvas-grid">
        {copy.hero.modules.map(([title, detail], index) => (
          <motion.div
            key={title}
            className="canvas-module"
            variants={motionTokens.item}
            animate={reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }}
            transition={reduceMotion ? undefined : { duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>0{index + 1}</span>
            <strong>{title}</strong>
            <p>{detail}</p>
          </motion.div>
        ))}
      </div>
      <div className="canvas-metrics">
        {copy.hero.metrics.map(([label, detail]) => (
          <motion.div key={label} whileHover={{ y: -3 }}>
            <strong>{label}</strong>
            <span>{detail}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Hero({ copy }) {
  return (
    <section id="home" className="hero">
      <Stagger className="hero-copy" initial="hidden" animate="visible" viewport={undefined}>
        <motion.span className="eyebrow" variants={motionTokens.item}>{copy.hero.eyebrow}</motion.span>
        <AnimatedHeading>{copy.hero.title}</AnimatedHeading>
        <motion.p variants={motionTokens.item}>{copy.hero.copy}</motion.p>
        <motion.div className="availability" variants={motionTokens.item}>
          <Check size={16} />
          {copy.hero.available}
        </motion.div>
        <motion.div className="hero-actions" variants={motionTokens.item}>
          <Button onClick={() => scrollToId("work")}>{copy.hero.primary} <ArrowRight size={17} /></Button>
          <Button variant="secondary" onClick={() => scrollToId("contact")}>{copy.hero.secondary}</Button>
          <Button variant="ghost" onClick={() => scrollToId("experience")}>{copy.hero.hire}</Button>
        </motion.div>
      </Stagger>
      <ProductCanvas copy={copy} />
    </section>
  );
}

function ProofStrip({ copy }) {
  return (
    <motion.div
      className="proof-strip"
      aria-label="Proof points"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.55, ease: motionTokens.ease }}
    >
      {copy.proofPoints.map((point) => (
        <motion.div key={point} whileHover={{ y: -2 }}>
          <Check size={16} />
          <span>{point}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ProjectModal({ copy, project, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="case-modal"
        initial={{ scale: 0.96, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 18 }}
        transition={{ duration: 0.28, ease: motionTokens.ease }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label={copy.work.close} onClick={onClose}><X size={20} /></button>
        <div className={`case-media-grid ${project.screenshots?.length > 1 ? "has-two" : ""}`}>
          {(project.screenshots || [project.image]).slice(0, 2).map((src, index) => (
            <img key={src} src={src} alt={`${project.name} ${index ? "mobile" : "desktop"} interface preview`} />
          ))}
        </div>
        <div className="case-modal-body">
          <span className="eyebrow">{project.category}</span>
          <h3 id="case-study-title">{project.name}</h3>
          <p>{project.summary}</p>
          <div className="case-modal-grid">
            <div><h4>{copy.work.need}</h4><p>{project.need}</p></div>
            <div><h4>{copy.work.built}</h4><p>{project.built}</p></div>
          </div>
          <div className="tag-row">{project.stack.map((item) => <motion.span key={item} whileHover={{ y: -2 }}>{item}</motion.span>)}</div>
          <Button as="a" href={project.url} target="_blank" rel="noreferrer">{copy.work.visit} <ExternalLink size={16} /></Button>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ProjectCard({ copy, project, index, onOpen }) {
  return (
    <motion.article
      className={`project-card project-${project.accent}`}
      initial={false}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={motionTokens.viewport}
      transition={{ duration: 0.65, ease: motionTokens.ease }}
    >
      <motion.div className="project-media" variants={motionTokens.image} initial={false} whileInView="visible" viewport={motionTokens.viewport}>
        <motion.img
          src={project.image}
          alt={`${project.name} product interface`}
          loading={index > 1 ? "lazy" : "eager"}
          whileHover={{ scale: 1.035 }}
          transition={{ duration: 0.35 }}
        />
      </motion.div>
      <Stagger className="project-content">
        <motion.span className="eyebrow" variants={motionTokens.item}>{project.category}</motion.span>
        <motion.h3 variants={motionTokens.item}>{project.name}</motion.h3>
        <motion.p className="project-summary" variants={motionTokens.item}>{project.summary}</motion.p>
        <motion.dl className="project-facts" variants={motionTokens.item}>
          <div><dt>{copy.work.role}</dt><dd>{project.role}</dd></div>
          <div><dt>{copy.work.language}</dt><dd>{project.languages}</dd></div>
        </motion.dl>
        <motion.ul className="feature-list" variants={motionTokens.stagger}>
          {project.features.map((feature) => <motion.li key={feature} variants={motionTokens.item}>{feature}</motion.li>)}
        </motion.ul>
        <motion.div className="tag-row" variants={motionTokens.stagger}>
          {project.stack.slice(0, 6).map((item) => <motion.span key={item} variants={motionTokens.item} whileHover={{ y: -2 }}>{item}</motion.span>)}
        </motion.div>
        <motion.div className="project-actions" variants={motionTokens.item}>
          <Button as="a" href={project.url} target="_blank" rel="noreferrer">{copy.work.visit} <ExternalLink size={16} /></Button>
          <Button variant="ghost" onClick={() => onOpen(project)}>{copy.work.caseStudy} <ArrowRight size={16} /></Button>
        </motion.div>
      </Stagger>
    </motion.article>
  );
}

function SelectedWork({ copy }) {
  const [activeProject, setActiveProject] = useState(null);
  return (
    <MotionSection id="work">
      <SectionHeader eyebrow={copy.work.eyebrow} title={copy.work.title} text={copy.work.text} />
      <div className="project-stack">
        {copy.projects.map((project, index) => (
          <ProjectCard key={project.id} copy={copy} project={project} index={index} onOpen={setActiveProject} />
        ))}
      </div>
      <FadeIn className="archive-card">
        <div><span className="eyebrow">{copy.work.archiveEyebrow}</span><h3>{copy.work.archiveTitle}</h3></div>
        <p>{copy.work.archiveText}</p>
      </FadeIn>
      <AnimatePresence>
        {activeProject && <ProjectModal copy={copy} project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>
    </MotionSection>
  );
}

function Services({ copy }) {
  return (
    <MotionSection id="services">
      <SectionHeader {...copy.servicesHeader} />
      <Stagger className="services-grid">
        {copy.services.map(([title, text], index) => (
          <motion.article key={title} className="service-card hover-light" variants={motionTokens.item} whileHover={{ y: -5 }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </Stagger>
      <FadeIn className="inline-cta">
        <p>{copy.servicesHeader.ctaText}</p>
        <Button onClick={() => scrollToId("contact")}>{copy.servicesHeader.ctaButton} <ArrowRight size={16} /></Button>
      </FadeIn>
    </MotionSection>
  );
}

function About({ copy }) {
  return (
    <MotionSection id="about" className="split-section">
      <Stagger>
        <motion.span className="eyebrow" variants={motionTokens.item}>{copy.about.eyebrow}</motion.span>
        <motion.h2 variants={motionTokens.item}>{copy.about.title}</motion.h2>
        <motion.p variants={motionTokens.item}>{copy.about.text}</motion.p>
      </Stagger>
      <Stagger className="differentiator-grid">
        {copy.about.points.map((item) => (
          <motion.div key={item} className="differentiator-item" variants={motionTokens.item} whileHover={{ x: 4 }}>
            <Check size={17} />
            <span>{item}</span>
          </motion.div>
        ))}
      </Stagger>
    </MotionSection>
  );
}

function Experience({ copy }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 35%"] });
  return (
    <MotionSection id="experience">
      <SectionHeader {...copy.experienceHeader} />
      <div className="timeline" ref={ref}>
        <motion.div className="timeline-progress" style={{ scaleY: scrollYProgress }} />
        {copy.experience.map(([period, title, place, text]) => (
          <motion.article key={`${period}-${title}`} className="timeline-item" variants={motionTokens.item} initial={false} whileInView="visible" viewport={motionTokens.viewport}>
            <span>{period}</span>
            <div><h3>{title}</h3><strong>{place}</strong><p>{text}</p></div>
          </motion.article>
        ))}
      </div>
      <FadeIn className="resume-row">
        <Button as="a" href={profile.linkedin} target="_blank" rel="noreferrer">{copy.experienceHeader.resume} <Linkedin size={16} /></Button>
        <Button as="a" variant="secondary" href={profile.recommendationPdf} target="_blank" rel="noreferrer">{copy.experienceHeader.recommendation} <ExternalLink size={16} /></Button>
        <Button as="a" variant="ghost" href={profile.recommendationPdf} download="Muhammad-Ibrahim-Recommendation.pdf">{copy.experienceHeader.download} <Download size={16} /></Button>
        <Button as="a" variant="ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <Github size={16} /></Button>
      </FadeIn>
    </MotionSection>
  );
}

function Capabilities({ copy }) {
  const capabilities = getCapabilities(copy);
  return (
    <MotionSection id="capabilities">
      <SectionHeader {...copy.capabilities} />
      <Stagger className="capability-grid">
        {capabilities.map((group) => (
          <motion.article key={group.title} className="capability-card hover-light" variants={motionTokens.item} whileHover={{ y: -4 }}>
            <h3>{group.title}</h3>
            <div className="tag-row">{group.items.map((item) => <motion.span key={item} whileHover={{ y: -2 }}>{item}</motion.span>)}</div>
          </motion.article>
        ))}
      </Stagger>
    </MotionSection>
  );
}

function Process({ copy }) {
  return (
    <MotionSection id="process">
      <SectionHeader {...copy.process} />
      <Stagger className="process-grid">
        {copy.process.steps.map(([number, title, text]) => (
          <motion.article key={number} className="process-card" variants={motionTokens.item} whileHover={{ y: -5 }}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </Stagger>
    </MotionSection>
  );
}

function DualConversion({ copy }) {
  return (
    <MotionSection id="paths" className="dual-section">
      {copy.paths.map(([title, text, button], index) => (
        <motion.article key={title} className={index ? "path-project" : "path-hire"} whileHover={{ y: -6 }}>
          {index ? <Rocket size={24} /> : <BriefcaseBusiness size={24} />}
          <h2>{title}</h2>
          <p>{text}</p>
          <Button variant={index ? "secondary" : "primary"} onClick={() => scrollToId("contact")}>{button}</Button>
        </motion.article>
      ))}
    </MotionSection>
  );
}

const initialForm = {
  name: "",
  email: "",
  interestIndex: 0,
  projectType: "",
  timeline: "",
  budget: "",
  message: "",
};

function Contact({ copy }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [lastSent, setLastSent] = useState(0);
  const isProject = form.interestIndex === 1;

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = copy.contact.errors.name;
    if (!form.email.trim()) next.email = copy.contact.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = copy.contact.errors.emailInvalid;
    if (!form.message.trim()) next.message = copy.contact.errors.message;
    else if (form.message.trim().length < 10) next.message = copy.contact.errors.messageShort;
    return next;
  };

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (lastSent && Date.now() - lastSent < RATE_LIMIT_MS) {
      setStatus("ratelimit");
      return;
    }
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: `[Portfolio] ${copy.contact.interests[form.interestIndex]}`,
          message: [
            form.message,
            isProject && form.projectType ? `${copy.contact.projectType}: ${form.projectType}` : "",
            isProject && form.timeline ? `${copy.contact.timeline}: ${form.timeline}` : "",
            isProject && form.budget ? `${copy.contact.budget}: ${form.budget}` : "",
          ].filter(Boolean).join("\n\n"),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Submission failed");
      setLastSent(Date.now());
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: (event) => update(name, event.target.value),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <MotionSection id="contact" className="contact-section">
      <Stagger className="contact-intro">
        <motion.span className="eyebrow" variants={motionTokens.item}>{copy.contact.eyebrow}</motion.span>
        <motion.h2 variants={motionTokens.item}>{copy.contact.title}</motion.h2>
        <motion.p variants={motionTokens.item}>{copy.contact.text}</motion.p>
        <motion.div className="direct-links" variants={motionTokens.item}>
          <a href={`mailto:${profile.navEmail}`}><Mail size={16} /> {copy.contact.direct[0]}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> {copy.contact.direct[1]}</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> {copy.contact.direct[2]}</a>
          <a href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageSquare size={16} /> {copy.contact.direct[3]}</a>
        </motion.div>
      </Stagger>

      <motion.form className="contact-form" onSubmit={handleSubmit} noValidate variants={motionTokens.item} initial={false} whileInView="visible" viewport={motionTokens.viewport}>
        <label>
          <span><User size={15} /> {copy.contact.name}</span>
          <input type="text" autoComplete="name" placeholder={copy.contact.placeholders.name} {...fieldProps("name")} />
          <AnimatePresence>{errors.name && <motion.small id="name-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{errors.name}</motion.small>}</AnimatePresence>
        </label>
        <label>
          <span><Mail size={15} /> {copy.contact.email}</span>
          <input type="email" autoComplete="email" placeholder={copy.contact.placeholders.email} {...fieldProps("email")} />
          <AnimatePresence>{errors.email && <motion.small id="email-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{errors.email}</motion.small>}</AnimatePresence>
        </label>
        <label>
          <span>{copy.contact.interest}</span>
          <select
            id="interestIndex"
            name="interestIndex"
            value={form.interestIndex}
            onChange={(event) => update("interestIndex", Number(event.target.value))}
          >
            {copy.contact.interests.map((option, index) => <option key={option} value={index}>{option}</option>)}
          </select>
        </label>
        <AnimatePresence initial={false}>
          {isProject && (
            <motion.div className="project-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <label><span>{copy.contact.projectType}</span><select {...fieldProps("projectType")}><option value="">{copy.contact.selectType}</option>{copy.contact.projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label><span>{copy.contact.timeline}</span><select {...fieldProps("timeline")}><option value="">{copy.contact.selectTimeline}</option>{copy.contact.timelines.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label><span>{copy.contact.budget}</span><select {...fieldProps("budget")}><option value="">{copy.contact.selectBudget}</option>{copy.contact.budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
            </motion.div>
          )}
        </AnimatePresence>
        <label className="message-label">
          <span>{copy.contact.message}</span>
          <textarea rows="6" placeholder={copy.contact.placeholders.message} {...fieldProps("message")} />
          <AnimatePresence>{errors.message && <motion.small id="message-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{errors.message}</motion.small>}</AnimatePresence>
        </label>
        <AnimatePresence mode="wait">
          {status === "success" && <motion.p className="form-status success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{copy.contact.success}</motion.p>}
          {status === "error" && <motion.p className="form-status error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{copy.contact.error}</motion.p>}
          {status === "ratelimit" && <motion.p className="form-status warn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{copy.contact.ratelimit}</motion.p>}
        </AnimatePresence>
        <Button className="form-submit" disabled={status === "sending"}>{status === "sending" ? copy.contact.sending : <><Send size={16} /> {copy.contact.submit}</>}</Button>
      </motion.form>
    </MotionSection>
  );
}

function Footer({ copy }) {
  const year = useMemo(() => new Date().getFullYear(), []);
  const navItems = [[copy.nav.work, "work"], [copy.nav.services, "services"], [copy.nav.about, "about"], [copy.nav.experience, "experience"], [copy.nav.contact, "contact"]];
  return (
    <footer className="site-footer">
      <div><strong>{profile.name}</strong><p>{copy.footer.text}</p></div>
      <nav aria-label="Footer navigation">{navItems.map(([label, id]) => <button key={id} type="button" onClick={() => scrollToId(id)}>{label}</button>)}</nav>
      <div className="footer-meta"><span>{copy.footer.available}</span><span>© {year} {profile.name}</span></div>
    </footer>
  );
}

export default function PremiumPortfolio() {
  const [lang, setLang] = useState(() => localStorage.getItem("portfolio-lang") || "en");
  const selected = languages.find((item) => item.code === lang) || languages[0];
  const copy = content[selected.code] || content.en;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    localStorage.setItem("portfolio-lang", selected.code);
    document.documentElement.lang = selected.code;
    document.documentElement.dir = selected.dir;
  }, [selected.code, selected.dir]);

  return (
    <div className={`premium-site lang-${selected.code}`} dir={selected.dir}>
      <motion.div className="page-reveal" initial={reduceMotion ? false : { scaleX: 1 }} animate={reduceMotion ? undefined : { scaleX: 0 }} transition={{ duration: 0.75, ease: motionTokens.ease }} />
      <motion.div className="ambient ambient-one" animate={reduceMotion ? undefined : { x: [0, 28, 0], y: [0, -18, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="ambient ambient-two" animate={reduceMotion ? undefined : { x: [0, -22, 0], y: [0, 24, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <Navbar copy={copy} lang={selected.code} setLang={setLang} />
      <main>
        <Hero copy={copy} />
        <ProofStrip copy={copy} />
        <SelectedWork copy={copy} />
        <Services copy={copy} />
        <About copy={copy} />
        <Experience copy={copy} />
        <Capabilities copy={copy} />
        <Process copy={copy} />
        <DualConversion copy={copy} />
        <Contact copy={copy} />
      </main>
      <Footer copy={copy} />
    </div>
  );
}
