import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  //執行了editTodo function後，要更新todo，
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  //將form裡面的 input value 更新到input State -- in App.js:9
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  //submit function
  const onFormSubmit = (event) => {
    event.preventDefault();
    //如果不執行editTodo function，就要改變setTodo State狀態，改變後要將Input value清空，設定為空字串
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
      //如果執行了editTodo function，那就要繼續執行updateTodo function
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  //1. 製作表單
  return (
    //導入submit function
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;
