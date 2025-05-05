// // import { useState, useEffect } from 'react';
// // import {
// //   Button,
// //   Input,
// //   Select,
// //   List,
// //   Card,
// //   notification,
// //   Divider,
// // } from 'antd';
// // import { db } from '../firebase';
// // import {
// //   doc,
// //   updateDoc,
// //   getDocs,
// //   collection,
// //   addDoc,
// // } from 'firebase/firestore';

// // const { Option } = Select;

// // const Credits = () => {
// //   const [creditName, setCreditName] = useState('');
// //   const [creditAmount, setCreditAmount] = useState('');
// //   const [interestRate, setInterestRate] = useState('');
// //   const [currency, setCurrency] = useState('GEL');
// //   const [exchangeRate, setExchangeRate] = useState('');
// //   const [credits, setCredits] = useState([]);
// //   const [paymentInputs, setPaymentInputs] = useState({});

// //   const loadCredits = async () => {
// //     const querySnapshot = await getDocs(collection(db, 'credits'));
// //     const data = [];
// //     for (const docSnap of querySnapshot.docs) {
// //       const credit = docSnap.data();
// //       credit.id = docSnap.id;

// //       const paymentsSnapshot = await getDocs(
// //         collection(db, 'credits', docSnap.id, 'payments')
// //       );
// //       credit.payments = paymentsSnapshot.docs.map((p) => ({
// //         id: p.id,
// //         ...p.data(),
// //       }));
// //       data.push(credit);
// //     }
// //     setCredits(data);
// //   };

// //   useEffect(() => {
// //     loadCredits();
// //   }, []);

// //   const handleAddCredit = async () => {
// //     if (!creditName || !creditAmount || !interestRate || !exchangeRate) {
// //       return notification.error({ message: 'Заполните все поля' });
// //     }

// //     const gelAmount = parseFloat(creditAmount);
// //     const rate = parseFloat(exchangeRate);
// //     const amountUSD =
// //       currency === 'USD' ? gelAmount : gelAmount / rate;

// //     await addDoc(collection(db, 'credits'), {
// //       name: creditName,
// //       amount: amountUSD,
// //       originalAmount: amountUSD,
// //       interestRate: parseFloat(interestRate),
// //       currency,
// //     });

// //     setCreditName('');
// //     setCreditAmount('');
// //     setInterestRate('');
// //     setExchangeRate('');
// //     setCurrency('GEL');
// //     await loadCredits();
// //   };

// //   const handleRepay = async (credit) => {
// //     const input = paymentInputs[credit.id];
// //     console.log('input:', input); // <--- вот это добавь

// //       if (
// //         !input ||
// //         !input.amount ||
// //         (input.currency !== 'USD' && !input.exchangeRate) ||
// //         !input.currency

// //     ) {
// //       console.log('Ошибка ввода'); // <--- и это
// //       return notification.error({ message: 'Введите все данные для погашения' });
// //     }
  
// //     let repayAmount;
    
// //     // Пересчитываем сумму в зависимости от валюты
// //     if (input.currency === 'USD') {
// //       repayAmount = parseFloat(input.amount);
// //     } else if (input.currency === 'GEL') {
// //       repayAmount = parseFloat(input.amount) / parseFloat(input.exchangeRate);  // Конвертируем GEL в USD
// //     }
  
// //     const interest = parseFloat(credit.interestRate);
// //     const amountToSubtract = repayAmount * (1 - interest / 100);  // С учетом процента
// //     const newAmount = parseFloat(credit.amount) - amountToSubtract;  // Уменьшаем долг
  
// //     const creditRef = doc(db, 'credits', credit.id);
// //     await updateDoc(creditRef, {
// //       amount: newAmount > 0 ? newAmount : 0, // Обновляем остаток по кредиту
// //     });
// //     const converted = input.currency === 'USD'
// //     ? parseFloat(input.amount)
// //     : parseFloat(input.amount) / parseFloat(input.exchangeRate);

// //     // Сохраняем платеж
// //     await addDoc(collection(db, 'credits', credit.id, 'payments'), {
// //       amount: repayAmount,
// //       originalCurrency: input.currency,
// //       exchangeRate: input.exchangeRate || 1,
// //       convertedAmount: converted,
// //       status: "paid",
// //       date: new Date(), // Сохраняем текущую дату
// //     });
  
// //     // Сбросить значения для ввода
// //     setPaymentInputs((prev) => ({
// //       ...prev,
// //       [credit.id]: { amount: '', exchangeRate: '', currency: 'GEL' },
// //     }));
    
// //     // Обновить кредиты
// //     await loadCredits();


