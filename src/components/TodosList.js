import React from "react";

const TodosList = ({ todos, setTodos, setEditTodo }) => {
  const handleComplete = (todo) => {
    setTodos(
      // 從todos取出資料放入item(容器)，item id與todo id相同
      todos.map((item) => {
        // 若相同，就把item整包放進去，completed單獨拿出來改變，completed為false時點一下按鈕就會將completed反轉為true，反之!
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  // 取出要編輯那項的id
  const handleEdit = ({ id }) => {
    // 尋找todo is尋找todo id與上列id相同的，放進findTodo內
    const findTodo = todos.find((todo) => todo.id === id);
    // 使用findTodo改變setEditTodo的狀態
    setEditTodo(findTodo);
  };

  // 取出要刪除那項的id
  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todolist">
      {/* 抓出每一筆todos放進todo製成list */}
      {todos.map((todo) => (
        <li className="list-item" key={todo.id}>
          <input
            type="text"
            value={todo.title}
            className={`list ${todo.completed ? "complete" : ""}`}
            onChange={(event) => event.preventDefault()}
          />
          {/* 完成按鈕  */}
          <div className="todo-button">
            <button
              className="button-complete task-button"
              onClick={() => handleComplete(todo)}
            >
              <i className="fa fa-check-circle"></i>
            </button>
            {/* 編輯按鈕 */}
            <button
              className="button-edit task-button"
              onClick={() => handleEdit(todo)}
            >
              <i className="fa fa-edit"></i>
            </button>
            {/* 刪除按鈕 */}
            <button
              className="button-delete task-button"
              onClick={() => handleDelete(todo)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default TodosList;
