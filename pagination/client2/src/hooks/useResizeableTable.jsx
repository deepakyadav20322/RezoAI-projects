import { useState, useCallback } from "react";

const useResizableColumn = (initialWidths, minWidth = 100, maxWidth = 800) => {
  const [columnWidths, setColumnWidths] = useState(initialWidths);

  const handleMouseDown = useCallback(
    (index, e) => {
      const startX = e.clientX;
      const startWidth = columnWidths[index];

      const handleMouseMove = (e) => {
        const newWidth = startWidth + (e.clientX - startX);
        if (newWidth >= minWidth && newWidth <= maxWidth) {
          const newColumnWidths = [...columnWidths];
          newColumnWidths[index] = newWidth;
          setColumnWidths(newColumnWidths);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths, minWidth, maxWidth]
  );

  return { columnWidths, handleMouseDown };
};

export default useResizableColumn;