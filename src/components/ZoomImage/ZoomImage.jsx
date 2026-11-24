import { useState } from "react";

// Zooms the content toward the cursor on hover.
export default function ZoomImage({ children, className = "", scale = 1.6 }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={onMove}
      className={`overflow-hidden ${zoomed ? "cursor-zoom-in" : ""} ${className}`}
    >
      <div
        className="flex h-full w-full items-center justify-center transition-transform duration-200"
        style={{ transform: zoomed ? `scale(${scale})` : "scale(1)", transformOrigin: origin }}
      >
        {children}
      </div>
    </div>
  );
}