// //   };

// //   const handleInputChange = (creditId, field, value) => {
// //     setPaymentInputs((prev) => ({
// //       ...prev,
// //       [creditId]: {
// //         ...prev[creditId],
// //         [field]: value,
// //       },
// //     }));
// //   };

// //   return (
// //     <div style={{ maxWidth: 800, margin: '0 auto' }}>
// //       <h2>Добавить кредит</h2>
// //       <Input
// //         placeholder="Название"
// //         value={creditName}
// //         onChange={(e) => setCreditName(e.target.value)}
// //         style={{ marginBottom: 8 }}
// //       />
// //       <Input
// //         placeholder="Сумма"
// //         value={creditAmount}
// //         onChange={(e) => setCreditAmount(e.target.value)}
// //         style={{ marginBottom: 8 }}
// //       />
// //       <Input
// //         placeholder="Процент"
// //         value={interestRate}
// //         onChange={(e) => setInterestRate(e.target.value)}
// //         style={{ marginBottom: 8 }}
// //       />
// //       <Select
// //         value={currency}
// //         onChange={setCurrency}
// //         style={{ width: '100%', marginBottom: 8 }}
// //       >
// //         <Option value="GEL">GEL</Option>
// //         <Option value="USD">USD</Option>
// //       </Select>
// //       {currency === 'GEL' && (
// //         <Input
// //           placeholder="Курс к USD"
// //           value={exchangeRate}
// //           onChange={(e) => setExchangeRate(e.target.value)}
// //           style={{ marginBottom: 8 }}
// //         />
// //       )}
// //       <Button type="primary" onClick={handleAddCredit}>
// //         Добавить
// //       </Button>

// //       <Divider />

// //       <h2>Кредиты</h2>
// //       {credits.map((credit) => (
// //         <Card key={credit.id} title={credit.name} style={{ marginBottom: 16 }}>
// //           <p>Остаток: ${credit.amount.toFixed(2)}</p>
// //           <Button
// //             onClick={() =>
// //               setPaymentInputs((prev) => ({
// //                 ...prev,
// //                 [credit.id]: {
// //                   ...prev[credit.id],
// //                   open: !prev[credit.id]?.open,
// //                   amount: '',
// //                   exchangeRate: '',
// //                   currency: 'GEL',
// //                 },
// //               }))
// //             }
// //           >
// //             Погасить кредит
// //           </Button>

// //           {paymentInputs[credit.id]?.open && (
// //             <div style={{ marginTop: 12 }}>
// //               <Input
// //                 placeholder="Сумма"
// //                 value={paymentInputs[credit.id]?.amount || ''}
// //                 onChange={(e) =>
// //                   handleInputChange(credit.id, 'amount', e.target.value)
// //                 }
// //                 style={{ marginBottom: 8 }}
// //               />
// //               <Select
// //                 value={paymentInputs[credit.id]?.currency || 'GEL'}
// //                 onChange={(value) =>
// //                   handleInputChange(credit.id, 'currency', value)
// //                 }
// //                 style={{ width: '100%', marginBottom: 8 }}
// //               >
// //                 <Option value="GEL">GEL</Option>
// //                 <Option value="USD">USD</Option>
// //               </Select>
// //               {paymentInputs[credit.id]?.currency === 'GEL' && (
// //                 <Input
// //                   placeholder="Курс"
// //                   value={paymentInputs[credit.id]?.exchangeRate || ''}
// //                   onChange={(e) =>
// //                     handleInputChange(credit.id, 'exchangeRate', e.target.value)
// //                   }
// //                   style={{ marginBottom: 8 }}
// //                 />
// //               )}
// //               <Button type="primary" onClick={() => handleRepay(credit)}>
// //                 Подтвердить погашение
// //               </Button>
// //             </div>
// //           )}

// //           {credit.payments?.length > 0 && (
// //             <>
// //               <Divider />
// //               <h4>История платежей:</h4>
// //               <List
// //                 size="small"
// //                 dataSource={credit.payments}
// //                 renderItem={(payment) => {
// //                   let dateString = '---';
// //                   try {
// //                     if (payment.date?.toDate) {
// //                       dateString = payment.date.toDate().toISOString().slice(0, 10);
// //                     } else if (payment.date instanceof Date) {
// //                       dateString = payment.date.toISOString().slice(0, 10);
// //                     }
// //                   } catch (e) {
// //                     dateString = 'Неверная дата';
// //                   }

