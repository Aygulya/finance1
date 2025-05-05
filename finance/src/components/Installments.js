// pages/Installments.js
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import AddInstallmentForm from "../components/AddInstallmentForm";

const Installments = () => {
  const [installments, setInstallments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "installments"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstallments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async ({ title, amount, currency }) => {
    try {
      await addDoc(collection(db, "installments"), {
        title,
        amount,
        currency,
        createdAt: new Date(),
      });
      alert("Рассрочка добавлена!");
    } catch (error) {
      console.error("Ошибка добавления:", error);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Рассрочки</h2>
      <AddInstallmentForm onSubmit={handleAdd} />

      {installments.length === 0 ? (
        <p>Нет рассрочек</p>
      ) : (
        installments.map(inst => (
          <div key={inst.id} style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}>
            <p><strong>{inst.title}</strong></p>
            <p>{inst.amount} {inst.currency}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Installments;
