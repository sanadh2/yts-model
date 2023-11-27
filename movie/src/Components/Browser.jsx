import React from "react";

const BrowseMovies = () => {
  return (
    <>
      <div className="min-h-screen p-2">
        <input
          type="text"
          name="search"
          placeholder="search"
          className=" bg-transparent pl-2 h-10 w-[22vw] border-green-500 border-2"
        />
        Year{" "}
        <select name="" id="" className=" bg-red-500 outline-none">
          <option value="" selected className=" bg-black text-white hover:bg-black">
            {" "}
            none
          </option>
        </select>
      </div>
    </>
  );
};

export default BrowseMovies;
