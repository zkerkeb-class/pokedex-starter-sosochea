// src/pages/EditPokemon.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById, getAllPokemons, updatePokemon } from '../services/api';
import '../index.css';

function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemonById(id)
      .then(setFormData)
      .catch(() => setError('Erreur lors du chargement du Pokémon.'));

    getAllPokemons().then(data => {
      const uniq = [...new Set(data.flatMap(p => p.types || []))];
      setAllTypes(uniq);
    });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const stat = name.split('.')[1];
      setFormData(p => ({ ...p, stats: { ...p.stats, [stat]: Number(value) } }));
    } else if (name === 'name.english') {
      setFormData(p => ({ ...p, name: { ...p.name, english: value } }));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handleAddType = () => {
    const lower = selectedType.toLowerCase();
    if (lower && !(formData.types || []).includes(lower)) {
      setFormData(p => ({ ...p, types: [ ...(p.types || []), lower ] }));
      setSelectedType('');
    }
  };

  const handleRemoveType = t => {
    setFormData(p => ({ ...p, types: (p.types || []).filter(x => x !== t) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('🧾 Données envoyées au back :', formData);

    updatePokemon(id, formData)
      .then(() => navigate('/'))
      .catch((err) => {
        console.error('❌ Erreur API :', err.response?.data || err.message);
        alert('Erreur lors de la mise à jour.');
      });
  };

  if (error) return <div>{error}</div>;
  if (!formData) return <div>Chargement…</div>;

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', padding:'40px' }}>
      <form onSubmit={handleSubmit} style={{ textAlign:'center' }}>
        <div className="pokemon-card" style={{ margin:'0 auto' }}>
          <div className="pokemon-image-container">
            <img
              src={formData.image || `/assets/pokemons/${formData.id}.png`}
              alt={formData.name.english}
              className="pokemon-image"
            />
          </div>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            style={{ width:'90%', margin:'8px 0' }}
          />
          <input
            type="text"
            name="name.english"
            value={formData.name.english}
            onChange={handleChange}
            style={{ width:'90%', textAlign:'center', marginBottom:'10px' }}
          />

          {/* Types */}
          <div style={{ display:'flex', justifyContent:'center', gap:'6px', marginBottom:'6px' }}>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              style={{ flex:'1' }}
            >
              <option value="">Choisir un type</option>
              {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <button type="button" onClick={handleAddType} style={{ padding:'0 10px' }}>+</button>
          </div>

          <div style={{ marginBottom:'10px' }}>
            {(formData.types || []).map(t => (
              <span
                key={t}
                onClick={() => handleRemoveType(t)}
                style={{
                  background:'#fff', color:'#e91e63', padding:'2px 8px',
                  borderRadius:'12px', margin:'0 4px', cursor:'pointer', fontSize:'0.75rem'
                }}
              >
                {t} ❌
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="pokemon-stats">
            {['hp','attack','defense','speed'].map(stat => (
              <div key={stat} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', margin:'4px 0' }}>
                <span>{stat.toUpperCase()} :</span>
                <input
                  type="number"
                  name={`stats.${stat}`}
                  value={formData.stats?.[stat] || 0}
                  onChange={handleChange}
                  style={{ width:'70px' }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop:'16px', padding:'10px 40px',
            background:'#e91e63', color:'#fff', border:'none',
            borderRadius:'6px', fontWeight:'bold', cursor:'pointer'
          }}
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default EditPokemon;