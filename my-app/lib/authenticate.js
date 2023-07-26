import jwt_decode from "jwt-decode";

export async function authenticateUser(user, pwd) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: `POST`,
    body: JSON.stringify({ userName: user, password: pwd }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return data.user;
  } else {
    throw new Error(data.message);
  }
}

function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (error) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}
