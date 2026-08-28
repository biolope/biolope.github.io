import { contactContent } from "../../content/contact";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <img
        src="/content/contact/demonstrator-street-view.webp"
        alt="BioLope ceramic façade demonstrator seen from the surrounding street"
        loading="lazy"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className="eyebrow">{contactContent.eyebrow}</p>
        <h2>{contactContent.title}</h2>
        <p>{contactContent.body}</p>
        <div className={styles.actions}>
          <a href={`mailto:${contactContent.email}`} className={styles.email}>
            {contactContent.email}
          </a>
          <a href={contactContent.linkedin} target="_blank" rel="noreferrer">
            Julia on LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
        {/* The personal contact lines are retained for possible later use.
        <p className={styles.person}>
          Contact · {contactContent.person}
          <span>{contactContent.affiliation}</span>
        </p>
        */}
      </div>
    </section>
  );
}
