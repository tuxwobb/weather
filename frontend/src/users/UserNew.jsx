import UserForm from "./components/UserForm";
import Error from "../error/Error";
import { createUser } from "../http";
import { redirect } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { checkRole } from "../helpers";

export default function UserNew() {
  const { user } = useAuth();

  if (!checkRole(user, "admin")) {
    return <Error message="You do not have permissions to see the content." />;
  }

  return <UserForm />;
}

export async function action({ request }) {
  const formData = await request.formData();

  if (formData.get("password") !== formData.get("password_confirmation")) {
    return { detail: "Passwords do not match" };
  }

  if (formData.get("password").length < 8) {
    return { detail: "Password must be at least 8 characters long" };
  }

  const newUser = {
    fullname: formData.get("fullname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resData = await createUser(newUser);
  return redirect("/users");
}
