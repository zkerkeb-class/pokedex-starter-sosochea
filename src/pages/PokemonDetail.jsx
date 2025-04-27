// src/pages/PokemonDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPokemonById, deletePokemon } from '../services/api';
import '../index.css';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemonById(id)
      .then(setPokemon)
      .catch(() => setError("Ce Pokémon n’existe pas ou une erreur est survenue."));
  }, [id]);

  const handleDelete = () => {
    if (confirm(`Es-tu sûr(e) de vouloir supprimer ${pokemon?.name?.english} ?`)) {
      deletePokemon(Number(id))
        .then(() => {
          alert("Pokémon supprimé !");
          navigate("/");
        })
        .catch((err) => alert("Erreur lors de la suppression : " + err.message));
    }
  };

  if (error) return <div>{error}</div>;
  if (!pokemon) return <div>Chargement…</div>;

  return (
    <div className="App" style={{ textAlign: "center", paddingTop: "40px" }}>
      <div className="pokemon-card" style={{ margin: "0 auto" }}>
        <div className="pokemon-image-container">
          <img
            src={pokemon.image || `/assets/pokemons/${pokemon.id}.png`}
            alt={pokemon.name?.english}
            className="pokemon-image"
          />
        </div>

        <div className="pokemon-info">
          <h2 className="pokemon-name">{pokemon.name?.english}</h2>
          <p className="pokemon-type">
            Type :{" "}
            {(pokemon.types?.length > 0
              ? pokemon.types
              : pokemon.type?.length > 0
              ? pokemon.type
              : ["Inconnu"]
            ).join(", ")}
          </p>
        </div>

        <div className="pokemon-stats">
          <p>HP : {pokemon.stats?.hp ?? pokemon.base?.HP ?? "?"}</p>
          <p>Attack : {pokemon.stats?.attack ?? pokemon.base?.Attack ?? "?"}</p>
          <p>Defense : {pokemon.stats?.defense ?? pokemon.base?.Defense ?? "?"}</p>
          <p>Speed : {pokemon.stats?.speed ?? pokemon.base?.Speed ?? "?"}</p>
        </div>
      </div>

      {/*  Boutons navigation */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "12px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#f8bbd0",
            width: "100px",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Retour
        </button>

        <Link to={`/edit/${id}`}>
          <button
            style={{
              background: "#ec407a",
              width: "110px",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Modifier
          </button>
        </Link>

        <button
          onClick={handleDelete}
          style={{
            background: "#ad1457",
            width: "110px",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default PokemonDetail;