import { useLoaderData, redirect } from "react-router-dom";
import UserForm from "./components/UserForm";
import Error from "../error/Error.jsx";
import { editUser } from "../http";
import { useAuth } from "../AuthProvider.jsx";
import { checkRole } from "../helpers.js";

export default function UserEdit() {
  const usr = useLoaderData();
  const { user } = useAuth();

  if (!checkRole(user, "admin")) {
    return <Error message="You do not have permissions to see the content." />;
  }

  return <UserForm user={usr} />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const user = {
    id: formData.get("id"),
    fullname: formData.get("fullname"),
    username: formData.get("username"),
    email: formData.get("email"),
  };

  const resData = await editUser(user);
  return redirect("/users");
}
