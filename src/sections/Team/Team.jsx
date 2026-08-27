import Reveal from "../../components/ui/Reveal";
import SectionHeader from "../../components/ui/SectionHeader";
import { advisors, founders } from "../../content/team";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section id="team" className={styles.section}>
      <Reveal>
        <SectionHeader
          eyebrow="Team"
          title="Four perspectives. One façade system."
          body="BioLope brings together architectural design, ceramic manufacturing, scientific validation and market development in one complementary founding team."
        />
      </Reveal>

      <div className={styles.founders}>
        {founders.map((founder, index) => (
          <Reveal className={styles.founder} key={founder.name}>
            <div className={styles.portrait} aria-label={`${founder.name} portrait placeholder`}>
              <span>{founder.initials}</span>
              <small>Portrait forthcoming</small>
            </div>
            <p className={styles.index}>{String(index + 1).padStart(2, "0")}</p>
            <h3>{founder.name}</h3>
            <p className={styles.role}>{founder.role}</p>
            <p className={styles.bio}>{founder.bio}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.advisors}>
        <div>
          <p className="eyebrow">Advisors</p>
          <h3>Guided by expertise across the system.</h3>
        </div>
        <ul>
          {advisors.map((advisor) => (
            <li key={advisor.name}>
              <span>{advisor.name}</span>
              <small>{advisor.role}</small>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
