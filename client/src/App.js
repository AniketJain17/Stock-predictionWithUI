import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Pages/Main";
import { DarkModeContext } from "./context/darkModeContext";
import BlockArc from "./components/Pages/BlockArc";
import CSVCharts from "./components/Pages/CSVCharts";

const AppRouter = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Block_architecture" element={<BlockArc />} />
          <Route path="/CSVCharts" element={<CSVCharts />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
