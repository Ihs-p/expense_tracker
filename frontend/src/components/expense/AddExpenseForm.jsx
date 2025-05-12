import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../inputs/Input';

const AddExpenseForm = ({onAddExpense}) => {
      const [expense, setExpense] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
      });
      
  const handlechange = (key, value) => {

    setExpense({ ...expense, [key]: value });
    
  };
  return (
    <div className="">
    <EmojiPickerPopup
    icon = {expense.icon}
    onSelect = {(selectedIcon)=> handlechange("icon",selectedIcon)}
        />
  <Input
    value={expense.source}
    onChange={({ target }) => handlechange("source", target.value)}
    label="Category"
    placeholder="Rent,Groceries, etc..."
    type="text"
  />

  <Input
    value={expense.amount}
    onChange={({ target }) => handlechange("amount", target.value)}
    label="Amount"
    placeholder=""
    type="number"
  />

  <Input
    value={expense.date}
    onChange={({ target }) => handlechange("date", target.value)}
    label="Date"
    placeholder=""
    type="date"
  />

  <div className="flex justify-end mt-6">
    <button
      type="button"
      className="add-btn add-btn-fill"
      onClick={()=>onAddExpense(expense)}
    >
      Add Expense
    </button>
  </div>
</div>  
  )
}

export default AddExpenseForm