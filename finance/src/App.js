// // App.js
// import { Layout, Drawer } from 'antd';
// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AppHeader from './components/Header';
// import Sidebar from './components/Sidebar';
// import Home from './pages/Home';
// import Debts from './pages/Debts';
// import Earnings from './pages/Earnings';
// import Credits from './pages/Credits';
// import Expenses from './pages/Expenses'; 
// import MonthlyExpenses from './components/MonthlyExpenses';  // Добавляем компонент для ежемесячных расходов
// import { FinanceProvider } from "./context/FinanceContext";
// import FirstPage from './pages/FirstPage'

// const { Content } = Layout;

// function App() {
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const toggleDrawer = () => setDrawerVisible(!drawerVisible);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize(); 
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <FinanceProvider>
//       <Router>
//         <Layout style={{ minHeight: '100vh' }}>
//           <AppHeader onMenuClick={toggleDrawer} />

//           {isMobile ? (
//             <Drawer
//               title="Меню"
//               placement="left"
//               closable
//               onClose={toggleDrawer}
//               open={drawerVisible}
//               bodyStyle={{ padding: 0 }}
//             >
//               <Sidebar />
//             </Drawer>
//           ) : (
//             <Layout style={{ flexDirection: 'row' }}>
//               <div style={{ width: 200 }}>
//                 <Sidebar />
//               </div>
//             </Layout>
//           )}

//           <Layout style={{ padding: '16px' }}>
//             <Content>
//               <Routes>
//               <Route path="/first" element={<FirstPage />}/>
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/debts" element={<Debts />} />
//                 <Route path="/earnings" element={<Earnings />} />
//                 <Route path="/credits" element={<Credits />} />
//                 <Route path="/expenses" element={<Expenses />} />
//                 <Route path="/monthly-expenses" element={<MonthlyExpenses />} /> {/* Новый маршрут */}
//               </Routes>
//             </Content>
//           </Layout>
//         </Layout>
//       </Router>
//     </FinanceProvider>
//   );
// }

// export default App;
import { Layout, Drawer } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppHeader from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Debts from './pages/Debts';
import Earnings from './pages/Earnings';
import Credits from './pages/Credits';
import Expenses from './pages/Expenses'; 
import MonthlyExpenses from './components/MonthlyExpenses';  // Добавляем компонент для ежемесячных расходов
import { FinanceProvider } from "./context/FinanceContext";
import FirstPage from './pages/FirstPage';
import { auth } from './firebase';  // Подключение firebase для проверки аутентификации
import { useAuthState } from 'react-firebase-hooks/auth';  // Используем хуки для удобства

const { Content } = Layout;

function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Получаем состояние аутентификации пользователя
  const [user] = useAuthState(auth);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FinanceProvider>
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <AppHeader onMenuClick={toggleDrawer} />

          {isMobile ? (
            <Drawer
              title="Меню"
              placement="left"
              closable
              onClose={toggleDrawer}
              open={drawerVisible}
              bodyStyle={{ padding: 0 }}
            >
              <Sidebar />
            </Drawer>
          ) : (
            <Layout style={{ flexDirection: 'row' }}>
              <div style={{ width: 200 }}>
                <Sidebar />
              </div>
            </Layout>
          )}

          <Layout style={{ padding: '16px' }}>
            <Content>
              {/* <Routes>
                
                  <Route path="/" element={<FirstPage />} />
                ) : (
                  <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/debts" element={<Debts />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/credits" element={<Credits />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/monthly-expenses" element={<MonthlyExpenses />} />
                  </>
                )}
              </Routes> */}
              <Routes>
  {!user ? (
    <Route path="/" element={<FirstPage />} />
  ) : (
    <>
      {/* Добавим маршрут "/" с редиректом на /home */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/debts" element={<Debts />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/monthly-expenses" element={<MonthlyExpenses />} />
    </>
  )}
</Routes>
            </Content>
          </Layout>
        </Layout>
      </>
    </FinanceProvider>
  );
}

export default App;
