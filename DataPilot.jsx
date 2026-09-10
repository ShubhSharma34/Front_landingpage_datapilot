import { useState, useEffect, useRef } from "react";

/* ── Google Fonts injected once ── */
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap";

const researchFragments = [
  "χ² = 14.23, p < 0.001 — reject H₀ at α = 0.05",
  "Pearson r = 0.847 (n=312, p < 0.0001)",
  "Table 3. Regression coefficients for multivariate model",
  "§4.2 Methodological considerations in longitudinal data collection",
  "μ = 42.7, σ = 8.34 — see Appendix B for full distribution",
  "The correlation between variables X₃ and X₇ was statistically significant",
  "Fig. 6 — Scatter plot of residuals against fitted values",
  "Data sourced from the Annual Economic Survey, 2019–2023",
  "∑ xᵢ / n · correction factor = 0.9923",
  "Note: Missing values imputed using MICE (m=10 imputations)",
  "ANOVA: F(3, 296) = 18.4, MSE = 2.71",
  "Reference: Campbell & Stanley (1966), Experimental Designs for Research",
  "Confidence interval [95%]: 38.4 — 47.1",
  "df = 14, t = 3.92 — two-tailed significance at p = 0.0014",
  "Observations: n = 1,847 · Valid cases: 1,791 · Missing: 56 (3.0%)",
  "Cross-validation accuracy: 89.3% (k=10 folds)",
  "Intercept: 12.44 · β₁ = 0.231 · β₂ = −0.087 · β₃ = 0.602",
  "Principal component 1 accounts for 43.8% of explained variance",
  "Granger causality test: χ²(2) = 9.71, p = 0.0078",
  "Raw data appended in Supplement S3 — DOI:10.xxxx/dataset.2023",
  "Time series decomposition: trend + seasonality + residual",
  "Kolmogorov–Smirnov normality test: D = 0.041, p = 0.32",
];

const NAV_MENUS = {
  Product: ["Overview", "Multi-agent pipeline", "Data connectors", "Report builder"],
  Solutions: ["For analysts", "For researchers", "For enterprises", "Case studies"],
  Docs: ["Getting started", "API reference", "Integrations"],
  Pricing: ["Plans", "Compare tiers", "Enterprise"],
};

const TIMELINE_STEPS = [
  {
    num: "Stage i.",
    title: "Ingest",
    desc: "Connects to any source. Normalises schema, resolves encoding, and flags structural anomalies before anything is read.",
  },
  {
    num: "Stage ii.",
    title: "Reason",
    desc: "A chain of specialist agents interrogates the data — statistical, semantic, temporal — each handing off to the next.",
  },
  {
    num: "Stage iii.",
    title: "Synthesise",
    desc: "Findings are weighted, contradictions resolved, and a single coherent narrative assembled from the agent outputs.",
  },
  {
    num: "Stage iv.",
    title: "Deliver",
    desc: "Results arrive as prose, tables, or charts — formatted for the audience, not the engineer who ran the query.",
  },
];

const FEATURES = [
  {
    num: "01",
    title: "Natural language queries",
    body: "Ask questions the way you think them. DataPilot translates intent into structured analysis without SQL or scripting.",
  },
  {
    num: "02",
    title: "Multi-source joins",
    body: "Bring together spreadsheets, databases, and APIs in a single prompt. DataPilot handles the joins, you keep the context.",
  },
  {
    num: "03",
    title: "Anomaly detection",
    body: "Statistical outliers are surfaced automatically and explained in language, not just flagged with a z-score.",
  },
  {
    num: "04",
    title: "Narrative reports",
    body: "Export findings as prose documents, slide-ready summaries, or structured JSON for downstream systems.",
  },
  {
    num: "05",
    title: "Audit trail",
    body: "Every inference is traced back to its source row. Reproducibility is not an afterthought — it is the architecture.",
  },
  {
    num: "06",
    title: "Private by design",
    body: "Data never leaves your infrastructure unless you choose to export it. On-premise and VPC deployment available.",
  },
];

