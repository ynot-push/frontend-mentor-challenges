import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './header';
import Card from './Cards/card';
import Infos from './infos_about_country';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [colorElement, setColorElement] = useState('hsl(209, 23%, 22%)');
  const [colorBackground, setColorBackground] = useState('hsl(207, 26%, 17%)');
  const [colorText, setColorText] = useState('hsl(0, 0%, 100%)');
  const [colorInfo, setColorInfo] =useState('hsl(0, 0%, 80%)');

  const darkmodeChanger = () => {
    setColorElement((color) => (color === 'hsl(209, 23%, 22%)' ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)'));
    setColorBackground((color) => (color === 'hsl(207, 26%, 17%)' ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)'));
    setColorText((color) => (color === 'hsl(0, 0%, 100%)' ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)'));
    setColorInfo((color) => (color === 'hsl(0, 0%, 80%)' ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 80%)'));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setRegion(event.target.value);
  };

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (region ? country.region === region : true)
    )
    .slice(0, 8);

    useEffect(() => {
      document.body.style.backgroundColor = colorBackground;
    }, [colorBackground]);
  
  return (
    <Router basename="/rest-countries-app">
      <Header darkmodeChanger={darkmodeChanger}
        colorElement={colorElement}
        colorText={colorText}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className='container_inputs' style={{ backgroundColor: colorBackground, color: colorText }}>
                <div className='search_bar' style={{ backgroundColor: colorElement }}>
                  <FontAwesomeIcon icon={faSearch} className='icon_search' />
                  <input
                    type='text'
                    className='search_input'
                    style={{ backgroundColor: colorElement, color: colorText }}
                    placeholder='Search for a country..'
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <select className='filter' onChange={handleFilter} style={{ backgroundColor: colorElement, color: colorText }}>
                  <option value="" disabled hidden >Filter by region</option>
                  <option value="Africa"style={{color:colorInfo}}>Africa</option>
                  <option value="Americas"style={{color:colorInfo}}>Americas</option>
                  <option value="Asia"style={{color:colorInfo}}>Asia</option>
                  <option value="Europe"style={{color:colorInfo}}>Europe</option>
                  <option value="Oceania"style={{color:colorInfo}}>Oceania</option>
                </select>
              </div>
              <div className='card_container' style={{ backgroundColor: colorBackground }}>
                {filteredCountries.map((country) => (
                  <Card
                    key={country.cca3}
                    flag={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital ? country.capital[0] : 'N/A'}
                    colorElement={colorElement}
                    colorText={colorText}
                  />
                ))}
              </div>
            </>
          }
        />
        <Route path="/country/:name" element={<Infos colorBackground={colorBackground} colorText={colorText} colorElement={colorElement} colorInfo={colorInfo}/>} />
      </Routes>
    </Router>
  );
}

export default App;

