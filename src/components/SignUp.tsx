import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { register } from "./Main";
import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  Text,
  Overlay,
  Flex,
  Loader,
  Modal,
  Input,
} from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import "./styles.css";

type SignUpProps = {
  switchToSignIn: () => void;
  closeModal: () => void;
  setUserEmail: (email: string) => void;
  showTemporaryAlert: () => void;
};

export const SignUp = ({
  switchToSignIn,
  setUserEmail,
  closeModal,
  showTemporaryAlert,
}: SignUpProps) => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const mailIcon = <IconMail stroke={2} />;

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,

    initialValues: {
      email: "",
      password: "",
      repeat_password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Неверный формат почты",
      password: (value) => (value === "" ? "Введите пароль" : null),
      repeat_password: (value, values) =>
        value !== values.password ? "Пароль не совпадает" : null,
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setUserEmail(values.email);
    await register(
      values.email,
      values.password,
      values.repeat_password,
      closeModal,
      showTemporaryAlert,
      setLoading,
      confirmationCode
    );
  };

  // Функция для обработки клика на кнопку подтверждения кода
  const handleConfirmCode = () => {
    console.log("Confirmation Code:", confirmationCode);
    close();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={mailIcon}
          label="Почта"
          placeholder="Почта"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Пароль"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <PasswordInput
          mt="sm"
          label="Подтвердите пароль"
          placeholder="Подтвердите пароль"
          key={form.key("repeat_password")}
          {...form.getInputProps("repeat_password")}
        />

        <Group justify="space-between" mt="md">
          <Text
            size="xs"
            style={{ cursor: "pointer" }}
            onClick={switchToSignIn}
            className="link"
          >
            Уже есть аккаунт? Войти
          </Text>
          <Button type="submit" onClick={open}>
            Зарегистрироваться
          </Button>
          <Modal
            opened={opened}
            onClose={close}
            title="Подтвердите почту"
            centered
          >
            <Text size="xs">
              Сообщение с подтверждением отправлено на почту
            </Text>
            <Input
              placeholder="Код"
              value={confirmationCode}
              onChange={(event) =>
                setConfirmationCode(event.currentTarget.value)
              }
            />
            <Button onClick={handleConfirmCode}>Подтвердить код</Button>
          </Modal>
        </Group>
        {loading && (
          <Overlay backgroundOpacity={0.55} color="#000" zIndex={1000}>
            <Flex justify="center" align="center" style={{ height: "100%" }}>
              <Loader color="blue" size="xl" variant="bars" />
            </Flex>
          </Overlay>
        )}
      </form>
    </>
  );
};
