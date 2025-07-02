import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expense Category</h5>

        <button className='card-btn' onClick={onDownload}> {/* Download action triggered here and call onDownload again */}
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((expense) => ( //send one by one
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)} //calls the onDelete function from expList, passing the exp._id
            //When the delete button is clicked inside card, call the parent’s onDelete function and pass it this exp’s _id
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
