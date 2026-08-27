import { contactContent } from "../../content/contact";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="#top" className={styles.wordmark} aria-label="Back to the top">
        BioLope
      </a>
      <div className={styles.ecosystem}>
        <p>Research & project ecosystem</p>
        <ul>
          {contactContent.ecosystem.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div className={styles.metaRow}>
        <p className={styles.meta}>
          A research-origin startup project from Munich · © 2026 BioLope
        </p>
        <nav className={styles.legalLinks} aria-label="Legal information">
          <a href="/imprint/">Imprint / Impressum</a>
          <a href="/privacy/">Privacy / Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
