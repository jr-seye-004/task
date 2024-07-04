import React from 'react';

function TaskItem({ task, dispatch }) {
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`}>
      <div>
        <strong>{task.name}</strong>: {task.description}
      </div>
      <div>
        <button
          className="btn btn-sm btn-info mr-2"
          onClick={() => dispatch({ type: 'edit', payload: task })}
        >
          Modifier
        </button>
        <button
          className="btn btn-sm btn-danger mr-2"
          onClick={() => dispatch({ type: 'delete', payload: task.id })}
        >
          Supprimer
        </button>
        <button
          className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}`}
          onClick={() => dispatch({ type: 'toggleComplete', payload: task.id })}
        >
          {task.completed ? 'Annuler' : 'Compléter'}
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
