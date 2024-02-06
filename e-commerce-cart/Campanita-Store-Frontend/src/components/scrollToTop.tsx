// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top only when navigating to a new link
    if (
      window.performance &&
      window.performance.navigation.type !==
        window.performance.navigation.TYPE_BACK_FORWARD
    ) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
