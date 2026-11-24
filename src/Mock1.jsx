import { useState } from 'react'

// ── Taxonomy data ──────────────────────────────────────────────────────
const DOMAINS = [
  {
    name: 'Software & Computing', count: 128, sources: ['V','E','A','L'],
    subs: [
      { name: 'General programming tasks', count: 31, sources: [] },
      { name: 'Repository-level software engineering', count: 28, sources: [] },
      { name: 'Cybersecurity', count: 18, sources: ['V','E'] },
      { name: 'App & web development', count: 17, sources: ['V'] },
      { name: 'Competitive programming & algorithms', count: 16, sources: ['V'] },
      { name: 'Terminal, systems & IT operations', count: 9, sources: ['A'] },
      { name: 'Data science, databases & tabular data', count: 6, sources: [] },
      { name: 'AI/ML research & engineering', count: 3, sources: ['V','E'] },
    ],
  },
  {
    name: 'Mathematics', count: 49, sources: ['V','E','L'],
    subs: [
      { name: 'Competition & olympiad math', count: 25, sources: [] },
      { name: 'School & word-problem math', count: 10, sources: [] },
      { name: 'Visual & diagrammatic math', count: 10, sources: [] },
      { name: 'University & research mathematics', count: 4, sources: ['V','E'] },
    ],
  },
  {
    name: 'Natural Sciences', count: 37, sources: ['V','E','A'],
    subs: [
      { name: 'Expert & graduate-level science questions', count: 11, sources: ['E','A'] },
      { name: 'Scientific literature & figures', count: 9, sources: [] },
      { name: 'School science', count: 7, sources: [] },
      { name: 'Life sciences & lab research', count: 7, sources: ['V'] },
      { name: 'Physical sciences, chemistry & materials', count: 5, sources: [] },
      { name: 'Earth, weather & geospatial', count: 2, sources: [] },
    ],
  },
  {
    name: 'Health & Medicine', count: 20, sources: ['V','A','L'],
    subs: [
      { name: 'Medical knowledge & licensing exams', count: 9, sources: [] },
      { name: 'Medical imaging', count: 6, sources: [] },
      { name: 'Clinical practice & health conversations', count: 6, sources: ['V','A'] },
    ],
  },
  {
    name: 'Law, Government & Policy', count: 11, sources: ['V','L'],
    subs: [
      { name: 'Legal education & exams', count: 5, sources: [] },
      { name: 'Legal practice, tax & regulation', count: 4, sources: ['V','A'] },
      { name: 'Government & public policy', count: 2, sources: ['V'] },
    ],
  },
  {
    name: 'Business, Finance & Professional Work', count: 30, sources: ['V','A','L'],
    subs: [
      { name: 'Professional & occupational knowledge work', count: 11, sources: ['A','E'] },
      { name: 'Finance & financial analysis', count: 10, sources: ['V','L'] },
      { name: 'Customer service & business operations', count: 5, sources: [] },
      { name: 'Business & enterprise documents', count: 5, sources: [] },
    ],
  },
  {
    name: 'Computers, Web & Apps', count: 54, sources: ['E','L'],
    subs: [
      { name: 'Web search & deep research', count: 19, sources: ['V','L'] },
      { name: 'APIs, function calling & tool ecosystems', count: 14, sources: ['L'] },
      { name: 'Mobile apps', count: 8, sources: [] },
      { name: 'Desktop & OS computer use', count: 5, sources: ['E','L'] },
      { name: 'GUI screens & grounding', count: 5, sources: [] },
      { name: 'Websites & web navigation', count: 4, sources: [] },
    ],
  },
  {
    name: 'Everyday Life & Physical World', count: 53, sources: [],
    subs: [
      { name: 'Everyday scenes & activities', count: 22, sources: [] },
      { name: 'Everyday physical & social situations', count: 11, sources: ['E'] },
      { name: 'Homes, robotics & embodied environments', count: 10, sources: ['V'] },
      { name: 'Driving & transportation', count: 7, sources: [] },
      { name: 'Shopping, travel & consumer tasks', count: 6, sources: [] },
    ],
  },
  {
    name: 'Puzzles & Games', count: 22, sources: ['V','E'],
    subs: [
      { name: 'Abstract puzzles & logic', count: 18, sources: ['E'] },
      { name: 'Games, sports & recreation', count: 5, sources: ['V','E'] },
    ],
  },
  {
    name: 'Languages, Cultures & Humanities', count: 41, sources: [],
    subs: [
      { name: 'Regional, cultural & non-English knowledge', count: 14, sources: [] },
      { name: 'Translation & multilingual text', count: 14, sources: [] },
      { name: 'Emotions, minds & social interaction', count: 7, sources: [] },
      { name: 'Linguistics', count: 4, sources: [] },
      { name: 'Humanities, social sciences & ethics', count: 2, sources: [] },
    ],
  },
  {
    name: 'Media, Arts & Online Content', count: 55, sources: ['L'],
    subs: [
      { name: 'Encyclopedic & reference text', count: 13, sources: [] },
      { name: 'Fiction, film & TV', count: 10, sources: [] },
      { name: 'Image & video creation/editing', count: 10, sources: ['L'] },
      { name: 'News & journalism', count: 8, sources: [] },
      { name: 'Music & sound', count: 8, sources: [] },
      { name: 'Creative writing', count: 4, sources: ['E','L'] },
      { name: 'Social media & online discussion', count: 3, sources: [] },
    ],
  },
  {
    name: 'General / Multi-subject', count: 121, sources: ['A'],
    subs: [
      { name: 'Multi-subject academic exams', count: 30, sources: [] },
      { name: 'General visual & audio-visual understanding', count: 30, sources: [] },
      { name: 'Open-ended chat & instruction requests', count: 28, sources: [] },
      { name: 'General world knowledge & trivia', count: 19, sources: [] },
      { name: 'Aggregate indices & mixed suites', count: 15, sources: [] },
    ],
  },
]

