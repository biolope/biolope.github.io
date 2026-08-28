import Figure from "../../components/ui/Figure";
import Reveal from "../../components/ui/Reveal";
import SectionHeader from "../../components/ui/SectionHeader";
import { validationContent } from "../../content/validation";
import styles from "./Validation.module.css";

export default function Validation() {
  return (
    <section id="validation" className={styles.section}>
      <Reveal>
        <SectionHeader
          eyebrow={validationContent.eyebrow}
          title={validationContent.title}
          body={validationContent.body}
        />
      </Reveal>

      <div className={styles.demonstrator}>
        <Reveal className={styles.imageWrap}>
          <Figure
            src="/content/validation/full-scale-demonstrator.webp"
            alt="Full-scale ceramic façade demonstrator installed in Munich"
            credit="Feierwerk Südpolstation, Munich"
          />
        </Reveal>

        <div className={styles.evidence}>
          <Reveal className={styles.result}>
            <p className="eyebrow">Initial material testing</p>
            <p className={styles.value}>11.2</p>
            <p className={styles.unit}>N/mm² average flexural strength</p>
            <p>{validationContent.mechanical}</p>
          </Reveal>

          <Reveal className={styles.pathway}>
            <p className="eyebrow">Certification pathway</p>
            <h3>Evidence is being built step by step.</h3>
            <p>{validationContent.status}</p>
            <ul>
              <li>Material and mechanical testing</li>
              <li>Durability assessment</li>
              <li>FEM-based structural evaluation</li>
              <li>Approval-oriented documentation</li>
            </ul>
            <div className={styles.ipStatus}>
              <span>IP pathway</span>
              <p>
                <strong>{validationContent.intellectualProperty.title}</strong>
                {validationContent.intellectualProperty.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className={styles.paper}>
        <div>
          <p className="eyebrow">{validationContent.publication.label}</p>
          <h3>{validationContent.publication.title}</h3>
        </div>
        <a
          href={validationContent.publication.href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the BioLope preprint in a new tab"
        >
          Read the preprint <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
