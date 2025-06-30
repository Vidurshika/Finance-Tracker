import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>
        <button className='card-btn' onClick={onSeeMore}>
          View All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {hasTransactions ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              data={moment(expense.date).format('Do MM YYYY')}
              amount={expense.amount}
              type='expense'
              hideDeleteBtn
            />
          ))
        ) : (
          <p className='text-sm text-gray-400 text-center py-4'>
            No expense transactions in the last 30 days.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
