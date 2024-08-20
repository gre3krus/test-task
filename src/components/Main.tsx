import { useState } from "react";
import "@mantine/core/styles.css";
import { Modal, Button, Box, Alert, Transition, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

type UserResponse = {
  name: string;
  email: string;
  repeat_password: string;
};

export const register = async (
  email: string,
  password: string,
  repeat_password: string,
  closeModal: () => void,
  showTemporaryAlert: () => void,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  confirmation_code: string
): Promise<UserResponse> => {
  try {
    const response = await fetch("http://20.205.178.13:8001/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, repeat_password }),
    });

    if (response) {
      setTimeout(() => {
        confirmRegister(
          closeModal,
          showTemporaryAlert,
          setLoading,
          confirmation_code
        );
      }, 30000);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка регистрации");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка:", error.message);
      throw error;
    }
    throw new Error("Неизвестная ошибка");
  }
};

export const confirmRegister = async (
  closeModal: () => void,
  showTemporaryAlert: () => void,
  setLoading: (value: React.SetStateAction<boolean>) => void,
  confirmation_code: string
) => {
  try {
    const response = await fetch(
      `http://20.205.178.13:8001/registration/${confirmation_code}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response) {
      showTemporaryAlert();
      closeModal();
      setLoading(false);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка регистрации");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка:", error.message);
      throw error;
    }
    throw new Error("Неизвестная ошибка");
  }
};

export const auth = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const response = await fetch("http://20.205.178.13:8001/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка авторизации");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка:", error.message);
      throw error;
    }
    throw new Error("Неизвестная ошибка");
  }
};

export const Main = () => {
  const [signIn, setSignIn] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const title = () => (signIn ? "Авторизация" : "Регистрация");

  const showTemporaryAlert = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2600);
  };

  return (
    <>
      <Transition
        mounted={showAlert}
        transition="fade-right"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Alert
            variant="filled"
            color="green"
            title={
              signIn
                ? "Авторизация прошла успешно!"
                : "Регистрация прошла успешно!"
            }
            icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
            style={{
              position: "fixed",
              top: rem(16),
              left: rem(16),
              zIndex: 1100,
              ...styles,
            }}
          >
            Добро пожаловать, {userEmail}
          </Alert>
        )}
      </Transition>

      <Modal
        opened={opened}
        centered
        title={title()}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        onClose={close}
      >
        <Box maw={500} mx="auto">
          {signIn ? (
            <SignIn
              switchToSignUp={() => setSignIn(false)}
              closeModal={close}
              setUserEmail={setUserEmail}
              showTemporaryAlert={showTemporaryAlert}
            />
          ) : (
            <SignUp
              switchToSignIn={() => setSignIn(true)}
              closeModal={close}
              setUserEmail={setUserEmail}
              showTemporaryAlert={showTemporaryAlert}
            />
          )}
        </Box>
      </Modal>

      <Button onClick={open}>Начать</Button>
    </>
  );
};
