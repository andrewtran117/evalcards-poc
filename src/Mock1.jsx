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

const FACETS_DATA = [
  { name: 'Text', facet: 'Modality' },
  { name: 'Image', facet: 'Modality' },
  { name: 'Video', facet: 'Modality' },
  { name: 'Audio & Speech', facet: 'Modality' },
  { name: 'Documents & Charts', facet: 'Modality' },
  { name: '3D', facet: 'Modality' },
  { name: 'Single-turn QA', facet: 'Interaction' },
  { name: 'Multi-turn Conversation', facet: 'Interaction' },
  { name: 'Tool Use', facet: 'Interaction' },
  { name: 'Agentic in Environment', facet: 'Interaction' },
  { name: 'Computer Use', facet: 'Interaction' },
  { name: 'English Only', facet: 'Language' },
  { name: 'Multilingual', facet: 'Language' },
  { name: 'Non-English', facet: 'Language' },
]

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

// ── Source badge ────────────────────────────────────────────────────────
const SOURCE_COLORS = { V: '#8b5cf6', E: '#f59e0b', A: '#10b981', L: '#3b82f6' }
const SOURCE_LABELS = { V: 'Vals AI', E: 'Epoch', A: 'Artificial Analysis', L: 'LLM Stats' }

function SourceBadge({ code }) {
  return (
    <span style={{ ...styles.badge, background: SOURCE_COLORS[code] }} title={SOURCE_LABELS[code]}>
      {code}
    </span>
  )
}

