import { useEffect, useState } from "react";
import { Card, Input, Select, Button, notification, Spin } from "antd";
import { db, auth } from "../firebase"; // Предполагаем, что вы импортировали auth из firebase
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const { Option } = Select;

const Earnings = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    currency: "USD",
    exchangeRate: 1,
    date: "",
    method: "нал",
  });

  // Получаем текущего пользователя напрямую
  const user = auth.currentUser; 

  useEffect(() => {
    if (!user) {
      notification.error({ message: "Пользователь не найден" });
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "earnings"), // Используем user.uid для получения подколлекции
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(data);
        setLoading(false);
      },
      (error) => {
        console.error("Ошибка при получении данных:", error);
        notification.error({ message: "Ошибка загрузки данных" });
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleAddEarning = async () => {
    const { title, amount, currency, exchangeRate, method } = form;

    if (!title || !amount || isNaN(amount)) {
      notification.error({ message: "Введите корректные данные" });
      return;
    }

    try {
      const convertedAmount =
        currency === "USD"
          ? parseFloat(amount)
          : parseFloat(amount) / parseFloat(exchangeRate || 1);

      // Сохраняем данные в подколлекцию "earnings" пользователя
      const docRef = await addDoc(collection(db, "users", user.uid, "earnings"), {
        title,
        amount: parseFloat(amount),
        currency,
        exchangeRate: parseFloat(exchangeRate || 1),
        convertedAmount,
        method,
        createdAt: new Date(),
        type: "earnings",
      });

      // Добавляем новую запись в состояние, чтобы она сразу отобразилась
      setEntries((prevEntries) => [
        ...prevEntries,
        { id: docRef.id, title, amount: parseFloat(amount), currency, convertedAmount, method }
      ]);

      notification.success({ message: "Доход добавлен" });

      // Сброс формы
      setForm({
        title: "",
        amount: "",
        currency: "USD",
        exchangeRate: 1,
        date: "",
        method: "нал",
      });
    } catch (err) {
      console.error("Ошибка добавления дохода:", err);
      notification.error({ message: "Ошибка добавления дохода" });
    }
  };

  if (loading)
    return (
      <Spin
        tip="Загрузка доходов..."
        style={{ display: "block", marginTop: 50 }}
      />
    );

  const grouped = entries
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    )
    .reduce((acc, entry) => {
      const date = new Date(entry.date || entry.createdAt);
      const month = date.toLocaleString("default", {
        year: "numeric",
        month: "long",
      });
      acc[month] = acc[month] || [];
      acc[month].push(entry);
      return acc;
    }, {});

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <Card title="Добавить доход" bordered={false}>
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
        {form.currency === "GEL" && (
          <Input
            placeholder="Курс USD"
            type="number"
            value={form.exchangeRate}
            onChange={(e) =>
              setForm({ ...form, exchangeRate: e.target.value })
            }
            style={{ marginBottom: 10 }}
          />
        )}
        <Select
          value={form.method}
          onChange={(value) => setForm({ ...form, method: value })}
          style={{ width: "100%", marginBottom: 10 }}
        >
          <Option value="нал">Нал</Option>
          <Option value="карта">Карта</Option>
        </Select>
        <Button type="primary" onClick={handleAddEarning} block>
          Добавить доход
        </Button>
      </Card>

      {/* {Object.entries(grouped).map(([month, items]) => (
        <div key={month} style={{ marginTop: 32 }}>
          <h3>{month}</h3>
          {items.map((entry) => (
            <Card key={entry.id} title={entry.title} style={{ marginBottom: 16 }}>
              <p>
                Сумма: <b>{entry.amount}</b> {entry.currency}
              </p>
              <p>
                В USD: <b>${entry.convertedAmount?.toFixed(2)}</b>
              </p>
              <p>
                Метод: <b>{entry.method}</b>
              </p>
            </Card>
          ))}
        </div>
      ))} */}

      {Object.entries(grouped).map(([month, items]) => (
  <div key={month} style={{ marginTop: 32 }}>
    <h3>{month}</h3>
    {items.map((entry) => {
  console.log(entry);  // Проверьте уникальность id
  return (
    <Card key={entry.id} title={entry.title} style={{ marginBottom: 16 }}>
      <p>
        Сумма: <b>{entry.amount}</b> {entry.currency}
      </p>
      <p>
        В USD: <b>${entry.convertedAmount?.toFixed(2)}</b>
      </p>
      <p>
        Метод: <b>{entry.method}</b>
      </p>
    </Card>
  );
})}

  </div>
))}

    </div>
  );
};

export default Earnings;
