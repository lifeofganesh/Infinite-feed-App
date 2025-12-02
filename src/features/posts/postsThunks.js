import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../../api/postService";

// loadPosts thunk: accepts an object { page, limit }.
// Condition prevents duplicate concurrent loads (if already loading).
export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await fetchPosts(page, limit);
      return { posts: res.data, total: res.total, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: ({ page }, { getState }) => {
      const { posts } = getState();
      // If we are already loading, don't dispatch another request
      if (posts.status === "loading") return false;
      // If no more pages, stop
      if (!posts.hasMore) return false;
      return true;
    },
  }
);
