import React from 'react';
import { format } from 'date-fns';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const TransactionList = ({ transactions }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
                {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center">No transactions yet.</p>
                ) : (
                    transactions.map((t) => (
                        <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                {t.type === 'CREDIT' ? (
                                    <ArrowUpCircle className="w-8 h-8 text-green-500" />
                                ) : (
                                    <ArrowDownCircle className="w-8 h-8 text-red-500" />
                                )}
                                <div>
                                    <p className="font-medium text-gray-900">{t.description}</p>
                                    <p className="text-sm text-gray-500">{format(new Date(t.date), 'MMM dd, yyyy')}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${t.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                                {t.type === 'CREDIT' ? '+' : '-'}₹{t.amount.toFixed(2)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TransactionList;
