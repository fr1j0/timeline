import { useEffect, useState } from "react";

const useResize = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return width;
};

export default useResize;
