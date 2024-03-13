import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Connexion() { 
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/api/user');
  //       setUsers(response.data);
  //       console.log(users);
  //     } catch (error) {
  //       console.error("erreur", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [user, setUser] = useState({
    user: '',
    email: '',
    motdepasse: '',
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/user', user);
      console.log(response.data);
      setUser({
        user: '',
        email: '',
        motdepasse: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'utilisateur:', error);
    }
  }

  return (
    <div>
      <h1>Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            name="user"
            value={user.user}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="motdepasse"
            value={user.motdepasse}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
