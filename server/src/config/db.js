const mongoose = require('mongoose');
const { Pool } = require('pg');

const connectDB = async () => {
    try {
        // Connect to MongoDB
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('MongoDB Connected');
        } else {
            console.log('MONGODB_URI not provided, skipping MongoDB connection (running in development/mock mode usually okay)');
        }

        // Connect to PostgreSQL
        if (process.env.POSTGRES_URI) {
            console.log('PostgreSQL Configuration Found');
        }

    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// PostgreSQL pool export for use in models
const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

module.exports = { connectDB, pool };
