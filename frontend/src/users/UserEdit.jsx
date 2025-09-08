import UserForm from "./components/UserForm";
import { useLoaderData, redirect } from "react-router-dom";
import { editUser } from "../http";

export default function UserEdit() {
  const user = useLoaderData();

  return <UserForm user={user} />;
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
