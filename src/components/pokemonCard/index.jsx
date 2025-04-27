import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon?.id}`);
  };

  const stats = pokemon?.stats || pokemon?.base || {};
  const types = pokemon?.types || pokemon?.type || [];

  return (
    <div
      className="pokemon-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div className="pokemon-image-container">
        <img
          src={pokemon?.image || `/assets/pokemons/${pokemon?.id}.png`}
          alt={pokemon?.name?.english || 'Pokémon'}
          className="pokemon-image"
        />
      </div>

      {/* Infos */}
      <div className="pokemon-info">
        <h2 className="pokemon-name">{pokemon?.name?.english || 'Sans nom'}</h2>
        <p className="pokemon-type">
          {Array.isArray(types) && types.length > 0
            ? `Type: ${types.join(', ').toLowerCase()}`
            : 'Type: Inconnu'}
        </p>
      </div>

      {/* Stats */}
      <div className="pokemon-stats">
        <p>HP: {stats?.hp ?? stats?.HP ?? '?'}</p>
        <p>Attack: {stats?.attack ?? stats?.Attack ?? '?'}</p>
        <p>Defense: {stats?.defense ?? stats?.Defense ?? '?'}</p>
        <p>Speed: {stats?.speed ?? stats?.Speed ?? '?'}</p>
      </div>

      {/* Bouton Voir */}
      <button
        className="attack-button"
        onClick={(e) => {
          e.stopPropagation(); // Evite la navigation parente
          handleClick();
        }}
      >
        Voir
      </button>
    </div>
  );
};

export default PokemonCard;