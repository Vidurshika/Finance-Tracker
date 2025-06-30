import React from 'react';
import CustomerPieChart from '../Charts/CustomerPieChart'; 

const COLORS = [ "#875CF5", "#FF6900", "#007BFF"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => { //receive the fetched props via Home
  const balanceData = [ // an array of objects 
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className='card'> {/* Wraps the entire overview box  */}
      <div className='flex items-center justify-between'> 
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomerPieChart // receives these values as props and passes them to a child component called CustomerPieChart.
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`} 
        colors={COLORS}
        showTextAnchor //enables text inside or near slices
      />
    </div>
  );
};

export default FinanceOverview;
