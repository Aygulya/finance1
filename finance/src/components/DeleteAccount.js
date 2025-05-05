import React from "react";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";
import { Button, notification, Modal } from "antd";

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        notification.success({ message: "Аккаунт удален" });
      } catch (error) {
        console.error(error);
        notification.error({ message: "Ошибка удаления аккаунта", description: error.message });
      }
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Удалить аккаунт",
      content: "Вы уверены, что хотите удалить свой аккаунт?",
      okText: "Да",
      cancelText: "Отмена",
      onOk: handleDeleteAccount,
    });
  };

  return (
    <Button type="danger" onClick={confirmDelete}>
      Удалить аккаунт
    </Button>
  );
};

export default DeleteAccount;
