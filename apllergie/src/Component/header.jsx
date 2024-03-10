import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function header() {
  return (
   <header>
        <nav>
            <Link to="/connexion">Connexion</Link>
            <Link to="/inscription">Inscription</Link>
            <Link to="/product">Produits</Link>
        </nav>
   </header>
  )
}
