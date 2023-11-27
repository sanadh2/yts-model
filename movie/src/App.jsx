import "./App.css";
import React from "react";
import { ProvideSearch } from "./context/ProvideSearch";
import Home from "./Components/Home";

const App = () => {
  return (
    <>
      <ProvideSearch>
        <div
          className={`bg-gradient-to-r from-slate-950  via-slate-600 to-slate-950 text-white `}
        >
          <Home />
        </div>
      </ProvideSearch>
    </>
  );
};

export default App;
