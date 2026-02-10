import React, { useState } from 'react';
import { Bed } from 'lucide-react';

const BedMap = () => {
  const [beds, setBeds] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: `Room-${i + 1}`,
      status: i % 3 === 0 ? "Occupied" : "Available"
    }))
  );

  const toggleBed = (id) => {
    setBeds(beds.map(bed => 
      bed.id === id ? { ...bed, status: bed.status === "Available" ? "Occupied" : "Available" } : bed
    ));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 text-lg">Real-Time Bed Availability</h3>
        <div className="flex gap-4 text-[10px] font-bold uppercase">
          <span className="flex items-center gap-1 text-green-600 font-bold"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Available</span>
          <span className="flex items-center gap-1 text-red-600 font-bold"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Occupied</span>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {beds.map((bed) => (
          <button 
            key={bed.id} 
            onClick={() => toggleBed(bed.id)}
            className={`p-4 rounded-xl border flex flex-col items-center gap-1 transition-all transform active:scale-95 ${
              bed.status === 'Available' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
            }`}
          >
            <Bed size={20} />
            <span className="text-[10px] font-bold">{bed.id}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-slate-400 text-center uppercase">Click a bed to toggle status</p>
    </div>
  );
};

export default BedMap;