import Reveal from "../../components/ui/Reveal";
import { tractionContent } from "../../content/traction";
import styles from "./Traction.module.css";

export default function Traction() {
  return (
    <section className={styles.section} aria-labelledby="traction-title">
      <Reveal className={styles.intro}>
        <p className="eyebrow">{tractionContent.eyebrow}</p>
        <h2 id="traction-title">{tractionContent.title}</h2>
        <p>{tractionContent.body}</p>
      </Reveal>

      <dl className={styles.metrics}>
        {tractionContent.metrics.map((metric) => (
          <Reveal className={styles.metric} key={metric.title}>
            <dt>
              <span>{metric.value}</span>
              {metric.title}
            </dt>
            <dd>{metric.body}</dd>
          </Reveal>
        ))}
      </dl>

      <Reveal className={styles.note}>
        <span>Market insight</span>
        <p>{tractionContent.note}</p>
      </Reveal>
    </section>
  );
}
