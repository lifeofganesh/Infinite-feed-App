
export async function fetchPosts(page = 1, limit = 10) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  const all = await res.json();

  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: all.slice(start, end),
    total: all.length,
  };
}

export async function fetchPostById(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}
