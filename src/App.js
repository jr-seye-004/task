import React, { useReducer, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  currentTask: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'edit':
      return { ...state, currentTask: action.payload };
    case 'update':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        currentTask: null,
      };
    case 'delete':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'toggleComplete':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Liste de Tâches</h1>
      <TaskForm dispatch={dispatch} currentTask={state.currentTask} />
      <TaskList tasks={state.tasks} dispatch={dispatch} />
    </div>
  );
}

export default App;
