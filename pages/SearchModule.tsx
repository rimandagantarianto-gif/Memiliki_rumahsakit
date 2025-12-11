import React, { useState } from 'react';
import { Search, Database, User } from 'lucide-react';
import { searchMockFHIRData } from '../services/geminiService';
import { Patient } from '../types';

// Mock FHIR-like data resources
const MOCK_PATIENTS: Patient[] = [
  {
    id: "P-1001",
    name: "John Smith",
    dob: "1980-05-15",
    gender: "Male",
    condition: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Metformin", "Lisinopril"],
    lastVisit: "2023-10-12"
  },
  {
    id: "P-1002",
    name: "Emily Chen",
    dob: "1992-11-20",
    gender: "Female",
    condition: ["Asthma"],
    medications: ["Albuterol Inhaler"],
    lastVisit: "2024-01-05"
  },
  {
    id: "P-1003",
    name: "Michael Johnson",
    dob: "1955-03-30",
    gender: "Male",
    condition: ["Coronary Artery Disease", "Hyperlipidemia"],
    medications: ["Atorvastatin", "Aspirin"],
    lastVisit: "2023-12-20"
  },
  {
    id: "P-1004",
    name: "Sarah Williams",
    dob: "1988-07-08",
    gender: "Female",
    condition: ["Migraine"],
    medications: ["Sumatriptan"],
    lastVisit: "2024-02-15"
  }
];

const SearchModule: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    // Simulate searching a FHIR database by feeding the JSON context to Gemini
    const result = await searchMockFHIRData(query, JSON.stringify(MOCK_PATIENTS));
    setResults(result);
    setSearching(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Database className="text-purple-600" />
          FHIR Data Search
        </h2>
        <p className="text-slate-500">Natural language query interface for patient records (SATUSEHAT Standard).</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'Show me all male patients with Diabetes' or 'List medications for Emily Chen'"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-md ring-1 ring-slate-200 focus:ring-2 focus:ring-purple-500 text-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <button
              type="submit"
              disabled={searching || !query}
              className="absolute right-2 top-2 bottom-2 bg-purple-600 text-white px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        <div className="p-6 min-h-[300px]">
           {results ? (
             <div className="max-w-3xl mx-auto">
               <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Query Results</h3>
               <div className="prose prose-purple max-w-none bg-slate-50 p-6 rounded-lg border border-slate-100">
                 <div className="whitespace-pre-line text-slate-800">{results}</div>
               </div>
             </div>
           ) : (
             <div className="text-center py-12">
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-purple-300 h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">Patient Database Ready</h3>
                <p className="text-slate-500 max-w-md mx-auto mt-2">
                  This module simulates a Vector Search over FHIR Resources. Try asking complex questions about patient demographics, conditions, or medications.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Patient ID</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">Condition</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">MedicationRequest</span>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SearchModule;
