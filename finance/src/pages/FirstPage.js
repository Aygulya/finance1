// import React from "react";
 import Login from '../components/Login'
 import Register from '../components/Register'

// function FirstPage() {

//     return (
//         <>

//         <h2>
//             Зарегистрироваться или зайти
//         </h2>
//         <Login/>
//         <Register/>
//         </>

//     )

// }

// export default FirstPage;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';  // Подключаем Firebase

function FirstPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home');  // Перенаправляем на главную страницу, если пользователь авторизован
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <>
      <h2>Зарегистрироваться или зайти</h2>
      <Login />
      <Register />
    </>
  );
}

export default FirstPage;
