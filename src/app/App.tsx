// Owned by Track A. Mounts the provider + three zones. B/C/D must NOT edit this file —
// they replace the internals of their own component folder only (see OVERVIEW §5).

import { PortfolioProvider } from './PortfolioProvider'
import { About, SiteMeta } from '../components/about'
import { Rail } from '../components/rail'
import { Preview } from '../components/preview'
import styles from './Layout.module.css'

function App() {
  return (
    <PortfolioProvider>
      <div className={styles.shell}>
        <section className={styles.about}>
          <About />
        </section>
        <aside className={styles.rail}>
          <Rail />
        </aside>
        <section className={styles.preview}>
          <Preview />
        </section>
        {/* Meta/footer slot — content provided by Track B's <SiteMeta/> (B2). */}
        <footer className={styles.footer}>
          <SiteMeta />
        </footer>
      </div>
    </PortfolioProvider>
  )
}

export default App
