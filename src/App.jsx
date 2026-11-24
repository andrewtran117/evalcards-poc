import './App.css'

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#5bacd1',
      gap: 24,
    }}>
      <h1 style={{ color: '#fff', fontSize: '28px', margin: 0 }}>
        EvalCards - Gap Analysis, UI/UX Mocks
      </h1>
      <a
        href="/mock1"
        style={{
          color: '#fff',
          fontSize: 16,
          padding: '10px 24px',
          border: '2px solid #fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'background 0.15s',
        }}
      >
        View Mock 1: Taxonomy Explorer →
      </a>
    </div>
  )
}

export default App
