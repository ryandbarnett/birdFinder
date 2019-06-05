import React from 'react';
import './Header.css';
import birdLogo from '../../media/red-bird-logo.png';


const Header = () => {
  return (
    <div className='Header'>
      <img id='logo' src={birdLogo} alt='Bird Finder Logo' />
      <h1>BIRD FINDER</h1>
    </div>
  );
}

export default Header;
