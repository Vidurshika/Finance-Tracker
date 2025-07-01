import React, { useState } from 'react';
import Input from '../input/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  // input fields and send them as an input object
  return (
    <div>

      <EmojiPickerPopup // display the emoji
        icon={income.icon} //add to income object
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}//When the emoji picker gives me a selected emoji, call handleChange, and tell it to update the icon field with the selected emoji
                                    // handleChange requests a key and its value
      />
      {/* icon and onselect are props */}

      <Input
        value={income.source}
        onChange={({ target }) => handleChange('source', target.value)}
        label="Income Source"
        placeholder="Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date" //type="date" is used, the browser renders a native date picker (calendar) UI
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-bt-fill"
          onClick={() => onAddIncome(income)} // send the income obj to income component
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
