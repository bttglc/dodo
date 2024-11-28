import React from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

const TodoList = ({ todos, onRemoveTodo, onUpdateTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo} // Pass each todo as is
          onRemoveTodo={onRemoveTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
