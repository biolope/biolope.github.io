import { useEffect, useRef, useState } from "react";
import { storySteps } from "../../content/technology";
import FacadeStage from "./FacadeStage";
import styles from "./ScrollFacadeStory.module.css";

function useStoryStep(storyRef) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const element = storyRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame = null;
    const update = () => {
      frame = null;
      const bounds = element.getBoundingClientRect();
      const scrollable = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollable));
      setActiveStep(Math.min(storySteps.length - 1, Math.floor(progress * storySteps.length)));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [storyRef]);

  return activeStep;
}

export default function ScrollFacadeStory() {
  const storyRef = useRef(null);
  const activeStep = useStoryStep(storyRef);
  const step = storySteps[activeStep];

  return (
    <div ref={storyRef} className={styles.story}>
      <div className={styles.desktopStory}>
        <div className={styles.stickyFrame}>
          <div className={styles.copy}>
            <span className={styles.stepNumber}>{step.number}</span>
            <p className={styles.stepLabel}>{step.label}</p>
            <h3>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
            <p className={styles.status}>{step.status}</p>
          </div>
          <FacadeStage activeStep={activeStep} />
          <div className={styles.progress} aria-hidden="true">
            {storySteps.map((item, index) => (
              <span key={item.id} className={index <= activeStep ? styles.complete : ""} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mobileStory}>
        <ol>
          {storySteps.map((item, index) => (
            <li key={item.id}>
              <div className={styles.mobileCopy}>
                <span>{item.number}</span>
                <div>
                  <p>{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <small>{item.status}</small>
                </div>
              </div>
              <FacadeStage activeStep={index} staticMode />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
