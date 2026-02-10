// src/pages/DoctorDashboard.jsx
import { ClipboardList, Search, Printer } from 'lucide-react';

const DoctorDashboard = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
      <h2 className="text-xl font-bold flex items-center gap-2"><Search size={20}/> Patient EMR Search</h2>
      <input type="text" placeholder="Search by Patient ID or Name..." className="w-full mt-4 p-3 border rounded-lg bg-gray-50" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Prescription Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="font-bold mb-4">Prescription Form (HL7/FHIR Compliant)</h3>
        <div className="space-y-3">
          <input type="text" placeholder="Diagnosis" className="w-full p-2 border rounded" />
          <textarea placeholder="Medication Details (JSONB Format)" className="w-full p-2 border rounded h-32"></textarea>
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Printer size={18}/> Print Prescription
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default DoctorDashboard;