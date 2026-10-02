import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Plus,
  Rocket,
  Send,
  X,
} from "lucide-react";
import { content, getCapabilities, languages, profile } from "../data/siteContent";

const WEB3FORMS_KEY = "907c3994-877e-48fb-aa46-0bb2d7d4577b";
const RATE_LIMIT_MS = 60_000;
const EASE = [0.22, 1, 0.36, 1];
const navIds = ["work", "services", "about", "experience", "contact"];

/* ------------------------------------------------------------ helpers */

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers = ids.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(id), {
        rootMargin: "-40% 0px -55% 0px",
      });
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/**
 * Fades content up once it enters the viewport. CSS transition + one shared
 * IntersectionObserver. "Seen" lives in React state, so a re-render (e.g. a
 * row opening and changing its className) can never hide it again.
 */
const revealCallbacks = new WeakMap();
let revealObserver = null;
function observeReveal(element, onSeen) {
  if (typeof IntersectionObserver === "undefined") {
    onSeen();
    return () => {};
  }
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        revealCallbacks.get(entry.target)?.();
        revealCallbacks.delete(entry.target);
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
  );
  revealCallbacks.set(element, onSeen);
  revealObserver.observe(element);
  return () => {
    revealCallbacks.delete(element);
    revealObserver?.unobserve(element);
  };
}

function Reveal({ as = "div", delay = 0, className = "", style, children, ...props }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current) return undefined;
    return observeReveal(ref.current, () => setSeen(true));
  }, [seen]);
  return createElement(
    as,
    {
      ref,
      className: `reveal ${seen ? "is-in" : ""} ${className}`,
      style: delay ? { ...style, transitionDelay: `${delay}s` } : style,
      ...props,
    },
    children,
  );
}

