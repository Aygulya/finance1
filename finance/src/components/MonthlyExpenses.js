import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Select,
  Button,
  List,
  Spin,
  notification,
} from "antd";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
const { Option } = Select;

// const MonthlyExpenses = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({
//     title: "",
//     amount: "",
//     currency: "GEL",
//     rate: "",
//   });
//   const [editingExpense, setEditingExpense] = useState(null); // Track the expense being edited

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const snap = await getDocs(collection(db, "monthlyExpenses"));
//         const data = snap.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setExpenses(data);
//       } catch (error) {
//         console.error("Ошибка загрузки расходов:", error);
//         notification.error({ message: "Ошибка загрузки расходов" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAdd = async () => {
//     const { title, amount, currency, rate } = form;

//     if (!title || !amount || isNaN(amount)) {
//       notification.error({ message: "Введите корректные данные" });
//       return;
//     }

//     const convertedAmount =
//       currency === "USD"
//         ? parseFloat(amount)
//         : parseFloat(amount) / parseFloat(rate || 1);

//     try {
//       const docRef = await addDoc(collection(db, "monthlyExpenses"), {
//         title,
//         amount: parseFloat(amount),
//         currency,
//         rate: parseFloat(rate || 1),
//         convertedAmount,
//         paid: false,
//         createdAt: new Date(),
//       });

//       setExpenses((prev) => [
//         ...prev,
//         {
//           id: docRef.id,
//           title,
//           amount: parseFloat(amount),
//           currency,
//           rate,
//           convertedAmount,
//           paid: false,
//         },
//       ]);

//       setForm({ title: "", amount: "", currency: "GEL", rate: "" });
//       notification.success({ message: "Расход добавлен" });
//     } catch (err) {
//       console.error("Ошибка добавления расхода:", err);
//       notification.error({ message: "Ошибка добавления расхода" });
//     }
//   };

//   const handleEdit = (expense) => {
//     setEditingExpense(expense); // Set the expense for editing
//     setForm({
//       title: expense.title,
//       amount: expense.amount,
//       currency: expense.currency,
//       rate: expense.rate,
//     });
//   };

//   const handleUpdate = async () => {
//     const { title, amount, currency, rate } = form;

//     if (!title || !amount || isNaN(amount)) {
//       notification.error({ message: "Введите корректные данные" });
//       return;
//     }

//     const convertedAmount =
//       currency === "USD"
//         ? parseFloat(amount)
//         : parseFloat(amount) / parseFloat(rate || 1);

//     try {
//       const expenseRef = doc(db, "monthlyExpenses", editingExpense.id);
//       await updateDoc(expenseRef, {
//         title,
//         amount: parseFloat(amount),
//         currency,
//         rate: parseFloat(rate || 1),
//         convertedAmount,
//       });

//       setExpenses((prev) =>
//         prev.map((e) =>
//           e.id === editingExpense.id
//             ? { ...e, title, amount: parseFloat(amount), currency, rate, convertedAmount }
//             : e
//         )
//       );

//       setEditingExpense(null); // Clear editing state
//       setForm({ title: "", amount: "", currency: "GEL", rate: "" }); // Clear form
//       notification.success({ message: "Расход обновлен" });
//     } catch (err) {
//       console.error("Ошибка обновления расхода:", err);
//       notification.error({ message: "Ошибка обновления расхода" });
//     }
//   };

//   const handlePay = async (expense) => {
//     try {
//       const expenseRef = doc(db, "monthlyExpenses", expense.id);
//       await updateDoc(expenseRef, { paid: true });

//       setExpenses((prev) =>
//         prev.map((e) => (e.id === expense.id ? { ...e, paid: true } : e))
//       );

//       notification.success({ message: "Расход отмечен как оплаченный" });
//     } catch (err) {
//       console.error("Ошибка при оплате:", err);
//       notification.error({ message: "Не удалось отметить как оплачено" });
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, "monthlyExpenses", id));
//       setExpenses((prev) => prev.filter((expense) => expense.id !== id));
//       notification.success({ message: "Расход удален" });
//     } catch (err) {
//       console.error("Ошибка при удалении:", err);
//       notification.error({ message: "Не удалось удалить расход" });
//     }
//   };

//   if (loading)
//     return (
//       <Spin tip="Загрузка расходов..." style={{ display: "block", marginTop: 50 }} />
//     );

