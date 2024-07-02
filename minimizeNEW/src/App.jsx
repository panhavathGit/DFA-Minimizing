import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Index from ".";
import Menu from "./Menu";
import MinimizeAPP from "./minimizeDFA"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        {/* <Route path="/design-dfa" element={<Index />} /> */}
        <Route path="/minimizeDFA" element = {<MinimizeAPP/>}/>
      </Routes>
    </Router>
  );
};

export default App;
