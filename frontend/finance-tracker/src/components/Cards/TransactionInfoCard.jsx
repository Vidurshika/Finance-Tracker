import React from 'react';
import {
  LuWallet,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash,
} from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  // Return the correct bg style for income or expense
  const getAmountStyles = () =>
    type === 'income'
      ? 'bg-green-50 text-green-500'
      : 'bg-red-50 text-red-500';

  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 transition'>
      {/* Icon Section */}
      <div className='w-12 h-12 flex items-center justify-center text-xl text-blue-500 bg-purple-50 rounded-full shadow-sm'>
        {icon ? (
          <img src={icon} alt='' className='w-6 h-6 object-contain' />
        ) : (
          <LuWallet />
        )}
      </div>

      {/* Info Section */}
      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-semibold'>{title}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2'>
          {/* Delete Button (visible on hover) */}
          {!hideDeleteBtn && ( //Only show the delete button if hideDeleteBtn is false or not provided.
            <button
              className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 z-10 transition-opacity cursor-pointer'
              onClick={onDelete}
            >
              <LuTrash size={18} />
            </button>
          )}

          {/* Amount Display */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className='text-sm font-semibold'>
              {type === 'income' ? '+' : '-'} ${amount}
            </h6>
            {type === 'income' ? (
              <LuTrendingUp className='text-green-500' />
            ) : (
              <LuTrendingDown className='text-red-500' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
