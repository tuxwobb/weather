import UserForm from "./components/UserForm";
import { useLoaderData, redirect } from "react-router-dom";
import { editUser } from "../http";
import Error from "../error/Error.jsx";
import { useAuth } from "../AuthProvider.jsx";

export default function UserEdit() {
  const usr = useLoaderData();
  const { user } = useAuth();

  if (user.isAdmin) {
    return <UserForm user={usr} />;
  }

  if (user.id === usr.id) {
    return <UserForm user={usr} />;
  }

  return <Error message="You are not an admin" />;
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
