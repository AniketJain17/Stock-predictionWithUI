/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ChakraProvider } from "@chakra-ui/react";

import Footer from "../Dashboard/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";

import CandleStick from "../Dashboard/CandleStick";
import VolumeBarChart from "../Dashboard/VolumeBarChart";

Chart.register(CategoryScale);

const BlockArc = () => {
  return (
    <ChakraProvider>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <CandleStick />
          <VolumeBarChart />
        </div>
      </div>
      <Footer />
    </ChakraProvider>
  );
};

export default BlockArc;
