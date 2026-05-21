import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Clock } from "lucide-react";

// ─── Web3Forms config ─────────────────────────────────────────────
// Get your free key at https://web3forms.com → enter your email
const WEB3FORMS_KEY = "907c3994-877e-48fb-aa46-0bb2d7d4577b";
// ─────────────────────────────────────────────────────────────────

const RATE_LIMIT_MS = 60_000; // 1 minute between submissions

const initialForm = { name: "", email: "", subject: "", message: "" };

const fields = [
  { key: "name",    label: "Name",    placeholder: "Your full name",       icon: <User size={14} />,          type: "text"  },
  { key: "email",   label: "Email",   placeholder: "your@email.com",       icon: <Mail size={14} />,          type: "email" },
  { key: "subject", label: "Subject", placeholder: "What's this about?",   icon: <MessageSquare size={14} />, type: "text"  },
];

export default function ContactForm() {
  const [form, setForm]         = useState(initialForm);
  const [errors, setErrors]     = useState({});
  const [status, setStatus]     = useState("idle"); // idle | sending | success | error | ratelimit
  const lastSentRef             = useRef(null);

  // ── Validation ──────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = "Invalid email address";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
                              e.message = "Message too short (min 10 chars)";
    return e;
  };

  // ── Submit ───────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Rate limit check
    if (lastSentRef.current && Date.now() - lastSentRef.current < RATE_LIMIT_MS) {
      setStatus("ratelimit");
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name:       form.name,
          email:      form.email,
          subject:    `[Portfolio] ${form.subject}`,
          message:    form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        lastSentRef.current = Date.now();
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
    if (status !== "idle") setStatus("idle");
  };

  // ── Shared input style ───────────────────────────────────────────
  const inputStyle = (key) => ({
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${errors[key] ? "rgba(248,113,113,0.6)" : "rgba(255,215,0,0.2)"}`,
    borderRadius: 4,
    padding: "10px 12px 10px 36px",
    color: "#e5e5e5",
    fontFamily: "monospace",
    fontSize: "0.82rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  return (
    <div className="pb-20 pt-4" style={{ borderBottom: "1px solid rgba(255,215,0,0.1)" }}>

      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.7 }}
        className="my-16 text-center"
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.5)" }}>
          // contact_form
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 font-mono" style={{ color: "#FFD700" }}>
          CONTACT<span style={{ color: "rgba(255,255,255,0.2)" }}>.me_for</span>
        </h2>
        <p className="mt-3 font-mono text-xs tracking-widest" style={{ color: "rgba(255,215,0,0.35)" }}>
          [ SEND A MESSAGE — I REPLY FAST ]
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="mx-auto"
        style={{ maxWidth: 600 }}
      >
        <div
          style={{
            background: "rgba(6,6,6,0.97)",
            border: "1px solid rgba(255,215,0,0.22)",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(255,215,0,0.06)",
            position: "relative",
          }}
        >
          {/* Corner brackets */}
          {[
            { top: -1, left: -1, borderTop: "2px solid #FFD700", borderLeft: "2px solid #FFD700" },
            { bottom: -1, right: -1, borderBottom: "2px solid #FFD700", borderRight: "2px solid #FFD700" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 20, height: 20, ...s, zIndex: 2 }} />
          ))}

          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,215,0,0.1)",
              background: "rgba(255,215,0,0.025)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#f87171", "#fbbf24", "#4ade80"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "rgba(255,215,0,0.5)", letterSpacing: "0.12em" }}>
              NEW_MESSAGE → MUHAMMAD IBRAHIM
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ padding: "20px 16px 20px" }}>

            {/* Text fields */}
            {fields.map(({ key, label, placeholder, icon, type }) => (
              <div key={key} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "0.68rem", color: "rgba(255,215,0,0.6)", marginBottom: 6, letterSpacing: "0.1em" }}>
                  {label.toUpperCase()} <span style={{ color: "#f87171" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "rgba(255,215,0,0.4)", pointerEvents: "none" }}>
                    {icon}
                  </span>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    style={inputStyle(key)}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(255,215,0,0.55)"; e.target.style.boxShadow = "0 0 10px rgba(255,215,0,0.1)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors[key] ? "rgba(248,113,113,0.6)" : "rgba(255,215,0,0.2)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                {errors[key] && (
                  <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#f87171", marginTop: 4 }}>
                    ⚠ {errors[key]}
                  </p>
                )}
              </div>
            ))}

            {/* Message textarea */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "0.68rem", color: "rgba(255,215,0,0.6)", marginBottom: 6, letterSpacing: "0.1em" }}>
                MESSAGE <span style={{ color: "#f87171" }}>*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Write your message here..."
                rows={5}
                style={{
                  ...inputStyle("message"),
                  padding: "10px 12px",
                  resize: "vertical",
                  minHeight: 120,
                  fontFamily: "monospace",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(255,215,0,0.55)"; e.target.style.boxShadow = "0 0 10px rgba(255,215,0,0.1)"; }}
                onBlur={(e)  => { e.target.style.borderColor = errors.message ? "rgba(248,113,113,0.6)" : "rgba(255,215,0,0.2)"; e.target.style.boxShadow = "none"; }}
              />
              {errors.message && (
                <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#f87171", marginTop: 4 }}>
                  ⚠ {errors.message}
                </p>
              )}
              <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,215,0,0.25)", marginTop: 4, textAlign: "right" }}>
                {form.message.length} chars
              </p>
            </div>

            {/* Status messages */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 4, padding: "10px 14px", marginBottom: 16 }}>
                  <CheckCircle size={15} style={{ color: "#4ade80", flexShrink: 0 }} />
                  <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#4ade80" }}>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 4, padding: "10px 14px", marginBottom: 16 }}>
                  <AlertCircle size={15} style={{ color: "#f87171", flexShrink: 0 }} />
                  <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#f87171" }}>Something went wrong. Try again or reach me on WhatsApp.</span>
                </motion.div>
              )}
              {status === "ratelimit" && (
                <motion.div key="ratelimit" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 4, padding: "10px 14px", marginBottom: 16 }}>
                  <Clock size={15} style={{ color: "#fbbf24", flexShrink: 0 }} />
                  <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#fbbf24" }}>Please wait 60 seconds before sending another message.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px",
                background: status === "sending" ? "rgba(255,215,0,0.4)" : "#FFD700",
                color: "#000",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                border: "none",
                borderRadius: 4,
                cursor: status === "sending" ? "not-allowed" : "pointer",
                transition: "opacity 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,215,0,0.45)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {status === "sending" ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 14, height: 14, border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%" }} />
                  SENDING...
                </>
              ) : (
                <><Send size={14} /> SEND MESSAGE</>
              )}
            </motion.button>

            <p style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,215,0,0.2)", marginTop: 12 }}>
              Rate limited · 1 message per minute
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
