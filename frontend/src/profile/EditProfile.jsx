import { redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { editProfile } from "../http";
import UserForm from "../users/components/UserForm";

export default function EditProfile() {
  const user = useLoaderData();
  return <UserForm user={user} />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const user = {
    fullname: formData.get("fullname"),
    username: formData.get("username"),
    email: formData.get("email"),
  };

  const resData = await editProfile(user);
  return redirect("/profile");
}
