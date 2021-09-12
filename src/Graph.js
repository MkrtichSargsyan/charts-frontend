import { useState, useEffect } from 'react';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Graph() {
  const [data, setData] = useState([]);
  const data01 = [];
  const data02 = [];

  console.log('1');

  for (const key in data) {
    data01.push({
      name: data[key].month,
      value: data[key].recovered,
    });
    data02.push({
      name: data[key].month,
      value: data[key].deaths,
    });
  }

  useEffect(() => {
    var config = {
      method: 'get',
      mode: 'no-cors',
      url: 'http://localhost:3000/',
      headers: {},
    };

    const fetchData = async () => {
      try {
        const d = await axios(config).then((response) => response.data);
        setData(d);
      } catch (error) {
        console.log('error', error);
      }
    };

    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);

  return (
    data && (
      <div className="flex">
        <PieChart width={400} height={400}>
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          />
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
        </PieChart>
        <LineChart
          className="chart"
          width={900}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="blue"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    )
  );
}

export default Graph;
