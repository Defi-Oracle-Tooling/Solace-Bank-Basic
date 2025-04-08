const { Client } = require('pg');
const fs = require('fs');

const conn = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.PGPORT, 10),
    ssl: {
        ca: fs.readFileSync("{ca-cert filename}")
    }
});

// Make sure to add error handling for missing environment variables
if (!process.env.PGPASSWORD) {
    console.error("Database password not found. Set the PGPASSWORD environment variable.");
}

module.exports = conn;
