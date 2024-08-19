import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  Text,
  Overlay,
  Flex,
  Loader,
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
  closeModal,
  setUserEmail,
  showTemporaryAlert,
}: SignUpProps) => {
  const [loading, setLoading] = useState(false);

  const mailIcon = <IconMail stroke={2} />;

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,

    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Неверный формат почты",
      password: (value) => (value === "" ? "Введите пароль" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Пароль не совпадает" : null,
    },
  });

  const handleSubmit = (values: any) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setUserEmail(values.email);
      console.log(values);
      closeModal();
      showTemporaryAlert();
    }, 800);
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
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
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
          <Button type="submit" disabled={loading}>
            Зарегистрироваться
          </Button>
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
