import "./card.css";
import React, { useState, useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";

const Card = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dataset.csv");
        const csvData = await response.text();
        const rows = csvData.split("\n");
        const headerRow = rows[0].split(",");
        const wqiIndex = headerRow.indexOf("Index");
        const turbidityIndex = headerRow.indexOf("Turbidity");
        const temperatureIndex = headerRow.indexOf("Temp");
        const nitrateIndex = headerRow.indexOf("NO3");
        const conductivityIndex = headerRow.indexOf("Conductivity");
        const firstRow = rows[1].split(",");
        setData({
          // wqi: firstRow[wqiIndex],
          wqi: parseFloat(firstRow[wqiIndex]).toFixed(2),
          turbidity: firstRow[turbidityIndex],
          temperature: firstRow[temperatureIndex],
          nitrate: firstRow[nitrateIndex],
          conductivity: firstRow[conductivityIndex],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="header">
        <h2>
          {" "}
          <CiLocationOn style={{ fontSize: "20px" }} /> Mulgrave River
        </h2>
        <p>Queensland Australia</p>
      </div>

      <div className="stats">
        {data && (
          <>
            <div className="wqi">
              <div className="circle">
              <h3>{data.wqi}</h3>
              </div>
              <p>WQI</p>
            </div>

            <div className="parameters">

              <div className="paramTop">
                <div className="stat">
                  <h3>{data.nitrate} mg/l</h3>
                  <p>Nitrate</p>
                </div>

                <div className="stat" >
                  <h3>{data.temperature} °C</h3>
                  <p>Temperature</p>
                </div>
              </div>

              <div className="paramBottom">
                <div className="pollutant">
                  <h3>{data.turbidity} NTU</h3>
                  <p>Turbidity</p>
                </div>
                
                <div className="pollutant">
                  <h3>{data.conductivity} μs/cm</h3>
                  <p>Conductivity</p>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
      <div className="footerClass">
        <p>Last updated: 11 mins ago</p>
      </div>
    </div>
  );
};

export default Card;
