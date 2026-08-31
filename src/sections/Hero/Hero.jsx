import { heroContent } from "../../content/hero";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.imageWrap}>
        <img src={heroContent.image} alt={heroContent.imageAlt} fetchPriority="high" />
      </div>
      <div className={styles.content}>
        <p className="eyebrow">{heroContent.eyebrow}</p>
        <h1>{heroContent.title}</h1>
        <p className={styles.lead}>{heroContent.body}</p>
        <div className={styles.actions}>
          <a className="button buttonPrimary" href="#product">
            Explore the product
          </a>
          <a className="textLink" href="#impact">
            See the impact <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>
    </section>
  );
}
