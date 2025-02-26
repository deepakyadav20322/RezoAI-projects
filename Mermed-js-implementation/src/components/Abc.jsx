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
//     <script src="https://unpkg.com/panzoom@9.4.0/dist/panzoom.min.js"></script>
//     <script type="module">
//       import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
//       mermaid.initialize({ startOnLoad: true });

//       // Wait for the Mermaid graph to be rendered
//       setTimeout(() => {
//         const svgElement = document.querySelector('.mermaid svg');
//         if (svgElement) {
//           panzoom(svgElement, {
//             maxZoom: 5,
//             minZoom: 0.5,
//             initialZoom: 1,
//           });
//         }
//       }, 1000); // Adjust the timeout as needed
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




const MermaidGraph = ({ graphDefinition }) => {
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
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
        }
        .mermaid {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        svg {
          width: 100%;
          height: 100%;
        }
      </style>
      <script src="https://unpkg.com/panzoom@9.4.0/dist/panzoom.min.js"></script>
      <script type="module">
        import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
        mermaid.initialize({ startOnLoad: true });
  
        document.addEventListener("DOMContentLoaded", () => {
          setTimeout(() => {
            const svg = document.querySelector(".mermaid svg");
            if (svg) {
              svg.style.width = "100vw";
              svg.style.height = "100vh";
              panzoom(svg, {
                maxZoom: 5,
                minZoom: 0.5,
                initialZoom: 1,
                contain: "outside",
              });
            }
          }, 1000); // Ensure rendering before zoom
        });
      </script>
  </head>
  <body>
      <div class="mermaid">
          ${graphDefinition}
      </div>
  </body>
  </html>
    `;
  
    return (
      <iframe
        title="Mermaid Graph"
        srcDoc={htmlContent}
        style={{
          width: "100vw",
          height: "100vh",
          border: "none",
          overflow: "hidden",
        }}
      />
    );
  };
  
  export default MermaidGraph;
  