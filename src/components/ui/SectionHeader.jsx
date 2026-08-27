import styles from "./SectionHeader.module.css";

export default function SectionHeader({ eyebrow, title, body, inverse = false }) {
  return (
    <header className={`${styles.header} ${inverse ? styles.inverse : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p className={styles.body}>{body}</p> : null}
    </header>
  );
}
