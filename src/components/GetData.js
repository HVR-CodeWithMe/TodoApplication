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
  const [update,setupdate]=useState([]);
  const [id,setid]=useState();
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
    deleteTodo(id)
    const data = await fetch(api_base + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
        pri:pri,
        date:date
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
      <div className="container" style={{ marginLeft: 50, marginRight: 20,marginTop:"3%" }} >
        <div className="App">
          <h1>Todo List</h1>
          <div className="todos w-51 text-center">
            {todos.length > 0 ? (
              todos.map((todo) => (
                
                <div className="row">
                    <div className="col-10">
                    <div
                  className={"todo" + (todo.complete ? " is-complete" : "")}
                  key={todo._id}
                  onClick={() => completeTodo(todo._id)}
                >
                  <div className="checkbox"></div>
                  <div className="text mx-4">{todo.pri}</div>
                  <div className="text mx-4">{todo.text}</div>
                  <div className="text mx-4">{todo.date}</div>
                </div>
                    </div>
                    <div className="col-2">
                    <button type="button" class="btn btn-primary mx-2" style={{height:"60%",width:"40%"}} onClick={()=>{setPopupActive(true);setupdate(todo);setid(todo._id);setNewTodo(todo.text);setPri(todo.pri);setD(todo.date)}}>update</button>
                    <button type="button" class="btn btn-danger" style={{height:"60%",width:"40%"}}  onClick={() => deleteTodo(todo._id)}>Delete</button>
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
                  defaultValue={update.text}
                />
                <input type="number" className="add-todo-input mx-2" style={{marginTop:"6%"}} defaultValue={update.pri} onChange={(e) => setPri(e.target.value)}/>;
                <input type="date" className="add-todo-input"  defaultValue={update.date}  onChange={(e) => setD(e.target.value)}/>
                <div className="button" onClick={addTodo}>
                  Update Task
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
