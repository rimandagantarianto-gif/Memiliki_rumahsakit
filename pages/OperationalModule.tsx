import React, { useState } from 'react';
import { BadgeDollarSign, TrendingUp, Users, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FinancialRecord, PayrollEntry } from '../types';
import { generateTextResponse } from '../services/geminiService';

const MOCK_FINANCIAL_DATA: FinancialRecord[] = [
  { month: 'Jan', revenue: 450000, expenses: 320000, payroll: 150000, profit: 130000 },
  { month: 'Feb', revenue: 420000, expenses: 310000, payroll: 150000, profit: 110000 },
  { month: 'Mar', revenue: 480000, expenses: 350000, payroll: 155000, profit: 130000 },
  { month: 'Apr', revenue: 510000, expenses: 340000, payroll: 155000, profit: 170000 },
  { month: 'May', revenue: 490000, expenses: 330000, payroll: 155000, profit: 160000 },
  { month: 'Jun', revenue: 550000, expenses: 360000, payroll: 160000, profit: 190000 },
];

const MOCK_PAYROLL: PayrollEntry[] = [
  { id: 'EMP001', name: 'Dr. Sarah Smith', role: 'Cardiologist', baseSalary: 15000, deductions: 2000, netPay: 13000, status: 'Processed' },
  { id: 'EMP002', name: 'Nurse John Doe', role: 'Head Nurse', baseSalary: 6000, deductions: 800, netPay: 5200, status: 'Pending' },
  { id: 'EMP003', name: 'Admin Jane Roe', role: 'Receptionist', baseSalary: 3500, deductions: 400, netPay: 3100, status: 'Processed' },
];

const OperationalModule: React.FC = () => {
  const [analysis, setAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyzeFinance = async () => {
    setAnalyzing(true);
    const dataString = JSON.stringify(MOCK_FINANCIAL_DATA);
    const prompt = `Analyze the following hospital financial data (Revenue vs Expenses vs Profit) for the first half of the year. Identify trends, potential areas for cost-saving, and overall financial health.\n\nData: ${dataString}`;
    
    const result = await generateTextResponse(prompt, "You are a Chief Financial Officer assistant for a hospital.");
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BadgeDollarSign className="text-blue-600" />
          Operational & Financial Management
        </h2>
        <p className="text-slate-500">Real-time SIMRS insights, automated payroll, and financial forecasting.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
              <TrendingUp size={20} /> Revenue Cycle
            </h3>
            <button 
              onClick={handleAnalyzeFinance}
              disabled={analyzing}
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-100 transition flex items-center gap-1"
            >
              <BrainCircuit size={14} />
              {analyzing ? 'Analyzing...' : 'AI Insight'}
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FINANCIAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {analysis && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-slate-700 border border-blue-100 animate-fadeIn">
              <strong>AI CFO Analysis:</strong>
              <div className="mt-2 whitespace-pre-line">{analysis}</div>
            </div>
          )}
        </div>

        {/* Payroll System */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 mb-6">
            <Users size={20} /> Payroll Automation (SIA)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Base</th>
                  <th className="px-4 py-3 text-right">Net Pay</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PAYROLL.map((entry) => (
                  <tr key={entry.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{entry.name}</td>
                    <td className="px-4 py-3 text-slate-500">{entry.role}</td>
                    <td className="px-4 py-3 text-right font-mono">${entry.baseSalary.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-700">${entry.netPay.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        entry.status === 'Processed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
             <button className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition">
                Process Pending Batch
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalModule;