// //                   return (
// //                     <List.Item>
// //                       {dateString} — {Number(payment.amount).toFixed(2)} USD (
// //                       {payment.originalCurrency}, курс {payment.exchangeRate})
// //                     </List.Item>
// //                   );
// //                 }}
// //               />
// //             </>
// //           )}
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Credits;
// import { useState, useEffect } from 'react';
// import {
//   Button,
//   Input,
//   Select,
//   List,
//   Card,
//   notification,
//   Divider,
// } from 'antd';
// import { db, auth } from '../firebase';
// import {
//   doc,
//   updateDoc,
//   getDocs,
//   collection,
//   addDoc,
// } from 'firebase/firestore';

// const { Option } = Select;

// const Credits = () => {
//   const [creditName, setCreditName] = useState('');
//   const [creditAmount, setCreditAmount] = useState('');
//   const [interestRate, setInterestRate] = useState('');
//   const [currency, setCurrency] = useState('GEL');
//   const [exchangeRate, setExchangeRate] = useState('');
//   const [credits, setCredits] = useState([]);
//   const [paymentInputs, setPaymentInputs] = useState({});

//   const user = auth.currentUser;

//   const getUserCreditsCollection = () =>
//     collection(db, 'users', user.uid, 'credits');

//   const getCreditPaymentsCollection = (creditId) =>
//     collection(db, 'users', user.uid, 'credits', creditId, 'payments');

//   const loadCredits = async () => {
//     if (!user) return;
//     const querySnapshot = await getDocs(getUserCreditsCollection());
//     const data = [];

//     for (const docSnap of querySnapshot.docs) {
//       const credit = docSnap.data();
//       credit.id = docSnap.id;

//       const paymentsSnapshot = await getDocs(
//         getCreditPaymentsCollection(docSnap.id)
//       );
//       credit.payments = paymentsSnapshot.docs.map((p) => ({
//         id: p.id,
//         ...p.data(),
//       }));

//       data.push(credit);
//     }

//     setCredits(data);
//   };

//   useEffect(() => {
//     if (user) {
//       loadCredits();
//     }
//   }, [user]);

//   const handleAddCredit = async () => {
//     if (!creditName || !creditAmount || !interestRate || !exchangeRate) {
//       return notification.error({ message: 'Заполните все поля' });
//     }

//     const gelAmount = parseFloat(creditAmount);
//     const rate = parseFloat(exchangeRate);
//     const amountUSD =
//       currency === 'USD' ? gelAmount : gelAmount / rate;

//     await addDoc(getUserCreditsCollection(), {
//       name: creditName,
//       amount: amountUSD,
//       originalAmount: amountUSD,
//       interestRate: parseFloat(interestRate),
//       currency,
//     });

//     setCreditName('');
//     setCreditAmount('');
//     setInterestRate('');
//     setExchangeRate('');
//     setCurrency('GEL');
//     await loadCredits();
//   };

//   const handleRepay = async (credit) => {
//     const input = paymentInputs[credit.id];

//     if (
//       !input ||
//       !input.amount ||
//       (input.currency !== 'USD' && !input.exchangeRate) ||
//       !input.currency
//     ) {
//       return notification.error({ message: 'Введите все данные для погашения' });
//     }

//     let repayAmount;

//     if (input.currency === 'USD') {
//       repayAmount = parseFloat(input.amount);
//     } else if (input.currency === 'GEL') {
//       repayAmount = parseFloat(input.amount) / parseFloat(input.exchangeRate);
//     }

//     const interest = parseFloat(credit.interestRate);
//     const amountToSubtract = repayAmount * (1 - interest / 100);
//     const newAmount = parseFloat(credit.amount) - amountToSubtract;

//     const creditRef = doc(db, 'users', user.uid, 'credits', credit.id);
//     await updateDoc(creditRef, {
//       amount: newAmount > 0 ? newAmount : 0,
//     });

//     const converted = input.currency === 'USD'
//       ? parseFloat(input.amount)
//       : parseFloat(input.amount) / parseFloat(input.exchangeRate);

//     await addDoc(getCreditPaymentsCollection(credit.id), {
//       amount: repayAmount,
//       originalCurrency: input.currency,
//       exchangeRate: input.exchangeRate || 1,
//       convertedAmount: converted,
//       status: "paid",
//       date: new Date(),
//     });

//     setPaymentInputs((prev) => ({
//       ...prev,
//       [credit.id]: { amount: '', currency: 'USD', exchangeRate: '' },
//     }));

