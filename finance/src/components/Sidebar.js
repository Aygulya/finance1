// // import { Menu } from 'antd';
// // import { DollarOutlined, CreditCardOutlined, UserOutlined, BarChartOutlined, CalendarOutlined } from '@ant-design/icons';
// // import { useNavigate } from 'react-router-dom';

// // const Sidebar = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
// //       <Menu
// //         theme="dark"
// //         mode="inline"
// //         onClick={({ key }) => navigate(key)}
// //         style={{ flex: 1 }}
// //       >
// //         <Menu.Item key="/" icon={<BarChartOutlined />}>Главная</Menu.Item>
// //         <Menu.Item key="/earnings" icon={<DollarOutlined />}>Доходы</Menu.Item>
// //         <Menu.Item key="/debts" icon={<UserOutlined />}>Долги</Menu.Item>
// //         <Menu.Item key="/credits" icon={<CreditCardOutlined />}>Кредиты</Menu.Item>
// //         Menu.Item key="/expenses" icon={<CreditCardOutlined />}>Кредиты</Menu.Item>
// //         <Menu.Item key="/monthly-expenses" icon={<CalendarOutlined />}>Ежемесячные расходы</Menu.Item> {/* Новый пункт */}
// //       </Menu>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// // // components/Sidebar.js
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';

// // // const Sidebar = () => {
// // //   return (
// // //     <div>
// // //       <h2>Меню</h2>
// // //       <ul>
// // //         <li><Link to="/">Главная</Link></li>
// // //         <li><Link to="/earnings">Доходы</Link></li>
// // //         <li><Link to="/entries">Записи</Link></li>
// // //         <li><Link to="/credits">Кредиты</Link></li>
// // //         <li><Link to="/monthly-expenses">Ежемесячные расходы</Link></li>
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;
// import { Menu } from 'antd';
// import {
//   DollarOutlined,
//   CreditCardOutlined,
//   UserOutlined,
//   BarChartOutlined,
//   CalendarOutlined,
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Menu
//         theme="dark"
//         mode="inline"
//         onClick={({ key }) => navigate(key)}
//         style={{ flex: 1 }}
//       >
//         <Menu.Item key="/home" icon={<BarChartOutlined />}>Главная</Menu.Item>
//         <Menu.Item key="/earnings" icon={<DollarOutlined />}>Доходы</Menu.Item>
//         <Menu.Item key="/debts" icon={<UserOutlined />}>Долги</Menu.Item>
//         <Menu.Item key="/credits" icon={<CreditCardOutlined />}>Кредиты</Menu.Item>
//         <Menu.Item key="/expenses" icon={<CreditCardOutlined />}>Разовые расходы</Menu.Item>
//         <Menu.Item key="/monthly-expenses" icon={<CalendarOutlined />}>Ежемесячные расходы</Menu.Item>
//       </Menu>
//     </div>
//   );
// };

// export default Sidebar;
import { Button } from 'antd';
import { signOut } from 'firebase/auth';  // Для выхода из Firebase
import { auth } from '../firebase';  // Импортируем auth из firebase
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DollarOutlined, CreditCardOutlined, UserOutlined, BarChartOutlined, CalendarOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Вызов функции для выхода
      navigate('/');  // Перенаправление на страницу входа/регистрации
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={({ key }) => navigate(key)}
        style={{ flex: 1 }}
      >
        <Menu.Item key="/home" icon={<BarChartOutlined />}>Главная</Menu.Item>
        <Menu.Item key="/earnings" icon={<DollarOutlined />}>Доходы</Menu.Item>
        <Menu.Item key="/debts" icon={<UserOutlined />}>Долги</Menu.Item>
        <Menu.Item key="/credits" icon={<CreditCardOutlined />}>Кредиты</Menu.Item>
        <Menu.Item key="/expenses" icon={<CreditCardOutlined />}>Разовые расходы</Menu.Item>
        <Menu.Item key="/monthly-expenses" icon={<CalendarOutlined />}>Ежемесячные расходы</Menu.Item>
        <Menu.Item key="logout" onClick={handleLogout}>Выход</Menu.Item>  {/* Кнопка выхода */}
      </Menu>
    </div>
  );
};

export default Sidebar;