const PROPERTIES = [
  { name: 'Safety', fullName: 'Harmful requests, jailbreaks & over-refusal', count: 28, sources: [] },
  { name: 'Truthfulness', fullName: 'Misconceptions & hallucination', count: 12, sources: ['A','L'] },
  { name: 'Bias & Toxicity', fullName: 'Stereotypes & toxicity', count: 9, sources: [] },
  { name: 'Privacy', fullName: 'Personal information', count: 5, sources: [] },
  { name: 'AI Eval', fullName: 'Reward models, LLM-as-judge', count: 5, sources: [] },
  { name: 'Hazardous Knowledge', fullName: 'Dual-use knowledge', count: 3, sources: [] },
  { name: 'Long Context', fullName: 'Synthetic long context', count: 39, sources: ['E','A','L'] },
  { name: 'Instruction Following', fullName: 'Instruction following', count: 7, sources: ['A'] },
  { name: 'Knowledge', fullName: 'Knowledge retrieval & recall', count: null, sources: ['E','A'] },
  { name: 'Reasoning', fullName: 'Logical, commonsense, abstract', count: null, sources: ['E','L'] },
  { name: 'Robustness', fullName: 'Adversarial perturbation', count: null, sources: [] },
]

const FACETS = {
  Modality: ['Text', 'Image', 'Video', 'Audio & Speech', 'Documents & Charts', '3D'],
  'Interaction Style': ['Single-turn QA', 'Multi-turn Conversation', 'Tool Use', 'Agentic in Environment', 'Computer Use'],
  Language: ['English Only', 'Multilingual', 'Specific Non-English'],
}

// ── Fake benchmark cards ───────────────────────────────────────────────
const FAKE_BENCHMARKS = [
  'HumanEval', 'MBPP', 'SWE-bench', 'MATH-500', 'GPQA', 'MMLU-Pro',
  'ARC-AGI', 'SimpleQA', 'MedQA', 'LegalBench', 'BigCodeBench', 'LiveBench',
]
const FAKE_MODELS = ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Llama 3.1 405B']

function FakeCard({ benchmarkName }) {
  const score = (Math.random() * 40 + 60).toFixed(1)
  const model = FAKE_MODELS[Math.floor(Math.random() * FAKE_MODELS.length)]
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>{benchmarkName}</div>
      <div style={styles.cardMeta}>Top model: {model}</div>
      <div style={styles.cardScore}>{score}%</div>
      <div style={styles.cardBar}>
        <div style={{ ...styles.cardBarFill, width: `${score}%` }} />
      </div>
      <div style={styles.cardFooter}>12 models evaluated</div>
    </div>
  )
}

// ── Source tag badge ───────────────────────────────────────────────────
const SOURCE_COLORS = { V: '#8b5cf6', E: '#f59e0b', A: '#10b981', L: '#3b82f6' }
const SOURCE_LABELS = { V: 'Vals AI', E: 'Epoch', A: 'Artificial Analysis', L: 'LLM Stats' }

function SourceBadge({ code }) {
  return (
    <span style={{ ...styles.badge, background: SOURCE_COLORS[code] }} title={SOURCE_LABELS[code]}>
      {code}
    </span>
  )
}

