import { createSlice } from "@reduxjs/toolkit";
import { loadPosts } from "./postsThunks";

const initialState = {
  items: [],          
  page: 1,            
  limit: 10,         
  hasMore: true,      
  status: "idle",     
  error: null,
  search: "",        
  scrollPosition: 0,  
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
    resetPosts(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newPosts = action.payload.posts;
        const existingIds = new Set(state.items.map((p) => p.id));
        newPosts.forEach((p) => {
          if (!existingIds.has(p.id)) state.items.push(p);
        });
        state.page = action.payload.page + 1;
        const fetchedCount = state.items.length;
        state.hasMore = fetchedCount < action.payload.total;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSearch, setScrollPosition, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
