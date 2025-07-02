import React, { useState } from 'react';
import Input from "../input/Input";
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div>

      <EmojiPickerPopup       // display the emoji
        icon={expense.icon}   //add to object
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}//When the emoji picker gives me a selected emoji, call handleChange, and tell it to update the icon field with the selected emoji
                                    // handleChange requests a key and its value
      />
      {/* icon and onselect are props */}

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="Expense Category"
        placeholder="Foods,Medicine, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date" //type="date" is used, the browser renders a native date picker (calendar) UI
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-bt-fill"
          onClick={() => onAddExpense(expense)} 
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm