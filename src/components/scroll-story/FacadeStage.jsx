import styles from "./ScrollFacadeStory.module.css";

export default function FacadeStage({ activeStep }) {
  const state = ["design", "simulate", "engineer", "manufacture", "validate"][activeStep];

  return (
    <div className={styles.stage} data-state={state} aria-hidden="true">
      <img
        className={styles.facadeImage}
        src="/content/product/facade-depth-detail.webp"
        alt=""
      />

      <div className={`${styles.evidenceLayer} ${styles.designLayer}`}>
        <div className={styles.evidenceCard}>
          <img
            src="/content/technology/design/parametric-control-points.webp"
            alt=""
          />
          <p>Parametric control points</p>
        </div>
      </div>

      <div className={styles.sunArc}>
        <span />
      </div>

      <div className={styles.thermalLayer}>
        <img src="/content/impact/thermal/measured-facade-reference.webp" alt="" />
        <span>Measured thermal data · model input</span>
      </div>

      <div className={`${styles.evidenceLayer} ${styles.engineeringLayer}`}>
        <div className={styles.evidenceCard}>
          <img src="/content/technology/engineering/facade-fem-3d.webp" alt="" />
          <p>Illustrative FEM example</p>
        </div>
      </div>

      <div className={styles.manufacturingLayer}>
        <img src="/content/technology/manufacturing/robotic-printing.webp" alt="" />
        <div className={styles.printPath} />
      </div>

      <div className={`${styles.evidenceLayer} ${styles.qaLayer}`}>
        <div className={styles.evidenceCard}>
          <img src="/content/technology/validation/printed-scan-comparison.webp" alt="" />
          <p>Printed specimen · 3D scan comparison</p>
        </div>
      </div>

      <div className={styles.stageLabel}>
        <span>{String(activeStep + 1).padStart(2, "0")}</span>
        <span>{state}</span>
      </div>
    </div>
  );
}
