import mongoose from 'mongoose';
import { Pool } from 'pg';

/**
 * Database Connection Utility
 * Migrated from internal Express server to Next.js Client Lib
 */
export const connectDB = async () => {
    try {
        // Connect to MongoDB
        if (process.env.MONGODB_URI) {
            if (mongoose.connection.readyState >= 1) return;
            await mongoose.connect(process.env.MONGODB_URI);
        }

        // Connect to PostgreSQL (Pool initialization only here if needed, 
        // generally handled by the pool export below)
        if (process.env.POSTGRES_URI) {
        }

    } catch (error) {
        console.error('Database connection error:', error.message);
    }
};

// PostgreSQL pool export
export const pgPool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});
