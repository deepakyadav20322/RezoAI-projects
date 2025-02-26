// import React, { useEffect } from "react";
 
// const MermaidGraph = ({ graphDefinition }) => {
//   const htmlContent = `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Mermaid.js</title>
//     <style>
//       html, body {
//         height: 100%;
//         margin: 0;
//       }
//       body {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100vh;
//       }
//       .mermaid {
//         width: 100%;
//         height: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }
//       svg {
//         width: 100%;
//         height: 100%;
//       }
//       g {
//         width: 100%;
//         height: 100%;
//       }
//     </style>
//     <script type="module">
//       import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
//       mermaid.initialize({ startOnLoad: true });
//     </script>
// </head>
// <body>
//     <div class="mermaid">
//         ${graphDefinition}
//     </div>
// </body>
// </html>
//   `;
 
//   return (
//     <iframe
//       title="Mermaid Graph"
//       srcDoc={htmlContent}
//       style={{
//         width: "100%",
//         height: "100vh",
//         border: "none",
//         overflow: "auto",
//       }}
//     />
//   );
// };
 
// export default MermaidGraph;
 

// import React from "react";

// const MermaidGraph = ({ graphDefinition }) => {
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Mermaid.js</title>
//         <style>
//           html, body {
//             height: 100%;
//             margin: 0;
//             border:2px sold red;
//           }
//           body {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             overflow: hidden;
//           }
//           .mermaid {
//             width: 100%;
//             height: 100%;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//           }
//           svg {
//             width: 100%;
//             height: 100%;
//           }
//         </style>
//     </head>
//     <body>
//         <div class="mermaid">
//             ${graphDefinition}
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
//         <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
//         <script>
//           mermaid.initialize({ startOnLoad: true });

//           document.addEventListener("DOMContentLoaded", () => {
//             setTimeout(() => {
//               const svg = document.querySelector("svg");
//               if (svg) {
//                 window.svgPanZoom(svg, {
//                   zoomEnabled: true,
//                   panEnabled: true,
//                   controlIconsEnabled: true,
//                   fit: true,
//                   center: true,
//                   minZoom: 0.5,
//                   maxZoom: 5
//                 });
//               }
//             }, 300); // Ensures Mermaid finishes rendering before applying zoom/pan
//           });
//         </script>
//     </body>
//     </html>
//   `;

//   return (
//     <iframe
//       title="Mermaid Graph"
//       srcDoc={htmlContent}
//       style={{
//         width: "100%",
//         height: "100vh",
//         border: "none",
//         overflow: "hidden",
//       }}
//     />
//   );
// };

// export default MermaidGraph;


// import React, { useRef } from "react";

// const MermaidGraph = ({ graphDefinition }) => {
//   const iframeRef = useRef(null);

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Mermaid.js</title>
//         <style>
//           html, body {
//             height: 100%;
//             margin: 0;
//           }
//           body {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             overflow: hidden;
//             position: relative;
//           }
//           .mermaid {
//             width: 100%;
//             height: 100%;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//           }
//           svg {
//             width: 100%;
//             height: 100%;
//           }
//           .download-btn {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             background: #007bff;
//             color: white;
//             border: none;
//             padding: 8px 12px;
//             cursor: pointer;
//             font-size: 14px;
//             border-radius: 5px;
//           }
//         </style>
//     </head>
//     <body>
//         <button class="download-btn" id="download">Download SVG</button>
//         <div class="mermaid">
//             ${graphDefinition}
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
//         <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
//         <script>
//           mermaid.initialize({ startOnLoad: true });

//           document.addEventListener("DOMContentLoaded", () => {
//             setTimeout(() => {
//               const svg = document.querySelector("svg");
//               if (svg) {
//                 window.svgPanZoom(svg, {
//                   zoomEnabled: true,
//                   panEnabled: true,
//                   controlIconsEnabled: false, // ❌ Hides zoom controls, but zoom still works
//                   fit: true,
//                   center: true,
//                   minZoom: 0.5,
//                   maxZoom: 5
//                 });

//                 // ✅ Corrected Download Function (Saves Full Graph)
//                 document.getElementById("download").addEventListener("click", () => {
//                   const svgClone = svg.cloneNode(true);
//                   svgClone.removeAttribute("transform"); // Removes viewport transformations

//                   const serializer = new XMLSerializer();
//                   const svgString = serializer.serializeToString(svgClone);

//                   const blob = new Blob([svgString], { type: "image/svg+xml" });
//                   const url = URL.createObjectURL(blob);
//                   const link = document.createElement("a");
//                   link.href = url;
//                   link.download = "full-mermaid-graph.svg";
//                   document.body.appendChild(link);
//                   link.click();
//                   document.body.removeChild(link);
//                   URL.revokeObjectURL(url);
//                 });
//               }
//             }, 500);
//           });
//         </script>
//     </body>
//     </html>
//   `;

//   return (
//     <iframe
//       ref={iframeRef}
//       title="Mermaid Graph"
//       srcDoc={htmlContent}
//       style={{
//         width: "100%",
//         height: "100vh",
//         border: "none",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     />
//   );
// };

// export default MermaidGraph;


// import React, { useRef } from "react";

// const MermaidGraph = ({ graphDefinition }) => {
//   const iframeRef = useRef(null);

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Mermaid.js</title>
//         <style>
//           html, body {
//             height: 100%;
//             margin: 0;
//           }
//           body {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             overflow: hidden;
//             position: relative;
//           }
//           .mermaid {
//             width: 100%;
//             height: 100%;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//           }
//           svg {
//             width: 100vw;
//             height: 100vh;
//           }
//           .download-btn {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             background: #007bff;
//             color: white;
//             border: none;
//             padding: 8px 12px;
//             cursor: pointer;
//             font-size: 14px;
//             border-radius: 5px;
//             z-index: 1000;
//           }
//         </style>
//     </head>
//     <body>
//         <button class="download-btn" id="download">Download SVG</button>
//         <div class="mermaid" id="mermaid-container">
//             ${graphDefinition}
//         </div>

