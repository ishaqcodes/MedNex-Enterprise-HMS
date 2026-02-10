import React, { useState } from 'react';
import { Save, ClipboardList } from 'lucide-react';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("JSONB Output for Database:", formData);
    alert("Patient Admission Successful! Record stored in Encrypted JSONB.");
  };

  const fields = ["Full Name", "Date of Birth", "Blood Group", "Insurance Provider", "Emergency Contact"];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-8 mt-8 space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="bg-blue-100 p-2 text-blue-600 rounded-lg"><ClipboardList size={20}/></div>
        <div>
          <h3 className="font-bold text-slate-800">New Patient Admission</h3>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">EMR v4.2 | HL7 Compliant</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(field => (
          <div key={field}>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{field}</label>
            <input 
              type="text" 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
              required
            />
          </div>
        ))}
      </div>

      <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-10 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100">
        <Save size={18} /> Complete Admission
      </button>
    </form>
  );
};

export default AdmissionForm;