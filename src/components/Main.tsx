import { useState } from "react";
import "@mantine/core/styles.css";
import { Modal, Button, Box, Alert, Transition, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export const Main = () => {
  const [signIn, setSignIn] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [userEmail, setUserEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showErrorAlert = () => {
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 2600);
  };

  const showSuccessAlert = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2600);
  };

  return (
    <>
      <Transition
        mounted={showSuccess}
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
            {signIn
              ? `С возвращением, ${userEmail}!`
              : `Добро пожаловать, ${userEmail}!`}
          </Alert>
        )}
      </Transition>

      <Transition
        mounted={showError}
        transition="fade-right"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Alert
            variant="filled"
            color="red"
            title={signIn ? "Ошибка авторизации" : "Ошибка регистрации"}
            icon={<IconExclamationCircle stroke={2} />}
            style={{
              position: "fixed",
              top: rem(16),
              left: rem(16),
              zIndex: 1100,
              ...styles,
            }}
          >
            {signIn ? `Неверные почта/пароль` : `Неккоректные данные/Аккаунт зарегистрирован`}
          </Alert>
        )}
      </Transition>

      <Modal
        opened={opened}
        centered
        title={signIn ? "Авторизация" : "Регистрация"}
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
              showErrorAlert={showErrorAlert}
              showSuccessAlert={showSuccessAlert}
            />
          ) : (
            <SignUp
              switchToSignIn={() => setSignIn(true)}
              closeModal={close}
              setUserEmail={setUserEmail}
              showErrorAlert={showErrorAlert}
              showSuccessAlert={showSuccessAlert}
            />
          )}
        </Box>
      </Modal>

      <Button onClick={open}>Начать</Button>
    </>
  );
};
