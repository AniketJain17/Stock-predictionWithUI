import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const VolumeBarChart = () => {
  const [volumeData, setVolumeData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("0-199");

  useEffect(() => {
    const [start, end] = selectedRange.split("-").map(Number);

    fetch(`http://127.0.0.1:5000/api/Volume?start=${start}&end=${end}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedDa = JSON.parse(data.volume_data);
        if (Array.isArray(parsedDa)) {
          setVolumeData(parsedDa);
        } else {
          console.error("Invalid volume data format:", data.volume_data);
        }
      })
      .catch((error) => {
        console.error("Error fetching volume data:", error);
      });
  }, [selectedRange]); // Trigger the effect when the selectedRange changes

  const chartData = {
    labels: volumeData.map((entry) => entry.Date),
    datasets: [
      {
        label: "Volume",
        backgroundColor: "#3399FF",
        borderColor: "#3399FF",
        borderWidth: 1,
        hoverBackgroundColor: "#66B2FF",
        hoverBorderColor: "#66B2FF",
        data: volumeData.map((entry) => entry.Volume),
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Volume",
        },
      },
    },
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px" }}
      >
        Volume Bar Chart
      </h1>
      <label style={{ marginRight: "10px" }}>
        Select Range:
        <select
          onChange={handleRangeChange}
          value={selectedRange}
          style={{
            marginLeft: "5px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="0-199">0-199</option>
          <option value="200-399">200-399</option>
          <option value="400-599">400-599</option>
          <option value="600-799">600-799</option>
          <option value="800-999">800-999</option>
          <option value="1000-1199">1000-1199</option>
          <option value="1200-1399">1200-1399</option>
          <option value="1400-1599">1400-1599</option>
          <option value="1600-1825">1600-1825</option>
          {/* Add more range options as needed */}
        </select>
      </label>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default VolumeBarChart;
