import { useEffect, useState } from "react";
import "./index1.css";

const api_base = "http://localhost:3001";

function Getdata() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [text, setTodo] = useState("");
  const [pri, setPri] = useState(0);
  const [date, setD] = useState(0);
  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api_base + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const addTodo = async () => {
    const data = await fetch(api_base + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  return (
    <>
      <div
        className="container"
        style={{ marginLeft: 50, marginRight: 20, marginTop: "3%" }}
      >
        <div className="App">
          <h1>Todo List</h1>
          <div className="todos w-51 text-center">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div className="row">
                    <div className="col-7">
                    <div
                  className={"todo" + (todo.complete ? " is-complete" : "")}
                  key={todo._id}
                  onClick={() => completeTodo(todo._id)}
                >
                  <div className="checkbox"></div>
                  <div className="text mx-4">{todo.pri}</div>
                  <div className="text mx-4">{todo.text}</div>
                  <div className="text mx-4">{todo.date}</div>
                  <div
                    className="delete-todo"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    x
                  </div>
                </div>
                    </div>
                    <div className="col-2">
                        <button>Update</button>
                    </div>
                    
                </div>
              ))
            ) : (
              <p>You currently have no tasks</p>
            )}
          </div>
          {popupActive ? (
            <div className="popup">
              <div className="closePopup" onClick={() => setPopupActive(false)}>
                X
              </div>
              <div className="content">
                <h3>Update Task</h3>
                <input
                  type="text"
                  className="add-todo-input"
                  onChange={(e) => setNewTodo(e.target.value)}
                  value={newTodo}
                />
                <div className="button" onClick={addTodo}>
                  Create Task
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Getdata;
