import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income Sources</h5>

        <button className='card-btn' onClick={onDownload}> {/* Download action triggered here and call onDownload again */}
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((income) => ( //deletion occurs here
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)} //calls the onDelete function from IncomeList, passing the income._id
            //When the delete button is clicked inside card, call the parent’s onDelete function and pass it this income’s _id
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
