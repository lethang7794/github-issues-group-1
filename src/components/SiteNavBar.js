import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../images/logo.png';

const SiteNavBar = () => {
  return (
    <Navbar className='p-3' expand='s' variant='light'>
      <Navbar.Brand href='/'>
        <img src={logo} alt='CoderSchool' height='50px' />
      </Navbar.Brand>
    </Navbar>
  );
};

export default SiteNavBar;
