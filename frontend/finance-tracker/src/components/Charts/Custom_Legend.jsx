import React from 'react';

const Custom_Legend = ({ payload }) => {  //passed automatically by Recharts.an array of objects;each entry has color and represented value

  if (!payload || payload.length === 0) return null;

  return (
    <div className='flex flex-wrap justify-center gap-3 mt-4 space-x-6'>
      {payload.map((entry, index) => (
        <div key={`Legend-${index}`} className='flex items-center space-x-2'>
          <div
            className='w-2.5 h-2.5 rounded-full'
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className='text-xs text-gray-700 font-medium'>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

};

export default Custom_Legend;

/* payload looks like

[
  {
    value: "Total Balance",   // name from `nameKey`
    color: "#875CF5",         // from the <Cell fill=...>
    type: "square",           // legend icon shape (default is square)
    payload: { name: "Total Balance", amount: 1000 } // original data
  },
  {
    value: "Total Expense",
    color: "#FF6900",
    type: "square",
    payload: { name: "Total Expense", amount: 400 }
  },
  {
    value: "Total Income",
    color: "#007BFF",
    type: "square",
    payload: { name: "Total Income", amount: 600 }
  }
]

*/