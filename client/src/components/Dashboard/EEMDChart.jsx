import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const EEMDChart = () => {
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

  const data = {
    labels: Array.from({ length: eemdResults?.imfs[0].length }, (_, i) => i), // Assuming time steps as labels
    datasets: eemdResults?.imfs.map((imf, index) => ({
      label: `IMF ${index + 1}`,
      data: imf,
      borderColor: getRandomColor(),
      fill: false,
    })),
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
        EEMD Chart for IMF
      </h1>
      {eemdResults && <Line data={data} options={options} />}
    </div>
  );
};

export default EEMDChart;

// Function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
