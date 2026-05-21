import React, { useEffect, useRef } from 'react';
import { RiReactjsLine } from 'react-icons/ri';
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiPhp, SiMongodb, SiExpress, SiMysql, SiSpringboot, SiPostgresql, SiFlutter, SiFastapi, SiPython, SiOpenai, SiVercel, SiRender, SiAmazonwebservices, SiHostinger, SiCloudinary, SiCloudflare } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { FaJava, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

/* ── Matrix rain canvas ── */
function MatrixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const FONT = 11;
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/=+*#@!;';
    let cols = Math.floor(canvas.width / FONT);
    let drops = Array(cols).fill(0).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cols = Math.floor(canvas.width / FONT);
      if (drops.length !== cols) drops = Array(cols).fill(0).map(() => Math.random() * -50);

      ctx.font = `${FONT}px monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const alpha = 0.06 + Math.random() * 0.1;
        ctx.fillStyle = `rgba(255,215,0,${alpha})`;
        ctx.fillText(ch, i * FONT, y * FONT);
        if (y * FONT > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }}
    />
  );
}

/* ── Code snippets floating in background ── */
const CODE_LINES = [
  'const app = express()',
  'useState(null)',
  'async/await fetch()',
  'npm run build',
  'git push origin main',
  'SELECT * FROM users',
  'db.collection.find({})',
  'ReactDOM.render(<App/>)',
  'mongoose.connect(uri)',
  'res.json({ ok: true })',
  'import { motion }',
  'tailwind.config.js',
  'next.config.mjs',
  'docker-compose up',
  'JWT.sign(payload)',
];

function FloatingCode() {
  return (
    <>
      {CODE_LINES.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          animate={{ opacity: [0, 0.07, 0.12, 0.07, 0], x: 0 }}
          transition={{
            duration: 8 + i * 0.6,
            delay: i * 1.1,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            position: 'absolute',
            top: `${5 + (i * 6.2) % 90}%`,
            left: i % 2 === 0 ? `${2 + (i * 3) % 18}%` : undefined,
            right: i % 2 !== 0 ? `${2 + (i * 3) % 18}%` : undefined,
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#FFD700',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '0.05em',
          }}
        >
          {line}
        </motion.div>
      ))}
    </>
  );
}

/* Claude Code & Codex don't have react-icons — using text badges */
const TextIcon = ({ text, sub }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
    <span style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '-0.03em' }}>{text}</span>
    {sub && <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', opacity: 0.7 }}>{sub}</span>}
  </div>
);

const icons = [
  { icon: <RiReactjsLine />, color: '#22d3ee', label: 'React', duration: 2.5 },
  { icon: <SiTailwindcss />, color: '#38bdf8', label: 'Tailwind', duration: 3 },
  { icon: <TbBrandNextjs />, color: '#e5e7eb', label: 'Next.js', duration: 3.5 },
  { icon: <SiHtml5 />, color: '#fb923c', label: 'HTML5', duration: 4 },
  { icon: <SiCss3 />, color: '#60a5fa', label: 'CSS3', duration: 4.5 },
  { icon: <SiJavascript />, color: '#facc15', label: 'JS', duration: 5 },
  { icon: <SiPhp />, color: '#818cf8', label: 'PHP', duration: 5.5 },
  { icon: <SiMongodb />, color: '#4ade80', label: 'MongoDB', duration: 6 },
  { icon: <SiExpress />, color: '#fde68a', label: 'Express', duration: 6.5 },
  { icon: <SiMysql />, color: '#60a5fa', label: 'MySQL', duration: 7 },
  { icon: <SiPostgresql />, color: '#60a5fa', label: 'PostgreSQL', duration: 7.2 },
  { icon: <SiSpringboot />, color: '#4ade80', label: 'Spring', duration: 7.5 },
  { icon: <FaJava />, color: '#f87171', label: 'Java', duration: 7.8 },
  { icon: <SiFlutter />, color: '#38bdf8', label: 'Flutter', duration: 8 },
  { icon: <SiFastapi />, color: '#4ade80', label: 'FastAPI', duration: 8.2 },
  { icon: <SiPython />, color: '#facc15', label: 'Python', duration: 8.5 },
  { icon: <SiOpenai style={{ fontSize: '2.5rem' }} />, color: '#a3a3a3', label: 'Codex', duration: 8.7 },
  { icon: <TextIcon text="Claude" sub="Code" />, color: '#c084fc', label: 'Claude Code', duration: 9, textBadge: true },
  { icon: <SiVercel />, color: '#e5e7eb', label: 'Vercel', duration: 9.2 },
  { icon: <SiRender />, color: '#46e3b7', label: 'Render', duration: 9.4 },
  { icon: <FaGithub />, color: '#e5e7eb', label: 'GitHub', duration: 9.6 },
  { icon: <SiAmazonwebservices />, color: '#ff9900', label: 'AWS', duration: 9.8 },
  { icon: <TextIcon text="Az" sub="ure" />, color: '#0078d4', label: 'Azure', duration: 10, textBadge: true },
  { icon: <SiHostinger />, color: '#673de6', label: 'Hostinger', duration: 10.2 },
  { icon: <SiCloudinary />, color: '#3448c5', label: 'Cloudinary', duration: 10.4 },
  { icon: <SiCloudflare />, color: '#f6821f', label: 'Cloudflare', duration: 10.6 },
];

const float = (duration) => ({
  initial: { y: -8 },
  animate: {
    y: [8, -8],
    transition: { duration, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
  },
});

function Technologies() {
  return (
    <div className="pb-20 pt-4 relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,215,0,0.1)' }}>

      {/* ── Background ── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Matrix rain */}
        <MatrixCanvas />
        {/* Floating code lines */}
        <FloatingCode />
        {/* Center radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,215,0,0.04) 0%, transparent 70%)',
        }} />
        {/* Edge fades */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,5,0.85) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.85) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.7) 100%)',
        }} />
      </div>

      {/* Content above bg */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,215,0,0.5)' }}>// section_02</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono" style={{ color: '#FFD700' }}>
          TECH<span style={{ color: 'rgba(255,255,255,0.2)' }}>.stack</span>
        </h2>
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-wrap justify-center gap-5"
      >
        {icons.map(({ icon, color, label, duration, textBadge }, i) => (
          <motion.div
            key={i}
            variants={float(duration)}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.15 }}
            className="flex flex-col items-center gap-2 cursor-default"
          >
            <div
              className="cyber-card rounded-xl p-4"
              style={{ minWidth: '72px', minHeight: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}
            >
              {textBadge ? (
                <span style={{ color, filter: `drop-shadow(0 0 6px ${color}55)` }}>{icon}</span>
              ) : (
                <span style={{ color, fontSize: '2.5rem', display: 'block', filter: `drop-shadow(0 0 6px ${color}55)` }}>
                  {icon}
                </span>
              )}
            </div>
            <span className="font-mono text-xs" style={{ color: 'rgba(255,215,0,0.5)' }}>{label}</span>
          </motion.div>
        ))}
      </motion.div>

      </div> {/* end content z:1 */}
    </div>
  );
}

export default Technologies;
