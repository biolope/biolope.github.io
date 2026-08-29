import Figure from "../../components/ui/Figure";
import Reveal from "../../components/ui/Reveal";
import SectionHeader from "../../components/ui/SectionHeader";
import { impactContent } from "../../content/impact";
import styles from "./Impact.module.css";

export default function Impact() {
  return (
    <section id="impact" className={styles.section}>
      <Reveal>
        <SectionHeader eyebrow={impactContent.eyebrow} title={impactContent.title} />
      </Reveal>

      <div className={styles.impactGrid}>
        <article className={styles.thermal}>
          <Reveal className={styles.thermalMetric}>
            <p className={styles.metricValue}>{impactContent.thermal.value}</p>
            <p className={styles.metricLabel}>{impactContent.thermal.valueLabel}</p>
            <p className={styles.body}>{impactContent.thermal.body}</p>
            <p className={styles.note}>{impactContent.thermal.note}</p>
          </Reveal>
          <Reveal className={styles.thermalFigure}>
            <Figure
              className={styles.evidenceFigure}
              src="/content/impact/thermal/measured-facade-reference.webp"
              alt="Thermal measurement comparing the cooler ceramic demonstrator with the warmer flat reference wall"
              credit={
                <>
                  Measured in August 2025 · Larikova et al. ·{" "}
                  <a href="https://doi.org/10.2139/ssrn.6481480" target="_blank" rel="noreferrer">
                    Preprint under review ↗
                  </a>
                </>
              }
            />
          </Reveal>
        </article>

        <article className={styles.habitat}>
          <div className={styles.habitatImages}>
            <Reveal>
              <Figure
                src="/content/impact/habitat/facade-habitat-detail-cropped.webp"
                alt="Ceramic façade elements with integrated nesting and shelter openings"
                credit="Munich demonstrator"
              />
            </Reveal>
            <Reveal>
              <Figure
                className={styles.habitatConcept}
                src="/content/impact/habitat/bird-habitat-axonometry.webp"
                alt="Concept axonometry showing nesting cavities integrated behind ceramic façade elements"
                credit="Concept axonometry of a nesting habitat"
              />
            </Reveal>
          </div>
          <Reveal className={styles.habitatCopy}>
            <p className="eyebrow">Habitat opportunities</p>
            <h3>{impactContent.habitat.title}</h3>
            <p className={styles.body}>{impactContent.habitat.body}</p>
            <p className={styles.note}>{impactContent.habitat.note}</p>
          </Reveal>
        </article>
      </div>

      <div className={styles.additionalImpact}>
        <Reveal className={styles.material}>
          <p className={styles.metricValue}>{impactContent.material.value}</p>
          <h3>{impactContent.material.title}</h3>
          <p>{impactContent.material.body}</p>
        </Reveal>
        <Reveal className={styles.assessment}>
          <p className="eyebrow">Assessment potential</p>
          <h3>{impactContent.assessment.title}</h3>
          <p>{impactContent.assessment.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
