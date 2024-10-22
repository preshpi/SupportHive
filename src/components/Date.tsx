import React, { useState } from 'react';

const DateFilter: React.FC<{ onFilterChange: (value: string) => void }> = ({ onFilterChange }) => {
  const [selected, setSelected] = useState('Last 7 Days');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onFilterChange(e.target.value);  
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={selected}
        onChange={handleChange}
        className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="Last 7 Days">Last 7 Days</option>
        <option value="Last 30 Days">Last 30 Days</option>
        <option value="This Month">This Month</option>
        <option value="This Year">This Year</option>
      </select>
    </div>
  );
};

export default DateFilter;
