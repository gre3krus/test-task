import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Group,
  PasswordInput,
  TextInput,
  Text,
  Button,
  Overlay,
  Flex,
  Loader,
} from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import "./styles.css";

type SignInProps = {
  switchToSignUp: () => void;
  closeModal: () => void;
  setUserEmail: (email: string) => void;
  showTemporaryAlert: () => void;
};

export const SignIn = ({
  switchToSignUp,
  closeModal,
  setUserEmail,
  showTemporaryAlert,
}: SignInProps) => {
  const [loading, setLoading] = useState(false);

  const mailIcon = <IconMail stroke={2} />;

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

  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,

    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Неверный формат почты",
      password: (value) => (value === "" ? "Введите пароль" : null),
    },
  });

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

        <Group justify="space-between" mt="md">
          <Text size="xs" onClick={switchToSignUp} className="link">
            Нет аккаунта? Зарегистрировать
          </Text>
          <Button type="submit" disabled={loading}>
            Войти
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