//         <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
//         <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
//         <script>
//           mermaid.initialize({ startOnLoad: true });

//           let panZoomInstance;

//           function enableZoom() {
//             const svg = document.querySelector("svg");
//             if (svg) {
//               svg.setAttribute("width", window.innerWidth);
//               svg.setAttribute("height", window.innerHeight);

//               panZoomInstance = window.svgPanZoom(svg, {
//                 zoomEnabled: true,
//                 panEnabled: true,
//                 controlIconsEnabled: false, // Hide controls from view
//                 fit: true,
//                 center: true,
//                 minZoom: 0.5,
//                 maxZoom: 5
//               });
//             }
//           }

//           function resetZoom() {
//             if (panZoomInstance) {
//               panZoomInstance.reset();
//             }
//           }

//           function downloadSVG() {
//             resetZoom(); // Reset before downloading

//             setTimeout(() => {
//               const svg = document.querySelector("svg");
//               if (!svg) return;

//               svg.setAttribute("width", window.innerWidth);
//               svg.setAttribute("height", window.innerHeight);

//               const clonedSvg = svg.cloneNode(true);
//               clonedSvg.removeAttribute("transform");
//               clonedSvg.removeAttribute("viewBox");

//               const serializer = new XMLSerializer();
//               let svgString = serializer.serializeToString(clonedSvg);
//               if (!svgString.startsWith('<?xml')) {
//                 svgString = '<?xml version="1.0" encoding="UTF-8"?>\\n' + svgString;
//               }

//               const blob = new Blob([svgString], { type: "image/svg+xml" });
//               const url = URL.createObjectURL(blob);
//               const link = document.createElement("a");
//               link.href = url;
//               link.download = "mermaid-diagram.svg";
//               document.body.appendChild(link);
//               link.click();
//               document.body.removeChild(link);
//               URL.revokeObjectURL(url);
//             }, 300);
//           }

//           document.addEventListener("DOMContentLoaded", () => {
//             setTimeout(() => {
//               enableZoom(); // Enable zoom after Mermaid renders
//               document.getElementById("download").addEventListener("click", downloadSVG);
//             }, 500);
//           });
//         </script>
//     </body>
//     </html>
//   `;

//   return (
//     <iframe
//       ref={iframeRef}
//       title="Mermaid Graph"
//       srcDoc={htmlContent}
//       style={{
//         width: "100%",
//         height: "100vh",
//         border: "none",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     />
//   );
// };

// export default MermaidGraph;
import React, { useRef, useEffect } from "react";

const MermaidGraph = ({ graphDefinition }) => {
  const iframeRef = useRef(null);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mermaid.js</title>
      <style>
        html, body {
          height: 100%;
          margin: 0;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .mermaid {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        svg {
          width: 100vw;
          height: 100vh;
        }
        .download-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 14px;
          border-radius: 5px;
          z-index: 1000;
        }
      </style>
    </head>
    <body>
      <button class="download-btn" id="download">Download SVG</button>
      <div class="mermaid" id="mermaid-container">
        ${graphDefinition}
      </div>

      <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
      <script>
        mermaid.initialize({ startOnLoad: true });

        let panZoomInstance;

        function enableZoom() {
          const svg = document.querySelector("svg");
          if (svg) {
            svg.setAttribute("width", window.innerWidth);
            svg.setAttribute("height", window.innerHeight);

            panZoomInstance = window.svgPanZoom(svg, {
              zoomEnabled: true,
              panEnabled: true,
              controlIconsEnabled: false,
              fit: true,
              center: true,
              minZoom: 0.5,
              maxZoom: 5
            });
          }
        }

        function resetZoom() {
          if (panZoomInstance) {
            panZoomInstance.reset();
          }
        }

        function downloadSVG() {
          resetZoom();

          setTimeout(() => {
            const svg = document.querySelector("svg");
            if (!svg) {
              console.error("SVG element not found!");
              return;
            }

            const clonedSvg = svg.cloneNode(true);
            clonedSvg.removeAttribute("transform");

            const bbox = svg.getBBox();

            if (bbox.width === 0 || bbox.height === 0) {
              console.error("Bounding box has zero dimensions!");
              return;
            }
            clonedSvg.setAttribute("width", bbox.width);
            clonedSvg.setAttribute("height", bbox.height);
            clonedSvg.setAttribute("viewBox", "0 0 " + bbox.width + " " + bbox.height);

            const serializer = new XMLSerializer();
            let svgString = serializer.serializeToString(clonedSvg);

            if (!svgString.startsWith('<?xml')) {
              svgString = '<?xml version="1.0" encoding="utf-8"?>' + svgString;
            }

            const blob = new Blob([svgString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "mermaid-diagram.svg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 500); // reduced timeout
        }

        document.addEventListener("DOMContentLoaded", () => {
          setTimeout(() => {
            enableZoom();
            document.getElementById("download").addEventListener("click", downloadSVG);
          }, 500); // reduced timeout
        });
      </script>
    </body>
    </html>
  `;

  useEffect(() => {
    const iframe = iframeRef.current;
    if(iframe){
        iframe.onload = () => {
            iframe.contentWindow.postMessage({type: 'mermaidInit'}, '*');
        }
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Mermaid Graph"
      srcDoc={htmlContent}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
};

export default MermaidGraph;