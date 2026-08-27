import { imprintContent } from "../../content/legal";
import LegalPageLayout from "./LegalPageLayout";
import styles from "./LegalPage.module.css";

export default function ImprintPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Imprint / Impressum"
      intro="Information pursuant to Section 5 DDG and Section 18(1) MStV."
    >
      <section className={styles.section}>
        <h2>Website provider</h2>
        <address>
          {imprintContent.provider}
          <br />
          c/o {imprintContent.institution}
          <br />
          {imprintContent.affiliation}
          <br />
          {imprintContent.street}
          <br />
          {imprintContent.city}
          <br />
          {imprintContent.country}
        </address>
      </section>

      <section className={styles.section}>
        <h2>Contact</h2>
        <address>
          Email: <a href={`mailto:${imprintContent.email}`}>{imprintContent.email}</a>
          <br />
          LinkedIn: {" "}
          <a href={imprintContent.linkedin} target="_blank" rel="noreferrer">
            Julia Larikova <span aria-hidden="true">↗</span>
          </a>
        </address>
      </section>

      <section className={styles.section}>
        <h2>Project status</h2>
        <p>
          BioLope is currently a project name. No separate legal entity has yet been
          incorporated. The Technical University of Munich is not the provider of this
          website.
        </p>
      </section>
    </LegalPageLayout>
  );
}
