import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";
import logo from "./assets/dodo.svg";

const App = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTask) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), task: newTask, completed: false },
    ]);
  };

  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id, newTask, completed = null) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              task: newTask !== undefined ? newTask : todo.task,
              completed: completed !== null ? completed : todo.completed,
            }
          : todo
      )
    );
  };

  return (
    <div className="app">

      <h1 className="app-title">
        <a href="https://github.com/bttglc/dodo" target="_blank" rel="noopener noreferrer">
      <img className="app-logo" src={logo} alt="Dodo Logo" />
      </a>
      <p>Dodo</p>
        </h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onRemoveTodo={handleRemoveTodo}
        onUpdateTodo={handleUpdateTodo}
      />
    </div>
  );
};

export default App;
