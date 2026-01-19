import Hero from '@/components/home/Hero';

export default function Home() {
    return (
        <>
            <Hero />

            <section className="section container">
                <h2 className="text-center" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Why Choose Evox Ventures?</h2>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--color-bg-elevated)', border: '1px solid #333' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-orange)' }}>Premium Execution</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>From initial concept to final curtain call, we ensure every detail is flawless. Our standards are non-negotiable.</p>
                    </div>

                    <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--color-bg-elevated)', border: '1px solid #333' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-orange)' }}>Expert Team</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>A dedicated team of veteran planners, designers, and coordinators ready to bring your vision to life.</p>
                    </div>

                    <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', backgroundColor: 'var(--color-bg-elevated)', border: '1px solid #333' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-orange)' }}>Transparent Budgeting</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>No hidden costs. Use our real-time budget estimator to parse your event needs accurately.</p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                <div className="container text-center">
                    <h2 style={{ marginBottom: '1.5rem' }}>Ready to plan your next event?</h2>
                    <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--color-text-muted)' }}>
                        Join hundreds of satisfied clients who have trusted Evox Ventures with their most important moments.
                    </p>
                    <a href="/budget-estimator" className="btn btn-primary">Start Planning Now</a>
                </div>
            </section>
        </>
    );
}
