import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment'; //date formatting
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>
        <button className='card-btn' onClick={onSeeMore}>{/* onSeeMore func is in Home */}
          View All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => ( //slice(0, 5) → Limits to showing only the latest 5 transactions.
          <TransactionInfoCard // followings are the keys of an object array in DB ,send in the response of backend
            key={item._id}  
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format('Do MMM YYYY')}
            amount={item.amount}
            type={item.type} 
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
