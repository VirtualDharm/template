import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [datajs, setDatajs] = useState([]);
  const [datapy, setDatapy] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/data')
      .then(response => {
        setDatapy(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
    axios.get('http://localhost:3001/data')
      .then(response => {
        setDatajs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Data from js</h1>
      <ul>
        {datajs.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h1>Data from django</h1>
      <ul>
        {datapy.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
