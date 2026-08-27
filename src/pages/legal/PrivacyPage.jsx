import { imprintContent, privacyContent } from "../../content/legal";
import LegalPageLayout from "./LegalPageLayout";
import styles from "./LegalPage.module.css";

export default function PrivacyPage() {
  const authority = privacyContent.supervisoryAuthority;

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy / Datenschutz"
      intro={`Information on the processing of personal data. Last updated: ${privacyContent.lastUpdated}.`}
    >
      <section className={styles.section}>
        <h2>1. Controller</h2>
        <address>
          {imprintContent.provider}
          <br />
          c/o {imprintContent.institution}
          <br />
          {imprintContent.affiliation}
          <br />
          {imprintContent.street}
          <br />
          {imprintContent.city}, {imprintContent.country}
          <br />
          Email: <a href={`mailto:${imprintContent.email}`}>{imprintContent.email}</a>
        </address>
      </section>

      <section className={styles.section}>
        <h2>2. Hosting through GitHub Pages</h2>
        <p>
          This website is hosted through GitHub Pages, a service provided by GitHub.
          When the website is accessed, technical connection data may be processed,
          including the visitor’s IP address, the date and time of the request, the page
          requested, referrer information, and browser or device information. GitHub
          states that visitors’ IP addresses are logged and stored for security purposes.
        </p>
        <p>
          To the extent that this processing is attributable to us, it is based on Article
          6(1)(f) GDPR. Our legitimate interest is the secure, reliable and technically
          functional provision of this website. We do not receive or independently
          evaluate GitHub’s raw server logs.
        </p>
        <p>
          GitHub may process data outside the European Economic Area. Further information
          is available in the {" "}
          <a href={privacyContent.githubPagesInformation} target="_blank" rel="noreferrer">
            GitHub Pages documentation
          </a>{" "}
          and the {" "}
          <a href={privacyContent.githubPrivacy} target="_blank" rel="noreferrer">
            GitHub Privacy Statement
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Contact by email</h2>
        <p>
          If you contact us by email, we process the information you provide, including
          your email address and message, in order to respond to your enquiry. Depending
          on the subject of the enquiry, the legal basis is Article 6(1)(b) GDPR for
          pre-contractual communication or Article 6(1)(f) GDPR for general enquiries and
          project communication.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Cookies and analytics</h2>
        <p>
          We do not use our own cookies, analytics services, advertising trackers or
          comparable tracking technologies on this website. No consent banner is therefore
          provided in the current version of the website.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. External links</h2>
        <p>
          This website contains ordinary links to external websites, including LinkedIn
          and the preprint provider. No content from these services is embedded. Data is
          transmitted to the respective provider only when you follow an external link.
          The privacy information of that provider then applies.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Retention</h2>
        <p>
          Email correspondence is retained only for as long as necessary to handle the
          enquiry and any resulting cooperation, unless statutory retention obligations
          require longer storage. The retention of technical data processed by GitHub is
          governed by GitHub’s applicable policies.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Your rights</h2>
        <p>
          Subject to the statutory requirements, you have rights of access, rectification,
          erasure, restriction of processing, data portability and objection. You may also
          withdraw consent at any time where processing is based on consent. Withdrawal
          does not affect the lawfulness of processing carried out before withdrawal.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Right to lodge a complaint</h2>
        <p>You may lodge a complaint with a competent data protection authority, including:</p>
        <address>
          {authority.name}
          <br />
          {authority.street}
          <br />
          {authority.city}
          <br />
          {authority.country}
          <br />
          <a href={authority.website} target="_blank" rel="noreferrer">
            {authority.website} <span aria-hidden="true">↗</span>
          </a>
        </address>
      </section>

      <section className={styles.section}>
        <h2>9. Changes to this notice</h2>
        <p>
          We will update this privacy notice if the website’s functions, service providers
          or data-processing activities change.
        </p>
      </section>
    </LegalPageLayout>
  );
}
