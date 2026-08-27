import ScrollFacadeStory from "../../components/scroll-story/ScrollFacadeStory";
import Reveal from "../../components/ui/Reveal";
import SectionHeader from "../../components/ui/SectionHeader";
import { technologyContent } from "../../content/technology";
import styles from "./Technology.module.css";

export default function Technology() {
  return (
    <section id="technology" className={styles.section}>
      <div className={styles.intro}>
        <Reveal>
          <SectionHeader {...technologyContent} inverse />
        </Reveal>
      </div>
      <ScrollFacadeStory />
      <div className={styles.vision}>
        <p>Long-term vision</p>
        <h3>
          A connected workflow through which architects can design, assess and manufacture
          project-specific façade systems.
        </h3>
        <span>Roadmap — not a currently available software product</span>
      </div>
    </section>
  );
}
