import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/ui/button';

const ClientDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/api/accounts?userId=<user-id>');
                setAccounts(response.data);
                const balance = response.data.reduce((sum, account) => sum + account.balance, 0);
                setTotalBalance(balance);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const printProofOfFunds = () => {
        window.print();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Client Dashboard</h1>
            <p className="mt-2">Total Balance: ${totalBalance.toFixed(2)}</p>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Accounts</h2>
                <ul>
                    {accounts.map(account => (
                        <li key={account.id} className="mt-2">
                            Account ID: {account.id}, Balance: ${account.balance.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <Button onClick={printProofOfFunds} className="mt-4">Print Proof of Funds</Button>
        </div>
    );
};

export default ClientDashboard;