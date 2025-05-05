// // // // // // // // // // pages/Home.js
// // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // import { collection, getDocs, onSnapshot } from "firebase/firestore";
// // // // // // // // // import { db } from "../firebase";

// // // // // // // // // const Home = () => {
// // // // // // // // //   const [earnings, setEarnings] = useState([]);
// // // // // // // // //   const [expenses, setExpenses] = useState([]);
// // // // // // // // //   const [credits, setCredits] = useState([]);
// // // // // // // // //   const [debts, setDebts] = useState([]);
// // // // // // // // //   const [walletBalance, setWalletBalance] = useState(0);

// // // // // // // // //   // Получение баланса кошелька
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const fetchBalance = async () => {
// // // // // // // // //       const balanceDoc = await getDocs(collection(db, "wallet"));
// // // // // // // // //       if (!balanceDoc.empty) {
// // // // // // // // //         setWalletBalance(balanceDoc.docs[0].data().balance);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     fetchBalance();
// // // // // // // // //   }, []);

// // // // // // // // //   // Получение всех доходов
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const unsubscribe = onSnapshot(collection(db, "earnings"), (snapshot) => {
// // // // // // // // //       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // // // // //       setEarnings(data);
// // // // // // // // //     });

// // // // // // // // //     return () => unsubscribe();
// // // // // // // // //   }, []);

// // // // // // // // //   // Получение всех расходов
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const unsubscribe = onSnapshot(collection(db, "expenses"), (snapshot) => {
// // // // // // // // //       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // // // // //       setExpenses(data);
// // // // // // // // //     });

// // // // // // // // //     return () => unsubscribe();
// // // // // // // // //   }, []);

// // // // // // // // //   // Получение всех кредитов
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const unsubscribe = onSnapshot(collection(db, "credits"), (snapshot) => {
// // // // // // // // //       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // // // // //       setCredits(data);
// // // // // // // // //     });

// // // // // // // // //     return () => unsubscribe();
// // // // // // // // //   }, []);

// // // // // // // // //   // Получение всех долгов
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const unsubscribe = onSnapshot(collection(db, "debts"), (snapshot) => {
// // // // // // // // //       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // // // // // // // //       setDebts(data);
// // // // // // // // //     });

// // // // // // // // //     return () => unsubscribe();
// // // // // // // // //   }, []);

// // // // // // // // //   // Расчет остатка по каждому из разделов
// // // // // // // // //   const totalEarnings = earnings.reduce((total, entry) => total + (entry.amount || 0), 0);
// // // // // // // // //   const totalExpenses = expenses.reduce((total, entry) => total + (entry.amount || 0), 0);
// // // // // // // // //   const totalCreditsPaid = credits.reduce((total, entry) => total + (entry.amountPaid || 0), 0);
// // // // // // // // //   const totalDebtsPaid = debts.reduce((total, entry) => total + (entry.amountPaid || 0), 0);
  

// // // // // // // // //   const remainingBalance = walletBalance + totalEarnings - totalExpenses - totalCreditsPaid - totalDebtsPaid;

// // // // // // // // //   return (
// // // // // // // // //     <div>
// // // // // // // // //       <h1>Главная страница</h1>
// // // // // // // // //       <div>
// // // // // // // // //         <h2>Баланс кошелька: {walletBalance} USD</h2>
// // // // // // // // //         <h3>Остаток на кошельке: {remainingBalance} USD</h3>
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <h2>Доходы</h2>
// // // // // // // // //         {earnings.length === 0 ? <p>Нет доходов</p> : earnings.map((entry) => (
// // // // // // // // //           <div key={entry.id}>
// // // // // // // // //             <strong>{entry.title}</strong>: {entry.amount} {entry.currency}
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <h2>Расходы</h2>
// // // // // // // // //         {expenses.length === 0 ? <p>Нет расходов</p> : expenses.map((expense) => (
// // // // // // // // //           <div key={expense.id}>
// // // // // // // // //             <strong>{expense.title}</strong>: {expense.amount} {expense.currency}
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <h2>Кредиты</h2>
// // // // // // // // //         {credits.length === 0 ? <p>Нет кредитов</p> : credits.map((credit) => (
// // // // // // // // //           <div key={credit.id}>
// // // // // // // // //             <strong>{credit.title}</strong>: {credit.amount} {credit.currency} — {credit.amountPaid} оплачено
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <h2>Долги</h2>
// // // // // // // // //         {debts.length === 0 ? <p>Нет долгов</p> : debts.map((debt) => (
// // // // // // // // //           <div key={debt.id}>
// // // // // // // // //             <strong>{debt.title}</strong>: {debt.amount} {debt.currency} — {debt.amountPaid} оплачено
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       <div>
// // // // // // // // //         <h2>Ежемесячные расходы</h2>
// // // // // // // // //         {/* Здесь можно отображать также ежемесячные расходы */}
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Home;
// // // // // // // // // pages/Home.js
// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { useFinance } from '../context/FinanceContext';

// // // // // // // // const Home = () => {
// // // // // // // //   const [earnings, setEarnings] = useState([]);
// // // // // // // // const [expenses, setExpenses] = useState([]);
// // // // // // // // const [credits, setCredits] = useState([]);
// // // // // // // // const [debts, setDebts] = useState([]);

// // // // // // // //   const { entries } = useFinance();
// // // // // // // //   const [walletBalance, setWalletBalance] = useState(0);

// // // // // // // //   // Расчет суммы на кошельке на лету
// // // // // // // //   const totalEarnings = earnings.reduce((total, entry) => total + entry.convertedAmount, 0);
// // // // // // // // const totalExpenses = expenses.reduce((total, entry) => total + entry.convertedAmount, 0);
// // // // // // // // const totalCreditsPaid = credits.reduce((total, entry) => total + (entry.amountPaid || 0), 0);
// // // // // // // // const totalDebtsPaid = debts.reduce((total, entry) => total + (entry.amountPaid || 0), 0);

// // // // // // // // const remainingBalance = totalEarnings - totalExpenses - totalCreditsPaid - totalDebtsPaid;

// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <h1>Главная страница</h1>
// // // // // // // //       <div>
// // // // // // // //         <h2>Баланс кошелька: {walletBalance} USD</h2>
// // // // // // // //         <h3>Остаток на кошельке: {remainingBalance} USD</h3>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Home;
// // // // // // // import { useEffect, useState } from 'react';
// // // // // // // import { db } from '../firebase';
// // // // // // // import { collection, getDocs } from 'firebase/firestore';

// // // // // // // const Home = () => {
// // // // // // //   const [earnings, setEarnings] = useState([]);
// // // // // // //   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
// // // // // // //   const [entries, setEntries] = useState([]);
// // // // // // //   const [credits, setCredits] = useState([]);
  

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchData = async () => {
// // // // // // //       const earningsSnap = await getDocs(collection(db, 'earnings'));
// // // // // // //       setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // // //       const expensesSnap = await getDocs(collection(db, 'monthlyExpenses'));
// // // // // // //       setMonthlyExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // // //       const entriesSnap = await getDocs(collection(db, 'entries'));
// // // // // // //       setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // // //       const creditsSnap = await getDocs(collection(db, 'credits'));
// // // // // // //       setCredits(creditsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // // //       const creditDocs = await getDocs(collection(db, 'credits'));
// // // // // // // const creditPayments = [];

// // // // // // // for (const credit of creditDocs.docs) {
// // // // // // //   const paymentsSnap = await getDocs(collection(db, 'credits', credit.id, 'payments'));
// // // // // // //   const paidPayments = paymentsSnap.docs
// // // // // // //     .map(doc => doc.data())
// // // // // // //     .filter(p => p.status === 'paid');

// // // // // // //   creditPayments.push(...paidPayments);
// // // // // // // }

// // // // // // // setCredits(creditPayments);
// // // // // // //     };

// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   const getConverted = (item) => {
// // // // // // //     if (item.convertedAmount !== undefined) return item.convertedAmount;
// // // // // // //     if (item.currency === 'USD') return parseFloat(item.amount);
// // // // // // //     if (item.currency === 'GEL' && item.rate) {
// // // // // // //       return parseFloat(item.amount) / parseFloat(item.rate);
// // // // // // //     }
// // // // // // //     return 0;
// // // // // // //   };

// // // // // // //   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
// // // // // // //   const totalPaidMonthly = monthlyExpenses
// // // // // // //     .filter(e => e.paid)
// // // // // // //     .reduce((sum, e) => sum + getConverted(e), 0);
// // // // // // //   const totalEntries = entries.reduce((sum, e) => sum + getConverted(e), 0);
// // // // // // //   const totalCreditsPaid = credits.reduce(
// // // // // // //     (sum, c) => sum + (c.convertedAmount ? parseFloat(c.convertedAmount) : 0),
// // // // // // //     0
// // // // // // //   );

// // // // // // //   const balance = totalEarnings - totalPaidMonthly - totalEntries - totalCreditsPaid;

// // // // // // //   return (
// // // // // // //     // <div>
// // // // // // //     //   <h1>Финансовая сводка</h1>
// // // // // // //     //   <p><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</p>
// // // // // // //     //   <p><strong>Ежемесячные оплаченные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</p>
// // // // // // //     //   <p><strong>Разовые расходы:</strong> ${totalEntries.toFixed(2)}</p>
// // // // // // //     //   <p><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</p>
// // // // // // //     //   <h2>💰 Текущий баланс: ${balance.toFixed(2)}</h2>
// // // // // // //     // </div>
// // // // // // //     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
// // // // // // //   <h1>Финансовая сводка</h1>
// // // // // // //   <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6em' }}>
// // // // // // //     <li><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</li>
// // // // // // //     <li><strong>Оплаченные ежемесячные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</li>
// // // // // // //     <li><strong>Разовые расходы:</strong> ${totalEntries.toFixed(2)}</li>
// // // // // // //     <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
// // // // // // //   </ul>
// // // // // // //   <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }}>
// // // // // // //     💰 Текущий баланс: ${balance.toFixed(2)}
// // // // // // //   </h2>
// // // // // // // </div>

// // // // // // //   );
// // // // // // // };

// // // // // // // export default Home;
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { collection, getDocs } from "firebase/firestore";
// // // // // // import { db } from "../firebase";
// // // // // // import { notification } from "antd";

// // // // // // const Home = () => {
// // // // // //   const [earnings, setEarnings] = useState([]);
// // // // // //   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
// // // // // //   const [entries, setEntries] = useState([]);
// // // // // //   const [credits, setCredits] = useState([]);
// // // // // //   const [debts, setDebts] = useState([]);
  
// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       const earningsSnap = await getDocs(collection(db, 'earnings'));
// // // // // //       setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // //       const expensesSnap = await getDocs(collection(db, 'monthlyExpenses'));
// // // // // //       setMonthlyExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // //       const entriesSnap = await getDocs(collection(db, 'entries'));
// // // // // //       setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // //       const creditsSnap = await getDocs(collection(db, 'credits'));
// // // // // //       setCredits(creditsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // // //       const debtsSnap = await getDocs(collection(db, 'debts'));
// // // // // //       const debtData = [];
// // // // // //       for (const debtDoc of debtsSnap.docs) {
// // // // // //         const debt = { id: debtDoc.id, ...debtDoc.data() };
// // // // // //         const paymentsSnap = await getDocs(collection(db, 'debts', debtDoc.id, 'payments'));
// // // // // //         const payments = paymentsSnap.docs.map(p => p.data());
// // // // // //         const paidAmount = payments
// // // // // //           .filter(p => p.status === 'paid')
// // // // // //           .reduce((sum, p) => {
// // // // // //             const rate = parseFloat(p.exchangeRate || 1);
// // // // // //             const amt = parseFloat(p.amount || 0);
// // // // // //             return sum + amt / rate;
// // // // // //           }, 0);
        
// // // // // //         debt.paid = paidAmount;
// // // // // //         debtData.push(debt);
// // // // // //       }
// // // // // //       setDebts(debtData);
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, []);

// // // // // //   const getConverted = (item) => {
// // // // // //     if (item.convertedAmount !== undefined) return item.convertedAmount;
// // // // // //     if (item.currency === 'USD') return parseFloat(item.amount);
// // // // // //     if (item.currency === 'GEL' && item.rate) {
// // // // // //       return parseFloat(item.amount) / parseFloat(item.rate);
// // // // // //     }
// // // // // //     return 0;
// // // // // //   };

// // // // // //   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
// // // // // //   const totalPaidMonthly = monthlyExpenses
// // // // // //     .filter(e => e.paid)
// // // // // //     .reduce((sum, e) => sum + getConverted(e), 0);
// // // // // //   const totalEntries = entries.reduce((sum, e) => sum + getConverted(e), 0);
// // // // // //   const totalCreditsPaid = credits.reduce(
// // // // // //     (sum, c) => sum + (c.convertedAmount ? parseFloat(c.convertedAmount) : 0),
// // // // // //     0
// // // // // //   );

// // // // // //   const totalDebtsPaid = debts.reduce(
// // // // // //     (sum, debt) => sum + (debt.paid || 0),
// // // // // //     0
// // // // // //   );

// // // // // //   const totalDebtsRemaining = debts.reduce(
// // // // // //     (sum, debt) => sum + (debt.amount / (debt.exchangeRate || 1) - debt.paid || 0),
// // // // // //     0
// // // // // //   );

// // // // // //   const balance = totalEarnings - totalPaidMonthly - totalEntries - totalCreditsPaid - totalDebtsRemaining;

// // // // // //   return (
// // // // // //     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
// // // // // //       <h1>Финансовая сводка</h1>
// // // // // //       <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6em' }}>
// // // // // //         <li><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</li>
// // // // // //         <li><strong>Ежемесячные оплаченные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</li>
// // // // // //         <li><strong>Разовые расходы:</strong> ${totalEntries.toFixed(2)}</li>
// // // // // //         <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
// // // // // //         <li><strong>Погашенные долги:</strong> ${totalDebtsPaid.toFixed(2)}</li>
// // // // // //         <li><strong>Остаток по долгам:</strong> ${totalDebtsRemaining.toFixed(2)}</li>
// // // // // //       </ul>
// // // // // //       <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }}>
// // // // // //         💰 Текущий баланс: ${balance.toFixed(2)}
// // // // // //       </h2>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Home;
// // // // // import { useEffect, useState } from "react";
// // // // // import { collection, getDocs } from "firebase/firestore";
// // // // // import { db } from "../firebase";
// // // // // import { notification } from "antd";

// // // // // const Home = () => {
// // // // //   const [earnings, setEarnings] = useState([]);
// // // // //   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
// // // // //   const [entries, setEntries] = useState([]);
// // // // //   const [credits, setCredits] = useState([]);
// // // // //   const [debts, setDebts] = useState([]);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       const earningsSnap = await getDocs(collection(db, 'earnings'));
// // // // //       setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // //       const expensesSnap = await getDocs(collection(db, 'monthlyExpenses'));
// // // // //       setMonthlyExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // //       const entriesSnap = await getDocs(collection(db, 'entries'));
// // // // //       setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // //       const creditsSnap = await getDocs(collection(db, 'credits'));
// // // // //       setCredits(creditsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // // //       const debtsSnap = await getDocs(collection(db, 'debts'));
// // // // //       const debtData = [];
// // // // //       for (const debtDoc of debtsSnap.docs) {
// // // // //         const debt = { id: debtDoc.id, ...debtDoc.data() };
// // // // //         const paymentsSnap = await getDocs(collection(db, 'debts', debtDoc.id, 'payments'));
// // // // //         const payments = paymentsSnap.docs.map(p => p.data());
// // // // //         console.log(`Payments for debt ${debt.title}:`, payments); // Отладочное сообщение для проверки платежей

// // // // //         const paidAmount = payments
// // // // //           .filter(p => p.status === 'paid')
// // // // //           .reduce((sum, p) => {
// // // // //             const rate = parseFloat(p.exchangeRate || 1);
// // // // //             const amt = parseFloat(p.amount || 0);
// // // // //             return sum + amt / rate;
// // // // //           }, 0);
        
// // // // //         debt.paid = paidAmount;
// // // // //         debtData.push(debt);
// // // // //       }
// // // // //       setDebts(debtData);
// // // // //     };

// // // // //     fetchData();
// // // // //   }, []);

// // // // //   const getConverted = (item) => {
// // // // //     if (item.convertedAmount !== undefined) return item.convertedAmount;
// // // // //     if (item.currency === 'USD') return parseFloat(item.amount);
// // // // //     if (item.currency === 'GEL' && item.rate) {
// // // // //       return parseFloat(item.amount) / parseFloat(item.rate);
// // // // //     }
// // // // //     return 0;
// // // // //   };

// // // // //   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
// // // // //   const totalPaidMonthly = monthlyExpenses
// // // // //     .filter(e => e.paid)
// // // // //     .reduce((sum, e) => sum + getConverted(e), 0);
// // // // //   const totalEntries = entries.reduce((sum, e) => sum + getConverted(e), 0);
// // // // //   const totalCreditsPaid = credits.reduce(
// // // // //     (sum, c) => sum + (c.convertedAmount ? parseFloat(c.convertedAmount) : 0),
// // // // //     0
// // // // //   );

// // // // //   const totalDebtsPaid = debts.reduce(
// // // // //     (sum, debt) => sum + (debt.paid || 0),
// // // // //     0
// // // // //   );

// // // // //   const totalDebtsRemaining = debts.reduce(
// // // // //     (sum, debt) => sum + (debt.amount / (debt.exchangeRate || 1) - debt.paid || 0),
// // // // //     0
// // // // //   );

// // // // //   const balance = totalEarnings - totalPaidMonthly - totalEntries - totalCreditsPaid - totalDebtsRemaining;

// // // // //   return (
// // // // //     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
// // // // //       <h1>Финансовая сводка</h1>
// // // // //       <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6em' }}>
// // // // //         <li><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</li>
// // // // //         <li><strong>Ежемесячные оплаченные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</li>
// // // // //         <li><strong>Разовые расходы:</strong> ${totalEntries.toFixed(2)}</li>
// // // // //         <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
// // // // //         <li><strong>Погашенные долги:</strong> ${totalDebtsPaid.toFixed(2)}</li>
// // // // //         <li><strong>Остаток по долгам:</strong> ${totalDebtsRemaining.toFixed(2)}</li>
// // // // //       </ul>
// // // // //       <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }}>
// // // // //         💰 Текущий баланс: ${balance.toFixed(2)}
// // // // //       </h2>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Home;
// // // // import { useEffect, useState } from "react";
// // // // import { collection, getDocs } from "firebase/firestore";
// // // // import { db } from "../firebase";

// // // // const Home = () => {
// // // //   const [earnings, setEarnings] = useState([]);
// // // //   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
// // // //   const [entries, setEntries] = useState([]);
// // // //   const [credits, setCredits] = useState([]);
// // // //   const [debts, setDebts] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       const earningsSnap = await getDocs(collection(db, 'earnings'));
// // // //       setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // //       const expensesSnap = await getDocs(collection(db, 'monthlyExpenses'));
// // // //       setMonthlyExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // //       const entriesSnap = await getDocs(collection(db, 'entries'));
// // // //       setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // // //       const creditsSnap = await getDocs(collection(db, 'credits'));
// // // //       const creditData = [];
// // // //       for (const creditDoc of creditsSnap.docs) {
// // // //         const credit = { id: creditDoc.id, ...creditDoc.data() };
// // // //         const paymentsSnap = await getDocs(collection(db, 'credits', creditDoc.id, 'payments'));
// // // //         const payments = paymentsSnap.docs.map(p => p.data());
        
// // // //         console.log(`Payments for credit ${credit.title}:`, payments); // Лог для проверки

// // // //         // Считаем только оплаченные платежи
// // // //         const paidAmount = payments
// // // //           .filter(p => p.status === 'paid')
// // // //           .reduce((sum, p) => {
// // // //             const rate = parseFloat(p.exchangeRate || 1);
// // // //             const amt = parseFloat(p.amount || 0);
// // // //             return sum + amt / rate; // Применяем обменный курс, если он есть
// // // //           }, 0);
        
// // // //         credit.paid = paidAmount;
// // // //         creditData.push(credit);
// // // //       }
// // // //       setCredits(creditData);
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   const getConverted = (item) => {
// // // //     if (item.convertedAmount !== undefined) return item.convertedAmount;
// // // //     if (item.currency === 'USD') return parseFloat(item.amount);
// // // //     if (item.currency === 'GEL' && item.rate) {
// // // //       return parseFloat(item.amount) / parseFloat(item.rate);
// // // //     }
// // // //     return 0;
// // // //   };

// // // //   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
// // // //   const totalPaidMonthly = monthlyExpenses
// // // //     .filter(e => e.paid)
// // // //     .reduce((sum, e) => sum + getConverted(e), 0);
// // // //   const totalEntries = entries.reduce((sum, e) => sum + getConverted(e), 0);

// // // //   // Теперь рассчитываем погашенные кредиты
// // // //   const totalCreditsPaid = credits.reduce(
// // // //     (sum, credit) => sum + (credit.paid || 0), // Добавляем только оплаченные суммы
// // // //     0
// // // //   );

// // // //   // Погашенные долги
// // // //   const totalDebtsPaid = debts.reduce(
// // // //     (sum, debt) => sum + (debt.paid || 0),
// // // //     0
// // // //   );

// // // //   const totalDebtsRemaining = debts.reduce(
// // // //     (sum, debt) => sum + (debt.amount / (debt.exchangeRate || 1) - debt.paid || 0),
// // // //     0
// // // //   );

// // // //   const balance = totalEarnings - totalPaidMonthly - totalEntries - totalCreditsPaid - totalDebtsRemaining;

// // // //   return (
// // // //     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
// // // //       <h1>Финансовая сводка</h1>
// // // //       <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6em' }}>
// // // //         <li><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</li>
// // // //         <li><strong>Ежемесячные оплаченные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</li>
// // // //         <li><strong>Разовые расходы:</strong> ${totalEntries.toFixed(2)}</li>
// // // //         <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
// // // //         <li><strong>Погашенные долги:</strong> ${totalDebtsPaid.toFixed(2)}</li>
// // // //         <li><strong>Остаток по долгам:</strong> ${totalDebtsRemaining.toFixed(2)}</li>
// // // //       </ul>
// // // //       <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }}>
// // // //         💰 Текущий баланс: ${balance.toFixed(2)}
// // // //       </h2>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;
// // // import { useEffect, useState } from "react";
// // // import { collection, getDocs } from "firebase/firestore";
// // // import { db } from "../firebase";

// // // const Home = () => {
// // //   const [earnings, setEarnings] = useState([]);
// // //   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
// // //   const [entries, setEntries] = useState([]);
// // //   const [credits, setCredits] = useState([]);
// // //   const [debts, setDebts] = useState([]);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       const earningsSnap = await getDocs(collection(db, 'earnings'));
// // //       setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //       const expensesSnap = await getDocs(collection(db, 'monthlyExpenses'));
// // //       setMonthlyExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //       const entriesSnap = await getDocs(collection(db, 'entries'));
// // //       setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// // //       const creditsSnap = await getDocs(collection(db, 'credits'));
// // //       const creditData = [];
// // //       for (const creditDoc of creditsSnap.docs) {
// // //         const credit = { id: creditDoc.id, ...creditDoc.data() };
// // //         const paymentsSnap = await getDocs(collection(db, 'credits', creditDoc.id, 'payments'));
// // //         const payments = paymentsSnap.docs.map(p => p.data());

// // //         console.log(`Payments for credit ${credit.title}:`, payments); // Лог для проверки

// // //         // Считаем только оплаченные платежи
// // //         const paidAmount = payments
// // //           .filter(p => p.status === 'paid')
// // //           .reduce((sum, p) => {
// // //             const rate = parseFloat(p.exchangeRate || 1);
// // //             const amt = parseFloat(p.amount || 0);
// // //             return sum + amt / rate; // Применяем обменный курс, если он есть
// // //           }, 0);

// // //         credit.paid = paidAmount;
// // //         creditData.push(credit);
// // //       }
// // //       setCredits(creditData);
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const getConverted = (item) => {
// // //     if (item.convertedAmount !== undefined) return item.convertedAmount;
// // //     if (item.currency === 'USD') return parseFloat(item.amount);
// // //     if (item.currency === 'GEL' && item.rate) {
// // //       return parseFloat(item.amount) / parseFloat(item.rate);
// // //     }
// // //     return 0;
// // //   };

// // //   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
// // //   const totalPaidMonthly = monthlyExpenses
// // //     .filter(e => e.paid)
// // //     .reduce((sum, e) => sum + getConverted(e), 0);
// // //   const totalEntries = entries.reduce((sum, e) => sum + getConverted(e), 0);

// // //   // Теперь рассчитываем погашенные кредиты
// // //   const totalCreditsPaid = credits.reduce(
// // //     (sum, credit) => sum + (credit.paid || 0), // Добавляем только оплаченные суммы
// // //     0
// // //   );

// // //   // Расчет оставшегося долга по каждому кредиту
// // //   const totalCreditsRemaining = credits.reduce(
// // //     (sum, credit) => {
// // //       const initialAmount = parseFloat(credit.amount || 0); // Начальная сумма кредита
// // //       const paid = credit.paid || 0;
// // //       return sum + (initialAmount - paid); // Остаток кредита
// // //     },
// // //     0
// // //   );

// // //   // Погашенные долги
// // //   const totalDebtsPaid = debts.reduce(
// // //     (sum, debt) => sum + (debt.paid || 0),
// // //     0
// // //   );

// // //   // Остаток долга по всем долгам
// // //   const totalDebtsRemaining = debts.reduce(
// // //     (sum, debt) => sum + (debt.amount / (debt.exchangeRate || 1) - debt.paid || 0),
// // //     0
// // //   );

// // //   const balance = totalEarnings - totalPaidMonthly - totalEntries - totalCreditsRemaining - totalDebtsRemaining;

// // //   return (
// // //     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
// // //       <h1>Финансовая сводка</h1>
// // //       <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6em' }}>
// // //         <li><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</li>
// // //         <li><strong>Ежемесячные оплаченные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</li>
// // //         <li><strong>Разовые расходы:</strong> ${totalEntries.toFixed(2)}</li>
// // //         <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
// // //         <li><strong>Остаток по кредитам:</strong> ${totalCreditsRemaining.toFixed(2)}</li>
// // //         <li><strong>Погашенные долги:</strong> ${totalDebtsPaid.toFixed(2)}</li>
// // //         <li><strong>Остаток по долгам:</strong> ${totalDebtsRemaining.toFixed(2)}</li>
// // //       </ul>
// // //       <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }}>
// // //         💰 Текущий баланс: ${balance.toFixed(2)}
// // //       </h2>
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import { useEffect, useState } from "react";
// // import { collection, getDocs } from "firebase/firestore";
// // import { db, auth } from '../firebase';

// // const Home = () => {
// //   const [earnings, setEarnings] = useState([]);
// //   const [expenses, setExpenses] = useState([]);
// //   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
// //   const [entries, setEntries] = useState([]);
// //   const [credits, setCredits] = useState([]);
// //   const [debts, setDebts] = useState([]);

// //   const user = auth.currentUser;

// //   // useEffect(() => {
// //   //   const fetchData = async () => {
// //   //     const earningsSnap = await getDocs(collection(db, 'users', user.uid, 'earnings'));
// //   //     setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //   //     const expensesSnap = await getDocs(collection(db, 'users', user.uid, 'monthlyExpenses'));
// //   //     setMonthlyExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //   //     const entriesSnap = await getDocs(collection(db, 'users', user.uid, 'entries'));
// //   //     setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));


// //   //     const debtsSnap = await getDocs(collection(db, 'users', user.uid, 'debts'));
// //   //     const debtData = [];
// //   //     for (const debtDoc of debtsSnap.docs) {
// //   //       const debt = { id: debtDoc.id, ...debtDoc.data() };
// //   //       const paymentsSnap = await getDocs(collection(db, 'users', user.uid, 'debts', debtDoc.id, 'payments'));
// //   //       const payments = paymentsSnap.docs.map(p => p.data());
// //   //       const paidAmount = payments
// //   //         .filter(p => p.status === 'paid')
// //   //         .reduce((sum, p) => {
// //   //           const rate = parseFloat(p.exchangeRate || 1);
// //   //           const amt = parseFloat(p.amount || 0);
// //   //           return sum + amt / rate;
// //   //         }, 0);
        
// //   //       debt.paid = paidAmount;
// //   //       debtData.push(debt);
// //   //     }
// //   //     setDebts(debtData);

// //   //     // Получение данных по кредитам
// //   //     const creditsSnap = await getDocs(collection(db, 'credits'));
// //   //     const creditData = [];
// //   //     for (const creditDoc of creditsSnap.docs) {
// //   //       const credit = { id: creditDoc.id, ...creditDoc.data() };
// //   //       const paymentsSnap = await getDocs(collection(db, 'credits', creditDoc.id, 'payments'));
// //   //       const payments = paymentsSnap.docs.map(p => p.data());

// //   //       console.log(`Payments for credit ${credit.title}:`, payments); // Лог для проверки

// //   //       // Считаем только оплаченные платежи
// //   //       const paidAmount = payments
// //   //         .filter(p => p.status === 'paid')
// //   //         .reduce((sum, p) => {
// //   //           const rate = parseFloat(p.exchangeRate || 1);
// //   //           const amt = parseFloat(p.amount || 0);
// //   //           return sum + amt / rate; // Применяем обменный курс, если он есть
// //   //         }, 0);

// //   //       credit.paid = paidAmount;
// //   //       creditData.push(credit);
// //   //     }
// //   //     setCredits(creditData);
// //   //   };

// //   //   fetchData();
// //   // }, []);
// //   useEffect(() => {
// //     if (!user) return; // Ждём появления пользователя
  
// //     const fetchData = async () => {
// //       try {
// //         const earningsSnap = await getDocs(collection(db, 'users', user.uid, 'earnings'));
// //         setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

// //         const montlyExpensesSnap = await getDocs(collection(db, 'users', user.uid, 'monthlyExpenses'));
// //         setMonthlyExpenses(montlyExpensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  
// //         const expensesSnap = await getDocs(collection(db, 'users', user.uid, 'expenses'));
// //         setExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  
// //         const entriesSnap = await getDocs(collection(db, 'users', user.uid, 'entries'));
// //         setEntries(entriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  
// //         const debtsSnap = await getDocs(collection(db, 'users', user.uid, 'debts'));
// //         const debtData = [];
// //         for (const debtDoc of debtsSnap.docs) {
// //           const debt = { id: debtDoc.id, ...debtDoc.data() };
// //           const paymentsSnap = await getDocs(
// //             collection(db, 'users', user.uid, 'debts', debtDoc.id, 'payments')
// //           );
// //           const payments = paymentsSnap.docs.map(p => p.data());
// //           const paidAmount = payments
// //             .filter(p => p.status === 'paid')
// //             .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);
  
// //           debt.paid = paidAmount;
// //           debtData.push(debt);
// //         }
// //         setDebts(debtData);
  
// //         const creditsSnap = await getDocs(collection(db, 'users', user.uid, 'credits')); // <-- Исправлено
// //         const creditData = [];
// //         for (const creditDoc of creditsSnap.docs) {
// //           const credit = { id: creditDoc.id, ...creditDoc.data() };
// //           const paymentsSnap = await getDocs(
// //             collection(db, 'users', user.uid, 'credits', creditDoc.id, 'payments')
// //           );
// //           const payments = paymentsSnap.docs.map(p => p.data());
  
// //           const paidAmount = payments
// //             .filter(p => p.status === 'paid')
// //             .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);
  
// //           credit.paid = paidAmount;
// //           creditData.push(credit);
// //         }
// //         setCredits(creditData);
  
// //       } catch (err) {
// //         console.error("Ошибка при получении данных:", err);
// //       }
// //     };
  
// //     fetchData();
// //   }, [user]);
  
// //   const getConverted = (item) => {
// //     if (item.convertedAmount !== undefined) return item.convertedAmount;
// //     if (item.currency === 'USD') return parseFloat(item.amount);
// //     if (item.currency === 'GEL' && item.rate) {
// //       return parseFloat(item.amount) / parseFloat(item.rate);
// //     }
// //     return 0;
// //   };

// //   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
// //   const totalNoPaidMonthly = monthlyExpenses
// //     // .filter(e => e.paid)
// //     .reduce((sum, e) => sum + getConverted(e), 0);
// //     const totalPaidMonthly = monthlyExpenses
// //     .filter(e => e.paid)
// //     .reduce((sum, e) => sum + getConverted(e), 0);
// //     const totalPaidExpenses = expenses
// //     .filter(e => e.paid)
// //     .reduce((sum, e) => sum + getConverted(e), 0);
// //   const totalExpenses = expenses    .filter(e => e.paid)
// //   .reduce((sum, e) => sum + getConverted(e), 0);
// //   // Теперь рассчитываем погашенные кредиты
// //   const totalCreditsPaid = credits.reduce(
// //     (sum, credit) => sum + (credit.paid || 0), // Добавляем только оплаченные суммы
// //     0
// //   );

// //   // Расчет оставшегося долга по каждому кредиту
// //   const totalCreditsRemaining = credits.reduce(
// //     (sum, credit) => {
// //       const initialAmount = parseFloat(credit.amount || 0); // Начальная сумма кредита
// //       const paid = credit.paid || 0;
// //       return sum + (initialAmount - paid); // Остаток кредита
// //     },
// //     0
// //   );

// //   // Погашенные долги
// //   const totalDebtsPaid = debts.reduce(
// //     (sum, debt) => sum + (debt.paid || 0),
// //     0
// //   );

// //   // Остаток долга по всем долгам
// //   const totalDebtsRemaining = debts.reduce(
// //     (sum, debt) => sum + (debt.amount / (debt.exchangeRate || 1) - debt.paid || 0),
// //     0
// //   );

// //   const balance = totalEarnings - totalPaidMonthly - totalExpenses - totalCreditsPaid  - totalDebtsPaid;
// //   const balance1 = totalDebtsRemaining +  totalCreditsRemaining;
// //   return (
// //     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
// //       <h1>Финансовая сводка</h1>
// //       <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.6em' }}>
// //         <li><strong>Доходы:</strong> ${totalEarnings.toFixed(2)}</li>
// //         <li><strong>Ежемесячные не оплаченные расходы:</strong> ${totalNoPaidMonthly.toFixed(2)}</li>
// //         <li><strong>Ежемесячные оплаченные расходы:</strong> ${totalPaidMonthly.toFixed(2)}</li>
// //         <li><strong>Разовые расходы:</strong> ${totalExpenses.toFixed(2)}</li>
// //         <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
// //         <li><strong>Остаток по кредитам:</strong> ${totalCreditsRemaining.toFixed(2)}</li>
// //         <li><strong>Погашенные долги:</strong> ${totalDebtsPaid.toFixed(2)}</li>
// //         <li><strong>Остаток по долгам:</strong> ${totalDebtsRemaining.toFixed(2)}</li>
// //       </ul>
// //       <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }} >
// //         💰 В кошельке: ${balance.toFixed(2)}<br/>
// //         💰 Выйти из долговой ямы: ${balance1.toFixed(2)}
// //       </h2>
// //     </div>
// //   );
// // };

// // export default Home;
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db, auth } from "../firebase";

// const Home = () => {
//   const [earnings, setEarnings] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [monthlyExpenses, setMonthlyExpenses] = useState([]);
//   const [credits, setCredits] = useState([]);
//   const [debts, setDebts] = useState([]);

//   const user = auth.currentUser;

//   useEffect(() => {
//     if (!user) return;

//     const fetchData = async () => {
//       try {
//         const earningsSnap = await getDocs(collection(db, 'users', user.uid, 'earnings'));
//         setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const monthlyExpensesSnap = await getDocs(collection(db, 'users', user.uid, 'monthlyExpenses'));
//         setMonthlyExpenses(monthlyExpensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const expensesSnap = await getDocs(collection(db, 'users', user.uid, 'expenses'));
//         setExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//         const debtsSnap = await getDocs(collection(db, 'users', user.uid, 'debts'));
//         const debtData = [];

//         for (const debtDoc of debtsSnap.docs) {
//           const debt = { id: debtDoc.id, ...debtDoc.data() };
//           const paymentsSnap = await getDocs(
//             collection(db, 'users', user.uid, 'debts', debtDoc.id, 'payments')
//           );
//           const payments = paymentsSnap.docs.map(p => p.data());

//           const paidAmount = payments
//             .filter(p => p.status === 'paid')
//             .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);

//           debt.paid = paidAmount;
//           debtData.push(debt);
//         }
//         setDebts(debtData);

//         const creditsSnap = await getDocs(collection(db, 'users', user.uid, 'credits'));
//         const creditData = [];

//         for (const creditDoc of creditsSnap.docs) {
//           const credit = { id: creditDoc.id, ...creditDoc.data() };
//           const paymentsSnap = await getDocs(
//             collection(db, 'users', user.uid, 'credits', creditDoc.id, 'payments')
//           );
//           const payments = paymentsSnap.docs.map(p => p.data());

//           const paidAmount = payments
//             .filter(p => p.status === 'paid')
//             .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);

//           credit.paid = paidAmount;
//           creditData.push(credit);
//         }
//         setCredits(creditData);

//       } catch (err) {
//         console.error("Ошибка при получении данных:", err);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const getConverted = (item) => {
//     let value = 0;
//     if (item.convertedAmount !== undefined) return item.convertedAmount;
//     if (item.currency === 'USD') value = parseFloat(item.amount || 0);
//     if (item.currency === 'GEL' && item.rate) {
//       value = parseFloat(item.amount || 0) / parseFloat(item.rate || 1);
//     }
//     return isNaN(value) ? 0 : value;
//   };

//   const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);

//   const totalPaidMonthly = monthlyExpenses
//     .filter(e => e.paid)
//     .reduce((sum, e) => sum + getConverted(e), 0);

//   const totalNoPaidMonthly = monthlyExpenses.reduce((sum, e) => sum + getConverted(e), 0);

//   const totalPaidExpenses = expenses
//     .filter(e => e.paid)
//     .reduce((sum, e) => sum + getConverted(e), 0);

//   return (
//     <div>
//       <h2>Финансовая сводка</h2>
//       <p>Доходы: ${totalEarnings.toFixed(2)}</p>
//       <p>Ежемесячные расходы (оплаченные): ${totalPaidMonthly.toFixed(2)}</p>
//       <p>Ежемесячные расходы (все): ${totalNoPaidMonthly.toFixed(2)}</p>
//       <p>Разовые расходы (оплаченные): ${totalPaidExpenses.toFixed(2)}</p>
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

const Home = () => {
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [credits, setCredits] = useState([]);
  const [debts, setDebts] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const earningsSnap = await getDocs(collection(db, 'users', user.uid, 'earnings'));
        setEarnings(earningsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const monthlyExpensesSnap = await getDocs(collection(db, 'users', user.uid, 'monthlyExpenses'));
        setMonthlyExpenses(monthlyExpensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const expensesSnap = await getDocs(collection(db, 'users', user.uid, 'expenses'));
        setExpenses(expensesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const debtsSnap = await getDocs(collection(db, 'users', user.uid, 'debts'));
        const debtData = [];

        for (const debtDoc of debtsSnap.docs) {
          const debt = { id: debtDoc.id, ...debtDoc.data() };
          const paymentsSnap = await getDocs(
            collection(db, 'users', user.uid, 'debts', debtDoc.id, 'payments')
          );
          const payments = paymentsSnap.docs.map(p => p.data());

          const paidAmount = payments
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);

          debt.paid = paidAmount;
          debtData.push(debt);
        }
        setDebts(debtData);

    //     const creditsSnap = await getDocs(collection(db, 'users', user.uid, 'credits'));
    //     const creditData = [];

    //     for (const creditDoc of creditsSnap.docs) {
    //       const credit = { id: creditDoc.id, ...creditDoc.data() };
    //       const paymentsSnap = await getDocs(
    //         collection(db, 'users', user.uid, 'credits', creditDoc.id, 'payments')
    //       );
    //       const payments = paymentsSnap.docs.map(p => p.data());

    //       const paidAmount = payments
    //         .filter(p => p.status === 'paid')
    //         .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);

    //       credit.paid = paidAmount;
    //       creditData.push(credit);
    //     }
    //     setCredits(creditData);
    //   } catch (err) {
    //     console.error("Ошибка при получении данных:", err);
    //   }
    // };
        const creditsSnap = await getDocs(collection(db, 'users', user.uid, 'credits'));
        const creditData = [];

        for (const creditDoc of creditsSnap.docs) {
          const credit = { id: creditDoc.id, ...creditDoc.data() };
          const paymentsSnap = await getDocs(
            collection(db, 'users', user.uid, 'credits', creditDoc.id, 'payments')
          );
          const payments = paymentsSnap.docs.map(p => p.data());

          const paidAmount = payments
            .filter(p => p.status === 'paid')
            .reduce((sum, p) => sum + (parseFloat(p.amount || 0) / parseFloat(p.exchangeRate || 1)), 0);

          credit.paid = paidAmount;
          creditData.push(credit);
        }
        setCredits(creditData);

      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      }
    };

    fetchData();
  }, [user]);

  const getConverted = (item) => {
    const amount = parseFloat(item.amount || 0);
    if (isNaN(amount)) return 0;

    if (item.convertedAmount !== undefined) return parseFloat(item.convertedAmount || 0);
    if (item.currency === 'USD') return amount;
    if (item.currency === 'GEL' && item.rate) {
      const rate = parseFloat(item.rate || 1);
      return rate !== 0 ? amount / rate : 0;
    }
    return 0;
  };

  const totalEarnings = earnings.reduce((sum, e) => sum + getConverted(e), 0);
  const totalPaidMonthly = monthlyExpenses.filter(e => e.paid).reduce((sum, e) => sum + getConverted(e), 0);
  const totalNoPaidMonthly = monthlyExpenses.reduce((sum, e) => sum + getConverted(e), 0);
  const totalPaidExpenses = expenses.filter(e => e.paid).reduce((sum, e) => sum + getConverted(e), 0);

  // Кредиты
  // const totalCreditsPaid = credits.reduce((sum, c) => sum + (c.paid || 0), 0);
  // const totalCreditsRemaining = credits.reduce((sum, c) => sum + ((getConverted(c) - (c.paid || 0)) || 0), 0);
    // Теперь рассчитываем погашенные кредиты
  const totalCreditsPaid = credits.reduce(
    (sum, credit) => sum + (credit.paid || 0), // Добавляем только оплаченные суммы
    0
  );

  // Расчет оставшегося долга по каждому кредиту
  const totalCreditsRemaining = credits.reduce(
    (sum, credit) => {
      const initialAmount = parseFloat(credit.amount || 0); // Начальная сумма кредита
      const paid = credit.paid || 0;
      return sum + (initialAmount - paid); // Остаток кредита
    },
    0
  );

  // Долги
  const totalDebtsPaid = debts.reduce((sum, d) => sum + (d.paid || 0), 0);
  const totalDebtsRemaining = debts.reduce((sum, d) => sum + ((getConverted(d) - (d.paid || 0)) || 0), 0);

  const balance = totalEarnings - totalPaidMonthly - totalPaidExpenses;
  const balance1 = balance - totalCreditsRemaining - totalDebtsRemaining;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Финансовый обзор</h1>
      <ul>
        <li><strong>Доход:</strong> ${totalEarnings.toFixed(2)}</li>
        <li><strong>Ежемесячные расходы:</strong> ${totalNoPaidMonthly.toFixed(2)}</li>
        <li><strong>Оплаченные ежемесячные:</strong> ${totalPaidMonthly.toFixed(2)}</li>
        <li><strong>Прочие оплаченные расходы:</strong> ${totalPaidExpenses.toFixed(2)}</li>
        <li><strong>Погашенные кредиты:</strong> ${totalCreditsPaid.toFixed(2)}</li>
        <li><strong>Остаток по кредитам:</strong> ${totalCreditsRemaining.toFixed(2)}</li>
        <li><strong>Погашенные долги:</strong> ${totalDebtsPaid.toFixed(2)}</li>
        <li><strong>Остаток по долгам:</strong> ${totalDebtsRemaining.toFixed(2)}</li>
      </ul>
      <h2 style={{ marginTop: '20px', color: balance >= 0 ? 'green' : 'red' }}>
        💰 В кошельке: ${balance.toFixed(2)}<br />
        💰 Выйти из долговой ямы: ${balance1.toFixed(2)}
      </h2>
    </div>
  );
};

export default Home;
