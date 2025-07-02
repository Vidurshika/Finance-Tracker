import React from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {

  if (!isOpen) return null; //not opened then go back

  return (
    <div className="fixed inset-0 z-199 flex items-center justify-center bg-black/40 backdrop-blur-sm mt-10 ">
      <div className=" income-modal relative w-full mx-4 sm:mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200 rounded-t shrink-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
            <button  /* Close button using an SVG cross icon. */
              type="button"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
              onClick={onClose}
            >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 14 14"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l12 12M13 1L1 13"
                            />
                    </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 pb-8 space-y-4 overflow-y-auto max-h-[70vh]"> {/* scrollable */}
            {children} {/* child = AddIncomeForm */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
