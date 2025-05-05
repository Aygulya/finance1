import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export const updateWallet = async (delta) => {
  const walletRef = doc(db, "wallet", "main");

  try {
    await updateDoc(walletRef, {
      balance: increment(delta),
      lastUpdated: new Date(),
    });
  } catch (error) {
    console.error("Ошибка при обновлении баланса:", error);
  }
};
