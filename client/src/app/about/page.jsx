export const metadata = {
  title: "About | Evox Ventures",
  description: "Learn about Evox Ventures and our approach to premium events.",
};

export default function AboutPage() {
  return (
    <section className="section container" style={{ minHeight: "50vh" }}>
      <h1 className="text-center" style={{ marginBottom: "1rem", fontSize: "2.25rem" }}>
        About Evox Ventures
      </h1>
      <p
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          color: "var(--color-text-secondary)",
          textAlign: "center",
        }}
      >
        We plan and execute corporate, sports, and social experiences with precision, creativity,
        and transparent budgeting—so your moment feels effortless and unforgettable.
      </p>
    </section>
  );
}
