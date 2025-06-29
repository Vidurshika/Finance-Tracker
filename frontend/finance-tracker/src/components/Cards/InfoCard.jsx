import React from 'react';

const InfoCard = ({ icon, label, value, color }) => { // icon, a label, and a value, styled in a card format ; placed in Home
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      
      <div className={`w-16 h-16 flex items-center justify-center text-2xl text-white ${color} rounded-full shadow`}>
        {icon}
      </div>

      <div className="text-center sm:text-left">
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-xl font-semibold text-gray-800">${value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
