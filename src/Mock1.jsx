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
  { name: 'Safety: harmful requests, jailbreaks & over-refusal', count: 28, sources: [] },
  { name: 'Truthfulness, misconceptions & hallucination', count: 12, sources: ['A','L'] },
  { name: 'Bias, stereotypes & toxicity', count: 9, sources: [] },
  { name: 'Privacy & personal information', count: 5, sources: [] },
  { name: 'Evaluating AI systems: reward models, LLM-as-judge', count: 5, sources: [] },
  { name: 'Hazardous & dual-use knowledge', count: 3, sources: [] },
  { name: 'Long context', count: 39, sources: ['E','A','L'] },
  { name: 'Instruction following', count: 7, sources: ['A'] },
  { name: 'Knowledge', count: null, sources: ['E','A'] },
  { name: 'Reasoning: logical, commonsense, abstract', count: null, sources: ['E','L'] },
  { name: 'Robustness & adversarial perturbation', count: null, sources: [] },
]

const FACETS = {
  Modality: ['Text', 'Image', 'Video', 'Audio & speech', 'Documents & charts', '3D'],
  'Interaction style': ['Single-turn QA', 'Multi-turn conversation', 'Tool use', 'Agentic in an environment', 'Computer use'],
  Language: ['English only', 'Multilingual', 'Specific non-English language(s)'],
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

// ── View components ────────────────────────────────────────────────────

function EvalCardsView() {
  const [axisTab, setAxisTab] = useState('domain')
  const [expanded, setExpanded] = useState(null)
  const [drillSub, setDrillSub] = useState(null)

  const toggle = (name) => {
    setExpanded(expanded === name ? null : name)
    setDrillSub(null)
  }

  return (
    <div>
      <p style={styles.viewDesc}>
        Our combined taxonomy. Browse by axis — click a domain to see sub-themes, then drill into fake benchmark cards.
      </p>
      <div style={styles.axisTabs}>
        {[
          { key: 'domain', label: 'Axis 1: Domain' },
          { key: 'property', label: 'Axis 2: Property Tested' },
          { key: 'facets', label: 'Axes 3-5: Facets' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => { setAxisTab(t.key); setExpanded(null); setDrillSub(null) }}
            style={axisTab === t.key ? { ...styles.axisTab, ...styles.axisTabActive } : styles.axisTab}
          >
            {t.label}
          </button>
        ))}
      </div>

      {axisTab === 'domain' && (
        <div style={styles.list}>
          {DOMAINS.map(d => (
            <div key={d.name}>
              <div style={styles.domainRow} onClick={() => toggle(d.name)}>
                <span style={styles.arrow}>{expanded === d.name ? '▼' : '▶'}</span>
                <span style={styles.domainName}>{d.name}</span>
                <span style={styles.count}>({d.count})</span>
                {d.sources.map(s => <SourceBadge key={s} code={s} />)}
              </div>
              {expanded === d.name && (
                <div style={styles.subList}>
                  {d.subs.map(s => (
                    <div key={s.name}>
                      <div
                        style={drillSub === s.name ? { ...styles.subRow, ...styles.subRowActive } : styles.subRow}
                        onClick={() => setDrillSub(drillSub === s.name ? null : s.name)}
                      >
                        <span style={styles.subName}>{s.name}</span>
                        <span style={styles.count}>({s.count})</span>
                        {s.sources.map(sc => <SourceBadge key={sc} code={sc} />)}
                      </div>
                      {drillSub === s.name && (
                        <div style={styles.cardGrid}>
                          {FAKE_BENCHMARKS.slice(0, Math.max(2, s.count > 10 ? 6 : s.count)).map(b => (
                            <FakeCard key={b} benchmarkName={b} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {axisTab === 'property' && (
        <div style={styles.list}>
          {PROPERTIES.map(p => (
            <div key={p.name} style={styles.domainRow}>
              <span style={styles.domainName}>{p.name}</span>
              {p.count && <span style={styles.count}>({p.count})</span>}
              {p.sources.map(s => <SourceBadge key={s} code={s} />)}
            </div>
          ))}
        </div>
      )}

      {axisTab === 'facets' && (
        <div style={styles.list}>
          {Object.entries(FACETS).map(([facet, values]) => (
            <div key={facet} style={{ marginBottom: 16 }}>
              <div style={styles.facetHeader}>{facet}</div>
              <div style={styles.facetChips}>
                {values.map(v => (
                  <span key={v} style={styles.chip}>{v}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ValsAIView() {
  const [expanded, setExpanded] = useState(null)
  const [drillSub, setDrillSub] = useState(null)

  // Vals AI emphasises: Software, Math, Science, Health, Law, Business, Puzzles — all tagged [V]
  const valsDomains = DOMAINS.filter(d => d.sources.includes('V'))

  return (
    <div>
      <p style={styles.viewDesc}>
        Vals AI-style view. Domains and sub-themes where Vals AI has equivalent categories are shown. Organized by capability area with direct benchmark drill-down.
      </p>
      <div style={styles.list}>
        {valsDomains.map(d => (
          <div key={d.name}>
            <div style={styles.domainRow} onClick={() => { setExpanded(expanded === d.name ? null : d.name); setDrillSub(null) }}>
              <span style={styles.arrow}>{expanded === d.name ? '▼' : '▶'}</span>
              <span style={styles.domainName}>{d.name}</span>
              <span style={styles.count}>({d.count})</span>
              <SourceBadge code="V" />
            </div>
            {expanded === d.name && (
              <div style={styles.subList}>
                {d.subs.map(s => (
                  <div key={s.name}>
                    <div
                      style={drillSub === s.name ? { ...styles.subRow, ...styles.subRowActive } : styles.subRow}
                      onClick={() => setDrillSub(drillSub === s.name ? null : s.name)}
                    >
                      <span style={styles.subName}>{s.name}</span>
                      <span style={styles.count}>({s.count})</span>
                      {s.sources.includes('V') && <SourceBadge code="V" />}
                    </div>
                    {drillSub === s.name && (
                      <div style={styles.cardGrid}>
                        {FAKE_BENCHMARKS.slice(0, 4).map(b => (
                          <FakeCard key={b} benchmarkName={b} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EpochAIView() {
  const [expanded, setExpanded] = useState(null)
  const [drillSub, setDrillSub] = useState(null)

  const epochDomains = DOMAINS.filter(d => d.sources.includes('E'))

  // Epoch also emphasises properties
  const epochProperties = PROPERTIES.filter(p => p.sources.includes('E'))

  return (
    <div>
      <p style={styles.viewDesc}>
        Epoch AI-style view. Focuses on domains and properties where Epoch has equivalent categories. Epoch emphasises capability tracking over time.
      </p>

      <div style={{ ...styles.facetHeader, marginBottom: 12, marginTop: 0 }}>Domains</div>
      <div style={styles.list}>
        {epochDomains.map(d => (
          <div key={d.name}>
            <div style={styles.domainRow} onClick={() => { setExpanded(expanded === d.name ? null : d.name); setDrillSub(null) }}>
              <span style={styles.arrow}>{expanded === d.name ? '▼' : '▶'}</span>
              <span style={styles.domainName}>{d.name}</span>
              <span style={styles.count}>({d.count})</span>
              <SourceBadge code="E" />
            </div>
            {expanded === d.name && (
              <div style={styles.subList}>
                {d.subs.map(s => (
                  <div key={s.name}>
                    <div
                      style={drillSub === s.name ? { ...styles.subRow, ...styles.subRowActive } : styles.subRow}
                      onClick={() => setDrillSub(drillSub === s.name ? null : s.name)}
                    >
                      <span style={styles.subName}>{s.name}</span>
                      <span style={styles.count}>({s.count})</span>
                      {s.sources.includes('E') && <SourceBadge code="E" />}
                    </div>
                    {drillSub === s.name && (
                      <div style={styles.cardGrid}>
                        {FAKE_BENCHMARKS.slice(0, 4).map(b => (
                          <FakeCard key={b} benchmarkName={b} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ ...styles.facetHeader, marginBottom: 12, marginTop: 24 }}>Properties Tested</div>
      <div style={styles.list}>
        {epochProperties.map(p => (
          <div key={p.name} style={styles.domainRow}>
            <span style={styles.domainName}>{p.name}</span>
            {p.count && <span style={styles.count}>({p.count})</span>}
            <SourceBadge code="E" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Mock1 page ────────────────────────────────────────────────────
const VIEWS = [
  { key: 'evalcards', label: 'EvalCards' },
  { key: 'valsai', label: 'Vals AI' },
  { key: 'epochai', label: 'Epoch AI' },
]

export default function Mock1() {
  const [view, setView] = useState('evalcards')

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.backLink}>&larr; Home</a>
        <h1 style={styles.title}>Taxonomy Explorer — Mock 1</h1>
        <p style={styles.subtitle}>Compare how different platforms structure AI evaluation benchmarks</p>
      </header>

      <nav style={styles.topTabs}>
        {VIEWS.map(v => (
          <button
            key={v.key}
            onClick={() => setView(v.key)}
            style={view === v.key ? { ...styles.topTab, ...styles.topTabActive } : styles.topTab}
          >
            {v.label}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {view === 'evalcards' && <EvalCardsView />}
        {view === 'valsai' && <ValsAIView />}
        {view === 'epochai' && <EpochAIView />}
      </main>

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

  // Top-level tabs (EvalCards / Vals AI / Epoch AI)
  topTabs: {
    display: 'flex',
    gap: 0,
    borderBottom: '2px solid #1e293b',
    padding: '0 32px',
    background: '#0f1117',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  topTab: {
    padding: '12px 24px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: -2,
    transition: 'color 0.15s, border-color 0.15s',
  },
  topTabActive: {
    color: '#5bacd1',
    borderBottomColor: '#5bacd1',
  },

  // Axis sub-tabs inside EvalCards view
  axisTabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
  },
  axisTab: {
    padding: '6px 16px',
    borderRadius: 6,
    border: '1px solid #334155',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  axisTabActive: {
    background: '#1e293b',
    color: '#5bacd1',
    borderColor: '#5bacd1',
  },

  main: {
    padding: '24px 32px',
  },
  viewDesc: {
    fontSize: 14,
    color: '#94a3b8',
    margin: '0 0 20px',
    lineHeight: 1.5,
  },

  // Domain list
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  domainRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background 0.12s',
    ':hover': { background: '#1e293b' },
  },
  arrow: {
    fontSize: 10,
    color: '#64748b',
    width: 16,
    flexShrink: 0,
  },
  domainName: {
    fontWeight: 500,
    fontSize: 15,
    color: '#e2e8f0',
  },
  count: {
    fontSize: 13,
    color: '#64748b',
  },

  // Sub-themes
  subList: {
    marginLeft: 24,
    borderLeft: '2px solid #1e293b',
    paddingLeft: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  subRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background 0.12s',
  },
  subRowActive: {
    background: '#1e293b',
  },
  subName: {
    fontSize: 14,
    color: '#cbd5e1',
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
    padding: '12px 0 12px 12px',
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

  // Facets
  facetHeader: {
    fontSize: 16,
    fontWeight: 600,
    color: '#e2e8f0',
    marginBottom: 8,
    marginTop: 8,
  },
  facetChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    padding: '6px 14px',
    borderRadius: 20,
    background: '#1e293b',
    border: '1px solid #334155',
    fontSize: 13,
    color: '#cbd5e1',
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
