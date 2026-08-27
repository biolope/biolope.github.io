import { useEffect, useState } from "react";
import { navigation } from "../../content/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const closeOnWideScreen = () => {
      if (window.innerWidth > 820) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnWideScreen);
    return () => window.removeEventListener("resize", closeOnWideScreen);
  }, []);

  useEffect(() => {
    const sectionIds = [...navigation.map((item) => item.href.slice(1)), "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={styles.header}>
      <a className={styles.wordmark} href="#top" aria-label="BioLope home">
        BioLope
      </a>
      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={`${menuOpen ? "Close" : "Open"} navigation`}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>
      <nav
        id="primary-navigation"
        className={`${styles.navigation} ${menuOpen ? styles.open : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={activeSection === item.href.slice(1) ? styles.active : ""}
            aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          className={`${styles.contactLink} ${activeSection === "contact" ? styles.active : ""}`}
          href="#contact"
          aria-current={activeSection === "contact" ? "location" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
