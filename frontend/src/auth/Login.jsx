import LoginForm from "./components/LoginForm.jsx";
import { redirect } from "react-router-dom";
import { CUSTOM_API_URL } from "../http";

export default function Login() {
  return <LoginForm />;
}

export async function action({ request }) {
  const formData = await request.formData();

  const response = await fetch(`${CUSTOM_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: formData.get("username"),
      password: formData.get("password"),
    }).toString(),
  });

  if (response.status === 401) {
    return resData;
  }

  if (!response.ok) {
    throw new Error(resData.message || "error occured");
  }

  const resData = await response.json();
  localStorage.setItem("token", resData.access_token);
  return redirect("/");
}
