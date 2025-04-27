import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { getAllPokemons } from '../services/api';
import PokemonCard from '../components/pokemonCard';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import pokedexLogo from '../assets/pokedex/pokedex.png';

function HomePage() {
  const token = localStorage.getItem('token');
  const [userName, setUserName] = useState('invité');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || 'invité');
       
      } catch (e) {
        console.error('Token invalide', e);
      }
    }
  }, [token]);

  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 10;

  const navigate = useNavigate();

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      (selectedType === '' || (pokemon.types || pokemon.type || []).includes(selectedType)) &&
      (pokemon.name.english || pokemon.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    getAllPokemons()
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Erreur lors du chargement des Pokémon.');
        setLoading(false);
      });
  }, []);

  const uniqueTypes = [...new Set(pokemons.flatMap((pokemon) => pokemon.type || pokemon.types || []))];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ color: '#ec407a' }}>
        👋 Bonjour {userName} 👋
        </h1>
      </div>
      <div className="App">
      {/* Déconnexion + Poketalk */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 40px' }}>
        <button
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#880e4f', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Se déconnecter
        </button>
        <Link to="/poketalk">
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#ec407a',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            💬 Poketalk
          </button>
        </Link>
      </div>

      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={pokedexLogo} alt="Pokedex Logo" style={{ width: '300px' }} />
      </div>

      {/* Barre de recherche + filtre + bouton créer */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1000px', gap: '10px' }}>
          <input
            type="text"
            placeholder="Rechercher un Pokémon"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">Tous les types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Link to="/create" style={{ flex: 1 }}>
            <button
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#ad1457',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}
            >
              Créer un Pokémon
            </button>
          </Link>
        </div>
      </div>

      {/* Espacement */}
      <div style={{ height: '30px' }} />

      {/* Cartes Pokémon */}
      <div className="pokemon-container">
        {currentPokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} className="pokemon-link" key={pokemon.id}>
            <PokemonCard pokemon={pokemon} buttonColor="#880e4f" />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              padding: '8px 12px',
              backgroundColor: num === currentPage ? '#ec407a' : '#e0e0e0',
              color: num === currentPage ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}

export default HomePage;