/* ── CSS-in-JS token object ── */
const T = {
  ink: "#2C221E",
  inkLight: "#4A3830",
  sepia: "#7A5C48",
  clay: "#A77A65",
  cream: "#FDFBF7",
  creamDark: "#F4EFEA",
  creamMid: "#EDE5DC",
  rule: "rgba(44,34,30,0.18)",
  ruleMid: "rgba(44,34,30,0.10)",
  playfair: "'Playfair Display', Georgia, serif",
  garamond: "'EB Garamond', Georgia, serif",
  inter: "'Inter', system-ui, sans-serif",
};

/* ── Research background fragment ── */
function ResearchBg() {
  const fragments = researchFragments.map((text, i) => {
    const seed = i * 137.508;
    const x = ((seed * 13) % 90) + 2;
    const y = ((seed * 7) % 90) + 2;
    const rot = ((i % 7) - 3) * 5;
    return (
      <span
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: `rotate(${rot}deg)`,
          fontFamily: T.garamond,
          fontSize: 11,
          color: `rgba(44,34,30,0.055)`,
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
    );
  });

  const stains = [
    { x: 15, y: 20, s: 340 },
    { x: 72, y: 55, s: 260 },
    { x: 10, y: 72, s: 210 },
    { x: 82, y: 30, s: 190 },
    { x: 45, y: 82, s: 290 },
    { x: 90, y: 10, s: 160 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {fragments}
      {stains.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            marginLeft: -s.s / 2,
            marginTop: -s.s / 2,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(167,122,101,0.07) 0%, transparent 70%)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Nav dropdown item ── */
function NavItem({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: "6px 14px",
          fontSize: 12.5,
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: open ? T.ink : T.sepia,
          background: open ? "rgba(44,34,30,0.05)" : "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: 2,
          fontFamily: T.inter,
          transition: "color 0.2s, background 0.2s",
        }}
      >
        {label}
      </button>

      {/* Dropdown */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          left: 0,
          minWidth: 190,
          background: T.cream,
          border: `1px solid ${T.ruleMid}`,
          borderTop: `2px solid ${T.clay}`,
          boxShadow: "0 8px 24px rgba(44,34,30,0.10)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transform: open ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.18s, transform 0.18s",
          zIndex: 200,
        }}
      >
        {items.map((item) => (
          <DropLink key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

function DropLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={(e) => e.preventDefault()}
      style={{
        display: "block",
        padding: "10px 16px",
        fontSize: 14,
        fontFamily: T.garamond,
        color: hov ? T.ink : T.sepia,
        background: hov ? T.creamDark : "transparent",
        textDecoration: "none",
        borderBottom: `1px solid ${T.ruleMid}`,
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {label}
    </a>
  );
}

/* ── Prompt box with cursor glow ── */
function PromptBox() {
  const boxRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [glowVisible, setGlowVisible] = useState(false);
  const [prompt, setPrompt] = useState("");

  function handleMouseMove(e) {
    const r = boxRef.current.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setGlowVisible(true)}
      onMouseLeave={() => setGlowVisible(false)}
      style={{
        border: `1.5px solid ${T.ink}`,
        background: "rgba(253,251,247,0.9)",
        padding: "18px 20px",
        position: "relative",
        marginBottom: 16,
      }}
    >
      {/* Shadow offset border */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: 4,
          right: -4,
          bottom: -4,
          border: `1px solid rgba(44,34,30,0.12)`,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* Cursor glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, rgba(167,122,101,0.09) 0%, transparent 65%)`,
          opacity: glowVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      <div
        style={{
          fontFamily: T.garamond,
          fontSize: 11,
          fontStyle: "italic",
          color: T.clay,
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        State your inquiry in plain language
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Compare Q3 revenue by region and flag any anomalies against last year…"
          rows={2}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: T.garamond,
            fontSize: 17,
            color: T.ink,
            lineHeight: 1.5,
            resize: "none",
            minHeight: 52,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <UploadBtn />
          <RunBtn />
        </div>
      </div>
    </div>
  );
}

function UploadBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      title="Attach data source"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34,
        border: `1px solid ${hov ? T.ink : "rgba(44,34,30,0.25)"}`,
        background: hov ? T.creamDark : "transparent",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: T.sepia,
        fontSize: 15,
        transition: "background 0.15s, border-color 0.15s",
      }}
    >
      ↑
    </button>
  );
}

function RunBtn() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "8px 20px",
        background: hov ? T.inkLight : T.ink,
        color: T.cream,
        border: "none",
        cursor: "pointer",
        fontFamily: T.inter,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.05em",
        transition: "background 0.15s",
      }}
    >
      Analyse →
    </button>
  );
}

/* ── Feature cell with hover glow ── */
function FeatureCell({ num, title, body, style }) {
  const [glowPos, setGlowPos] = useState({ x: 30, y: 40 });
  const [hov, setHov] = useState(false);
  const ref = useRef(null);

  function handleMouseMove(e) {
    const r = ref.current.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "28px 24px",
        borderRight: `1px solid ${T.rule}`,
        borderBottom: `1px solid ${T.rule}`,
        position: "relative",
        cursor: "default",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${glowPos.x}% ${glowPos.y}%, rgba(167,122,101,0.08) 0%, transparent 60%)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />
      <div style={{ fontFamily: T.garamond, fontSize: 10, fontStyle: "italic", color: T.clay, letterSpacing: "0.08em", marginBottom: 14 }}>
        {num}
      </div>
      <div style={{ fontFamily: T.playfair, fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 10, lineHeight: 1.25 }}>
        {title}
      </div>
      <div style={{ fontFamily: T.garamond, fontSize: 14, lineHeight: 1.65, color: T.sepia }}>
        {body}
      </div>
    </div>
  );
}

/* ── Main App ── */
export default function DataPilot() {
  /* inject Google Fonts */
  useEffect(() => {
    if (!document.getElementById("dp-fonts")) {
      const link = document.createElement("link");
      link.id = "dp-fonts";
      link.rel = "stylesheet";
      link.href = FONT_LINK;
      document.head.appendChild(link);
    }
    /* global body style */
    document.body.style.margin = "0";
    document.body.style.background = T.cream;
  }, []);

  return (
    <div style={{ background: T.cream, minHeight: "100vh", overflowX: "hidden", position: "relative" }}>

      {/* ── Paper grid background ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(44,34,30,0.035) 27px, rgba(44,34,30,0.035) 28px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(44,34,30,0.018) 60px, rgba(44,34,30,0.018) 61px)
          `,
        }}
      />

      {/* ── Research text bg ── */}
      <ResearchBg />

      {/* ── Page content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Navbar ── */}
        <nav
          style={{
            borderBottom: `1px solid ${T.rule}`,
            padding: "0 48px",
            display: "flex",
            alignItems: "center",
            height: 58,
            position: "sticky",
            top: 0,
            background: "rgba(253,251,247,0.94)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
          }}
        >
          {/* Brand */}
          <div style={{ fontFamily: T.playfair, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: T.ink, marginRight: "auto" }}>
            Data<span style={{ fontStyle: "italic", color: T.clay }}>Pilot</span>
          </div>

          {/* Nav items */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {Object.entries(NAV_MENUS).map(([label, items]) => (
              <NavItem key={label} label={label} items={items} />
            ))}
          </div>

          {/* CTA */}
          <NavCta />
        </nav>

        {/* ── Hero ── */}
        <section style={{ padding: "80px 48px 60px", maxWidth: 860, margin: "0 auto" }}>
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: T.garamond,
              fontSize: 13,
              fontStyle: "italic",
              color: T.clay,
              letterSpacing: "0.08em",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            Vol. I &nbsp;·&nbsp; Analytical Intelligence
            <span style={{ flex: 1, maxWidth: 80, height: 1, background: T.clay, opacity: 0.5, display: "block" }} />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: T.playfair,
              fontSize: "clamp(42px, 5.5vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.07,
              letterSpacing: "-0.025em",
              color: T.ink,
              marginBottom: 24,
            }}
          >
            Your data,{" "}
            <em style={{ fontStyle: "italic", color: T.clay }}>decoded</em>
            <br />
            in plain language.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontFamily: T.garamond,
              fontSize: 19,
              lineHeight: 1.65,
              color: T.inkLight,
              maxWidth: 540,
              marginBottom: 48,
            }}
          >
            DataPilot orchestrates a chain of specialist agents — ingestion,
            reasoning, synthesis, delivery — so you reach insight without
            writing a single query.
          </p>

          {/* Prompt box */}
          <PromptBox />

          <p style={{ fontFamily: T.garamond, fontSize: 13, fontStyle: "italic", color: "rgba(44,34,30,0.38)", marginTop: 10 }}>
            Accepts CSV, Excel, SQL connections, Google Sheets, or plain text.
          </p>
        </section>

        {/* ── Section divider: Timeline ── */}
        <SectionLabel text="The four-stage pipeline" />

        {/* ── Timeline ── */}
        <div style={{ padding: "0 48px 70px", maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", position: "relative" }}>
            {/* Horizontal rule */}
            <div style={{ position: "absolute", top: 18, left: 0, right: 0, height: 1, background: T.rule }} />

            {TIMELINE_STEPS.map((step, i) => (
              <div key={i} style={{ paddingRight: 20, position: "relative" }}>
                <div
                  style={{
                    width: 9, height: 9,
                    border: `1px solid ${i === 1 ? T.clay : T.ink}`,
                    background: i === 1 ? T.clay : T.cream,
                    marginBottom: 16,
                    position: "relative", zIndex: 1,
                  }}
                />
                <div style={{ fontFamily: T.playfair, fontSize: 11, fontStyle: "italic", color: T.clay, marginBottom: 6 }}>
                  {step.num}
                </div>
                <div style={{ fontFamily: T.playfair, fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 8, lineHeight: 1.2 }}>
                  {step.title}
                </div>
                <div style={{ fontFamily: T.garamond, fontSize: 13.5, lineHeight: 1.6, color: T.sepia }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section divider: Features ── */}
        <SectionLabel text="Capabilities" />

        {/* ── Features grid ── */}
        <div style={{ padding: "0 48px 80px", maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              borderTop: `1px solid ${T.rule}`,
              borderLeft: `1px solid ${T.rule}`,
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCell key={i} {...f} />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: `1px solid ${T.rule}`,
            padding: "24px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontFamily: T.playfair, fontSize: 14, fontWeight: 700, fontStyle: "italic", color: T.sepia }}>
            DataPilot
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Contact", "Status"].map((l) => (
              <FooterLink key={l} label={l} />
            ))}
          </div>
          <div style={{ fontFamily: T.garamond, fontSize: 12, fontStyle: "italic", color: "rgba(44,34,30,0.3)" }}>
            Analytical intelligence, v1.0
          </div>
        </footer>

      </div>
    </div>
  );
}

/* ── Small helpers ── */

function SectionLabel({ text }) {
  return (
    <div style={{ maxWidth: 860, margin: "60px auto 0", padding: "0 48px" }}>
      <div
        style={{
          fontFamily: T.garamond,
          fontSize: 12,
          fontStyle: "italic",
          letterSpacing: "0.1em",
          color: T.clay,
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ flex: 1, height: 1, background: T.rule, display: "block" }} />
        {text}
        <span style={{ flex: 1, height: 1, background: T.rule, display: "block" }} />
      </div>
    </div>
  );
}

function NavCta() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        marginLeft: 20,
        padding: "7px 18px",
        border: `1px solid ${T.ink}`,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.05em",
        color: hov ? T.cream : T.ink,
        background: hov ? T.ink : "transparent",
        cursor: "pointer",
        fontFamily: T.inter,
        transition: "background 0.2s, color 0.2s",
      }}
    >
      Request access
    </button>
  );
}

function FooterLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: T.garamond,
        fontSize: 13,
        color: T.sepia,
        textDecoration: "none",
        opacity: hov ? 1 : 0.7,
        transition: "opacity 0.15s",
      }}
    >
      {label}
    </a>
  );
}