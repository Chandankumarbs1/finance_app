import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import MonthlyReport from './components/MonthlyReport';
import SpendChart from './components/SpendChart';
import { Wallet } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState(null);

  const fetchData = async () => {
    try {
      const transactionsRes = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`);
      setTransactions(transactionsRes.data);

      const now = new Date();
      const reportRes = await axios.get(`${import.meta.env.VITE_API_URL}/reports/monthly?year=${now.getFullYear()}&month=${now.getMonth() + 1}`);
      setReport(reportRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Wallet className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Finance Tracker</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <MonthlyReport report={report} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AddTransaction onTransactionAdded={fetchData} />
            <SpendChart transactions={transactions} />
          </div>
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
}

export default App;
