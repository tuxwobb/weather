import UserForm from "./components/UserForm";
import { createUser } from "../http";
import { redirect } from "react-router-dom";

export default function UserNew() {
  return <UserForm />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const newUser = {
    fullname: formData.get("fullname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resData = await createUser(newUser);
  return redirect("/users");
}
