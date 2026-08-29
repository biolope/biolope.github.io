import Reveal from "../../components/ui/Reveal";
// import SectionHeader from "../../components/ui/SectionHeader";
import { founders } from "../../content/team";
// import { advisors } from "../../content/team";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section id="team" className={styles.section}>
      <Reveal>
        <h2 className={styles.teamTitle}>Team</h2>
      </Reveal>

      <div className={styles.founders}>
        {founders.map((founder) => (
          <Reveal className={styles.founder} key={founder.name}>
            <div className={styles.portrait}>
              <img src={founder.portrait} alt={`Portrait of ${founder.name}`} />
            </div>
            <h3>{founder.name}</h3>
            <p className={styles.title}>{founder.title}</p>
            <p className={styles.role}>{founder.role}</p>
            {/* Detailed biographies are retained in the content file for later use.
            <p className={styles.bio}>{founder.bio}</p>
            */}
          </Reveal>
        ))}
      </div>

      {/* Temporarily hidden for the compact pitch version.
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
      */}
    </section>
  );
}
