import React from 'react'; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomBarChart = ({ data }) => {

  //alternate the bar colors
  const getBarColor = (index) => (index % 2 === 0 ? '#007BFF' : '#875CF5');

  const RenderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-md p-3 border border-gray-200'>
          <p className='text-sm font-semibold text-blue-600 mb-1'>
            {payload[0].payload.category}
          </p>
          <p className='text-sm text-gray-700'>
            Amount:{' '}
            <span className='font-semibold text-gray-900'>
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 mt-6'>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f0f0f0' />

          <XAxis dataKey='month' tick={{ fontSize: 12, fill: '#3b82f6' }} axisLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#3b82f6' }} axisLine={false} />

          <Tooltip content={<RenderTooltip />} />

          <Bar dataKey='amount' radius={[6, 6, 0, 0]}> {/* 	Adds individual colors to bars */}
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;

