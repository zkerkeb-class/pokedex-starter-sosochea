import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css'; 
import pokedexLogo from '../assets/pokedex/pokedex.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      navigate('/login');
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f06292',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
        paddingTop: '20px'
      }}>
        <img src={pokedexLogo} alt="Pokedex Logo" style={{ width: '180px', marginBottom: '20px' }} />
        <h2 style={{ marginBottom: '20px', color: '#222' }}>Créer un compte</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={{
            ...buttonStyle,
            background: '#f06292',
            color: 'white',
            marginTop: '15px'
          }}>
            S'inscrire
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
        <p style={{ marginTop: '15px' }}>
          Vous avez déjà un compte ? <Link to="/login" style={{ color: '#f06292' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 20px',
  margin: '10px 0',
  borderRadius: '25px',
  border: '1px solid #ddd',
  outline: 'none',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px 20px',
  width: '100%',
  border: 'none',
  borderRadius: '25px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Register;
