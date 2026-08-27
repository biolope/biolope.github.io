import styles from "./Figure.module.css";

export default function Figure({ src, alt, credit, className = "", loading = "lazy" }) {
  return (
    <figure className={`${styles.figure} ${className}`}>
      <img src={src} alt={alt} loading={loading} />
      {credit ? <figcaption>{credit}</figcaption> : null}
    </figure>
  );
}
