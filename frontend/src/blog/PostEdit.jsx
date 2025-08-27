import PostEditForm from "./PostEditForm.jsx";

function PostEdit() {
  return <PostEditForm />;
}

export default PostEdit;

export async function action({ request, params }) {
  const data = request.formData();
  console.log(data.get("title"));
}
