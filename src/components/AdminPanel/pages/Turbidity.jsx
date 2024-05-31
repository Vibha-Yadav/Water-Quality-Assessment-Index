import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Tracker.css';

const Turbidity = () => {
  const [data, setData] = useState([]);
  const [intervalType, setIntervalType] = useState('month'); // Default to day-wise

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/dataset.csv');
      const csvData = await response.text();
      // Parse CSV data
      const parsedData = parseCSV(csvData);
      setData(parsedData);
    };
    fetchData();
  }, []);

  const parseCSV = (csv) => {
    // Split CSV by lines
    const rows = csv.split('\n');

    // Extract header row to get column indices
    const headerRow = rows[0].split(',');
    const timestampIndex = headerRow.indexOf('Timestamp');
    const turbidityIndex = headerRow.indexOf('Turbidity');

    // Initialize array to store parsed data
    const parsedData = [];

    // Iterate over rows (excluding header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
      if (row.length >= Math.max(timestampIndex, turbidityIndex)) {
        parsedData.push({
          timestamp: row[timestampIndex],
          turbidity: parseFloat(row[turbidityIndex]) // Assuming Turbidity values are numeric
        });
      }
    }

    return parsedData;
  };

  // Function to filter data based on selected interval type
  const filterDataByInterval = (interval) => {
    const filteredData = [];
    const groupingMap = {};
  
    // Check if data is available and not undefined
    if (!data || data.length === 0) {
      return filteredData; // Return empty array if data is not available
    }
  
    // Continue with filtering if data is available
    data.forEach((entry) => {
      const timestamp = new Date(entry.timestamp);
      let key;
      switch (interval) {
        case 'day':
          key = timestamp.toISOString().split('T')[0]; // Extract YYYY-MM-DD
          break;
        case 'month':
          key = timestamp.toISOString().slice(0, 7); // Extract YYYY-MM
          break;
        case 'year':
          key = timestamp.getFullYear().toString(); // Extract YYYY
          break;
        case 'hour':
          key = timestamp.toISOString().slice(0, 13); // Extract YYYY-MM-DDTHH
          break;
        default:
          key = timestamp.toISOString().split('T')[0]; // Extract YYYY-MM-DD
      }
  
      if (!groupingMap[key]) {
        groupingMap[key] = { sum: 0, count: 0 };
      }
      groupingMap[key].sum += entry.turbidity;
      groupingMap[key].count++;
    });
  
    for (const key in groupingMap) {
      if (groupingMap.hasOwnProperty(key)) {
        const group = groupingMap[key];
        const average = group.sum / group.count;
        filteredData.push({ timestamp: key, turbidity: average });
      }
    }
  
    return filteredData;
  };


  const handleIntervalChange = (e) => {
    setIntervalType(e.target.value);
  };

  return (
    <div>
      <div className='selection'>
        <label>
          Select Interval:
        </label>
        
        <input type="radio" id="hour" name="interval" value="hour" checked={intervalType === 'hour'} onChange={handleIntervalChange} />
        <label htmlFor="hour">Hour</label>

        <input type="radio" id="day" name="interval" value="day" checked={intervalType === 'day'} onChange={handleIntervalChange} />
        <label htmlFor="day">Day</label>

        <input type="radio" id="month" name="interval" value="month" checked={intervalType === 'month'} onChange={handleIntervalChange} />
        <label htmlFor="month">Month</label>

        <input type="radio" id="year" name="interval" value="year" checked={intervalType === 'year'} onChange={handleIntervalChange} />
        <label htmlFor="year">Year</label>

       
      </div >
      <div className='graph'>
      <LineChart width={700} height={500} data={filterDataByInterval(intervalType)}>
      <XAxis dataKey="timestamp" tickFormatter={(timestamp) => intervalType === 'hour' ? timestamp.slice(5, 16) : timestamp} label={{ value: 'Timestamp', position: 'insideBottomLeft', offset: -12 }} />
      <YAxis label={{ value: 'Turbidity (NTU)', angle: -90, position: 'insideLeft' }} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="turbidity" stroke="#8884d8" />
      </LineChart>
      </div>
    </div>
  );
};

export default Turbidity;