import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DisplayProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page_size=21&json=true`);
        if (!response.data || !response.data.products) {
          throw new Error('No products found');
        }
        setProducts(response.data.products);
        setLoading(false); 
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSearchChanger = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
        <input
        type="texte"
        placeholder="Rechercher un produit"
        value={searchTerm}
        onChange={handleSearchChanger}
        ></input>
      <h1>Liste des Produits</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <h2>{product.product_name_fr}</h2>
              <img src={product.image_url} alt={product.product_name} />
              <p>Grade nutritionnel: {product.nutrition_grade_fr}</p>
              <p>Ingrédients: {product.ingredients_text}</p>
              <p>Informations nutritionnelles:</p>
              <p>Allergènes: {product.allergens_tags.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
