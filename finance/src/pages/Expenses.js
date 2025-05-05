// import { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import {
//   collection,
//   addDoc,
//   onSnapshot,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from 'firebase/firestore';
// import { Input, Select, Button, DatePicker, Modal, Space, Divider } from 'antd';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
// import dayjs from 'dayjs';


// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const categories = {
//   "еда": "#ff4d4f",
//   "дорога": "#1890ff",
//   "сигареты": "#b37feb",
//   "бытовая химия": "#73d13d",
//   "косметика": "#ff85c0",
//   "для дома": "#ffd666",
//   "одежда": "#ffa940",
//   "техника": "#40a9ff",
//   "развитие": "#95de64",
//   "развлечения": "#6e2b48",
//   "другое": "#d9d9d9"
// };

// const Expenses = () => {
//   const [entries, setEntries] = useState([]);
//   const [form, setForm] = useState({ title: '', amount: '', currency: 'GEL', rate: '', category: 'еда' });
//   const [filterDates, setFilterDates] = useState([]);
//   const [editModal, setEditModal] = useState({ visible: false, entry: null });

//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, 'entries'), (snap) => {
//       const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//         .filter(e => e.type === 'expense');
//       setEntries(data);
//     });
//     return () => unsub();
//   }, []);

//   const handleAdd = async () => {
//     const converted = form.currency === 'USD'
//       ? parseFloat(form.amount)
//       : parseFloat(form.amount) / parseFloat(form.rate);

//     const entry = {
//       title: form.title,
//       amount: parseFloat(form.amount),
//       currency: form.currency,
//       rate: form.currency === 'GEL' ? parseFloat(form.rate) : null,
//       convertedAmount: converted,
//       category: form.category,
//       type: 'expense',
//       createdAt: new Date()
//     };

//     await addDoc(collection(db, 'entries'), entry);
//     setForm({ title: '', amount: '', currency: 'GEL', rate: '', category: 'еда' });
//   };

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, 'entries', id));
//   };

//   const handleEditSave = async () => {
//     const converted = editModal.entry.currency === 'USD'
//       ? parseFloat(editModal.entry.amount)
//       : parseFloat(editModal.entry.amount) / parseFloat(editModal.entry.rate);

//     await updateDoc(doc(db, 'entries', editModal.entry.id), {
//       ...editModal.entry,
//       convertedAmount: converted
//     });

//     setEditModal({ visible: false, entry: null });
//   };

//   const filteredEntries = filterDates.length === 2
//     ? entries.filter(e => {
//         const date = dayjs(e.createdAt.toDate ? e.createdAt.toDate() : e.createdAt);
//         return date.isAfter(filterDates[0].startOf('day')) && date.isBefore(filterDates[1].endOf('day'));
//       })
//     : entries;

//   const dataForChart = Object.entries(
//     filteredEntries.reduce((acc, cur) => {
//       acc[cur.category] = (acc[cur.category] || 0) + cur.convertedAmount;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Разовые расходы</h2>

//       <Space wrap>
//         <Input placeholder="Название" style={{ width: 200 }} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
//         <Input placeholder="Сумма" style={{ width: 200 }} value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
//         <Select value={form.currency} style={{ width: 200 }} onChange={v => setForm(f => ({ ...f, currency: v }))}>
//           <Option value="GEL">GEL</Option>
//           <Option value="USD">USD</Option>
//         </Select>
//         {form.currency === 'GEL' && (
//           <Input placeholder="Курс" style={{ width: 200 }} value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} />
//         )}
//         <Select value={form.category} style={{ width: 200 }} onChange={v => setForm(f => ({ ...f, category: v }))}>
//           {Object.keys(categories).map(cat => (
//             <Option key={cat} value={cat}>{cat}</Option>
//           ))}
//         </Select>
//         <Button type="primary" style={{ width: 200 }} onClick={handleAdd}>Добавить</Button>
//       </Space>

//       <Divider />
//       <RangePicker onChange={(val) => setFilterDates(val)} />

//       <ul style={{ marginTop: 20 }}>
//         {filteredEntries.map(entry => (
//           <li key={entry.id} style={{ marginBottom: 10 }}>
//             {/* <Tag color={categories[entry.category]}>{entry.category}</Tag> */}
//             <strong>{entry.title}</strong> — {entry.amount} {entry.currency} → {entry.convertedAmount?.toFixed(2)} USD
//             <Space style={{ marginLeft: 10 }}>
//               {/* Кнопка редактирования с иконкой карандаша */}
//               <Button
//                 size="small"
//                 onClick={() => setEditModal({ visible: true, entry })}
//                 icon={<EditOutlined />}
//                 style={{ marginRight: 5 }}
//               >
//               </Button>

