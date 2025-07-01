import React, { useEffect, useState } from 'react';
import CustomerPieChart from '../Charts/CustomerPieChart';

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const COLORS = [ '#007BFF','#FF6900','#875CF5'];
  const [chartData, setChartData] = useState([]);

  useEffect(() => {  //Converts income data into chart format
    const prepareChartData = () => {
      const dataArr = data?.map((item) => ({
        name: item?.source,
        amount: item?.amount,
      }));
      setChartData(dataArr || []);
    };

    prepareChartData();
  }, [data]); //This useEffect runs every time data changes

  return (
    <div className='card p-4 bg-white rounded-xl shadow-md border border-gray-100'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold text-gray-800'>
          Last 60 Days Income
        </h5>
      </div>

      {chartData.length > 0 ? (
        <CustomerPieChart
          data={chartData}
          label='Total Income'
          totalAmount={`$${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      ) : (
        <p className='text-sm text-gray-500 italic text-center py-10'>
          No income data available.
        </p>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
