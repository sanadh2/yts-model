import "./App.css";
import React from "react";
import { ProvideSearch } from "./context/ProvideSearch";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
      <ProvideSearch>
        <div
          className={`bg-gradient-to-r overflow-hidden from-slate-950  via-slate-600 to-slate-950 text-white `}
        >
          <Home />
        </div>
      </ProvideSearch>
    </>
  );
};

export default App;
