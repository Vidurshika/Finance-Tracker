import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result || []);
  }, [transactions]);

  return (
    <div className='card p-4 bg-white rounded-xl shadow-md border border-gray-100'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg font-semibold text-gray-800'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Analyze & Track Your Income
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>

      <div className='mt-10'>
        {chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <p className='text-sm text-gray-400 text-center'>
            No income data to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
