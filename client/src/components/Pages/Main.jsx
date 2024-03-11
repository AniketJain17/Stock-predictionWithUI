/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ChakraProvider, Box, Grid } from "@chakra-ui/react";

import Footer from "../Dashboard/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import MSEChart from "../Dashboard/MSEChart";
import "./home.scss";
import MAEChart from "../Dashboard/MAEChart";
import R2Score from "../Dashboard/R2Score";
import SMapeChart from "../Dashboard/SMapeChart";
import EEMDChart from "../Dashboard/EEMDChart";
import EEMDResidueChart from "../Dashboard/EEMDResidueChart ";

Chart.register(CategoryScale);

const Main = () => {
  return (
    <ChakraProvider>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="listTitle">
            <EEMDChart />
            <EEMDResidueChart />
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <Box>
                <MSEChart />
              </Box>
              <Box>
                <MAEChart />
              </Box>
              <Box>
                <SMapeChart />
              </Box>
              <Box>
                <R2Score />
              </Box>
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </ChakraProvider>
  );
};

export default Main;
