import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function header() {
  const isUserLoggedIn = localStorage.getItem('isLogin');


  return (
   <header>
        <nav>
            <Link to="/connexion">Connexion</Link>
            <Link to="/inscription">Inscription</Link>
            <Link to="/product">Produits</Link>
            {isUserLoggedIn === 'true' ? (
              <Link to="/Allergie">Allergie</Link>
            ) : (
              null
            )}
        </nav>
   </header>
  )
}
