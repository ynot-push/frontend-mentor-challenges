import React, { useEffect, useState } from 'react';
import Header from './header';
import './App.css';
import Location from './LocationInfo';
import axios from 'axios';

function App() {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        const userIp = response.data.ip;
        setIpAddress(userIp);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  const handleSearch = (ip) => {
    setIpAddress(ip);
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <Location ipAddress={ipAddress} />
    </>
  );
}

export default App;
