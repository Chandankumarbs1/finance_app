import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import MonthlyReport from './components/MonthlyReport';
import SpendChart from './components/SpendChart';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Wallet, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [report, setReport] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const { user, logout } = useAuth();

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
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Finance Tracker</span>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Welcome, {user?.username}</span>
              <button onClick={logout} className="flex items-center text-gray-600 hover:text-red-600">
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
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
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
