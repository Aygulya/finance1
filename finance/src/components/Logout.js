import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Button, notification } from "antd";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      notification.success({ message: "Выход успешен!" });
    } catch (error) {
      console.error(error);
      notification.error({ message: "Ошибка выхода", description: error.message });
    }
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Выйти
    </Button>
  );
};

export default Logout;
