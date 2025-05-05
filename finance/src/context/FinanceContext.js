// // // FinanceContext.js
// // import { createContext, useContext, useEffect, useState } from 'react';
// // import { collection, onSnapshot } from 'firebase/firestore';
// // import { db } from '../firebase';

// // const FinanceContext = createContext();

// // export const useFinance = () => useContext(FinanceContext);

// // export const FinanceProvider = ({ children }) => {
// //   const [entries, setEntries] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
// //       const data = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setEntries(data); // Убедись, что setEntries используется здесь
// //       setLoading(false);
// //     });

// //     return () => unsubscribe(); // Отписка при размонтировании
// //   }, []);

// //   return (
// //     <FinanceContext.Provider value={{ entries, setEntries, loading }}>
// //       {children}
// //     </FinanceContext.Provider>
// //   );
// // };
// // context/FinanceContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase';

// const FinanceContext = createContext();

// export const useFinance = () => useContext(FinanceContext);

// export const FinanceProvider = ({ children }) => {
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
//       const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setEntries(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <FinanceContext.Provider value={{ entries, setEntries, loading }}>
//       {children}
//     </FinanceContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Установить загрузку в true
    setLoading(true);

    const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntries(data); // Обновить entries с полученными данными
      setLoading(false); // Завершаем загрузку данных
    }, (error) => {
      console.error('Ошибка при получении данных:', error);
      setLoading(false); // Если ошибка, завершаем загрузку
    });

    return () => unsubscribe();
  }, []);

  return (
    <FinanceContext.Provider value={{ entries, setEntries, loading, setLoading }}>
      {children}
    </FinanceContext.Provider>
  );
};
