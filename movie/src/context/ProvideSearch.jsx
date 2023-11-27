import React, { useState } from "react";
import SearchContext from "./SearchContext";
export const ProvideSearch = ({ children }) => {
  const [logged, setlogged] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ logged, setlogged, search, setSearch }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};
