
export default function Loader() {
  return (
    <div className="loader-container" aria-live="polite">
      <div className="spinner" role="status" aria-label="Loading"></div>
      <div className="loader-text">Loading...</div>
    </div>
  );
}
