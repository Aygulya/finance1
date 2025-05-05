// // import { useState } from 'react';
// // import { Button, Form, InputNumber, Select, Space, Typography, Input} from 'antd';

// // const { Option } = Select;
// // const { Text } = Typography;

// // const AddEntryForm = ({ onSubmit }) => {
// //   const [form] = Form.useForm();
// //   const [converted, setConverted] = useState(null);

// //   const handleValuesChange = (_, values) => {
// //     const { amount, currency, rate } = values;
// //     if (currency === 'GEL' && amount && rate) {
// //       setConverted((amount / rate).toFixed(2));
// //     } else {
// //       setConverted(null);
// //     }
// //   };

// //   const handleFinish = (values) => {
// //     onSubmit({
// //         title: values.title,
// //         ...values,
// //         convertedAmount: values.currency === 'GEL' ? (values.amount / values.rate).toFixed(2) : values.amount,
// //       });
      
// //     form.resetFields();
// //     setConverted(null);
// //   };

// //   return (
// //     <Form
// //       form={form}
// //       layout="vertical"
// //       onValuesChange={handleValuesChange}
// //       onFinish={handleFinish}
// //       style={{ maxWidth: 400 }}
// //     >
// //     <Form.Item name="title" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
// //   <Input placeholder="Например: Гио, Зарплата, Тинькофф" />
// // </Form.Item>

// //       <Form.Item name="amount" label="Сумма" rules={[{ required: true, message: 'Введите сумму' }]}>
// //         <InputNumber style={{ width: '100%' }} />
// //       </Form.Item>

// //       <Form.Item name="currency" label="Валюта" rules={[{ required: true, message: 'Выберите валюту' }]}>
// //         <Select placeholder="Выберите валюту">
// //           <Option value="USD">Доллар ($)</Option>
// //           <Option value="GEL">Лари (₾)</Option>
// //         </Select>
// //       </Form.Item>

// //       <Form.Item
// //         name="rate"
// //         label="Курс доллара (если выбрана лари)"
// //         rules={[
// //           ({ getFieldValue }) => ({
// //             validator(_, value) {
// //               if (getFieldValue('currency') === 'GEL' && !value) {
// //                 return Promise.reject('Введите курс доллара');
// //               }
// //               return Promise.resolve();
// //             },
// //           }),
// //         ]}
// //       >
// //         <InputNumber style={{ width: '100%' }} />
// //       </Form.Item>

// //       {converted && (
// //         <Form.Item>
// //           <Text type="secondary">Переведено в $: {converted}</Text>
// //         </Form.Item>
// //       )}

// //       <Form.Item>
// //         <Space>
// //           <Button type="primary" htmlType="submit">
// //             Добавить
// //           </Button>
// //         </Space>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // export default AddEntryForm;
// import { Form, Input, InputNumber, Select, Button } from 'antd';

// const AddEntryForm = ({ onSubmit }) => {
//   const [form] = Form.useForm();

//   const handleFinish = (values) => {
//     const rate = values.currency === 'GEL' ? values.rate : 1;
//     const convertedAmount = values.currency === 'GEL' ? values.amount / rate : values.amount;
//     onSubmit({ ...values, convertedAmount, rate });
//     form.resetFields();
//   };

//   return (
//     <Form form={form} onFinish={handleFinish} layout="vertical">
//       <Form.Item name="title" label="Название" rules={[{ required: true }]}>
//         <Input />
//       </Form.Item>

//       <Form.Item name="amount" label="Сумма" rules={[{ required: true }]}>
//         <InputNumber style={{ width: '100%' }} />
//       </Form.Item>

//       <Form.Item name="currency" label="Валюта" rules={[{ required: true }]}>
//         <Select>
//           <Select.Option value="USD">USD</Select.Option>
//           <Select.Option value="GEL">GEL</Select.Option>
//         </Select>
//       </Form.Item>

//       <Form.Item name="rate" label="Курс (если лари)">
//         <InputNumber style={{ width: '100%' }} />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Добавить
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default AddEntryForm;
// components/AddEntryForm.js
import React, { useState } from 'react';

const AddEntryForm = ({ onSubmit }) => {
  const [data, setData] = useState({
    title: '',
    amount: '',
    currency: 'USD',
    rate: '',
    convertedAmount: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    setData({ title: '', amount: '', currency: 'USD', rate: '', convertedAmount: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
      <div>
        <label>Сумма</label>
        <input
          type="number"
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: e.target.value })}
        />
      </div>
      <div>
        <label>Валюта</label>
        <select
          value={data.currency}
          onChange={(e) => setData({ ...data, currency: e.target.value })}
        >
          <option value="USD">USD</option>
          <option value="GEL">GEL</option>
        </select>
      </div>
      <div>
        <label>Курс</label>
        <input
          type="number"
          value={data.rate}
          onChange={(e) => setData({ ...data, rate: e.target.value })}
        />
      </div>
      <div>
        <label>Конвертированная сумма</label>
        <input
          type="number"
          value={data.convertedAmount}
          onChange={(e) => setData({ ...data, convertedAmount: e.target.value })}
        />
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddEntryForm;
