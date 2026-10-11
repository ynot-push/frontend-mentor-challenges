import "./header.css"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
function Header({darkmodeChanger,colorElement,colorText}) {
  return (
    <>
    <div className='header' style={{background: colorElement,borderBottomColor:colorElement}}>
    <p className='title_app' style={{color: colorText}}>Where in the world?</p>
    <div className='darkmode_button' onClick={darkmodeChanger} style={{color: colorText}}>
    <FontAwesomeIcon icon={faMoon} />
    <p>Dark mode</p>
    </div>
    
    </div>
    
    </>
  )
}

export default Header
