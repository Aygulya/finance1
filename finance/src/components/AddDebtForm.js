// components/AddDebtForm.js
import { useState } from "react";

const AddDebtForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onSubmit({ title, amount: Number(amount), currency });
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название долга"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="GEL">GEL</option>
      </select>
      <button type="submit">Добавить долг</button>
    </form>
  );
};

export default AddDebtForm;
