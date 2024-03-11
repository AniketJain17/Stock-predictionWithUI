/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const R2Score = () => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/get_metrics_data"
        );

        setGraphData(response.data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px" }}>
        R2Score for differnt chart
      </h1>
      {graphData && (
        <Bar
          data={{
            labels: graphData.map((row) => row[0]), // Model names
            datasets: [
              {
                label: "MSE",
                data: graphData.map((row) => row[4]), // MSE values
                backgroundColor: "red",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: "category", // Use 'category' scale for x-axis
                title: { display: true, text: "Models" },
              },
              y: {
                title: { display: true, text: "R2Score" },
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

export default R2Score;
