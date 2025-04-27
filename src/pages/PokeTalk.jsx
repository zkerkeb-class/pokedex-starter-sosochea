import React, { useState, useEffect } from 'react';
import { getAllPokemons, getAllPosts, createPost, deletePost, likePost, dislikePost } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import poketalk from '../assets/pokedex/poketalk.png';

export default function Poketalk() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [allPokemons, setAllPokemons] = useState([]);
  const [userName, setUserName] = useState('Invité');
  const [sortOption, setSortOption] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const [likedPostId, setLikedPostId] = useState(null);
  const [dislikedPostId, setDislikedPostId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || 'Invité');
      } catch (e) {
        console.error("Erreur décodage token", e);
      }
    }
  }, []);

  useEffect(() => {
    getAllPokemons().then(setAllPokemons);
    getAllPosts().then(setPosts);
  }, []);

  const handlePost = async () => {
    if (!content.trim()) return;
    if (content.length > 280) {
      alert("Le message ne doit pas dépasser 280 caractères !");
      return;
    }
    const random = allPokemons[Math.floor(Math.random() * allPokemons.length)];
    try {
      const newPost = await createPost({
        userName,
        pokemonName: random.name?.english || 'Inconnu',
        pokemonId: random.id,
        pokemonImage: random.image || '',
        message: content
      });
      setPosts([newPost, ...posts]);
      setContent('');
    } catch (error) {
      console.error('Erreur création post', error);
    }
  };

  const handleLike = async (id) => {
    setLikedPostId(id);
    await likePost(id);
    const updatedPosts = await getAllPosts();
    setPosts(updatedPosts);
    setTimeout(() => setLikedPostId(null), 300); // reset animation
  };

  const handleDislike = async (id) => {
    setDislikedPostId(id);
    await dislikePost(id);
    const updatedPosts = await getAllPosts();
    setPosts(updatedPosts);
    setTimeout(() => setDislikedPostId(null), 300); // reset animation
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr(e) de vouloir supprimer ce post ?");
    if (confirmDelete) {
      try {
        await deletePost(id);
        // Mise à jour immédiate sans recharger tout
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } catch (error) {
        console.error('Erreur suppression', error);
      }
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const sortedPosts = [...posts]
    .filter(post =>
      post.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.pokemonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'likes') {
        return b.likes - a.likes;
      } else if (sortOption === 'pokemon') {
        return (a.pokemonName || '').localeCompare(b.pokemonName || '');
      } else if (sortOption === 'author') {
        return (a.userName || '').localeCompare(b.userName || '');
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ display: 'flex', background: '#ffe4ec', borderRadius: 12, boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
      
      {/* Colonne gauche avec logo */}
      <div style={{ width: 200, padding: 20, backgroundColor: '#ffe4ec' }}>
        <img src={poketalk} alt="Poketalk Logo" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Contenu central */}
      <div style={{
        width: 700,
        padding: '40px 20px',
        borderLeft: '3px solid #f06292',
        borderRight: '3px solid #f06292',
        backgroundColor: 'white',
      }}>
        <h1 style={{ color: '#e91e63', textAlign: 'center' }}>Pokétalk</h1>

        {/* Zone de publication */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Exprime-toi..."
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid #ccc',
              resize: 'none',
              height: 80
            }}
          />
          <button
            onClick={handlePost}
            style={{
              background: '#e91e63',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: 6,
              fontWeight: 'bold'
            }}
          >
            Poster
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔎 Rechercher par message, auteur ou Pokémon"
            style={{
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              marginTop: 20
            }}
          />
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              marginTop: 10,
              marginBottom: 20
            }}
          >
            <option value="date">📅 Plus récents</option>
            <option value="likes">🔥 Plus aimés</option>
            <option value="pokemon">🎮 Par Pokémon</option>
            <option value="author">👤 Par Auteur</option>
          </select>
        </div>

        {/* Affichage des posts */}
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {sortedPosts.map(post => (
            <div
              key={post._id}
              style={{
                background: '#fce4ec',
                padding: 20,
                borderRadius: 12,
                border: '2px solid #f06292',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img
                  src={post.pokemonImage || ''}
                  alt={post.pokemonName}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white',
                    backgroundColor: '#fff'
                  }}
                />
                <strong style={{ color: '#ad1457' }}>{post.pokemonName}</strong> — <span style={{ color: '#555' }}>{post.userName}</span>
              </div>
              <p style={{ marginTop: 10 }}>{post.message}</p>
              <div style={{ marginTop: 10, display: 'flex', gap: 12 }}>
                <button
                  onClick={() => handleLike(post._id)}
                  style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: 18 }}
                >
                  ❤️‍🔥{' '}
                  <span
                    style={{
                      display: 'inline-block',
                      transform: likedPostId === post._id ? 'scale(1.5)' : 'scale(1)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    {post.likes}
                  </span>
                </button>
                <button
                  onClick={() => handleDislike(post._id)}
                  style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: 18 }}
                >
                  💔{' '}
                  <span
                    style={{
                      display: 'inline-block',
                      transform: dislikedPostId === post._id ? 'scale(1.5)' : 'scale(1)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    {post.dislikes}
                  </span>
                </button>
                <button onClick={() => handleDelete(post._id)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: 18 }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{
                padding: '8px 12px',
                backgroundColor: number === currentPage ? '#f06292' : '#e0e0e0',
                color: number === currentPage ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {number}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}