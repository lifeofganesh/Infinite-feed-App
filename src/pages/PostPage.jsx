import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../api/postService";
import Loader from "../components/Loader";

/*
  Detail page: fetch by id (fallback to API) and show userId + id + title + body.
  We fetch from API directly so user can open detail even if Feed didn't preload posts.
*/
export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPostById(id)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (err) return <div className="post-detail-container">Error: {err}</div>;

  return (
    <div className="post-detail-container">
      <Link to="/" className="back-btn">
        ← Back to feed
      </Link>

      <div className="post-header">
        <span className="badge">User ID: {post.userId}</span>
        <span className="badge">Post ID: {post.id}</span>
      </div>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
    </div>
  );
}
