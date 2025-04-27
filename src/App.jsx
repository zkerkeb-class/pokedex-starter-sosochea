import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokemonDetail from './pages/PokemonDetail';
import CreatePokemon from './pages/CreatePokemon';
import EditPokemon from './pages/EditPokemon';
import Login from './pages/Login';
import Register from './pages/Register';
import Poketalk from './pages/PokeTalk';
import PrivateRoute from './components/pokemonCard/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection racine selon présence du token */}
        <Route path="/" element={<Navigate to={localStorage.getItem('token') ? "/home" : "/login"} />} />

        {/* Pages publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes privées */}
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/poketalk" element={
          <PrivateRoute>
            <Poketalk />
          </PrivateRoute>
        } />
        <Route path="/pokemon/:id" element={
          <PrivateRoute>
            <PokemonDetail />
          </PrivateRoute>
        } />
        <Route path="/create" element={
          <PrivateRoute>
            <CreatePokemon />
          </PrivateRoute>
        } />
        <Route path="/edit/:id" element={
          <PrivateRoute>
            <EditPokemon />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;