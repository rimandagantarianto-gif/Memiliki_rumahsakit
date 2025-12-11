import React, { useState } from 'react';
import { FileText, Activity, Stethoscope, Image as ImageIcon, Sparkles } from 'lucide-react';
import { generateTextResponse, analyzeMedicalImage } from '../services/geminiService';
import { Disclaimer } from '../components/Disclaimer';

const ClinicalModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'symptom' | 'image'>('notes');
  const [rawNotes, setRawNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Image analysis state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState('');

  // Symptom checker state
  const [symptoms, setSymptoms] = useState('');
  const [diagnosisDraft, setDiagnosisDraft] = useState('');

  const handleSummarize = async () => {
    if (!rawNotes) return;
    setLoading(true);
    const prompt = `Please summarize the following raw clinical notes into a professional "After Visit Summary" format. Extract key vitals, diagnosis mentions, and action items.\n\nRaw Notes:\n${rawNotes}`;
    const result = await generateTextResponse(prompt, "You are an expert medical scribe assistant.");
    setSummary(result);
    setLoading(false);
  };

  const handleSymptomCheck = async () => {
    if (!symptoms) return;
    setLoading(true);
    const prompt = `Analyze the following symptoms and patient description. Provide a list of potential differential diagnoses to consider and recommended next steps (labs/imaging). \n\nSymptoms: ${symptoms}`;
    const result = await generateTextResponse(prompt, "You are a clinical decision support system. Be concise and prioritize high-risk conditions.");
    setDiagnosisDraft(result);
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setImageAnalysis(''); // Reset previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) return;
    setLoading(true);
    // Extract base64 part
    const base64Data = selectedImage.split(',')[1];
    const mimeType = selectedImage.split(';')[0].split(':')[1];
    
    const result = await analyzeMedicalImage(
      base64Data, 
      mimeType, 
      "Describe this medical image. Identify any potential anomalies or key structures visible. Provide a description suitable for a radiologist's preliminary review."
    );
    setImageAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Stethoscope className="text-teal-600" />
          Clinical Assistant
        </h2>
        <p className="text-slate-500">AI-powered documentation and decision support.</p>
      </header>

      <Disclaimer />

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button 
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'notes' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <div className="flex items-center gap-2"><FileText size={16} /> Note Summarizer</div>
        </button>
        <button 
          onClick={() => setActiveTab('symptom')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'symptom' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <div className="flex items-center gap-2"><Activity size={16} /> Symptom Analysis</div>
        </button>
        <button 
          onClick={() => setActiveTab('image')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'image' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          <div className="flex items-center gap-2"><ImageIcon size={16} /> Image Analysis</div>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Raw Consultation Notes</label>
              <textarea 
                className="w-full h-80 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none font-mono text-sm"
                placeholder="Paste rough dictation or notes here...&#10;e.g., Pt 45yo M c/o chest pain..."
                value={rawNotes}
                onChange={(e) => setRawNotes(e.target.value)}
              />
              <button 
                onClick={handleSummarize}
                disabled={loading || !rawNotes}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : <><Sparkles size={18} /> Generate Summary</>}
              </button>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">AI Generated Summary (Draft)</label>
              <div className="w-full h-80 p-4 rounded-lg bg-slate-50 border border-slate-200 overflow-y-auto prose prose-sm max-w-none">
                {summary ? (
                  <div className="whitespace-pre-line text-slate-800">{summary}</div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <FileText size={48} className="mb-2 opacity-20" />
                    <p>Generated summary will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'symptom' && (
           <div className="max-w-3xl mx-auto space-y-6">
             <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700">Patient Symptoms & History</label>
               <textarea 
                 className="w-full h-32 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500"
                 placeholder="Describe symptoms, duration, severity, and relevant history..."
                 value={symptoms}
                 onChange={(e) => setSymptoms(e.target.value)}
               />
               <button 
                onClick={handleSymptomCheck}
                disabled={loading || !symptoms}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : <><Activity size={18} /> Run Differential Diagnosis</>}
              </button>
             </div>

             {diagnosisDraft && (
               <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
                 <h3 className="text-lg font-semibold text-indigo-900 mb-3">Analysis Result</h3>
                 <div className="whitespace-pre-line text-slate-800 leading-relaxed">
                   {diagnosisDraft}
                 </div>
               </div>
             )}
           </div>
        )}

        {activeTab === 'image' && (
          <div className="max-w-3xl mx-auto">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50">
              {!selectedImage ? (
                <div className="space-y-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => { setSelectedImage(null); setImageAnalysis(''); }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={handleAnalyzeImage}
                      disabled={loading}
                      className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 disabled:opacity-50"
                    >
                      {loading ? 'Analyzing Image...' : 'Analyze with Gemini'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {imageAnalysis && (
              <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Imaging Report Draft</h3>
                <p className="whitespace-pre-line text-slate-700">{imageAnalysis}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalModule;
