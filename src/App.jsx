import { Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import PostPage from "./pages/PostPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
}
