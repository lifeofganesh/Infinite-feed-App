1// React
Used for UI components like:
Feed Page
Post Detail Page
Post Card
Search Bar
Loader

2// Redux Toolkit
Used for state management.
Slices & State
postsSlice.js handles:
posts array
page
hasMore
status
search
scroll position
Thunks
fetchPosts → loads next page
fetchPostById → loads detail page
Condition Logic
Blocks duplicate API calls:
condition: (_, { getState }) => {
  const { status } = getState().posts;
  return status !== "loading";
}
3// IntersectionObserver (Infinite Scroll)
A custom hook:
useInfiniteScroll.js
It watches a bottom target (loaderRef) and loads the next page when visible.
4 // Scroll Position Preservation
Steps:
Save scroll position before navigating:
dispatch(setScrollPosition(window.scrollY));

Restore when returning:
window.scrollTo(0, savedScrollPosition);
This gives a smooth social media-like experience.
JSONPlaceholder API
Used for test data.
Pagination:
GET https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10

 6 Loader UI
A custom spinner appears only when loading.
FeedPage.jsx
Displays posts
Applies search filter
Handles infinite scroll

Shows loader
Saves & restores scroll position
PostPage.jsx
Loads post detail on single page
Styled with postDetail.css
PostCard.jsx
Reusable card for each post
Clickable → opens detail page
SearchBar.jsx
Updates Redux search state on typing

Loader.jsx
Animated spinner
useInfiniteScroll.js
Observes bottom element and fetches more posts
CSS Files:
feed.css → layout, grid, loader, responsive UI
postDetail.css → detail page style
