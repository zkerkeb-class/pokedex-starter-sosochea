/* src/pages/CreatePokemon.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPokemon } from '../services/api';
import '../index.css';
import pokeballImg from '../assets/pokedex/pokeball.webp';

export default function CreatePokemon() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 100000), // un id temporaire aléatoire
    name: {
      english: '',
      french: '',
      japanese: '',
      chinese: ''
    },
    types: [],
    image: '',
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0
    },
    evolutions: []
  });

  const [typeInput, setTypeInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('stats.')) {
      const stat = name.split('.')[1];
      setFormData(p => ({ ...p, stats: { ...p.stats, [stat]: parseInt(value, 10) } }));
    } else if (name.startsWith('name.')) {
      const lang = name.split('.')[1];
      setFormData(p => ({ ...p, name: { ...p.name, [lang]: value } }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handleAddType = () => {
    const normalized = typeInput.toLowerCase();
    if (normalized && !formData.types.includes(normalized)) {
      setFormData(p => ({ ...p, types: [...p.types, normalized] }));
      setTypeInput('');
    }
  };

  const handleRemoveType = (t) => {
    setFormData(p => ({ ...p, types: p.types.filter(x => x !== t) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('✅ Données envoyées (create):', formData);
    createPokemon(formData)
      .then(() => navigate('/'))
      .catch(err => {
        console.error(err);
        alert('Erreur lors de la création : ' + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>
      <form
        onSubmit={handleSubmit}
        className="pokemon-card"
        style={{ width: 300, paddingBottom: 130 }}
      >
        {/* Image */}
        <div className="pokemon-image-container">
          <img
            src={formData.image || pokeballImg}
            alt="Prévisualisation"
            className="pokemon-image"
          />
        </div>

        <input
          type="text"
          name="image"
          placeholder="URL de l’image"
          value={formData.image}
          onChange={handleChange}
          style={{ marginTop: 10 }}
        />

        {/* Nom */}
        <input
          type="text"
          name="name.english"
          placeholder="Nom anglais"
          value={formData.name.english}
          onChange={handleChange}
          required
          style={{ marginTop: 6 }}
        />

        {/* Types */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <select
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="">Choisir un type</option>
            {[
              'normal','fire','water','grass','electric','ice','fighting',
              'poison','ground','flying','psychic','bug','rock','ghost',
              'dark','dragon','steel','fairy'
            ].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddType}
            style={{
              marginLeft: 6,
              background: '#e86ca5',
              color: 'white',
              border: 'none',
              width: 40,
              height: 34,
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
        </div>

        <div style={{ marginTop: 6 }}>
          {formData.types.map(t => (
            <span
              key={t}
              onClick={() => handleRemoveType(t)}
              style={{
                marginRight: 6,
                padding: '2px 6px',
                borderRadius: 4,
                background: '#ffb6c1',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              {t} &times;
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="pokemon-stats" style={{ marginTop: 12 }}>
          {[
            ['hp', 'HP'],
            ['attack', 'Attack'],
            ['defense', 'Defense'],
            ['specialAttack', 'Sp. Attack'],
            ['specialDefense', 'Sp. Defense'],
            ['speed', 'Speed']
          ].map(([key, label]) => (
            <div
              key={key}
              style={{
                marginBottom: 6,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <label style={{ flex: 1 }}>{label} :</label>
              <input
                type="number"
                name={`stats.${key}`}
                value={formData.stats[key]}
                onChange={handleChange}
                style={{ flex: 2, padding: '4px', borderRadius: '4px' }}
              />
            </div>
          ))}
        </div>

        {/* Bouton Créer */}
        <button
          type="submit"
          style={{
            margin: '20px auto 10px',
            width: '70%',
            padding: '10px 0',
            background: '#8a204c',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Créer
        </button>
      </form>
    </div>
  );
}
