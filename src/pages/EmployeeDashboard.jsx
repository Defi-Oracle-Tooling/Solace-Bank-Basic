import React, { useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('credit');

    const handleTransaction = async () => {
        try {
            await axios.post('/api/transaction', {
                type: transactionType,
                accountId,
                amount: parseFloat(amount)
            });
            alert('Transaction successful!');
        } catch (error) {
            console.error('Error processing transaction:', error);
            alert('Transaction failed.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <div className="mt-4">
                <label className="block">Account ID:</label>
                <input
                    type="text"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="border p-2 w-full"
                />
                <label className="block mt-4">Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 w-full"
                />
                <label className="block mt-4">Transaction Type:</label>
                <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <button
                    onClick={handleTransaction}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Submit Transaction
                </button>
            </div>
        </div>
    );
};

export default EmployeeDashboard;