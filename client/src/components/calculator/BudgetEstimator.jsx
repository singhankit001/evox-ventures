"use client";

import { useState } from 'react';

const BudgetEstimator = () => {
    const [eventType, setEventType] = useState('corporate');
    const [guestCount, setGuestCount] = useState(100);
    const [budget, setBudget] = useState(null);

    const calculateBudget = () => {
        let baseCost = 0;
        switch (eventType) {
            case 'corporate':
                baseCost = 50; // Per head
                break;
            case 'wedding':
                baseCost = 100;
                break;
            case 'social':
                baseCost = 40;
                break;
            default:
                baseCost = 50;
        }

        const estimatedTotal = baseCost * guestCount;
        // improved logic can be added later
        setBudget(estimatedTotal);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--color-bg-elevated)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Event Type</label>
                <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #333', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)' }}
                >
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="social">Social Gathering</option>
                </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Guest Count: {guestCount}</label>
                <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    style={{ width: '100%' }}
                />
            </div>

            <button onClick={calculateBudget} className="btn btn-primary" style={{ width: '100%' }}>
                Calculate Estimate
            </button>

            {budget !== null && (
                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--color-primary-blue)' }}>Estimated Cost</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent-orange)' }}>
                        ${budget.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>*This is an approximation.</p>
                </div>
            )}
        </div>
    );
};

export default BudgetEstimator;
