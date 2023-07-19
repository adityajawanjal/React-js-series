import React from "react";
import List from "./components/List";
import Add from "./components/Add";

const App = () => {
  return (
    <>
      <h1 className=" my-10 text-5xl text-orange-600 text-center">
        Contact List of Users{" "}
      </h1>
      <Add />
      <List />
    </>
  );
};

export default App;
