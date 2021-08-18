import { useEffect, useState } from "react";

const useScrollWheel = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
  const [deltaX, setDeltaX] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setDeltaX(-e.deltaY / 2);
    };

    if (ref.current)
      ref.current.addEventListener("wheel", handleWheel, {
        passive: false,
      });

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [ref]);

  return deltaX;
};

export default useScrollWheel;