// ── Axis 1: Domain section ─────────────────────────────────────────────
function DomainSection() {
  const [activeDomain, setActiveDomain] = useState(null)
  const [drillSub, setDrillSub] = useState(null)

  const selected = DOMAINS.find(d => d.name === activeDomain)

  return (
    <section style={styles.axisSection}>
      <h2 style={styles.axisTitle}>Axis 1: Domain</h2>
      <p style={styles.axisDesc}>What the benchmark is about. Click a domain to see sub-themes, then drill into benchmarks.</p>

      <div style={styles.horizTabs}>
        {DOMAINS.map(d => (
          <button
            key={d.name}
            onClick={() => { setActiveDomain(activeDomain === d.name ? null : d.name); setDrillSub(null) }}
            style={activeDomain === d.name ? { ...styles.horizTab, ...styles.horizTabActive } : styles.horizTab}
          >
            {d.name}
            <span style={styles.tabCount}>({d.count})</span>
          </button>
        ))}
      </div>

      {selected && (
        <div style={styles.drillDown}>
          <div style={styles.drillHeader}>
            <h3 style={styles.drillTitle}>{selected.name}</h3>
            <span style={styles.drillCount}>{selected.count} benchmarks</span>
            <div style={styles.badgeRow}>
              {selected.sources.map(s => <SourceBadge key={s} code={s} />)}
            </div>
          </div>

          <div style={styles.subTabs}>
            {selected.subs.map(s => (
              <button
                key={s.name}
                onClick={() => setDrillSub(drillSub === s.name ? null : s.name)}
                style={drillSub === s.name ? { ...styles.subTab, ...styles.subTabActive } : styles.subTab}
              >
                {s.name}
                <span style={styles.tabCount}>({s.count})</span>
                {s.sources.map(sc => <SourceBadge key={sc} code={sc} />)}
              </button>
            ))}
          </div>

          {drillSub && (
            <div style={styles.cardGrid}>
              {FAKE_BENCHMARKS.slice(0, Math.max(3, selected.subs.find(s => s.name === drillSub)?.count > 10 ? 6 : 4)).map(b => (
                <FakeCard key={b} benchmarkName={b} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

// ── Axis 2: Property Tested section ────────────────────────────────────
function PropertySection() {
  const [activeProp, setActiveProp] = useState(null)

  const selected = PROPERTIES.find(p => p.name === activeProp)

  return (
    <section style={styles.axisSection}>
      <h2 style={styles.axisTitle}>Axis 2: Property Tested</h2>
      <p style={styles.axisDesc}>What capability or risk is measured.</p>

      <div style={styles.horizTabs}>
        {PROPERTIES.map(p => (
          <button
            key={p.name}
            onClick={() => setActiveProp(activeProp === p.name ? null : p.name)}
            style={activeProp === p.name ? { ...styles.horizTab, ...styles.horizTabActive } : styles.horizTab}
          >
            {p.name}
            {p.count && <span style={styles.tabCount}>({p.count})</span>}
          </button>
        ))}
      </div>

      {selected && (
        <div style={styles.drillDown}>
          <div style={styles.drillHeader}>
            <h3 style={styles.drillTitle}>{selected.name}</h3>
            <p style={styles.drillDesc}>{selected.fullName}</p>
            {selected.count && <span style={styles.drillCount}>{selected.count} benchmarks</span>}
            <div style={styles.badgeRow}>
              {selected.sources.map(s => <SourceBadge key={s} code={s} />)}
            </div>
          </div>
          <div style={styles.cardGrid}>
            {FAKE_BENCHMARKS.slice(0, selected.count ? Math.min(6, selected.count) : 4).map(b => (
              <FakeCard key={b} benchmarkName={b} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ── Axes 3-5: Facets section ───────────────────────────────────────────
function FacetsSection() {
  const [activeFacet, setActiveFacet] = useState(null)
  const [activeValue, setActiveValue] = useState(null)

  const facetNames = Object.keys(FACETS)

  return (
    <section style={styles.axisSection}>
      <h2 style={styles.axisTitle}>Axes 3–5: Other Facets</h2>
      <p style={styles.axisDesc}>Modality, interaction style, and language.</p>

      <div style={styles.horizTabs}>
        {facetNames.map(f => (
          <button
            key={f}
            onClick={() => { setActiveFacet(activeFacet === f ? null : f); setActiveValue(null) }}
            style={activeFacet === f ? { ...styles.horizTab, ...styles.horizTabActive } : styles.horizTab}
          >
            {f}
          </button>
        ))}
      </div>

      {activeFacet && (
        <div style={styles.drillDown}>
          <div style={styles.subTabs}>
            {FACETS[activeFacet].map(v => (
              <button
                key={v}
                onClick={() => setActiveValue(activeValue === v ? null : v)}
                style={activeValue === v ? { ...styles.subTab, ...styles.subTabActive } : styles.subTab}
              >
                {v}
              </button>
            ))}
          </div>

          {activeValue && (
            <div style={styles.cardGrid}>
              {FAKE_BENCHMARKS.slice(0, 4).map(b => (
                <FakeCard key={b} benchmarkName={b} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

// ── Main Mock1 page ────────────────────────────────────────────────────
export default function Mock1() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.backLink}>&larr; Home</a>
        <h1 style={styles.title}>Taxonomy Explorer — Mock 1</h1>
        <p style={styles.subtitle}>Browse the combined EvalCards taxonomy. Each axis is shown below with horizontal tabs — click to drill down.</p>
      </header>

      <DomainSection />
      <PropertySection />
      <FacetsSection />

      <div style={styles.legend}>
        <span style={styles.legendLabel}>Source tags:</span>
        {Object.entries(SOURCE_LABELS).map(([code, label]) => (
          <span key={code} style={styles.legendItem}>
            <SourceBadge code={code} /> {label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f1117',
    color: '#e2e8f0',
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  header: {
    padding: '24px 32px 16px',
    borderBottom: '1px solid #1e293b',
  },
  backLink: {
    color: '#5bacd1',
    textDecoration: 'none',
    fontSize: 14,
  },
  title: {
    margin: '8px 0 4px',
    fontSize: 24,
    fontWeight: 600,
    color: '#f1f5f9',
  },
  subtitle: {
    margin: 0,
    fontSize: 14,
    color: '#94a3b8',
  },

  // Each axis section
  axisSection: {
    padding: '32px 32px 40px',
    borderBottom: '1px solid #1e293b',
  },
  axisTitle: {
    margin: '0 0 4px',
    fontSize: 20,
    fontWeight: 600,
    color: '#f1f5f9',
  },
  axisDesc: {
    margin: '0 0 16px',
    fontSize: 14,
    color: '#94a3b8',
  },

  // Horizontal tabs row (wraps)
  horizTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  horizTab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 6,
    border: '1px solid #334155',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  horizTabActive: {
    background: '#1e293b',
    color: '#5bacd1',
    borderColor: '#5bacd1',
  },
  tabCount: {
    fontSize: 11,
    color: '#64748b',
  },

  // Drill-down area below tabs
  drillDown: {
    marginTop: 16,
    padding: 20,
    background: '#141820',
    borderRadius: 10,
    border: '1px solid #1e293b',
  },
  drillHeader: {
    marginBottom: 16,
  },
  drillTitle: {
    margin: '0 0 4px',
    fontSize: 18,
    fontWeight: 600,
    color: '#f1f5f9',
  },
  drillDesc: {
    margin: '0 0 4px',
    fontSize: 13,
    color: '#94a3b8',
  },
  drillCount: {
    fontSize: 13,
    color: '#64748b',
  },
  badgeRow: {
    display: 'flex',
    gap: 4,
    marginTop: 6,
  },

  // Sub-theme tabs (inside drill-down)
  subTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  subTab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 14px',
    borderRadius: 20,
    border: '1px solid #334155',
    background: 'transparent',
    color: '#cbd5e1',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  subTabActive: {
    background: '#5bacd1',
    color: '#fff',
    borderColor: '#5bacd1',
  },

  // Source badges
  badge: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    letterSpacing: 0.5,
  },

  // Benchmark cards grid
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
    marginTop: 12,
  },
  card: {
    background: '#1e293b',
    borderRadius: 8,
    padding: 16,
    border: '1px solid #334155',
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: 14,
    color: '#f1f5f9',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  cardScore: {
    fontSize: 22,
    fontWeight: 700,
    color: '#5bacd1',
    marginBottom: 6,
  },
  cardBar: {
    height: 4,
    borderRadius: 2,
    background: '#334155',
    marginBottom: 8,
  },
  cardBarFill: {
    height: '100%',
    borderRadius: 2,
    background: '#5bacd1',
  },
  cardFooter: {
    fontSize: 11,
    color: '#64748b',
  },

  // Legend
  legend: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '16px 32px',
    borderTop: '1px solid #1e293b',
    flexWrap: 'wrap',
  },
  legendLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 500,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    color: '#94a3b8',
  },
}
