import React, { useState } from 'react';
import './Header.css';
import arrow from "./assets/icon-arrow.svg";

function Header({ onSearch }) {
  const [ipAddress, setIpAddress] = useState('');

  const handleSearch = () => {
    if (ipAddress.trim() === '') {
      alert('Please enter an IP address or domain.');
      return;
    }
    onSearch(ipAddress);
    setIpAddress('');  
  }

  return (
    <div className="search_bar">
      <h1>IP Address Tracker</h1>
      <div className="search_input">
        <input 
          type="text" 
          id="ipInput" 
          placeholder="Search for any IP address or domain"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)} 
        />
        <button onClick={handleSearch} aria-label="Search">
          <img src={arrow} alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Header;