/** Pointer-following light on cards (CSS vars). */
function spotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function SectionHead({ index, eyebrow, title, text, aside }) {
  return (
    <div className="section-head">
      <Reveal className="section-kicker">
        <span className="kicker-index">{index}</span>
        <span className="kicker-line" />
        <span>{eyebrow}</span>
      </Reveal>
      <div className="section-head-row">
        <Reveal as="h2" delay={0.05}>{title}</Reveal>
        {(text || aside) && (
          <Reveal className="section-head-aside" delay={0.12}>
            {text && <p>{text}</p>}
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  );
}

function Btn({ children, variant = "solid", href, className = "", ...props }) {
  const cls = `btn btn-${variant} ${className}`;
  if (href) {
    return (
      <a className={cls} href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------ nav */

function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="lang" role="group" aria-label="Language">
      {languages.map((item) => (
        <button key={item.code} type="button" className={lang === item.code ? "is-active" : ""} aria-pressed={lang === item.code} onClick={() => setLang(item.code)}>
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
  const items = navIds.map((id) => [copy.nav[id], id]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <span className="brand-mark">MI</span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {items.map(([label, id]) => (
            <button key={id} type="button" className={active === id ? "is-active" : ""} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-end">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <Btn className="nav-cta" onClick={() => go("contact")}>
            {copy.nav.project} <ArrowUpRight size={16} />
          </Btn>
          <button type="button" className="nav-burger" aria-label={open ? copy.nav.menuClose : copy.nav.menuOpen} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Mobile navigation">
              {items.map(([label, id], index) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.45, ease: EASE }}
                >
                  <span>0{index + 1}</span>
                  {label}
                </motion.button>
              ))}
            </nav>
            <div className="sheet-foot">
              <LanguageSwitcher lang={lang} setLang={setLang} />
              <Btn onClick={() => go("contact")}>{copy.nav.hire}</Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------ hero */

function HeroTitle({ text }) {
  const words = text.split(" ");
  const accentFrom = Math.max(1, words.length - 2); // the last two words get the serif accent
  return (
    <h1 className="hero-title" aria-label={text}>
      {words.map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`} aria-hidden="true">
          <span className={`rise ${index >= accentFrom ? "accent-word" : ""}`} style={{ animationDelay: `${0.15 + index * 0.06}s` }}>
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}

function Hero({ copy }) {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div className="hero-meta fade-in">
          <span className="status-dot" />
          <span>{copy.hero.eyebrow}</span>
          <span className="hero-meta-sep" />
          <span>{profile.location}</span>
        </div>
        <HeroTitle text={copy.hero.title} />
        <div className="hero-bottom fade-up">
          <p className="hero-copy">{copy.hero.copy}</p>
          <div className="hero-side">
            <p className="hero-available">
              <Check size={16} /> {copy.hero.available}
            </p>
            <div className="hero-actions">
              <Btn onClick={() => scrollToId("work")}>
                {copy.hero.primary} <ArrowDownRight size={17} />
              </Btn>
              <Btn variant="line" onClick={() => scrollToId("contact")}>
                {copy.hero.secondary}
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkReel({ projects }) {
  const reel = [...projects, ...projects];
  return (
    <div className="reel" dir="ltr" aria-hidden="true">
      <div className="reel-track">
        {reel.map((project, index) => (
          <figure className="reel-item" key={`${project.id}-${index}`}>
            <img src={project.image} alt="" loading={index < 4 ? "eager" : "lazy"} />
            <figcaption>{project.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ProofTicker({ points }) {
  const items = [...points, ...points, ...points];
  return (
    <div className="ticker" aria-label="Highlights">
      <div className="ticker-track" dir="ltr">
        {items.map((point, index) => (
          <span key={`${point}-${index}`} aria-hidden={index >= points.length}>
            <i>✦</i> {point}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ work */

function CaseModal({ copy, project, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [onClose]);

  return (
    <motion.div className="modal" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.article
        className="modal-card"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label={copy.work.close} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={`modal-media ${project.screenshots?.length > 1 ? "has-two" : ""}`}>
          {(project.screenshots || [project.image]).slice(0, 2).map((src, index) => (
            <img key={src} src={src} alt={`${project.name} ${index ? "mobile" : "desktop"} preview`} />
          ))}
        </div>
        <div className="modal-body">
          <span className="tag-eyebrow">{project.category}</span>
          <h3 id="case-title">{project.name}</h3>
          <p className="modal-lede">{project.summary}</p>
          <div className="modal-cols">
            <div>
              <h4>{copy.work.need}</h4>
              <p>{project.need}</p>
            </div>
            <div>
              <h4>{copy.work.built}</h4>
              <p>{project.built}</p>
            </div>
            <div>
              <h4>{copy.work.role}</h4>
              <p>{project.role}</p>
            </div>
            <div>
              <h4>{copy.work.language}</h4>
              <p>{project.languages}</p>
            </div>
          </div>
          <ul className="check-list">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={15} /> {feature}
              </li>
            ))}
          </ul>
          <div className="chips">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Btn href={project.url} target="_blank" rel="noreferrer">
            {copy.work.visit} <ArrowUpRight size={16} />
          </Btn>
        </div>
      </motion.article>
    </motion.div>
  );
}

function FeaturedProject({ copy, project, onOpen }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const phoneY = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 80, damping: 20 });
  const [desktop, mobile] = project.screenshots || [project.image];

  return (
    <Reveal as="article" className={`featured accent-${project.accent}`}>
      <div className="featured-stage" ref={ref}>
        <div className="browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          </div>
          <img src={desktop} alt={`${project.name} website`} />
        </div>
        {mobile && (
          <motion.div className="phone" style={reduceMotion ? undefined : { y: phoneY }}>
            <img src={mobile} alt={`${project.name} mobile`} />
          </motion.div>
        )}
      </div>
      <div className="featured-copy">
        <div className="featured-top">
          <span className="project-index">01</span>
          <span className="tag-eyebrow">{project.category}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ul className="check-list">
          {project.features.map((feature) => (
            <li key={feature}>
              <Check size={15} /> {feature}
            </li>
          ))}
        </ul>
        <div className="chips">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="card-actions">
          <Btn href={project.url} target="_blank" rel="noreferrer">
            {copy.work.visit} <ArrowUpRight size={16} />
          </Btn>
          <Btn variant="line" onClick={() => onOpen(project)}>
            {copy.work.caseStudy}
          </Btn>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectTile({ copy, project, index, wide, onOpen }) {
  return (
    <Reveal as="article" className={`tile accent-${project.accent} ${wide ? "tile-wide" : ""}`} delay={(index % 2) * 0.08} onMouseMove={spotlight}>
      <button type="button" className="tile-media" onClick={() => onOpen(project)} aria-label={`${copy.work.caseStudy}: ${project.name}`}>
        <img src={project.image} alt={`${project.name} interface`} loading="lazy" />
        <span className="tile-open">
          <Plus size={20} />
        </span>
      </button>
      <div className="tile-body">
        <div className="tile-top">
          <span className="project-index">{String(index + 2).padStart(2, "0")}</span>
          <span className="tag-eyebrow">{project.category}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="chips">
          {project.stack.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="card-actions">
          <a className="text-link" href={project.url} target="_blank" rel="noreferrer">
            {copy.work.visit} <ArrowUpRight size={15} />
          </a>
          <button type="button" className="text-link" onClick={() => onOpen(project)}>
            {copy.work.caseStudy} <Plus size={15} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function SelectedWork({ copy }) {
  const [active, setActive] = useState(null);
  const [featured, ...rest] = copy.projects;
  return (
    <section id="work" className="section">
      <SectionHead index="01" eyebrow={copy.work.eyebrow} title={copy.work.title} text={copy.work.text} />
      <FeaturedProject copy={copy} project={featured} onOpen={setActive} />
      <div className="tiles">
        {rest.map((project, index) => (
          <ProjectTile key={project.id} copy={copy} project={project} index={index} wide={index % 4 === 0 || index % 4 === 3} onOpen={setActive} />
        ))}
      </div>
      <Reveal className="archive">
        <div>
          <span className="tag-eyebrow">{copy.work.archiveEyebrow}</span>
          <h3>{copy.work.archiveTitle}</h3>
        </div>
        <p>{copy.work.archiveText}</p>
      </Reveal>
      <AnimatePresence>{active && <CaseModal copy={copy} project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------ services */

function Services({ copy }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" className="section">
      <SectionHead index="02" eyebrow={copy.servicesHeader.eyebrow} title={copy.servicesHeader.title} text={copy.servicesHeader.text} />
      <div className="service-list">
        {copy.services.map(([title, text], index) => {
          const isOpen = open === index;
          return (
            <Reveal key={title} className={`service-row ${isOpen ? "is-open" : ""}`} delay={index * 0.04}>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)} onMouseEnter={() => setOpen(index)}>
                <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-title">{title}</span>
                <span className="service-icon">
                  <ArrowUpRight size={22} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div className="service-text" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <p>{text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="band">
        <p>{copy.servicesHeader.ctaText}</p>
        <Btn onClick={() => scrollToId("contact")}>
          {copy.servicesHeader.ctaButton} <ArrowUpRight size={16} />
        </Btn>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ about */

function About({ copy }) {
  return (
    <section id="about" className="section about">
      <SectionHead index="03" eyebrow={copy.about.eyebrow} title={copy.about.title} />
      <div className="about-grid">
        <Reveal as="p" className="about-lede">
          {copy.about.text}
        </Reveal>
        <div className="about-points">
          {copy.about.points.map((point, index) => (
            <Reveal key={point} className="about-point" delay={index * 0.05} onMouseMove={spotlight}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{point}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ experience */

function Experience({ copy }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <section id="experience" className="section">
      <div className="exp-grid">
        <div className="exp-aside">
          <SectionHead index="04" eyebrow={copy.experienceHeader.eyebrow} title={copy.experienceHeader.title} text={copy.experienceHeader.text} />
          <Reveal className="exp-links">
            <Btn href={profile.linkedin} target="_blank" rel="noreferrer">
              {copy.experienceHeader.resume} <Linkedin size={16} />
            </Btn>
            <Btn variant="line" href={profile.recommendationPdf} target="_blank" rel="noreferrer">
              {copy.experienceHeader.recommendation} <ArrowUpRight size={16} />
            </Btn>
            <a className="text-link" href={profile.recommendationPdf} download="Muhammad-Ibrahim-Recommendation.pdf">
              {copy.experienceHeader.download} <Download size={15} />
            </a>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Github size={15} />
            </a>
          </Reveal>
        </div>
        <ol className="timeline" ref={ref}>
          <motion.span className="timeline-fill" style={{ scaleY }} />
          {copy.experience.map(([period, title, place, text], index) => (
            <Reveal as="li" key={`${period}-${title}`} className="timeline-item" delay={index * 0.04}>
              <span className="timeline-dot" />
              <span className="tag-eyebrow">{period}</span>
              <h3>{title}</h3>
              <strong>{place}</strong>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ capabilities + process */

function Capabilities({ copy }) {
  const groups = getCapabilities(copy);
  return (
    <section id="capabilities" className="section">
      <SectionHead index="05" eyebrow={copy.capabilities.eyebrow} title={copy.capabilities.title} text={copy.capabilities.text} />
      <div className="bento">
        {groups.map((group, index) => (
          <Reveal key={group.title} className={`bento-card bento-${index}`} delay={index * 0.05} onMouseMove={spotlight}>
            <span className="bento-count">{String(group.items.length).padStart(2, "0")}</span>
            <h3>{group.title}</h3>
            <div className="chips chips-lg">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process({ copy }) {
  return (
    <section id="process" className="section">
      <SectionHead index="06" eyebrow={copy.process.eyebrow} title={copy.process.title} text={copy.process.text} />
      <ol className="steps">
        {copy.process.steps.map(([number, title, text], index) => (
          <Reveal as="li" key={number} className="step" delay={index * 0.06}>
            <span className="step-num">{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Paths({ copy }) {
  return (
    <section id="paths" className="section paths">
      {copy.paths.map(([title, text, button], index) => (
        <Reveal key={title} as="article" className={`path ${index ? "path-alt" : ""}`} delay={index * 0.08} onMouseMove={spotlight}>
          <span className="path-icon">{index ? <Rocket size={22} /> : <BriefcaseBusiness size={22} />}</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <Btn variant={index ? "solid" : "dark"} onClick={() => scrollToId("contact")}>
            {button} <ArrowUpRight size={16} />
          </Btn>
        </Reveal>
      ))}
    </section>
  );
}

/* ------------------------------------------------------------ contact */

const initialForm = { name: "", email: "", interestIndex: 0, projectType: "", timeline: "", budget: "", message: "" };

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
          ]
            .filter(Boolean)
            .join("\n\n"),
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

  const field = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: (event) => update(name, event.target.value),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const direct = [
    [`mailto:${profile.navEmail}`, <Mail size={18} key="m" />, copy.contact.direct[0], profile.navEmail],
    [profile.linkedin, <Linkedin size={18} key="l" />, copy.contact.direct[1], "muhammad-ibrahem"],
    [profile.github, <Github size={18} key="g" />, copy.contact.direct[2], "Muhammadib12"],
    [`https://wa.me/${profile.phone.replace(/\D/g, "")}`, <MessageSquare size={18} key="w" />, copy.contact.direct[3], profile.phone],
  ];

  return (
    <section id="contact" className="section contact">
      <div className="contact-grid">
        <div className="contact-intro">
          <SectionHead index="07" eyebrow={copy.contact.eyebrow} title={copy.contact.title} text={copy.contact.text} />
          <Reveal className="direct">
            {direct.map(([href, icon, label, value]) => (
              <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
                <span className="direct-icon">{icon}</span>
                <span>
                  <strong>{label}</strong>
                  <small dir="ltr">{value}</small>
                </span>
                <ArrowUpRight size={16} className="direct-arrow" />
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal as="form" className="form" onSubmit={handleSubmit} noValidate>
          <div className="interest" role="radiogroup" aria-label={copy.contact.interest}>
            <span className="field-label">{copy.contact.interest}</span>
            <div className="interest-options">
              {copy.contact.interests.map((option, index) => (
                <button key={option} type="button" role="radio" aria-checked={form.interestIndex === index} className={form.interestIndex === index ? "is-active" : ""} onClick={() => update("interestIndex", index)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <label>
              <span className="field-label">{copy.contact.name}</span>
              <input type="text" autoComplete="name" placeholder={copy.contact.placeholders.name} {...field("name")} />
              {errors.name && <small id="name-error">{errors.name}</small>}
            </label>
            <label>
              <span className="field-label">{copy.contact.email}</span>
              <input type="email" autoComplete="email" dir="ltr" placeholder={copy.contact.placeholders.email} {...field("email")} />
              {errors.email && <small id="email-error">{errors.email}</small>}
            </label>
          </div>
          <AnimatePresence initial={false}>
            {isProject && (
              <motion.div className="form-row form-row-3" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label>
                  <span className="field-label">{copy.contact.projectType}</span>
                  <select {...field("projectType")}>
                    <option value="">{copy.contact.selectType}</option>
                    {copy.contact.projectTypes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label>
                  <span className="field-label">{copy.contact.timeline}</span>
                  <select {...field("timeline")}>
                    <option value="">{copy.contact.selectTimeline}</option>
                    {copy.contact.timelines.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label>
                  <span className="field-label">{copy.contact.budget}</span>
                  <select {...field("budget")}>
                    <option value="">{copy.contact.selectBudget}</option>
                    {copy.contact.budgets.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
          <label>
            <span className="field-label">{copy.contact.message}</span>
            <textarea rows="5" placeholder={copy.contact.placeholders.message} {...field("message")} />
            {errors.message && <small id="message-error">{errors.message}</small>}
          </label>
          {status === "success" && <p className="form-status ok">{copy.contact.success}</p>}
          {status === "error" && <p className="form-status bad">{copy.contact.error}</p>}
          {status === "ratelimit" && <p className="form-status warn">{copy.contact.ratelimit}</p>}
          <button type="submit" className="btn btn-solid btn-block" disabled={status === "sending"}>
            {status === "sending" ? copy.contact.sending : <>{copy.contact.submit} <Send size={16} /></>}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ footer */

function Footer({ copy }) {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="footer-text">{copy.footer.text}</p>
          <p className="footer-available">
            <span className="status-dot" /> {copy.footer.available}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {navIds.map((id) => (
            <button key={id} type="button" onClick={() => scrollToId(id)}>
              {copy.nav[id]}
            </button>
          ))}
        </nav>
      </div>
      <div className="wordmark" dir="ltr" aria-hidden="true">
        Muhammad<span>Ibrahim</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {year} {profile.name}
        </span>
        <span dir="ltr">{profile.title}</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------ page */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

export default function PremiumPortfolio() {
  const [lang, setLang] = useState(() => {
    // ?lang=ar|he|en wins (shareable links), then the visitor's last choice.
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (languages.some((item) => item.code === fromUrl)) return fromUrl;
    try {
      return localStorage.getItem("portfolio-lang") || "en";
    } catch {
      return "en";
    }
  });
  const selected = languages.find((item) => item.code === lang) || languages[0];
  const copy = content[selected.code] || content.en;

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-lang", selected.code);
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = selected.code;
    document.documentElement.dir = selected.dir;
  }, [selected.code, selected.dir]);

  return (
    <div className={`site lang-${selected.code}`} dir={selected.dir}>
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      <Navbar copy={copy} lang={selected.code} setLang={setLang} />
      <main>
        <Hero copy={copy} />
        <WorkReel projects={copy.projects} />
        <ProofTicker points={copy.proofPoints} />
        <SelectedWork copy={copy} />
        <Services copy={copy} />
        <About copy={copy} />
        <Experience copy={copy} />
        <Capabilities copy={copy} />
        <Process copy={copy} />
        <Paths copy={copy} />
        <Contact copy={copy} />
      </main>
      <Footer copy={copy} />
    </div>
  );
}
