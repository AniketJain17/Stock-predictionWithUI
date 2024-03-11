import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

const CandleStick = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [selectedRange, setSelectedRange] = useState([0, 199]);

  useEffect(() => {
    // Fetch data from the API endpoint with the selected range
    fetch(
      `http://127.0.0.1:5000/api/chartstickdata?start=${selectedRange[0]}&end=${selectedRange[1]}`
    )
      .then((response) => response.json())
      .then((data) => {
        try {
          const parsedData = JSON.parse(data.chart_data);
          if (Array.isArray(parsedData)) {
            // Update state with the parsed data
            setCandlestickData(parsedData);
          } else {
            console.error("Invalid data format:", parsedData);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedRange]); // Update the data when the selected range changes

  const handleRangeChange = (event) => {
    const newRange = event.target.value.split("-").map(Number);
    setSelectedRange(newRange);
  };

  const chartData =
    Array.isArray(candlestickData) && candlestickData.length > 0
      ? [
          ["Date", "Low", "Open", "Close", "High"],
          ...candlestickData.map(({ Date, Low, Open, Close, High }) => [
            Date,
            Low,
            Open,
            Close,
            High,
          ]),
        ]
      : [];

  return (
    <div className="container">
      <h1
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "30px" }}
      >
        Candlestick Chart Example
      </h1>
      <label style={{ marginRight: "10px" }}>
        Select Range:
        <select
          onChange={handleRangeChange}
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
        </select>
      </label>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="CandlestickChart"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          legend: "none",
          bar: { groupWidth: "80%" },
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: "#a52714" }, // Red
            risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // Green
          },
          hAxis: {
            title: "Date",
            textStyle: { color: "#fff" }, // Color of axis text
          },
          vAxis: {
            title: "Stock Price",
            textStyle: { color: "#fff" }, // Color of axis text
          },
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};

export default CandleStick;
