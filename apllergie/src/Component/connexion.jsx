import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [isloggin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    motdepasse: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      console.log(response.data);
      if(response.status === 200){
        setSuccessMessage('Connexion réussie !'); 
        setFormData({
          email: '',
          motdepasse: ''
        });
        localStorage.setItem('isLogin', true);
        console.log(localStorage.getItem('user'));
        console.log(localStorage);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error.response.data.error);
      setSuccessMessage(''); 
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="motdepasse"
            value={formData.motdepasse}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;


