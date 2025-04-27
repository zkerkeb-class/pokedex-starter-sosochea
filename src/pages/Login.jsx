import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import pokedexImage from '../assets/pokedex/pokedex-login.png';
import pokedexLogo from '../assets/pokedex/pokedex.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('userName', res.name);
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Identifiants incorrects ou erreur serveur.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1, backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={pokedexLogo} alt="Pokédex" style={{ maxWidth: '300px', marginBottom: '20px' }} />
        <img src={pokedexImage} alt="Pokedex Device" style={{ maxWidth: '80%', height: 'auto' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f06292' }}>
        <div style={{ width: '80%', maxWidth: '400px', backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Connexion à votre compte</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', backgroundColor: '#f06292', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
            >
              Se connecter
            </button>
            {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
          </form>
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            Pas encore de compte ? <Link to="/register" style={{ color: '#f06292', textDecoration: 'none', fontWeight: 'bold' }}>Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;