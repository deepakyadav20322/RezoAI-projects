import { useState } from 'react'

import MermaidGraph from './components/Mermed'
import Abc from "./components/Abc"
function App() {
  const complexGraph =`graph TD;
  A["ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?"] -->|"ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ"| B["ಸುಮಾರು ಗಂಟೆ ಎಷ್ಟು?"];
  A -->|"ನಾನು ಚಿಂತಿಸುತ್ತಿದ್ದೇನೆ"| C["ನೀವು ಏನನ್ನು ಸಂಬಂಧಿಸಿದಂತೆ ಚಿಂತನಶೀಲರಾಗಿದ್ದೀರಿ?"];
  A -->|"ಏನೇನೂ ಇಲ್ಲ"| D["ನೋಡು, ನಿಮ್ಮ ಆಟಗಳಲ್ಲಿ ಹೊಸ ವಿಷಯಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪ್ರದರ್ಶಿಸುತ್ತೇನೆ."];
  A -->|"ಹೌದು, ನಾನು ಆಟಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತಿದ್ದೇನೆ"| E["ಅದ್ಭುತ! ನಿಮ್ಮ ಬೆಚ್ಚಗಿನ ಪರಿಸರವನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ನನಗೆ ಅನುಮತಿ ನೀಡುತ್ತೀರಾ?"];
  
  B -->|"ಸಾಕಷ್ಟು"| F["ನೀವು ಆಟಗಳನ್ನು ನಿರ್ವಾಹಿಸುವ ಬಗ್ಗೆ ಯೋಜನೆ ಹೊಂದಿದ್ದೀರಾ?"];
  C -->|"ಕಂಡಿತು"| G["ನಿಮ್ಮ ಚಿಂತನಕ್ಕೆ ವಿಶೇಷ ಏನಾದರೂ ಇದ್ದರೆ?"];
  D -->|"ಹೌದು, ನಾನು ಕೇವಲ ನೋಡುತ್ತಿದ್ದೇನೆ"| H["ನೀವು ನಮ್ಮ ಹೊಸ ಗಣಕವನ್ನು ಪರೀಕ್ಷಿಸಲು ಉತ್ಸುಕವಾಗಿದ್ದೀರಾ?"];
  E -->|"ಹೌದು"| I["ನೀವು ಯಾವುದೇ ಆಟದ ಪ್ರಕಾರವನ್ನು ಹೊಂದಿದ್ದೀರಾ?"];
  
  F -->|"ಹೌದು"| J["ನವೀನ ಆಟಗಳು ಮತ್ತು ಆಕರ್ಷಕ ಸಲಹೆಗಳು ಕಾಯುತ್ತಿದ್ದಾರೆ!"];
  G -->|"ಮಿಸ್ ಮಾಡಿಲ್ಲ"| K["ಎಷ್ಟೆಲ್ಲ ಸಾಧ್ಯ?"];
  H -->|"ಹೌದು"| L["ನೀವು ಶ್ರೇಷ್ಠ ಆಟಗಳ ಅನುಭವ ಮಾಡಲು ಲಾಸ್ಟಿಂಗ್ ನಿಮ್ಮನ್ನು ಕೋರಿಸುತ್ತೇನೆ."];
  I -->|"RPG"| M["RPG ಆಟಗಳಲ್ಲಿ, ನಿಮ್ಮ ಇಷ್ಟದ ಶ್ರೇಣಿಯ ಬಗ್ಗೆ ಯಾರಾದರೂ ಚರ್ಚೆ ಮಾಡಿದ್ದೀರಾ?"];
  
  J -->|"ಒಳ್ಳೆಯ"| N["ನಿಮ್ಮ ವಿಚಾರಣೆ ನನಗೆ ವೈಯಕ್ತಿಕವಾಗಿ ಬೇಕಾದಲ್ಲಿ ನಿಮ್ಮ ಜೊತೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವೇ?"];
  K -->|"ಳಿಸುತ್ತಿದೆ"| O["ನೀವು ಯಾವುದೇ ವಿಶೇಷ ಅಸ್ತಿತ್ವವನ್ನು ಹೊಂದಲು ಬಯಸುತ್ತೀರಾ?"];
  L -->|"ಹೌದು"| P["ಕ್ರಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಮಾಹಿತಿ ಬೇಕಾದರೆ ನನಗೆ ತಿಳಿಸಿ."];
  M -->|"ಹೌದು"| Q["ಶ್ರೇಣಿಯ ಆರೋಗ್ಯಕ್ಕೆ ಒಂದು ದಾರಿ ಮಾಡೋಣ?"];
  
  N -->|"ನೀವು ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸುವುದಿಲ್ಲ"| X["ಈನೆಯನ್ನು ಸ್ವೀಕರಿಸುವ ಅಗತ್ಯವಿಲ್ಲ."];
  O -->|"ಹೊರಟು ಇರುವುದಿಲ್ಲ"| Y["ನಿಮ್ಮನ್ನು ಹಣಕಾಸು ಸಂಬಂಧಿತವಾಗಿ ಅಥವಾ ಏನಾದರೂ ಚರ್ಚೆ ಮಾಡಬಹುದು."];
  P -->|"ಹೌದು"| Z["ಯಾವ ಪ್ರಶ್ನೆಗಳ ಗೊತ್ತಾಗಬೇಕಾದರೂ, ನಾನು ನಿಮ್ಮನ್ನು ಕೇಳುತ್ತೇನೆ!"];
  Q -->|"ಅವಶ್ಯ"| W["ನಿಮ್ಮ ಆದಾಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಬಹುದು."];
  
  Z -->|"ನಾನು ಅವರೊಂದಿಗೆ ನೋಡುತ್ತೇನೆ"| A;
  Y -->|"ಹೋಗ ಅತ್ಯುತ್ತಮ"| Z;
  Z -->|"ಧನ್ಯವಾದಗಳು"| A;
  X -->|"ಸರಿ"| A;
`
  

  
  return (


    <div className="flex w-screen">
    {/* Mermaid Graph container */}
    {/* <div className="w-[200px] h-screen"> */}
      <MermaidGraph graphDefinition={complexGraph} />
    </div>
  

  
  // </div>
  
//      {/* <MermaidGraph graphDefinition={`graph TD; A-->B; B-->C; C-->D;`} /> */}

//      {/* <Abc/> */}
//      {/* <Abc graphDefinition={`graph TD; A-->B; B-->C; C-->D;`} /> */}
//      {/* <Abc 
//   graphDefinition={`graph TD; A-->B; A-->C; C-->D;`} 
//   theme="dark" 
//   customConfig={{ securityLevel: "loose" }} 
// /> */}


//     </div>
  )
}

export default App
