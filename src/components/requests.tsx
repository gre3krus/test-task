export let showError = false;
export let showSuccess = false;
const showErrorAlert = () => {
  showError = true;

  setTimeout(() => {
    showError = false;
  }, 2600);
};

const showSuccessAlert = () => {
  showSuccess = true;

  setTimeout(() => {
    showSuccess = false;
  }, 2600);
};

export const register = async (
  email: string,
  password: string,
  repeat_password: string
) => {
  try {
    const response = await fetch("http://20.205.178.13:8001/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, repeat_password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка регистрации");
    }

    showSuccessAlert();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      showErrorAlert();
    }
  }
};

export const confirmRegister = async (confirmation_code: string) => {
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка регистрации");
    }

    showSuccessAlert();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      showErrorAlert();
    }
  }
};

export const auth = async (email: string, password: string) => {
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
    showSuccessAlert();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      showErrorAlert();
    }
  }
};
