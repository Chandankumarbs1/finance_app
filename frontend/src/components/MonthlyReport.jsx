import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const MonthlyReport = ({ report }) => {
    if (!report) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-green-500">
                <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Income</p>
                    <p className="text-2xl font-bold text-gray-900">₹{report.income.toFixed(2)}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-red-500">
                <div className="bg-red-100 p-3 rounded-full">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Expense</p>
                    <p className="text-2xl font-bold text-gray-900">₹{report.expense.toFixed(2)}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-blue-500">
                <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="text-2xl font-bold text-gray-900">₹{report.balance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default MonthlyReport;