// ── Main page ──────────────────────────────────────────────────────────
export default function Mock1() {
  // Single piece of state for the entire tab bar — only one thing active at a time
  const [activeTab, setActiveTab] = useState(null)   // { type: 'domain'|'property'|'facet', name: string }
  const [activeSub, setActiveSub] = useState(null)

  const handleTab = (type, name) => {
    if (activeTab?.type === type && activeTab?.name === name) {
      setActiveTab(null)
      setActiveSub(null)
    } else {
      setActiveTab({ type, name })
      setActiveSub(null)
    }
  }

  const handleSub = (name) => {
    setActiveSub(activeSub === name ? null : name)
  }

  const isActive = (type, name) => activeTab?.type === type && activeTab?.name === name

  // Resolve what to show in drill-down
  const selectedDomain = activeTab?.type === 'domain' ? DOMAINS.find(d => d.name === activeTab.name) : null
  const selectedProp = activeTab?.type === 'property' ? PROPERTIES.find(p => p.name === activeTab.name) : null
  const selectedFacet = activeTab?.type === 'facet' ? activeTab.name : null

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.backLink}>&larr; Home</a>
        <h1 style={styles.title}>EvalCards Taxonomy Explorer</h1>
      </header>

      {/* Unified tab bar */}
      <nav style={styles.tabBar}>
        {/* Domain group */}
        <div style={styles.tabGroup}>
          <div style={styles.groupLabel}>Domain</div>
          <div style={styles.groupTabs}>
            {DOMAINS.map(d => (
              <button
                key={d.name}
                onClick={() => handleTab('domain', d.name)}
                style={isActive('domain', d.name) ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              >
                {d.name}
                <span style={styles.tabCount}>{d.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.divider} />

        {/* Property group */}
        <div style={styles.tabGroup}>
          <div style={styles.groupLabel}>Property</div>
          <div style={styles.groupTabs}>
            {PROPERTIES.map(p => (
              <button
                key={p.name}
                onClick={() => handleTab('property', p.name)}
                style={isActive('property', p.name) ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              >
                {p.name}
                {p.count && <span style={styles.tabCount}>{p.count}</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.divider} />

        {/* Facets group */}
        <div style={styles.tabGroup}>
          <div style={styles.groupLabel}>Facets</div>
          <div style={styles.groupTabs}>
            {['Modality', 'Interaction', 'Language'].map(f => (
              <button
                key={f}
                onClick={() => handleTab('facet', f)}
                style={isActive('facet', f) ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Drill-down panel */}
      <main style={styles.main}>
        {!activeTab && (
          <div style={styles.empty}>Select a tab above to explore benchmarks</div>
        )}

        {selectedDomain && (
          <div>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>{selectedDomain.name}</h2>
              <span style={styles.panelCount}>{selectedDomain.count} benchmarks</span>
              <div style={styles.badgeRow}>
                {selectedDomain.sources.map(s => <SourceBadge key={s} code={s} />)}
              </div>
            </div>

            <div style={styles.subTabs}>
              {selectedDomain.subs.map(s => (
                <button
                  key={s.name}
                  onClick={() => handleSub(s.name)}
                  style={activeSub === s.name ? { ...styles.subTab, ...styles.subTabActive } : styles.subTab}
                >
                  {s.name}
                  <span style={styles.subCount}>{s.count}</span>
                  {s.sources.map(sc => <SourceBadge key={sc} code={sc} />)}
                </button>
              ))}
            </div>

            {activeSub && (
              <div style={styles.cardGrid}>
                {FAKE_BENCHMARKS.slice(0, Math.max(3, selectedDomain.subs.find(s => s.name === activeSub)?.count > 10 ? 6 : 4)).map(b => (
                  <FakeCard key={b} benchmarkName={b} />
                ))}
              </div>
            )}
          </div>
        )}

        {selectedProp && (
          <div>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>{selectedProp.name}</h2>
              <p style={styles.panelDesc}>{selectedProp.fullName}</p>
              {selectedProp.count && <span style={styles.panelCount}>{selectedProp.count} benchmarks</span>}
              <div style={styles.badgeRow}>
                {selectedProp.sources.map(s => <SourceBadge key={s} code={s} />)}
              </div>
            </div>
            <div style={styles.cardGrid}>
              {FAKE_BENCHMARKS.slice(0, selectedProp.count ? Math.min(6, selectedProp.count) : 4).map(b => (
                <FakeCard key={b} benchmarkName={b} />
              ))}
            </div>
          </div>
        )}

        {selectedFacet && (
          <div>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>{selectedFacet}</h2>
            </div>
            <div style={styles.subTabs}>
              {FACETS_DATA.filter(f => f.facet === selectedFacet).map(f => (
                <button
                  key={f.name}
                  onClick={() => handleSub(f.name)}
                  style={activeSub === f.name ? { ...styles.subTab, ...styles.subTabActive } : styles.subTab}
                >
                  {f.name}
                </button>
              ))}
            </div>
            {activeSub && (
              <div style={styles.cardGrid}>
                {FAKE_BENCHMARKS.slice(0, 4).map(b => (
                  <FakeCard key={b} benchmarkName={b} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <div style={styles.legend}>
        <span style={styles.legendLabel}>Sources:</span>
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
    padding: '20px 32px 12px',
    borderBottom: '1px solid #1e293b',
  },
  backLink: {
    color: '#5bacd1',
    textDecoration: 'none',
    fontSize: 13,
  },
  title: {
    margin: '6px 0 0',
    fontSize: 22,
    fontWeight: 600,
    color: '#f1f5f9',
  },

  // Unified tab bar
  tabBar: {
    padding: '16px 32px',
    borderBottom: '1px solid #1e293b',
    background: '#12141c',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  tabGroup: {
    marginBottom: 12,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#64748b',
    marginBottom: 6,
  },
  groupTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
  },
  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 12px',
    borderRadius: 5,
    border: '1px solid transparent',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.12s',
  },
  tabActive: {
    background: '#1e293b',
    color: '#5bacd1',
    borderColor: '#5bacd1',
  },
  tabCount: {
    fontSize: 11,
    color: '#4a5568',
    fontWeight: 400,
  },
  divider: {
    height: 1,
    background: '#1e293b',
    margin: '8px 0',
  },

  // Main content
  main: {
    padding: '24px 32px',
    minHeight: 400,
  },
  empty: {
    color: '#4a5568',
    fontSize: 15,
    textAlign: 'center',
    padding: '80px 0',
  },

  // Panel header
  panelHeader: {
    marginBottom: 20,
  },
  panelTitle: {
    margin: '0 0 4px',
    fontSize: 20,
    fontWeight: 600,
    color: '#f1f5f9',
  },
  panelDesc: {
    margin: '0 0 4px',
    fontSize: 14,
    color: '#94a3b8',
  },
  panelCount: {
    fontSize: 13,
    color: '#64748b',
  },
  badgeRow: {
    display: 'flex',
    gap: 4,
    marginTop: 6,
  },

  // Sub-theme pills
  subTabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
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
    transition: 'all 0.12s',
  },
  subTabActive: {
    background: '#5bacd1',
    color: '#fff',
    borderColor: '#5bacd1',
  },
  subCount: {
    fontSize: 11,
    opacity: 0.6,
  },

  // Source badges
  badge: {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 600,
    color: '#fff',
    letterSpacing: 0.5,
  },

  // Cards
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
