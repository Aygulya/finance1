import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Input, notification } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      notification.success({ message: "Вход успешен!" });
    } catch (error) {
      console.error(error);
      notification.error({ message: "Ошибка входа", description: error.message });
    }
  };

  return (
    <div>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 10 }}
      />
      <Button type="primary" onClick={handleLogin} block style={{ marginTop: 10 }}>
        Войти
      </Button>
    </div>
  );
};

export default Login;
