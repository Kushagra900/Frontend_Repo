import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input, status: 'Pending' })
    })
    .then(res => res.json())
    .then(newTask => setTasks([...tasks, newTask]));
    setInput('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Task Tracker</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="New task..." />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => <li key={t.id}>{t.title} - <b>{t.status}</b></li>)}
      </ul>
    </div>
  );
}

export default App;