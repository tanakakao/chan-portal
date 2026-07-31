import { useEffect, useState } from 'react'
import { Gamepad2, LayoutGrid } from 'lucide-react'
import { ApplicationCard } from './components/ApplicationCard'
import { applications } from './config/applications'

type PortalMode = 'standard' | 'retro'

const PORTAL_MODE_STORAGE_KEY = 'chan-portal-display-mode'

/**
 * Reads the previously selected display mode from browser storage.
 *
 * @returns The stored display mode, or the standard mode when unavailable.
 */
function readStoredPortalMode(): PortalMode {
  try {
    return window.localStorage.getItem(PORTAL_MODE_STORAGE_KEY) === 'retro'
      ? 'retro'
      : 'standard'
  } catch {
    return 'standard'
  }
}

/** Renders the application selection portal. */
function App() {
  const [portalMode, setPortalMode] = useState<PortalMode>(readStoredPortalMode)
  const isRetroMode = portalMode === 'retro'

  useEffect(() => {
    try {
      window.localStorage.setItem(PORTAL_MODE_STORAGE_KEY, portalMode)
    } catch {
      // The selected mode still works for the current session when storage is unavailable.
    }
  }, [portalMode])

  return (
    <div className={`portal-shell portal-shell--${portalMode}`}>
      <main className="portal-main">
        <div className="display-mode-switcher" role="group" aria-label="表示モード">
          <span className="display-mode-switcher__label">DISPLAY</span>
          <button
            type="button"
            className={`display-mode-button${portalMode === 'standard' ? ' display-mode-button--active' : ''}`}
            aria-pressed={portalMode === 'standard'}
            onClick={() => setPortalMode('standard')}
          >
            <LayoutGrid size={15} aria-hidden="true" />
            通常
          </button>
          <button
            type="button"
            className={`display-mode-button${isRetroMode ? ' display-mode-button--active' : ''}`}
            aria-pressed={isRetroMode}
            onClick={() => setPortalMode('retro')}
          >
            <Gamepad2 size={16} aria-hidden="true" />
            8-bit
          </button>
        </div>

        <header className="hero">
          <p className="eyebrow">{isRetroMode ? '8-BIT ANALYSIS SYSTEM' : 'ANALYSIS TOOL PORTAL'}</p>
          <h1>
            {isRetroMode ? (
              <>
                <span className="retro-title-line">MATERIALS</span>
                <span className="retro-title-line retro-title-line--accent">ANALYSIS</span>
                <span className="retro-title-line retro-title-line--sub">WORKBENCH</span>
              </>
            ) : (
              'Materials Analysis Workbench'
            )}
          </h1>
          {isRetroMode && <p className="retro-system-name">MATERIALS ANALYSIS WORKBENCH</p>}
          <p className="subtitle">
            {isRetroMode ? '▶ SELECT APPLICATION' : '目的に応じた分析ツールを選択してください'}
          </p>
        </header>

        <section className="application-grid" aria-label="分析ツール一覧">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </section>

        <footer>{isRetroMode ? '© 2026 MATERIALS ANALYSIS WORKBENCH' : 'Materials Analysis Workbench'}</footer>
      </main>
    </div>
  )
}

export default App
