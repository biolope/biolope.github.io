import styles from "./ScrollFacadeStory.module.css";

export default function FacadeStage({ activeStep, staticMode = false }) {
  const state = ["design", "simulate", "engineer", "manufacture", "validate"][activeStep];
  const showLayer = (stepIndex) => !staticMode || activeStep === stepIndex;
  const loading = staticMode ? "lazy" : undefined;

  return (
    <div className={styles.stage} data-state={state} aria-hidden="true">
      <img
        className={styles.facadeImage}
        src="/content/product/facade-depth-detail.webp"
        alt=""
        loading={loading}
      />

      {showLayer(0) ? (
        <div className={`${styles.evidenceLayer} ${styles.designLayer}`}>
          <div className={styles.evidenceCard}>
            <img
              src="/content/technology/design/parametric-control-points.webp"
              alt=""
              loading={loading}
            />
            <p>Parametric control points</p>
          </div>
        </div>
      ) : null}

      {showLayer(1) ? (
        <>
          <div className={styles.sunArc}>
            <span />
          </div>

          <div className={styles.thermalLayer}>
            <img
              src="/content/technology/simulate/measured-facade-reference.webp"
              alt=""
              loading={loading}
            />
            <span>Measured thermal data · model input</span>
          </div>
        </>
      ) : null}

      {showLayer(2) ? (
        <div className={`${styles.evidenceLayer} ${styles.engineeringLayer}`}>
          <div className={styles.evidenceCard}>
            <img
              src="/content/technology/engineering/facade-fem-3d.webp"
              alt=""
              loading={loading}
            />
            <p>Illustrative FEM example</p>
          </div>
        </div>
      ) : null}

      {showLayer(3) ? (
        <div className={styles.manufacturingLayer}>
          <img
            src="/content/technology/manufacturing/robotic-printing.webp"
            alt=""
            loading={loading}
          />
        </div>
      ) : null}

      {showLayer(4) ? (
        <div className={`${styles.evidenceLayer} ${styles.qaLayer}`}>
          <div className={styles.evidenceCard}>
            <img
              src="/content/technology/validation/printed-scan-comparison.webp"
              alt=""
              loading={loading}
            />
            <p>Printed specimen · 3D scan comparison</p>
          </div>
        </div>
      ) : null}

      <div className={styles.stageLabel}>
        <span>{String(activeStep + 1).padStart(2, "0")}</span>
        <span>{state}</span>
      </div>
    </div>
  );
}
