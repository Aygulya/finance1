// // import { useEffect, useState } from "react";
// // import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
// // import { db } from "../firebase";
// // import {
// //   Button,
// //   Input,
// //   Select,
// //   List,
// //   Card,
// //   notification,
// //   Divider,
// //   Spin,
// //   Modal,
// // } from "antd";

// // const { Option } = Select;

// // const Debts = () => {
// //   const [debts, setDebts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [form, setForm] = useState({ title: "", amount: "", currency: "USD", exchangeRate: 1 });
// //   const [paymentModal, setPaymentModal] = useState({ visible: false, debt: null });
// //   const [paymentForm, setPaymentForm] = useState({ amount: "", currency: "USD", exchangeRate: 1 });

// //   useEffect(() => {
// //     const unsubscribe = onSnapshot(collection(db, "debts"), async (snapshot) => {
// //       const data = [];

// //       for (const doc of snapshot.docs) {
// //         const debt = { id: doc.id, ...doc.data() };
// //         const paymentsSnap = await getDocs(collection(db, "debts", doc.id, "payments"));
// //         const payments = paymentsSnap.docs.map(p => p.data());
// //         const paidAmount = payments
// //           .filter(p => p.status === "paid")
// //           .reduce((sum, p) => {
// //             const rate = parseFloat(p.exchangeRate || 1);
// //             const amt = parseFloat(p.amount || 0);
// //             return sum + amt / rate;
// //           }, 0);

// //         debt.paid = paidAmount;
// //         data.push(debt);
// //       }

// //       setDebts(data);
// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const handleAddDebt = async () => {
// //     const { title, amount, currency, exchangeRate } = form;

// //     if (!title || !amount || isNaN(amount)) {
// //       notification.error({ message: "Введите корректные данные" });
// //       return;
// //     }

// //     try {
// //       await addDoc(collection(db, "debts"), {
// //         title,
// //         amount: parseFloat(amount),
// //         currency,
// //         exchangeRate: parseFloat(exchangeRate || 1),
// //         createdAt: new Date(),
// //       });
// //       notification.success({ message: "Долг добавлен" });
// //       setForm({ title: "", amount: "", currency: "USD", exchangeRate: 1 });
// //     } catch (err) {
// //       console.error("Ошибка добавления долга:", err);
// //       notification.error({ message: "Ошибка добавления долга" });
// //     }
// //   };

// //   const handleOpenPayment = (debt) => {
// //     setPaymentModal({ visible: true, debt });
// //     setPaymentForm({ amount: "", currency: "USD", exchangeRate: 1 });
// //   };

// //   const handleAddPayment = async () => {
// //     const { amount, currency, exchangeRate } = paymentForm;
// //     const { debt } = paymentModal;

// //     if (!amount || isNaN(amount)) {
// //       notification.error({ message: "Введите корректную сумму" });
// //       return;
// //     }

// //     try {
// //       await addDoc(collection(db, "debts", debt.id, "payments"), {
// //         amount: parseFloat(amount),
// //         originalCurrency: currency,
// //         exchangeRate: parseFloat(exchangeRate || 1),
// //         status: "paid",
// //         date: new Date(),
// //       });
// //       notification.success({ message: "Платёж добавлен" });
// //       setPaymentModal({ visible: false, debt: null });
// //     } catch (err) {
// //       console.error("Ошибка платежа:", err);
// //       notification.error({ message: "Ошибка при добавлении платежа" });
// //     }
// //   };

// //   if (loading) return <Spin tip="Загрузка долгов..." />;

