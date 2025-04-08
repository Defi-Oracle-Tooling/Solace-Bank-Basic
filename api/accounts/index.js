const { Pool } = require('pg');
const pool = new Pool(); // Uses environment variables for connection

module.exports = async function (context, req) {
    const { userId } = req.query;

    if (!userId) {
        context.res = {
            status: 400,
            body: 'User ID is required.'
        };
        return;
    }

    try {
        const result = await pool.query('SELECT * FROM accounts WHERE user_id = $1', [userId]);
        context.res = {
            status: 200,
            body: result.rows
        };
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: 'An error occurred while retrieving accounts.'
        };
    }
};