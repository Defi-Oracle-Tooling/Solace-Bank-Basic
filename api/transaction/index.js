const { Pool } = require('pg');
const pool = new Pool(); // Uses environment variables for connection

module.exports = async function (context, req) {
    const { type, accountId, amount } = req.body;

    if (!type || !accountId || !amount) {
        context.res = {
            status: 400,
            body: 'Transaction type, account ID, and amount are required.'
        };
        return;
    }

    try {
        let query;
        if (type === 'credit') {
            query = 'UPDATE accounts SET balance = balance + $1 WHERE id = $2';
        } else if (type === 'debit') {
            query = 'UPDATE accounts SET balance = balance - $1 WHERE id = $2';
        } else {
            context.res = {
                status: 400,
                body: 'Invalid transaction type.'
            };
            return;
        }

        await pool.query(query, [amount, accountId]);
        context.res = {
            status: 200,
            body: 'Transaction successful.'
        };
    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: 'An error occurred during the transaction.'
        };
    }
};