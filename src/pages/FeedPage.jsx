import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../features/posts/postsThunks";
import { setScrollPosition } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import useInfiniteScroll from "../utils/useInfiniteScroll";

/*
  FeedPage:
  - loads posts page-by-page via loadPosts thunk
  - infinite scroll via IntersectionObserver hook
  - preserves scroll position using Redux scrollPosition
  - filters posts by title or id
*/

export default function FeedPage() {
  const dispatch = useDispatch();
  const {
    items,
    page,
    limit,
    hasMore,
    status,
    search,
    scrollPosition,
  } = useSelector((state) => state.posts);

  const loaderRef = useRef(null);
  const restoredRef = useRef(false); // ensure restore only once

  // fetch more posts when called
  const fetchMore = useCallback(() => {
    if (status === "loading" || !hasMore) return;
    dispatch(loadPosts({ page, limit }));
  }, [dispatch, page, limit, status, hasMore]);

  // Hook: attach observer to loaderRef
  useInfiniteScroll(loaderRef, fetchMore, status !== "loading" && hasMore);

  // Initial load if nothing present
  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadPosts({ page, limit }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore scroll position after posts have loaded (only once)
  useEffect(() => {
    if (!restoredRef.current && items.length > 0) {
      window.scrollTo(0, scrollPosition || 0);
      restoredRef.current = true;
    }
  }, [items.length, scrollPosition]);

  // Save scroll position before leaving (e.g., navigating to detail)
  const handlePostClick = () => {
    dispatch(setScrollPosition(window.scrollY));
  };

  // Filter posts by title (contains) or id (exact number match)
  const q = (search || "").trim().toLowerCase();
  const filtered = q
    ? items.filter((p) => {
        const byTitle = p.title.toLowerCase().includes(q);
        const byId = String(p.id) === q;
        return byTitle || byId;
      })
    : items;

  return (
    <div className="feed-container">
      <SearchBar />

      <div className="posts-list" role="list">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} onClick={handlePostClick} />
        ))}
      </div>

      {/* Loader area observed for infinite scroll */}
      <div ref={loaderRef} className="observer-anchor" />

      {status === "loading" && <Loader />}
      {!hasMore && <div className="no-more">No more posts</div>}
      {status === "failed" && <div className="no-more">Failed to load posts</div>}
    </div>
  );
}
