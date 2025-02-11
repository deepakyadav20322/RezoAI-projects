import { useState } from "react";

const useResizableTable = (initialWidths, minWidth = 50, maxWidth = 500) => {
  const [columnWidths, setColumnWidths] = useState(initialWidths);

  const startResizing = (index, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = columnWidths[index];

    const onMouseMove = (e) => {
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + (e.clientX - startX)));
      setColumnWidths((prevWidths) => {
        const updatedWidths = [...prevWidths];
        updatedWidths[index] = newWidth;
        return updatedWidths;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return { columnWidths, startResizing };
};

export default useResizableTable;