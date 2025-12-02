import { Link } from "react-router-dom";
export default function PostCard({ post, onClick }) {
  return (
    <div className="post-card">
      <Link
        to={`/post/${post.id}`}
        onClick={onClick}
        className="post-link"
        aria-label={`Open post ${post.id}`}
      >
        <div className="post-meta">
          <span>User ID: {post.userId}</span>
          <span>Post ID: {post.id}</span>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
      </Link>
    </div>
  );
}
