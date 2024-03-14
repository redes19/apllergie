import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Allergie() {
    const [allergenes, setAllergenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAllergenes = async () => {
            try {
                const response = await axios.get('https://world.openfoodfacts.org/allergens.json');
                console.log("allergens", response.data.tags, "data", response.data);
                if (response.data && response.data.tags) {
                    const filteredAllergenes = response.data.tags.filter(allergene => {
                        const language = ['en:']; 
                        return language.some(langCode => allergene.id.startsWith(langCode)) && 
                            allergene.name.toLowerCase().includes(searchTerm.toLowerCase());
                    });
                    setAllergenes(filteredAllergenes);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des allergènes:', error);
                setLoading(false); 
            }
        };
        fetchAllergenes();
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un allergène"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <h1>Liste des Allergènes</h1>
            {loading ? (
                <p>loading...</p>
            ) : (
                <ul>
                    {allergenes.map((allergene, index) => (
                        <li key={index}>{allergene.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
