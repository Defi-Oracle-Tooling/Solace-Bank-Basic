const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const pool = new Pool(); // Uses environment variables for connection

module.exports = async function (context, req) {
    const { username, password } = req.body;

    if (!username || !password) {
        context.res = {
            status: 400,
            body: 'Username and password are required.'
        };
        return;
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user && bcrypt.compareSync(password, user.password)) {
            context.res = {
                status: 200,
                body: { message: 'Login successful', userId: user.id }
            };
        } else {
            context.res = {
                status: 401,
                body: 'Invalid username or password.'
            };
        }
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: 'An error occurred during login.'
        };
    }
};