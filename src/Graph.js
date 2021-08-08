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
import axios from 'axios';

function Graph() {
  const [data, setData] = useState([]);

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

    fetchData();
  }, []);

  console.log(data);
  return (
    data && (
      <LineChart
        width={1200}
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
    )
  );
}

export default Graph;
