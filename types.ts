export enum ModuleType {
  CLINICAL = 'CLINICAL',
  OPERATIONAL = 'OPERATIONAL',
  SEARCH = 'SEARCH'
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  condition: string[];
  medications: string[];
  lastVisit: string;
}

export interface FinancialRecord {
  month: string;
  revenue: number;
  expenses: number;
  payroll: number;
  profit: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface PayrollEntry {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  deductions: number;
  netPay: number;
  status: 'Pending' | 'Processed';
}
