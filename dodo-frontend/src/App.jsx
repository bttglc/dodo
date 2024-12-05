import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";
import logo from "./assets/dodo.svg";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    fetch("http://localhost:8080")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleAddTodo = (newTask) => {
    // Add task to backend
    fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, description: "", completed: false }),
    })
      .then((response) => response.json())
      .then((task) => {
        setTodos((prevTodos) => [...prevTodos, task]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleRemoveTodo = (id) => {
    // Remove task from backend
    fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleUpdateTodo = (id, newTask, completed = null) => {
    // Update task in backend
    const updatedFields = {};
    if (newTask !== undefined) updatedFields.title = newTask;
    if (completed !== null) updatedFields.completed = completed;

    fetch(`http://localhost:8080/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTask : todo))
        );
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="app">
      <h1 className="app-title">
        <a href="https://github.com/bttglc/dodo" target="_blank" rel="noopener noreferrer">
          <img className="app-logo" src={logo} alt="Dodo Logo" />
        </a>
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
