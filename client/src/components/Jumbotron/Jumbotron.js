import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) =>
  <div style={{ height: 150 }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
