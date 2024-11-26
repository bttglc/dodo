import React, { useState } from "react";
import "../styles/TodoItem.css";

const TodoItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleRemove = () => {
    onRemoveTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTodo(todo.id, editedTask);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    onUpdateTodo(todo.id, todo.task, !todo.completed);
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
          {todo.task}
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
