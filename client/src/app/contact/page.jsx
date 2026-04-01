export const metadata = {
  title: "Contact | Evox Ventures",
  description: "Get in touch with Evox Ventures for your next event.",
};

export default function ContactPage() {
  return (
    <section className="section container" style={{ minHeight: "50vh" }}>
      <h1 className="text-center" style={{ marginBottom: "1rem", fontSize: "2.25rem" }}>
        Contact us
      </h1>
      <p
        className="text-center"
        style={{ maxWidth: "560px", margin: "0 auto", color: "var(--color-text-secondary)" }}
      >
        We&apos;d love to hear about your event. Reach out and our team will respond shortly.
      </p>
      <p
        className="text-center"
        style={{ marginTop: "2rem", color: "var(--color-text-muted)" }}
      >
        <a href="mailto:hello@evoxventures.com" className="btn btn-primary">
          Email hello@evoxventures.com
        </a>
      </p>
    </section>
  );
}
