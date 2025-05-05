// // import React, { useState } from "react";
// // import { auth } from "../firebase";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { Button, Input, notification } from "antd";

// // const Register = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleRegister = async () => {
// //     try {
// //       await createUserWithEmailAndPassword(auth, email, password);
// //       notification.success({ message: "Регистрация успешна!" });
// //     } catch (error) {
// //       console.error(error);
// //       notification.error({ message: "Ошибка регистрации", description: error.message });
// //     }
// //   };

// //   return (
// //     <div>
// //       <Input
// //         placeholder="Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //       />
// //       <Input
// //         placeholder="Пароль"
// //         type="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         style={{ marginTop: 10 }}
// //       />
// //       <Button type="primary" onClick={handleRegister} block style={{ marginTop: 10 }}>
// //         Зарегистрироваться
// //       </Button>
// //     </div>
// //   );
// // };

// // export default Register;

// import React, { useState } from "react";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { Button, Input, notification } from "antd";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const createUserDoc = async (user) => {
//     const userRef = doc(db, "users", user.uid);
//     await setDoc(userRef, {
//       email: user.email,
//       createdAt: new Date(),
//     }, { merge: true });
//   };

//   const handleRegister = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await createUserDoc(user);

//       notification.success({ message: "Регистрация успешна!" });
//     } catch (error) {
//       console.error(error);
//       notification.error({ message: "Ошибка регистрации", description: error.message });
//     }
//   };

//   return (
//     <div>
//       <Input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Input
//         placeholder="Пароль"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ marginTop: 10 }}
//       />
//       <Button type="primary" onClick={handleRegister} block style={{ marginTop: 10 }}>
//         Зарегистрироваться
//       </Button>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button, Input, notification } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserDoc = async (user) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      createdAt: new Date(),
    }, { merge: true });
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await createUserDoc(user);

      notification.success({ message: "Регистрация успешна!" });
    } catch (error) {
      console.error(error);
      notification.error({ message: "Ошибка регистрации", description: error.message });
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
      <Button type="primary" onClick={handleRegister} block style={{ marginTop: 10 }}>
        Зарегистрироваться
      </Button>
    </div>
  );
};

export default Register;
