import { ApplicationCard } from './components/ApplicationCard'
import { applications } from './config/applications'

/** Renders the application selection portal. */
function App() {
  return (
    <main>
      <header className="hero">
        <p className="eyebrow">ANALYSIS TOOL PORTAL</p>
        <h1>Materials Analysis Workbench</h1>
        <p className="subtitle">目的に応じた分析ツールを選択してください</p>
      </header>
      <section className="application-grid" aria-label="分析ツール一覧">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </section>
      <footer>Materials Analysis Workbench</footer>
    </main>
  )
}

export default App
