import {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./header";
import Connexion from "./connexion.jsx";
import Inscription from "./inscription.jsx";

export default function Home() {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </div>
  )
}
