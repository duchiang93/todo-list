import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  //更新todo
  const updateTodo = (title, id, completed) => {
    // 遍歷todos State ，找到要被edit的todo(Id相同)，放進newTodo，Id不相同就把原本的todo丟回去
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
    //如果editTodo狀態為空，用setTodos新增一條todo，後要將Input value清空，設定為空字串
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      setInput("");
      //如果editTodo有值，則執行updateTodo function來更新todo
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
        {editTodo ? "OK" : "Add"}
      </button>
    </form>
  );
};

export default Form;
