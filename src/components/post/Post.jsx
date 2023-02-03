import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  // const PF = "https://blog-app-backend-pgpv.onrender.com/images/";
  return (
    <div className="post">
      {post.photo && <img src={post.photo} alt="" className="postImg" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category) => (
            <span className="postCat">{category.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <hr />
      </div>
      <Link to={`/post/${post._id}`} className="link">
        <p className="postDesc">{post.desc}</p>
      </Link>
    </div>
  );
};

export default Post;
