import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Allergie() {
    const [allergenes, setAllergenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllergenes = async () => {
            try {
                const response = await axios.get('https://world.openfoodfacts.org/allergens.json');
                if(response.data && response.data.allergens) {
                    setAllergenes(response.data.allergens);
                    setLoading(false); 
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des allergènes:', error);
                setLoading(false); 
            }
        };
        fetchAllergenes();
    }, []);

    return (
        <div>
            <h1>Liste des Allergènes</h1>
            {loading ? (
                <p>loading...</p>
            ) : (
            <ul>
                {allergenes.map((allergene, index) => (
                <li key={index}>{allergene.id} - {allergene.name}</li>
            ))}
          </ul>
            )}
        </div>
      );
} 
