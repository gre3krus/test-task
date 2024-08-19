import { useState } from "react";
import "@mantine/core/styles.css";
import { Modal, Button, Box, Alert, Transition, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export const Main = () => {
  const [signIn, setSignIn] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSwitchToSignUp = () => {
    setSignIn(false);
  };

  const handleSwitchToSignIn = () => {
    setSignIn(true);
  };

  const title = () => (signIn ? "Авторизация" : "Регистрация");

  const showTemporaryAlert = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2600);
  };

  return (
    <>
      {/* Alert за пределами модального окна */}
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
              switchToSignUp={handleSwitchToSignUp}
              closeModal={close}
              setUserEmail={setUserEmail}
              showTemporaryAlert={showTemporaryAlert}
            />
          ) : (
            <SignUp
              switchToSignIn={handleSwitchToSignIn}
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
