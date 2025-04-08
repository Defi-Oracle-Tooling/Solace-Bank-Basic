const { Client } = require('pg');
const fs = require('fs');

const conn = new Client({
    host: "solacebank-db.postgres.database.azure.com",
    user: "adminSBG",
    password: process.env.DB_PASSWORD,
    database: "postgres",
    port: 5432,
    ssl: {
        ca: fs.readFileSync("{ca-cert filename}")
    }
});

// Make sure to add error handling for missing environment variables
if (!process.env.DB_PASSWORD) {
    console.error("Database password not found. Set the DB_PASSWORD environment variable.");
}

module.exports = conn;
