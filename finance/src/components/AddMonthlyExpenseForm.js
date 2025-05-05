// components/AddMonthlyExpenseForm.js
import { useState } from "react";

const AddMonthlyExpenseForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onSubmit({ title, amount: Number(amount) });
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddMonthlyExpenseForm;
