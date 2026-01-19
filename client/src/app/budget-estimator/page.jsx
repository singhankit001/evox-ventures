import BudgetEstimator from '@/components/calculator/BudgetEstimator';

export default function BudgetEstimatorPage() {
    return (
        <div className="section container">
            <h1 className="text-center" style={{ marginBottom: '1rem' }}>Event Budget Estimator</h1>
            <p className="text-center" style={{ marginBottom: '3rem', color: 'var(--color-text-secondary)' }}>
                Get a rough estimate for your upcoming event. Note that final pricing may vary based on specific requirements.
            </p>
            <BudgetEstimator />
        </div>
    );
}
