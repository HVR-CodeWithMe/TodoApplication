import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const api_base = "http://localhost:3001";

export default function CreateUser() {
  const [todos, setTodos] = useState([]);
  const [text, setTodo] = useState("");
  const [pri, setPri] = useState(0);
  const [date, setD] = useState(0);
  const [Todoadd, setadd] = useState([]);
  const [User, setUser] = useState([]);
  const [sort, setSort] = useState();
  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(api_base + "/todosd")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };
  const onInputChange = (e) => {
    setTodo(e.target.value);
  };
  const onInputChange2 = (e) => {
    setPri(e.target.value);
  };
  const addTodo = async () => {
    try {
      const data = await fetch(api_base + "/todo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          pri: pri,
          date: date,
        }),
      });
  
      if (!data.ok) {
        // Check for HTTP response errors
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
  
      const responseData = await data.json();
      alert("TODO LIST STORED");
      setTodo("");
      setPri("");
      setD("");

      GetTodos();
    } catch (error) {
      // Handle and log the error
      console.error("Error adding todo:", error);
      // You can also display a user-friendly error message here if needed
      alert("An error occurred while adding the todo. Please try again later.");
    }
  };
  
  const ByPriority = () => {
    fetch(api_base + "/todosP")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };
  return (
    <>
    <div className="container " style={{marginTop:"5%"}}>
      <div className="card ">
        <div className="card-header text-center text-black">
          <h2>Add Todo List</h2>
        </div>
        <div className="card-body">
          <div className="row my-3">
            <div className="col-md-6">
              <div className="form-outline w-80">
                <input
                  type="text"
                  id="typeText"
                  className="form-control"
                  onChange={onInputChange}
                />
                <label className="form-label text-black" htmlFor="typeText">
                  Todo
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-outline w-10">
                <input
                  type="number"
                  id="typeText"
                  className="form-control"
                  onChange={onInputChange2}
                />
                <label className="form-label text-black" htmlFor="typeText">
                  Priority
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-outline w-3">
                <input
                  type="date"
                  id="typeText"
                  className="form-control"
                  onChange={(e) => setD(e.target.value)}
                />
                <label className="form-label text-black" htmlFor="typeText">
                  Date
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addTodo}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center text-black">
            Show Todo Lists By{" "}
            <button
              type="button"
              className="btn btn-primary mx-2"
              onClick={ByPriority}
            >
              Priority
            </button>{" "}
            <button type="button" className="btn btn-primary" onClick={GetTodos}>
              Date
            </button>
          </p>
        </div>
      </div>
      <div className="card my-4">
        <h2 className="text-black text-center">Your Tasks</h2>
        <div className="todos">
              <div className="text">
                <table className="table table-striped" style={{
                      borderRadius:"3%"
                    }}>
                  <thead>
                    <tr style={{fontSize:"20px"}}>
                      <th scope="col" className="text-black">
                        TODO
                      </th>
                      <th scope="col" className="text-black">
                        PRIORITY
                      </th>
                      <th scope="col" className="text-black">
                        DATE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {todos.length > 0 ? (
            todos.map((todo) => (
                    <tr style={{fontSize:"20px"}}>
                      <td className="text-black">{todo.text}</td>
                      <td className="text-black">{todo.pri}</td>
                      <td className="text-black">{todo.date}</td>
                    </tr>
                     ))
          ) : (
            <p>You currently have no tasks</p>
          )}
           </tbody>
                </table>
              </div>
        </div>
      </div>

    </div>
    </>
  );
}
