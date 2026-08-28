import Figure from "../../components/ui/Figure";
import Reveal from "../../components/ui/Reveal";
import SectionHeader from "../../components/ui/SectionHeader";
import { productContent } from "../../content/product";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <section id="product" className={styles.section}>
      <Reveal>
        <SectionHeader {...productContent} />
      </Reveal>

      <div className={styles.visualGrid}>
        <Reveal className={styles.mainImage}>
          <Figure
            src="/content/product/demonstrator-summer.webp"
            alt="Ceramic façade demonstrator installed on the grey building at Feierwerk Südpolstation"
          />
        </Reveal>
        <Reveal className={styles.detailImage}>
          <Figure
            src="/content/product/facade-depth-detail.webp"
            alt="Close-up showing the varying depth and layered ceramic texture of the façade elements"
          />
        </Reveal>
        <ol className={styles.features}>
          {productContent.features.map(([number, label]) => (
            <li key={number}>
              <span>{number}</span>
              <p>{label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