//     await loadCredits();
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: '0 auto' }}>
//       <Card title="Добавить Кредит">
//         <Input
//           placeholder="Название"
//           value={creditName}
//           onChange={(e) => setCreditName(e.target.value)}
//           style={{ marginBottom: 8 }}
//         />
//         <Input
//           placeholder="Сумма"
//           value={creditAmount}
//           onChange={(e) => setCreditAmount(e.target.value)}
//           style={{ marginBottom: 8 }}
//         />
//         <Input
//           placeholder="Процентная ставка"
//           value={interestRate}
//           onChange={(e) => setInterestRate(e.target.value)}
//           style={{ marginBottom: 8 }}
//         />
//         <Select
//           value={currency}
//           onChange={setCurrency}
//           style={{ width: '100%', marginBottom: 8 }}
//         >
//           <Option value="USD">USD</Option>
//           <Option value="GEL">GEL</Option>
//         </Select>
//         <Input
//           placeholder="Курс (если валюта не USD)"
//           value={exchangeRate}
//           onChange={(e) => setExchangeRate(e.target.value)}
//           style={{ marginBottom: 8 }}
//         />
//         <Button type="primary" onClick={handleAddCredit}>
//           Добавить
//         </Button>
//       </Card>

//       <Divider />

//       <List
//         dataSource={credits}
//         renderItem={(credit) => (
//           <Card
//             title={`${credit.name} — Остаток: $${credit.amount.toFixed(2)}`}
//             style={{ marginBottom: 16 }}
//           >
//             <Input
//               placeholder="Сумма погашения"
//               value={paymentInputs[credit.id]?.amount || ''}
//               onChange={(e) =>
//                 setPaymentInputs((prev) => ({
//                   ...prev,
//                   [credit.id]: {
//                     ...prev[credit.id],
//                     amount: e.target.value,
//                   },
//                 }))
//               }
//               style={{ marginBottom: 8 }}
//             />
//             <Select
//               value={paymentInputs[credit.id]?.currency || 'USD'}
//               onChange={(value) =>
//                 setPaymentInputs((prev) => ({
//                   ...prev,
//                   [credit.id]: {
//                     ...prev[credit.id],
//                     currency: value,
//                   },
//                 }))
//               }
//               style={{ width: '100%', marginBottom: 8 }}
//             >
//               <Option value="USD">USD</Option>
//               <Option value="GEL">GEL</Option>
//             </Select>
//             <Input
//               placeholder="Курс (если GEL)"
//               value={paymentInputs[credit.id]?.exchangeRate || ''}
//               onChange={(e) =>
//                 setPaymentInputs((prev) => ({
//                   ...prev,
//                   [credit.id]: {
//                     ...prev[credit.id],
//                     exchangeRate: e.target.value,
//                   },
//                 }))
//               }
//               style={{ marginBottom: 8 }}
//             />
//             <Button type="primary" onClick={() => handleRepay(credit)}>
//               Погасить
//             </Button>
//           </Card>
//         )}
//       />
//     </div>
//   );
// };

// export default Credits;
import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Select,
  List,
  Card,
  notification,
  Divider,
} from 'antd';
import { db, auth } from '../firebase';
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  addDoc,
} from 'firebase/firestore';

const { Option } = Select;

