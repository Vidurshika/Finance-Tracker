import React from 'react';

const CustomTooltip = ({ active, payload }) => {

  if (active && payload && payload.length) {
    /* When hover over a pie slice, Recharts sends a payload array with information about that slice.
       For a pie chart, hovering happens over only one slice at a time. so arrays contains only 1 element , so [0] */

    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-xs font-semibold text-blue-500 mb-1'>
          {payload[0].name} {/* gets the name from the first item in the payload array */}
        </p>
        <p className='text-sm text-gray-600'>
          Amount:{' '}
          <span className='text-sm font-medium text-gray-900'>
            ${payload[0].value}
          </span>
        </p>
      </div>
    );

  }
  return null;
};

export default CustomTooltip;

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