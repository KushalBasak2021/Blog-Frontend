import Post from "../post/Post";
import "./posts.css";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post, i) => (
        <Post post={post} key={i} />
      ))}
    </div>
  );
};

export default Posts;
