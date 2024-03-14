import { Routes, Route } from "react-router-dom";
import Header from "./header";
import Connexion from "./connexion.jsx";
import Inscription from "./inscription.jsx";
import Product from "./Product.jsx";
import Allergie from "./Allergie.jsx";

function Home() {


  return (
    <div>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/product" element={<Product />} />
        <Route path="/Allergie" element={<Allergie />} />
      </Routes>
      
    </div>
  );
}

export default Home;
