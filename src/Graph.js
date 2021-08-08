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
    getData();
  });

  const getData = () => {
    var axios = require('axios');
    var data = '';

    var config = {
      method: 'get',
      url: 'http://localhost:3000/',
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <LineChart
      // stroke={(d) => (d > 50 ? 'red' : 'green')}
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
      <XAxis dataKey="name" />
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
  );
}

export default Graph;
