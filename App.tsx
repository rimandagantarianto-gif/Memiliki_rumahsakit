import React, { useState } from 'react';
import { LayoutDashboard, Stethoscope, Database, Activity, Menu, X, ShieldCheck } from 'lucide-react';
import ClinicalModule from './pages/ClinicalModule';
import OperationalModule from './pages/OperationalModule';
import SearchModule from './pages/SearchModule';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.CLINICAL);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.CLINICAL:
        return <ClinicalModule />;
      case ModuleType.OPERATIONAL:
        return <OperationalModule />;
      case ModuleType.SEARCH:
        return <SearchModule />;
      default:
        return <ClinicalModule />;
    }
  };

  const NavItem = ({ module, icon: Icon, label }: { module: ModuleType; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveModule(module);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeModule === module
          ? 'bg-teal-50 text-teal-700 font-semibold shadow-sm border border-teal-100'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <div className="bg-teal-600 p-1.5 rounded-md">
            <Activity className="text-white h-5 w-5" />
          </div>
          <span>SCHOA</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-10 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-200 hidden md:flex items-center gap-2 font-bold text-slate-800 text-xl">
          <div className="bg-teal-600 p-1.5 rounded-md">
            <Activity className="text-white h-6 w-6" />
          </div>
          <span>SCHOA</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem module={ModuleType.CLINICAL} icon={Stethoscope} label="Clinical Assistant" />
          <NavItem module={ModuleType.OPERATIONAL} icon={LayoutDashboard} label="Operations" />
          <NavItem module={ModuleType.SEARCH} icon={Database} label="Data Search" />
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-full">
              <ShieldCheck className="text-teal-600 h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Dr. Sarah Smith</p>
              <p className="text-xs text-slate-500">Cardiology Dept.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default App;