import styles from "./LegalPage.module.css";

export default function LegalPageLayout({ eyebrow, title, intro, children }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="/" aria-label="BioLope home">
          BioLope
        </a>
        <a className={styles.backLink} href="/">
          Back to the one-pager <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          {intro ? <p>{intro}</p> : null}
        </div>
        <div className={styles.content}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 BioLope</p>
        <nav aria-label="Legal information">
          <a href="/imprint/">Imprint / Impressum</a>
          <a href="/privacy/">Privacy / Datenschutz</a>
        </nav>
      </footer>
    </div>
  );
}
