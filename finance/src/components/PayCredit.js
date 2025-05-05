import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateWallet } from "../utils/updateWallet";

const PayCredit = ({ credit }) => {
  const [payment, setPayment] = useState("");

  const handlePay = async () => {
    const paymentAmount = Number(payment);
    if (!paymentAmount || paymentAmount <= 0) return alert("Введите сумму");

    const rate = credit.rate || 0;
    const interest = paymentAmount * (rate / 100);
    const principal = paymentAmount - interest;

    const newRemaining = credit.convertedAmount - principal;

    try {
      const creditRef = doc(db, "credits", credit.id);
      await updateDoc(creditRef, {
        convertedAmount: newRemaining < 0 ? 0 : newRemaining,
      });

      await updateWallet(-paymentAmount); // Уменьшаем баланс

      alert(`Оплата проведена. Процент: ${interest.toFixed(2)}, Основной долг: ${principal.toFixed(2)}`);
      setPayment("");
    } catch (error) {
      console.error("Ошибка оплаты кредита:", error);
    }
  };

  return (
    <div style={{ marginTop: "1rem", border: "1px dashed gray", padding: "1rem" }}>
      <h4>{credit.title}</h4>
      <p>Остаток: {credit.convertedAmount} {credit.currency}</p>
      <input
        type="number"
        placeholder="Сумма оплаты"
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      />
      <button onClick={handlePay}>Оплатить кредит</button>
    </div>
  );
};

export default PayCredit;
