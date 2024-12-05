import React, { useState } from "react";
import "../styles/TodoItem.css";

const TodoItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.title); // Use title instead of task

  const handleRemove = () => {
    onRemoveTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTodo(todo.id, editedTask); // Use edited title
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    onUpdateTodo(todo.id, undefined, !todo.completed); // Toggle completed state
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        className="todo-checkbox"
      />
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          className="todo-edit-input"
        />
      ) : (
        <span
          className={`todo-task ${todo.completed ? "completed" : ""}`}
        >
          {todo.title} {/* Display title */}
        </span>
      )}
      {isEditing ? (
        <button className="todo-save-button" onClick={handleSave}>
          Save
        </button>
      ) : (
        <button className="todo-edit-button" onClick={handleEdit}>
          Edit
        </button>
      )}
      <button className="todo-remove-button" onClick={handleRemove}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
