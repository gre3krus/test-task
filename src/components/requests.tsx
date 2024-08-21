export const register = async (
  email: string,
  password: string,
  repeat_password: string
) => {
  const response = await fetch("http://20.205.178.13:8001/registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, repeat_password }),
  });

  if (response.ok) {
    return { ok: true, data: await response.json() };
  } else {
    return { ok: false, data: await response.json() };
  }
};

export const confirmRegister = async (confirmation_code: string) => {
  const response = await fetch(
    `http://20.205.178.13:8001/registration/${confirmation_code}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    return { ok: true, data: await response.json() };
  } else {
    return { ok: false, data: await response.json() };
  }
};

export const auth = async (email: string, password: string) => {
  const response = await fetch("http://20.205.178.13:8001/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return { ok: true, data: await response.json() };
  } else {
    return { ok: false, data: await response.json() };
  }
};
