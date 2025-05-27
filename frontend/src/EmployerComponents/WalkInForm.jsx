import { useState } from "react";

export default function WalkInForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timingStart, setTimingStart] = useState("10:00 AM");
  const [timingEnd, setTimingEnd] = useState("4:00 PM");
  const [instructions, setInstructions] = useState("");

  return (
    <div className="mt-8 border p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Walk-in Start Date <span className="text-red-500">*</span></label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="w-full border border-gray-300 p-2 rounded mt-1" 
        />
      </div>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Walk-in End Date <span className="text-red-500">*</span></label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="w-full border border-gray-300 p-2 rounded mt-1" 
        />
      </div>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Walk-in Timings <span className="text-red-500">*</span></label>
        <div className="flex gap-2">
          <select 
            value={timingStart} 
            onChange={(e) => setTimingStart(e.target.value)} 
            className="border border-gray-300 p-2 rounded w-1/2">
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
          </select>
          <span className="self-center">-</span>
          <select 
            value={timingEnd} 
            onChange={(e) => setTimingEnd(e.target.value)} 
            className="border border-gray-300 p-2 rounded w-1/2">
            <option>4:00 PM</option>
            <option>5:00 PM</option>
            <option>6:00 PM</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Other Instructions</label>
        <textarea 
          value={instructions} 
          onChange={(e) => setInstructions(e.target.value)} 
          className="w-full border border-gray-300 p-2 rounded mt-1 h-24"
          placeholder="e.g., Bring ID card, CV / Resume etc." 
          maxLength={300}
        />
        <div className="text-right text-gray-500 text-sm">{instructions.length}/300</div>
      </div>
    </div>
  );
}
