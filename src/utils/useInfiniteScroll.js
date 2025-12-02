import { useEffect } from "react";
export default function useInfiniteScroll(ref, callback, canLoad) {
  useEffect(() => {
    if (!ref.current) return;
    if (!canLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback, canLoad]);
}
