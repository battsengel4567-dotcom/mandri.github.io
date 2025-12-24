import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [universe, setUniverse] = useState([]);
  const [points, setPoints] = useState(0);

  const signup = async () => {
    const res = await axios.post('http://localhost:5000/signup', { username, password });
    setUser(res.data.user);
  };

  const login = async () => {
    const res = await axios.post('http://localhost:5000/login', { username, password });
    setUser(res.data.user);
    setUniverse(res.data.user.universe);
    setPoints(res.data.user.points);
  };

  const addPlanet = () => {
    const newPlanet = { id: Date.now(), name: 'Planet ' + (universe.length+1) };
    setUniverse([...universe, newPlanet]);
    setPoints(points + 10);
  };

  const saveUniverse = async () => {
    await axios.post('http://localhost:5000/save', { userId: user._id, universe, points });
    alert('Universe saved!');
  };

  return (
    <div className="App">
      {!user ? (
        <div className="login">
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
          <button onClick={signup}>Sign Up</button>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div className="universe">
          <h2>Welcome {user.username}</h2>
          <p>Points: {points}</p>
          <button onClick={addPlanet}>Add Planet</button>
          <button onClick={saveUniverse}>Save Universe</button>
          <div className="planets">
            {universe.map(p => (
              <div key={p.id} className="planet">{p.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