//   return (
//     <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
//       <Card title={editingExpense ? "Редактировать расход" : "Добавить ежемесячный расход"} bordered={false}>
//         <Input
//           placeholder="Название"
//           value={form.title}
//           onChange={(e) =>
//             setForm((f) => ({ ...f, title: e.target.value }))
//           }
//           style={{ marginBottom: 10 }}
//         />
//         <Input
//           placeholder="Сумма"
//           type="number"
//           value={form.amount}
//           onChange={(e) =>
//             setForm((f) => ({ ...f, amount: e.target.value }))
//           }
//           style={{ marginBottom: 10 }}
//         />
//         <Select
//           value={form.currency}
//           onChange={(value) =>
//             setForm((f) => ({ ...f, currency: value }))
//           }
//           style={{ width: "100%", marginBottom: 10 }}
//         >
//           <Option value="GEL">GEL</Option>
//           <Option value="USD">USD</Option>
//         </Select>
//         {form.currency === "GEL" && (
//           <Input
//             placeholder="Курс USD"
//             type="number"
//             value={form.rate}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, rate: e.target.value }))
//             }
//             style={{ marginBottom: 10 }}
//           />
//         )}
//         {editingExpense ? (
//           <Button type="primary" onClick={handleUpdate} block>
//             Обновить расход
//           </Button>
//         ) : (
//           <Button type="primary" onClick={handleAdd} block>
//             Добавить расход
//           </Button>
//         )}
//       </Card>

//       <List
//         header={<b>Список расходов</b>}
//         itemLayout="vertical"
//         dataSource={expenses}
//         style={{ marginTop: 24 }}
//         locale={{ emptyText: "Нет расходов" }}
//         renderItem={(expense) => (
//           <Card
//             key={expense.id}
//             style={{
//               marginBottom: 16,
//               // backgroundImage: getBackgroundImage(expense.title),
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//             title={expense.title}
//             extra={
//               <>
//   {expense.paid ? (
//     <Button type="text" disabled style={{ marginRight: 8, color: "green" }}>
//       Оплачено
//     </Button>
//   ) : (
//     <Button
//       type="link"
//       onClick={() => handlePay(expense)}
//       style={{ marginRight: 8 }}
//     >
//       Оплатить
//     </Button>
//   )}
//                 <Button
//                   type="link"
//                   onClick={() => handleEdit(expense)} // Edit button
//                   style={{ marginRight: 8 }}
//                 >
//                   Редактировать
//                 </Button>
//                 <Button
//                   type="link"
//                   onClick={() => handleDelete(expense)}
//                 >
//                   Удалить
//                 </Button>
//               </>
//             }
//           >
//             <p>
//               Сумма: {expense.amount} {expense.currency}
//               <br />
//               В USD:{" "}
//               {typeof expense.convertedAmount === "number"
//                 ? expense.convertedAmount.toFixed(2)
//                 : "—"}
//             </p>
//           </Card>
//         )}
//       />
//     </div>
//   );
// };

const MonthlyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    currency: "GEL",
    rate: "",
  });
  const [editingExpense, setEditingExpense] = useState(null); // Track the expense being edited

  const user = auth.currentUser; // Замените на фактический идентификатор пользователя, например, из контекста или глобального состояния.

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const snap = await getDocs(collection(db, "users", user.uid, "monthlyExpenses"));
  //       const data = snap.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setExpenses(data);
  //     } catch (error) {
  //       console.error("Ошибка загрузки расходов:", error);
  //       notification.error({ message: "Ошибка загрузки расходов" });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [user]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        fetchData(firebaseUser.uid);
      } else {
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const fetchData = async (uid) => {
    try {
      const snap = await getDocs(collection(db, "users", uid, "monthlyExpenses"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    } catch (error) {
      console.error("Ошибка загрузки расходов:", error);
      notification.error({ message: "Ошибка загрузки расходов" });
    } finally {
      setLoading(false);
    }
  };
  

  const handleAdd = async () => {
    const { title, amount, currency, rate } = form;

    if (!title || !amount || isNaN(amount)) {
      notification.error({ message: "Введите корректные данные" });
      return;
    }

    const convertedAmount =
      currency === "USD"
        ? parseFloat(amount)
        : parseFloat(amount) / parseFloat(rate || 1);

    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "monthlyExpenses"), {
        title,
        amount: parseFloat(amount),
        currency,
        rate: parseFloat(rate || 1),
        convertedAmount,
        paid: false,
        createdAt: new Date(),
      });

      setExpenses((prev) => [
        ...prev,
        {
          id: docRef.id,
          title,
          amount: parseFloat(amount),
          currency,
          rate,
          convertedAmount,
          paid: false,
        },
      ]);

      setForm({ title: "", amount: "", currency: "GEL", rate: "" });
      notification.success({ message: "Расход добавлен" });
    } catch (err) {
      console.error("Ошибка добавления расхода:", err);
      notification.error({ message: "Ошибка добавления расхода" });
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense); // Set the expense for editing
    setForm({
      title: expense.title,
      amount: expense.amount,
      currency: expense.currency,
      rate: expense.rate,
    });
  };

  const handleUpdate = async () => {
    const { title, amount, currency, rate } = form;

    if (!title || !amount || isNaN(amount)) {
      notification.error({ message: "Введите корректные данные" });
      return;
    }

    const convertedAmount =
      currency === "USD"
        ? parseFloat(amount)
        : parseFloat(amount) / parseFloat(rate || 1);

    try {
      const expenseRef = doc(db, "users", user.uid, "monthlyExpenses", editingExpense.id);
      await updateDoc(expenseRef, {
        title,
        amount: parseFloat(amount),
        currency,
        rate: parseFloat(rate || 1),
        convertedAmount,
      });

      setExpenses((prev) =>
        prev.map((e) =>
          e.id === editingExpense.id
            ? { ...e, title, amount: parseFloat(amount), currency, rate, convertedAmount }
            : e
        )
      );

      setEditingExpense(null); // Clear editing state
      setForm({ title: "", amount: "", currency: "GEL", rate: "" }); // Clear form
      notification.success({ message: "Расход обновлен" });
    } catch (err) {
      console.error("Ошибка обновления расхода:", err);
      notification.error({ message: "Ошибка обновления расхода" });
    }
  };

  const handlePay = async (expense) => {
    try {
      const expenseRef = doc(db, "users", user.uid, "monthlyExpenses", expense.id);
      await updateDoc(expenseRef, { paid: true });

      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? { ...e, paid: true } : e))
      );

      notification.success({ message: "Расход отмечен как оплаченный" });
    } catch (err) {
      console.error("Ошибка при оплате:", err);
      notification.error({ message: "Не удалось отметить как оплачено" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "monthlyExpenses", id));
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      notification.success({ message: "Расход удален" });
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      notification.error({ message: "Не удалось удалить расход" });
    }
  };

  if (loading)
    return (
      <Spin tip="Загрузка расходов..." style={{ display: "block", marginTop: 50 }} />
    );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <Card title={editingExpense ? "Редактировать расход" : "Добавить ежемесячный расход"} bordered={false}>
        <Input
          placeholder="Название"
          value={form.title}
          onChange={(e) =>
            setForm((f) => ({ ...f, title: e.target.value }))
          }
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Сумма"
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm((f) => ({ ...f, amount: e.target.value }))
          }
          style={{ marginBottom: 10 }}
        />
        <Select
          value={form.currency}
          onChange={(value) =>
            setForm((f) => ({ ...f, currency: value }))
          }
          style={{ width: "100%", marginBottom: 10 }}
        >
          <Option value="GEL">GEL</Option>
          <Option value="USD">USD</Option>
        </Select>
        {form.currency === "GEL" && (
          <Input
            placeholder="Курс USD"
            type="number"
            value={form.rate}
            onChange={(e) =>
              setForm((f) => ({ ...f, rate: e.target.value }))
            }
            style={{ marginBottom: 10 }}
          />
        )}
        {editingExpense ? (
          <Button type="primary" onClick={handleUpdate} block>
            Обновить расход
          </Button>
        ) : (
          <Button type="primary" onClick={handleAdd} block>
            Добавить расход
          </Button>
        )}
      </Card>

      <List
        header={<b>Список расходов</b>}
        itemLayout="vertical"
        dataSource={expenses}
        style={{ marginTop: 24 }}
        locale={{ emptyText: "Нет расходов" }}
        renderItem={(expense) => (
          <Card
            key={expense.id}
            style={{
              marginBottom: 16,
            }}
            title={expense.title}
            extra={
              <>
                {expense.paid ? (
                  <Button type="text" disabled style={{ marginRight: 8, color: "green" }}>
                    Оплачено
                  </Button>
                ) : (
                  <Button
                    type="link"
                    onClick={() => handlePay(expense)}
                    style={{ marginRight: 8 }}
                  >
                    Оплатить
                  </Button>
                )}
                <Button
                  type="link"
                  onClick={() => handleEdit(expense)} // Edit button
                  style={{ marginRight: 8 }}
                >
                  Редактировать
                </Button>
                <Button
                  type="link"
                  onClick={() => handleDelete(expense.id)} // Delete button
                >
                  Удалить
                </Button>
              </>
            }
          >
            <div>Сумма: {expense.convertedAmount} {expense.currency}</div>
            <div>Курс: {expense.rate}</div>
          </Card>
        )}
      />
    </div>
  );
};

export default MonthlyExpenses;

