import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700 font-medium">
            AI Governance & Safety Warning
          </p>
          <p className="text-xs text-amber-600 mt-1">
            This system uses Artificial Intelligence (Gemini) to assist with documentation and analysis. 
            <strong>Outputs are NOT medical diagnoses.</strong> All clinical suggestions must be verified by a licensed healthcare professional. 
            Do not input real Patient Health Information (PHI) in this demo environment.
          </p>
        </div>
      </div>
    </div>
  );
};