const Credits = () => {
  const [creditName, setCreditName] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [currency, setCurrency] = useState('GEL');
  const [exchangeRate, setExchangeRate] = useState('');
  const [credits, setCredits] = useState([]);
  const [paymentInputs, setPaymentInputs] = useState({});

  const user = auth.currentUser;

  const getUserCreditsCollection = () =>
    collection(db, 'users', user.uid, 'credits');

  const getCreditPaymentsCollection = (creditId) =>
    collection(db, 'users', user.uid, 'credits', creditId, 'payments');

  const loadCredits = async () => {
    if (!user) return;
    const querySnapshot = await getDocs(getUserCreditsCollection());
    const data = [];

    for (const docSnap of querySnapshot.docs) {
      const credit = docSnap.data();
      credit.id = docSnap.id;

      const paymentsSnapshot = await getDocs(
        getCreditPaymentsCollection(docSnap.id)
      );
      credit.payments = paymentsSnapshot.docs.map((p) => ({
        id: p.id,
        ...p.data(),
      }));

      data.push(credit);
    }

    setCredits(data);
  };

  useEffect(() => {
    if (user) {
      loadCredits();
    }
  }, [user]);

  const handleAddCredit = async () => {
    if (!creditName || !creditAmount || !interestRate || !exchangeRate) {
      return notification.error({ message: 'Заполните все поля' });
    }

    const gelAmount = parseFloat(creditAmount);
    const rate = parseFloat(exchangeRate);
    const amountUSD = currency === 'USD' ? gelAmount : gelAmount / rate;

    await addDoc(getUserCreditsCollection(), {
      name: creditName,
      amount: amountUSD,
      originalAmount: amountUSD,
      interestRate: parseFloat(interestRate),
      currency,
    });

    setCreditName('');
    setCreditAmount('');
    setInterestRate('');
    setExchangeRate('');
    setCurrency('GEL');
    await loadCredits();
  };

  const handleRepay = async (credit) => {
    const input = paymentInputs[credit.id];

    if (
      !input ||
      !input.amount ||
      (input.currency !== 'USD' && !input.exchangeRate) ||
      !input.currency
    ) {
      return notification.error({ message: 'Введите все данные для погашения' });
    }

    let repayAmount;
    if (input.currency === 'USD') {
      repayAmount = parseFloat(input.amount);
    } else {
      repayAmount = parseFloat(input.amount) / parseFloat(input.exchangeRate);
    }

    const interest = parseFloat(credit.interestRate);
    const amountToSubtract = repayAmount * (1 - interest / 100);
    const newAmount = parseFloat(credit.amount) - amountToSubtract;

    const creditRef = doc(db, 'users', user.uid, 'credits', credit.id);
    await updateDoc(creditRef, {
      amount: newAmount > 0 ? newAmount : 0,
    });

    const converted =
      input.currency === 'USD'
        ? parseFloat(input.amount)
        : parseFloat(input.amount) / parseFloat(input.exchangeRate);

    await addDoc(getCreditPaymentsCollection(credit.id), {
      amount: repayAmount,
      originalCurrency: input.currency,
      exchangeRate: input.exchangeRate || 1,
      convertedAmount: converted,
      status: 'paid',
      date: new Date(),
    });

    setPaymentInputs((prev) => ({
      ...prev,
      [credit.id]: { amount: '', currency: 'USD', exchangeRate: '' },
    }));

    await loadCredits();
  };

  return (
    <div>
      <Divider>Добавить Кредит</Divider>
      <Input
        placeholder="Название кредита"
        value={creditName}
        onChange={(e) => setCreditName(e.target.value)}
      />
      <Input
        placeholder="Сумма"
        value={creditAmount}
        onChange={(e) => setCreditAmount(e.target.value)}
        type="number"
        style={{ marginTop: 8 }}
      />
      <Input
        placeholder="Процент"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        type="number"
        style={{ marginTop: 8 }}
      />
      <Select
        value={currency}
        onChange={setCurrency}
        style={{ marginTop: 8, width: '100%' }}
      >
        <Option value="GEL">GEL</Option>
        <Option value="USD">USD</Option>
      </Select>
      <Input
        placeholder="Курс обмена (GEL/USD)"
        value={exchangeRate}
        onChange={(e) => setExchangeRate(e.target.value)}
        type="number"
        style={{ marginTop: 8 }}
      />
      <Button type="primary" block onClick={handleAddCredit} style={{ marginTop: 10 }}>
        Добавить
      </Button>

      <Divider>Мои Кредиты</Divider>
      <List
        dataSource={credits}
        renderItem={(credit) => (
          <Card key={credit.id} title={credit.name} style={{ marginBottom: 16 }}>
            <p>Остаток: {credit.amount.toFixed(2)} USD</p>
            <Input
              placeholder="Сумма погашения"
              value={paymentInputs[credit.id]?.amount || ''}
              onChange={(e) =>
                setPaymentInputs((prev) => ({
                  ...prev,
                  [credit.id]: {
                    ...prev[credit.id],
                    amount: e.target.value,
                  },
                }))
              }
              style={{ marginTop: 8 }}
            />
            <Select
              value={paymentInputs[credit.id]?.currency || 'USD'}
              onChange={(value) =>
                setPaymentInputs((prev) => ({
                  ...prev,
                  [credit.id]: {
                    ...prev[credit.id],
                    currency: value,
                  },
                }))
              }
              style={{ marginTop: 8, width: '100%' }}
            >
              <Option value="USD">USD</Option>
              <Option value="GEL">GEL</Option>
            </Select>
            {paymentInputs[credit.id]?.currency === 'GEL' && (
              <Input
                placeholder="Курс обмена"
                value={paymentInputs[credit.id]?.exchangeRate || ''}
                onChange={(e) =>
                  setPaymentInputs((prev) => ({
                    ...prev,
                    [credit.id]: {
                      ...prev[credit.id],
                      exchangeRate: e.target.value,
                    },
                  }))
                }
                style={{ marginTop: 8 }}
              />
            )}
            <Button
              type="primary"
              block
              onClick={() => handleRepay(credit)}
              style={{ marginTop: 10 }}
            >
              Погасить
            </Button>
          </Card>
        )}
      />
    </div>
  );
};

export default Credits;
