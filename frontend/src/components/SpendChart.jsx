import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SpendChart = ({ transactions }) => {
    const data = [
        { name: 'Income', value: 0, color: '#22c55e' }, // green-500
        { name: 'Expense', value: 0, color: '#ef4444' }, // red-500
    ];

    transactions.forEach(t => {
        if (t.type === 'CREDIT') {
            data[0].value += t.amount;
        } else {
            data[1].value += t.amount;
        }
    });

    // If no data, don't render chart
    if (data[0].value === 0 && data[1].value === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-64">
                <p className="text-gray-500">No data to display</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendChart;