// //   return (
// //     <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
// //       <Card title="Добавить долг" bordered={false}>
// //         <Input
// //           placeholder="Название"
// //           value={form.title}
// //           onChange={(e) => setForm({ ...form, title: e.target.value })}
// //           style={{ marginBottom: 10 }}
// //         />
// //         <Input
// //           placeholder="Сумма"
// //           type="number"
// //           value={form.amount}
// //           onChange={(e) => setForm({ ...form, amount: e.target.value })}
// //           style={{ marginBottom: 10 }}
// //         />
// //         <Select
// //           value={form.currency}
// //           onChange={(value) => setForm({ ...form, currency: value })}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         >
// //           <Option value="USD">USD</Option>
// //           <Option value="GEL">GEL</Option>
// //         </Select>
// //         <Input
// //           placeholder="Курс"
// //           type="number"
// //           value={form.exchangeRate}
// //           onChange={(e) => setForm({ ...form, exchangeRate: e.target.value })}
// //           style={{ marginBottom: 10 }}
// //         />
// //         <Button type="primary" onClick={handleAddDebt} block>
// //           Добавить
// //         </Button>
// //       </Card>

// //       <Divider>Список долгов</Divider>

// //       {debts.length === 0 ? (
// //         <p>Нет долгов</p>
// //       ) : (
// //         <>
// //               <Divider />
// //               <h4>История платежей:</h4>
// //               <List
// //                 size="small"
// //                 dataSource={debts.payments}
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

// //         <List
// //           dataSource={debts}
// //           renderItem={(debt) => {
// //             const remaining = debt.amount / (debt.exchangeRate || 1) - debt.paid;
// //             return (
// //               <List.Item>
// //                 <Card title={debt.title} style={{ width: "100%" }}>
// //                   <p>Сумма: <strong>{debt.amount}</strong> {debt.currency}</p>
// //                   <p>Погашено: ${debt.paid.toFixed(2)}</p>
// //                   <p>Остаток: ${remaining.toFixed(2)}</p>
// //                   <Button onClick={() => handleOpenPayment(debt)} type="primary">
// //                     Внести платёж
// //                   </Button>
// //                 </Card>
// //               </List.Item>
// //             );
// //           }}
// //         />
// //         </>
// //       )}

// //       <Modal
// //         title="Внести платёж"
// //         open={paymentModal.visible}
// //         onCancel={() => setPaymentModal({ visible: false, debt: null })}
// //         onOk={handleAddPayment}
// //         okText="Добавить"
// //         cancelText="Отмена"
// //       >
// //         <Input
// //           placeholder="Сумма"
// //           type="number"
// //           value={paymentForm.amount}
// //           onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
// //           style={{ marginBottom: 10 }}
// //         />
// //         <Select
// //           value={paymentForm.currency}
// //           onChange={(value) => setPaymentForm({ ...paymentForm, currency: value })}
// //           style={{ width: "100%", marginBottom: 10 }}
// //         >
// //           <Option value="USD">USD</Option>
// //           <Option value="GEL">GEL</Option>
// //         </Select>
// //         <Input
// //           placeholder="Курс"
// //           type="number"
// //           value={paymentForm.exchangeRate}
// //           onChange={(e) => setPaymentForm({ ...paymentForm, exchangeRate: e.target.value })}
// //         />
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Debts;
// import { useEffect, useState } from "react";
// import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import {
//   Button,
//   Input,
//   Select,
//   List,
//   Card,
//   notification,
//   Divider,
//   Spin,
//   Modal,
// } from "antd";

// const { Option } = Select;

