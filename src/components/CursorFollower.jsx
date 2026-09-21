import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${pos.x - 10}px, ${pos.y - 10}px)`,
      }}
    >
      <div className="w-5 h-5 bg-white/40 rounded-full blur-sm"></div>
    </div>
  );
}