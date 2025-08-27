import Post from "./Post";

export default function Posts({ filterText, blogPosts }) {
  if (filterText) {
    blogPosts = blogPosts.filter((post) =>
      post.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }
  return blogPosts.map((post) => <Post key={post.id} post={post} />);
}