// const Debts = () => {
//   const [debts, setDebts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({ title: "", amount: "", currency: "USD", exchangeRate: 1 });
//   const [paymentModal, setPaymentModal] = useState({ visible: false, debt: null });
//   const [paymentForm, setPaymentForm] = useState({ amount: "", currency: "USD", exchangeRate: 1 });

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "debts"), async (snapshot) => {
//       const data = [];

//       for (const doc of snapshot.docs) {
//         const debt = { id: doc.id, ...doc.data() };
//         const paymentsSnap = await getDocs(collection(db, "debts", doc.id, "payments"));
//         const payments = paymentsSnap.docs.map(p => p.data());
//         const paidAmount = payments
//           .filter(p => p.status === "paid")
//           .reduce((sum, p) => {
//             const rate = parseFloat(p.exchangeRate || 1);
//             const amt = parseFloat(p.amount || 0);
//             return sum + amt / rate;
//           }, 0);

//         debt.paid = paidAmount;
//         debt.payments = payments; // Добавляем платежи в долг
//         data.push(debt);
//       }

//       setDebts(data);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleAddDebt = async () => {
//     const { title, amount, currency, exchangeRate } = form;

//     if (!title || !amount || isNaN(amount)) {
//       notification.error({ message: "Введите корректные данные" });
//       return;
//     }

//     try {
//       await addDoc(collection(db, "debts"), {
//         title,
//         amount: parseFloat(amount),
//         currency,
//         exchangeRate: parseFloat(exchangeRate || 1),
//         createdAt: new Date(),
//       });
//       notification.success({ message: "Долг добавлен" });
//       setForm({ title: "", amount: "", currency: "USD", exchangeRate: 1 });
//     } catch (err) {
//       console.error("Ошибка добавления долга:", err);
//       notification.error({ message: "Ошибка добавления долга" });
//     }
//   };

//   const handleOpenPayment = (debt) => {
//     setPaymentModal({ visible: true, debt });
//     setPaymentForm({ amount: "", currency: "USD", exchangeRate: 1 });
//   };

//   const handleAddPayment = async () => {
//     const { amount, currency, exchangeRate } = paymentForm;
//     const { debt } = paymentModal;

//     if (!amount || isNaN(amount)) {
//       notification.error({ message: "Введите корректную сумму" });
//       return;
//     }

//     try {
//       await addDoc(collection(db, "debts", debt.id, "payments"), {
//         amount: parseFloat(amount),
//         originalCurrency: currency,
//         exchangeRate: parseFloat(exchangeRate || 1),
//         status: "paid",
//         date: new Date(),
//       });
//       notification.success({ message: "Платёж добавлен" });
//       setPaymentModal({ visible: false, debt: null });
//     } catch (err) {
//       console.error("Ошибка платежа:", err);
//       notification.error({ message: "Ошибка при добавлении платежа" });
//     }
//   };

//   if (loading) return <Spin tip="Загрузка долгов..." />;

//   return (
//     <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
//       <Card title="Добавить долг" bordered={false}>
//         <Input
//           placeholder="Название"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           style={{ marginBottom: 10 }}
//         />
//         <Input
//           placeholder="Сумма"
//           type="number"
//           value={form.amount}
//           onChange={(e) => setForm({ ...form, amount: e.target.value })}
//           style={{ marginBottom: 10 }}
//         />
//         <Select
//           value={form.currency}
//           onChange={(value) => setForm({ ...form, currency: value })}
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           <Option value="USD">USD</Option>
//           <Option value="GEL">GEL</Option>
//         </Select>
//         <Input
//           placeholder="Курс"
//           type="number"
//           value={form.exchangeRate}
//           onChange={(e) => setForm({ ...form, exchangeRate: e.target.value })}
//           style={{ marginBottom: 10 }}
//         />
//         <Button type="primary" onClick={handleAddDebt} block>
//           Добавить
//         </Button>
//       </Card>

//       <Divider>Список долгов</Divider>

//       {debts.length === 0 ? (
//         <p>Нет долгов</p>
//       ) : (
//         <List
//           dataSource={debts}
//           renderItem={(debt) => {
//             const remaining = debt.amount / (debt.exchangeRate || 1) - debt.paid;
//             return (
//               <List.Item key={debt.id}>
//                 <Card title={debt.title} style={{ width: "100%" }}>
//                   <p>Сумма: <strong>{debt.amount}</strong> {debt.currency}</p>
//                   <p>Погашено: ${debt.paid.toFixed(2)}</p>
//                   <p>Остаток: ${remaining.toFixed(2)}</p>
//                   <Button onClick={() => handleOpenPayment(debt)} type="primary">
//                     Внести платёж
//                   </Button>
//                   <Divider />
//                   <h4>История платежей:</h4>
//                   <List
//                     size="small"
//                     dataSource={debt.payments}
//                     renderItem={(payment) => {
//                       let dateString = '---';
//                       try {
//                         if (payment.date?.toDate) {
//                           dateString = payment.date.toDate().toISOString().slice(0, 10);
//                         } else if (payment.date instanceof Date) {
//                           dateString = payment.date.toISOString().slice(0, 10);
//                         }
//                       } catch (e) {
//                         dateString = 'Неверная дата';
//                       }

//                       return (
//                         <List.Item>
//                           <p>Сумма: {payment.amount} {payment.originalCurrency}</p>
//                           <p>Дата: {dateString}</p>
//                         </List.Item>
//                       );
//                     }}
//                   />
//                 </Card>
//               </List.Item>
//             );
//           }}
//         />
//       )}

//       <Modal
//         title="Внести платёж"
//         open={paymentModal.visible}
//         onCancel={() => setPaymentModal({ visible: false, debt: null })}
//         onOk={handleAddPayment}
//         okText="Добавить"
//         cancelText="Отмена"
//       >
//         <Input
//           placeholder="Сумма"
//           type="number"
//           value={paymentForm.amount}
//           onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
//           style={{ marginBottom: 10 }}
//         />
//         <Select
//           value={paymentForm.currency}
//           onChange={(value) => setPaymentForm({ ...paymentForm, currency: value })}
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           <Option value="USD">USD</Option>
//           <Option value="GEL">GEL</Option>
//         </Select>
//         <Input
//           placeholder="Курс"
//           type="number"
//           value={paymentForm.exchangeRate}
//           onChange={(e) => setPaymentForm({ ...paymentForm, exchangeRate: e.target.value })}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Debts;
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import the auth object to get the current user's UID
import {
  Button,
  Input,
  Select,
  List,
  Card,
  notification,
  Divider,
  Spin,
  Modal,
} from "antd";

const { Option } = Select;

const Debts = () => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", amount: "", currency: "USD", exchangeRate: 1 });
  const [paymentModal, setPaymentModal] = useState({ visible: false, debt: null });
  const [paymentForm, setPaymentForm] = useState({ amount: "", currency: "USD", exchangeRate: 1 });

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, "users", user.uid, "debts"), async (snapshot) => {
      const data = [];

      for (const doc of snapshot.docs) {
        const debt = { id: doc.id, ...doc.data() };
        const paymentsSnap = await getDocs(collection(db, "users", user.uid, "debts", doc.id, "payments"));
        const payments = paymentsSnap.docs.map(p => p.data());
        const paidAmount = payments
          .filter(p => p.status === "paid")
          .reduce((sum, p) => {
            const rate = parseFloat(p.exchangeRate || 1);
            const amt = parseFloat(p.amount || 0);
            return sum + amt / rate;
          }, 0);

        debt.paid = paidAmount;
        debt.payments = payments; // Add payments to the debt object
        data.push(debt);
      }

      setDebts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddDebt = async () => {
    const { title, amount, currency, exchangeRate } = form;

    if (!title || !amount || isNaN(amount)) {
      notification.error({ message: "Введите корректные данные" });
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "debts"), {
        title,
        amount: parseFloat(amount),
        currency,
        exchangeRate: parseFloat(exchangeRate || 1),
        createdAt: new Date(),
      });
      notification.success({ message: "Долг добавлен" });
      setForm({ title: "", amount: "", currency: "USD", exchangeRate: 1 });
    } catch (err) {
      console.error("Ошибка добавления долга:", err);
      notification.error({ message: "Ошибка добавления долга" });
    }
  };

  const handleOpenPayment = (debt) => {
    setPaymentModal({ visible: true, debt });
    setPaymentForm({ amount: "", currency: "USD", exchangeRate: 1 });
  };

  const handleAddPayment = async () => {
    const { amount, currency, exchangeRate } = paymentForm;
    const { debt } = paymentModal;

    if (!amount || isNaN(amount)) {
      notification.error({ message: "Введите корректную сумму" });
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "debts", debt.id, "payments"), {
        amount: parseFloat(amount),
        originalCurrency: currency,
        exchangeRate: parseFloat(exchangeRate || 1),
        status: "paid",
        date: new Date(),
      });
      notification.success({ message: "Платёж добавлен" });
      setPaymentModal({ visible: false, debt: null });
    } catch (err) {
      console.error("Ошибка платежа:", err);
      notification.error({ message: "Ошибка при добавлении платежа" });
    }
  };

  if (loading) return <Spin tip="Загрузка долгов..." />;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <Card title="Добавить долг" bordered={false}>
        <Input
          placeholder="Название"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Сумма"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Select
          value={form.currency}
          onChange={(value) => setForm({ ...form, currency: value })}
          style={{ width: "100%", marginBottom: 10 }}
        >
          <Option value="USD">USD</Option>
          <Option value="GEL">GEL</Option>
        </Select>
        <Input
          placeholder="Курс"
          type="number"
          value={form.exchangeRate}
          onChange={(e) => setForm({ ...form, exchangeRate: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={handleAddDebt} block>
          Добавить
        </Button>
      </Card>

      <Divider>Список долгов</Divider>

      {debts.length === 0 ? (
        <p>Нет долгов</p>
      ) : (
        <List
          dataSource={debts}
          renderItem={(debt) => {
            const remaining = debt.amount / (debt.exchangeRate || 1) - debt.paid;
            return (
              <List.Item key={debt.id}>
                <Card title={debt.title} style={{ width: "100%" }}>
                  <p>Сумма: <strong>{debt.amount}</strong> {debt.currency}</p>
                  <p>Погашено: ${debt.paid.toFixed(2)}</p>
                  <p>Остаток: ${remaining.toFixed(2)}</p>
                  <Button onClick={() => handleOpenPayment(debt)} type="primary">
                    Внести платёж
                  </Button>
                  <Divider />
                  <h4>История платежей:</h4>
                  <List
                    size="small"
                    dataSource={debt.payments}
                    renderItem={(payment) => {
                      let dateString = '---';
                      try {
                        if (payment.date?.toDate) {
                          dateString = payment.date.toDate().toISOString().slice(0, 10);
                        } else if (payment.date instanceof Date) {
                          dateString = payment.date.toISOString().slice(0, 10);
                        }
                      } catch (e) {
                        dateString = 'Неверная дата';
                      }

                      return (
                        <List.Item>
                          <p>Сумма: {payment.amount} {payment.originalCurrency}</p>
                          <p>Дата: {dateString}</p>
                        </List.Item>
                      );
                    }}
                  />
                </Card>
              </List.Item>
            );
          }}
        />
      )}

      <Modal
        title="Внести платёж"
        open={paymentModal.visible}
        onCancel={() => setPaymentModal({ visible: false, debt: null })}
        onOk={handleAddPayment}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Input
          placeholder="Сумма"
          value={paymentForm.amount}
          onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Select
          value={paymentForm.currency}
          onChange={(value) => setPaymentForm({ ...paymentForm, currency: value })}
          style={{ width: "100%", marginBottom: 10 }}
        >
          <Option value="USD">USD</Option>
          <Option value="GEL">GEL</Option>
        </Select>
        <Input
          placeholder="Курс"
          type="number"
          value={paymentForm.exchangeRate}
          onChange={(e) => setPaymentForm({ ...paymentForm, exchangeRate: e.target.value })}
          style={{ marginBottom: 10 }}
        />
      </Modal>
    </div>
  );
};

export default Debts;
