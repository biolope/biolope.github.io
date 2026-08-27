import styles from "./ScrollFacadeStory.module.css";

const tileCount = 48;
const nodeCount = 14;

export default function FacadeStage({ activeStep }) {
  const state = ["design", "simulate", "engineer", "manufacture", "validate"][activeStep];

  return (
    <div className={styles.stage} data-state={state} aria-hidden="true">
      <img
        className={styles.facadeImage}
        src="/content/product/facade-depth-detail.webp"
        alt=""
      />

      <div className={styles.facadeGrid}>
        {Array.from({ length: tileCount }, (_, index) => (
          <span key={index} style={{ "--tile-index": index }} />
        ))}
      </div>

      <div className={styles.sunArc}>
        <span />
      </div>

      <div className={styles.thermalLayer}>
        <img src="/content/impact/thermal/measured-facade-reference.webp" alt="" />
        <span>Measured evidence</span>
      </div>

      <div className={styles.engineeringLayer}>
        <div className={styles.mesh} />
        {Array.from({ length: nodeCount }, (_, index) => (
          <span key={index} style={{ "--node-index": index }} />
        ))}
        <p>Illustrative engineering view</p>
      </div>

      <div className={styles.manufacturingLayer}>
        <img src="/content/technology/manufacturing/robotic-printing.webp" alt="" />
        <div className={styles.printPath} />
      </div>

      <div className={styles.qaLayer}>
        <div className={styles.pointCloud} />
        <div className={styles.targetContour} />
        <p>QA workflow in development</p>
      </div>

      <div className={styles.stageLabel}>
        <span>{String(activeStep + 1).padStart(2, "0")}</span>
        <span>{state}</span>
      </div>
    </div>
  );
}
