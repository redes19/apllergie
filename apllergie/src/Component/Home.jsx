import {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from "./header";
import Connexion from "./connexion.jsx";
import Inscription from "./inscription.jsx";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl?search_terms=&page_size=21&json=true');
        if (!response.data || !response.data.products) {
          throw new Error('No products found');
        }
        setProducts(response.data.products);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
      <h1>Liste des Produits</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.product_name_fr}</h2>
            <p>Marque: {product.brands}</p>
            <p>Catégories: {product.categories}</p>
            <p>Grade nutritionnel: {product.nutrition_grade_fr}</p>
            <p>Ingrédients: {product.ingredients_text}</p>
            <p>Informations nutritionnelles:</p>
            <p>Allergènes: {product.allergens_tags.join(', ')}</p>
            <img src={product.image_url} alt={product.product_name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
