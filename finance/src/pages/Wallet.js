// pages/Wallet.js
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

const Wallet = () => {
  const [balance, setBalance] = useState(null);

  const walletRef = doc(db, "wallet", "main");

  useEffect(() => {
    const fetchBalance = async () => {
      const docSnap = await getDoc(walletRef);
      if (docSnap.exists()) {
        setBalance(docSnap.data().balance);
      } else {
        await setDoc(walletRef, { balance: 0 });
        setBalance(0);
      }
    };
    fetchBalance();
  }, []);

  const handleUpdate = async (amount) => {
    await updateDoc(walletRef, { balance: increment(amount) });
    const docSnap = await getDoc(walletRef);
    setBalance(docSnap.data().balance);
  };

  return (
    <div>
      <h2>Баланс кошелька</h2>
      {balance === null ? <p>Загрузка...</p> : <h3>{balance} USD</h3>}
      <button onClick={() => handleUpdate(100)}>+100</button>
      <button onClick={() => handleUpdate(-100)}>-100</button>
    </div>
  );
};

export default Wallet;
