import React, { useState, useEffect } from 'react';

function TaskForm({ dispatch, currentTask }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name);
      setDescription(currentTask.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      if (currentTask) {
        dispatch({
          type: 'update',
          payload: { ...currentTask, name, description },
        });
      } else {
        dispatch({
          type: 'add',
          payload: {
            id: Date.now(),
            name,
            description,
            completed: false,
          },
        });
      }
      setName('');
      setDescription('');
    } else {
      alert('Veuillez remplir les deux champs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Nom de la tâche</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nom de la tâche"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description de la tâche</label>
        <textarea
          className="form-control"
          placeholder="Description de la tâche"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        {currentTask ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
}

export default TaskForm;
