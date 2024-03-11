/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const SMapeChart = () => {
  const [graphMAEData, setGraphMAEData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/get_metrics_data"
        );
        setGraphMAEData(response.data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px" }}
      >
        SMAPE for differnt chart
      </h1>
      {graphMAEData && (
        <Bar
          data={{
            labels: graphMAEData.map((row) => row[0]),
            datasets: [
              {
                label: "MAE",
                data: graphMAEData.map((row) => row[3]),
                backgroundColor: "Yellow",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: "category",
                title: { display: true, text: "Models" },
              },
              y: {
                title: { display: true, text: "SMAPE " },
              },
            },
            plugins: {
              legend: { display: false },
            },
          }}
        />
      )}
    </div>
  );
};

export default SMapeChart;
