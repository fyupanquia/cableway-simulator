import "./assets/css/App.css";
import "./assets/css/normalize.css";
import React from "react";
import Scenary from "./components/Scenary";
import Booth from "./components/Booth/";
import Man from "./components/Man/";
import Woman from "./components/Woman/";
import Tower from "./components/Tower/";

function App() {
  return (
    <div>
      <body>
        <Scenary />
        <Booth />
        <Man />
        <Woman />
        <Tower position={'left'} />
        <Tower position={'rigth'} />
      </body>
    </div>
  );
}

export default App;
