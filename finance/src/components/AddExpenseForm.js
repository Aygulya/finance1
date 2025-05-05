// components/AddExpenseForm.js
import { useState } from "react";

const AddExpenseForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GEL");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onSubmit({ title, amount, currency });
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название расхода"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="GEL">GEL</option>
        <option value="USD">USD</option>
      </select>
      <button type="submit">Добавить расход</button>
    </form>
  );
};

export default AddExpenseForm;
