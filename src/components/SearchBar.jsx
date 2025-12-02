import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/posts/postsSlice";
export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((s) => s.posts.search);

  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Search by title or ID..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
}
