import LoginCredentials from "../types/LoginCredentials";
export async function loginUser(creds: LoginCredentials) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}
