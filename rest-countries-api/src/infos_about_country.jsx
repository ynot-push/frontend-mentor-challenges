import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './infos_country.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Infos({ colorBackground, colorElement, colorText, colorInfo }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        setCountry(response.data[0]); 
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, [name]);

  if (!country) {
    return <div className='loading' style={{ color: colorText }}>Loading...</div>;
  }

  return (
    <div className='infos-container' style={{ backgroundColor: colorBackground }}>
      <div className="button_div">
        <button onClick={() => navigate(-1)} style={{ backgroundColor: colorElement, color: colorText }}>
          <FontAwesomeIcon icon={faArrowLeft} className="icon-back" />
          Back
        </button>
      </div>

      <div className="infos_containerr">
        <div>
          <img src={country.flags.svg} alt={`${country.name.common} flag`} className='flag_img' />
        </div>
        <div className='ALL_infos'>
          <h2 className='country_name_T' style={{ color: colorText }}>{country.name.common}</h2>
          <div className="infos_details_cont">
            <div style={{ color: colorText }}>
              <p>Native Name: <span style={{ color: colorInfo }}>{country.name.nativeName ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common : country.name.common}</span></p>
              <p>Population: <span style={{ color: colorInfo }}>{country.population.toLocaleString()}</span></p>
              <p>Region: <span style={{ color: colorInfo }}>{country.region}</span></p>
              <p>Sub Region: <span style={{ color: colorInfo }}>{country.subregion}</span></p>
              <p>Capital: <span style={{ color: colorInfo }}>{country.capital ? country.capital[0] : 'N/A'}</span></p>
            </div>
            <div style={{ color: colorText }}>
              <p>Top Level Domain: <span style={{ color: colorInfo }}>{country.tld[0]}</span></p>
              <p>Currencies: <span style={{ color: colorInfo }}>{country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A'}</span></p>
              <p>Languages: <span style={{ color: colorInfo }}>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</span></p>
            </div>
          </div>
          <div className='border_c' style={{ color: colorText }}>
            Border Countries:
            {country.borders ?
              country.borders.map((border, index) => (
                <Link to={`/country/${border}`} key={index}>
                  <span className='bordeer_countries' style={{ backgroundColor: colorElement, color: colorText }}>{border}</span>
                </Link>
              )) :
              'None'
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infos;

