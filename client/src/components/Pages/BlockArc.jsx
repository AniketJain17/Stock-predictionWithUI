/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ChakraProvider } from "@chakra-ui/react";

import Footer from "../Dashboard/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";

import TwitterImage from "../../assets/TwitterImage.png";


Chart.register(CategoryScale);

const BlockArc = () => {
  return (
    <ChakraProvider>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="listTitle">
            <img
              src={TwitterImage} // Update with the correct path or URL
              alt="Description of the image"
              className="yourImageClass" // Optional: Add a CSS class for styling
            />
  
          </div>
        </div>
      </div>
      <Footer />
    </ChakraProvider>
  );
};

export default BlockArc;
