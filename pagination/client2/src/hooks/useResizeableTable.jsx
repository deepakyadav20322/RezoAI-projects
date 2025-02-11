import { useState } from "react";

const useResizableTable = (initialWidths) =>{
  const [columnWidths, setColumnWidths] = useState(initialWidths);

  const startResizing = (index, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = columnWidths[index];

    const onMouseMove = (e) => {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX)); // Prevent too small columns
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
}

export default useResizableTable;