//               {/* Кнопка удаления с иконкой корзинки */}
//               <Button
//                 danger
//                 size="small"
//                 onClick={() => handleDelete(entry.id)}
//                 icon={<DeleteOutlined />}
//               >
//               </Button>
//             </Space>
//           </li>
//         ))}
//       </ul>

//       <Divider>Диаграмма расходов</Divider>
//       <ResponsiveContainer width="85%" height={300}>
//         <PieChart>
//           <Pie dataKey="value" data={dataForChart} label>
//             {dataForChart.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={categories[entry.name]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>

//       <Modal
//         title="Редактировать расход"
//         visible={editModal.visible}
//         onOk={handleEditSave}
//         onCancel={() => setEditModal({ visible: false, entry: null })}
//       >
//         {editModal.entry && (
//           <Space direction="vertical" style={{ width: '100%' }}>
//             <Input
//               value={editModal.entry.title}
//               onChange={e => setEditModal(m => ({ ...m, entry: { ...m.entry, title: e.target.value } }))}
//             />
//             <Input
//               value={editModal.entry.amount}
//               onChange={e => setEditModal(m => ({ ...m, entry: { ...m.entry, amount: e.target.value } }))}
//             />
//             <Select
//               value={editModal.entry.currency}
//               onChange={v => setEditModal(m => ({ ...m, entry: { ...m.entry, currency: v } }))}
//             >
//               <Option value="GEL">GEL</Option>
//               <Option value="USD">USD</Option>
//             </Select>
//             {editModal.entry.currency === 'GEL' && (
//               <Input
//                 value={editModal.entry.rate}
//                 onChange={e => setEditModal(m => ({ ...m, entry: { ...m.entry, rate: e.target.value } }))}
//               />
//             )}
//             <Select
//               value={editModal.entry.category}
//               onChange={v => setEditModal(m => ({ ...m, entry: { ...m.entry, category: v } }))}
//             >
//               {Object.keys(categories).map(cat => (
//                 <Option key={cat} value={cat}>{cat}</Option>
//               ))}
//             </Select>
//           </Space>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Expenses;
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Input, Select, Button, DatePicker, Modal, Space, Divider } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import dayjs from 'dayjs';
import { getAuth } from 'firebase/auth';

const { Option } = Select;
const { RangePicker } = DatePicker;

const categories = {
  "еда": "#ff4d4f",
  "дорога": "#1890ff",
  "сигареты": "#b37feb",
  "бытовая химия": "#73d13d",
  "косметика": "#ff85c0",
  "для дома": "#ffd666",
  "одежда": "#ffa940",
  "техника": "#40a9ff",
  "развитие": "#95de64",
  "развлечения": "#6e2b48",
  "другое": "#d9d9d9"
};

