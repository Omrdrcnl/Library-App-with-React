import React from "react";
import Header from "../components/header";
import ListBooks from "../components/ListBooks";

const home = (props) => {
  return (
    <div className="container">
      <Header />
      <ListBooks />
    </div>
  );
};

export default home;
