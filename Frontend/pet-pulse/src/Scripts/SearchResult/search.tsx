import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './NavbarC.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBars/NavBar';

  
  const Search: React.FC  = () => {
    const input =localStorage.getItem("search")
    return (
      <div>
      <Navbar pagename="" />
        <div> {input}</div></div>
    );
};
export default Search;