const Expenses = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', currency: 'GEL', rate: '', category: 'еда' });
  const [filterDates, setFilterDates] = useState([]);
  const [editModal, setEditModal] = useState({ visible: false, entry: null });
  
  const auth = getAuth();
  const user = auth.currentUser; // Получаем текущего пользователя

  // Загружаем расходы из подколлекции пользователя
  useEffect(() => {
    if (!user) {
      console.error('Пользователь не авторизован');
      return;
    }

    const userRef = doc(db, 'users', user.uid); // Ссылка на пользователя
    const expensesRef = collection(userRef, 'expenses'); // Ссылка на подколлекцию расходов

    const unsub = onSnapshot(expensesRef, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(e => e.type === 'expense');
      setEntries(data);
    });

    return () => unsub();
  }, [user]);

  const handleAdd = async () => {
    if (!user) {
      console.error('Пользователь не авторизован');
      return;
    }

    const converted = form.currency === 'USD'
      ? parseFloat(form.amount)
      : parseFloat(form.amount) / parseFloat(form.rate);

    const entry = {
      title: form.title,
      amount: parseFloat(form.amount),
      currency: form.currency,
      rate: form.currency === 'GEL' ? parseFloat(form.rate) : null,
      convertedAmount: converted,
      category: form.category,
      type: 'expense',
      paid: true,
      createdAt: new Date()
    };

    // Добавляем расход в подколлекцию пользователя
    const userRef = doc(db, 'users', user.uid); // Ссылка на пользователя
    const expensesRef = collection(userRef, 'expenses'); // Ссылка на подколлекцию расходов

    await addDoc(expensesRef, entry);
    setForm({ title: '', amount: '', currency: 'GEL', rate: '', category: 'еда' });
  };

  const handleDelete = async (id) => {
    if (!user) {
      console.error('Пользователь не авторизован');
      return;
    }

    const userRef = doc(db, 'users', user.uid); // Ссылка на пользователя
    const expensesRef = collection(userRef, 'expenses'); // Ссылка на подколлекцию расходов
    const entryRef = doc(expensesRef, id); // Ссылка на конкретный расход

    await deleteDoc(entryRef);
  };

  const handleEditSave = async () => {
    if (!user || !editModal.entry) {
      console.error('Пользователь не авторизован или запись не выбрана');
      return;
    }

    const userRef = doc(db, 'users', user.uid); // Ссылка на пользователя
    const expensesRef = collection(userRef, 'expenses'); // Ссылка на подколлекцию расходов
    const entryRef = doc(expensesRef, editModal.entry.id); // Ссылка на конкретный расход

    const converted = editModal.entry.currency === 'USD'
      ? parseFloat(editModal.entry.amount)
      : parseFloat(editModal.entry.amount) / parseFloat(editModal.entry.rate);

    await updateDoc(entryRef, {
      ...editModal.entry,
      paid: true,
      convertedAmount: converted
    });

    setEditModal({ visible: false, entry: null });
  };

  const filteredEntries = filterDates.length === 2
    ? entries.filter(e => {
        const date = dayjs(e.createdAt.toDate ? e.createdAt.toDate() : e.createdAt);
        return date.isAfter(filterDates[0].startOf('day')) && date.isBefore(filterDates[1].endOf('day'));
      })
    : entries;

  const dataForChart = Object.entries(
    filteredEntries.reduce((acc, cur) => {
      acc[cur.category] = (acc[cur.category] || 0) + cur.convertedAmount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ padding: 20 }}>
      <h2>Разовые расходы</h2>

      <Space wrap>
        <Input placeholder="Название" style={{ width: 200 }} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <Input placeholder="Сумма" style={{ width: 200 }} value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
        <Select value={form.currency} style={{ width: 200 }} onChange={v => setForm(f => ({ ...f, currency: v }))}>
          <Option value="GEL">GEL</Option>
          <Option value="USD">USD</Option>
        </Select>
        {form.currency === 'GEL' && (
          <Input placeholder="Курс" style={{ width: 200 }} value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} />
        )}
        <Select value={form.category} style={{ width: 200 }} onChange={v => setForm(f => ({ ...f, category: v }))}>
          {Object.keys(categories).map(cat => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>
        <Button type="primary" style={{ width: 200 }} onClick={handleAdd}>Добавить</Button>
      </Space>

      <Divider />
      <RangePicker onChange={(val) => setFilterDates(val)} />

      <ul style={{ marginTop: 20 }}>
        {filteredEntries.map(entry => (
          <li key={entry.id} style={{ marginBottom: 10 }}>
            <strong>{entry.title}</strong> — {entry.amount} {entry.currency} → {entry.convertedAmount?.toFixed(2)} USD
            <Space style={{ marginLeft: 10 }}>
              <Button
                size="small"
                onClick={() => setEditModal({ visible: true, entry })}
                icon={<EditOutlined />}
                style={{ marginRight: 5 }}
              />
              <Button
                danger
                size="small"
                onClick={() => handleDelete(entry.id)}
                icon={<DeleteOutlined />}
              />
            </Space>
          </li>
        ))}
      </ul>

      <Divider>Диаграмма расходов</Divider>
      <ResponsiveContainer width="85%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={dataForChart} label>
            {dataForChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={categories[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Modal
        title="Редактировать расход"
        visible={editModal.visible}
        onOk={handleEditSave}
        onCancel={() => setEditModal({ visible: false, entry: null })}
      >
        {editModal.entry && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Название"
              value={editModal.entry.title}
              onChange={e => setEditModal({ visible: true, entry: { ...editModal.entry, title: e.target.value } })}
            />
            <Input
              placeholder="Сумма"
              value={editModal.entry.amount}
              onChange={e => setEditModal({ visible: true, entry: { ...editModal.entry, amount: e.target.value } })}
            />
            <Select
              value={editModal.entry.currency}
              style={{ width: '100%' }}
              onChange={v => setEditModal({ visible: true, entry: { ...editModal.entry, currency: v } })}
            >
              <Option value="GEL">GEL</Option>
              <Option value="USD">USD</Option>
            </Select>
            {editModal.entry.currency === 'GEL' && (
              <Input
                placeholder="Курс"
                value={editModal.entry.rate}
                onChange={e => setEditModal({ visible: true, entry: { ...editModal.entry, rate: e.target.value } })}
              />
            )}
            <Select
              value={editModal.entry.category}
              style={{ width: '100%' }}
              onChange={v => setEditModal({ visible: true, entry: { ...editModal.entry, category: v } })}
            >
              {Object.keys(categories).map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default Expenses;
