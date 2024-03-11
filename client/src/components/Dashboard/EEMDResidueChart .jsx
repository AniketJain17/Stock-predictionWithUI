import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const EEMDResidueChart = () => {
  const [eemdResults, setEEMDResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/eemd_data");
        setEEMDResults(response.data);
      } catch (error) {
        console.error("Error fetching EEMD results:", error);
      }
    };

    fetchData();
  }, []);

  // Handle the eemdResults state as needed in your React application

  const residueData = {
    labels: Array.from({ length: eemdResults?.imfs[0].length }, (_, i) => i), // Assuming time steps as labels
    datasets: [
      {
        label: "Residue",
        data: eemdResults?.imfs[eemdResults?.imfs.length - 1],
        borderColor: getRandomColor(),
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        title: {
          display: true,
          text: "Amplitude",
        },
      },
    },
  };

  return (
    <div>
      <h1
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px" }}
      >
        EEMD Chart for Residue
      </h1>
      {eemdResults && <Line data={residueData} options={options} />}
    </div>
  );
};

export default EEMDResidueChart;

// Function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
