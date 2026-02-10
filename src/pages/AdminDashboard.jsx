import React, { useState } from 'react';
import { Users, Building2, Plus, Edit, Trash2, Package, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Arvind", role: "Doctor", dept: "Cardiology", status: "Active" },
    { id: 2, name: "Nurse Priya", role: "Nurse", dept: "Emergency", status: "On Leave" },
  ]);

  const addStaff = () => {
    const name = prompt("Enter Staff Name:");
    if (name) {
      setStaff([...staff, { id: Date.now(), name, role: "New Hire", dept: "General", status: "Active" }]);
    }
  };

  const deleteStaff = (id) => {
    if (window.confirm("Delete this staff record from Tenant Schema?")) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Control</h1>
          <p className="text-sm text-slate-500">Tenant: MedNex-Enterprise-Node-01</p>
        </div>
        <button onClick={addStaff} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100">
          <Plus size={20} /> Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Users /></div>
          <div><p className="text-gray-500 text-sm font-medium">Total Staff</p><p className="text-2xl font-bold text-slate-800">{staff.length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl"><TrendingUp /></div>
          <div><p className="text-gray-500 text-sm font-medium">Daily Ops</p><p className="text-2xl font-bold text-slate-800">84%</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><Package /></div>
          <div><p className="text-gray-500 text-sm font-medium">Inventory</p><p className="text-2xl font-bold text-slate-800">Stable</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Staff Member</th>
              <th className="p-4">Department</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <p className="font-bold text-slate-800">{member.name}</p>
                  <p className="text-xs text-slate-400">{member.role}</p>
                </td>
                <td className="p-4 text-sm text-slate-600">{member.dept}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
                    <button onClick={() => deleteStaff(member.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;