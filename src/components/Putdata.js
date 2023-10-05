import React from "react";
import { useState, useEffect } from "react";
const api_base = "http://localhost:3001";
export default function Putdata() {
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);
  const [spec, setSpec] = useState(0);
  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };
  return (
    <div>
      <div style={{ marginTop: "5%" }}>
        <div className="row">
          <div className="col-5">
            <h1 style={{ marginLeft: "15%" ,fontFamily:"cursive",position:"fixed"}}>TodoList</h1>
            <div>
              <div className="todos">
                <div className="text">
                  <table
                    className="table table-striped table-hover "
                    style={{
                      width: "60%",
                      backgroundColor: "white",
                      marginLeft: "20%",
                      fontFamily:"cursive",
                      marginTop:"10%",
                      borderRadius:"3%"
                    }}
                  >
                    <thead></thead>
                    <tbody>
                      {todos.length > 0 ? (
                        todos.map((todo) => (
                          <tr
                            style={{ fontSize: "20px" }}
                          >
                            <td
                              className="text-black"
                              onClick={() => {
                                setSpec(1);
                                setList(todo);
                              }}
                              style={{fontFamily:"cursive"}}
                            >
                              {todo.text}
                            </td>
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

          <div className="col-6">
          {spec ? (
            <div className="container" style={{height:"40rem",position:"fixed"}}>
            
            <div className="card" style={{ width: "25rem",marginTop:"10%",marginLeft:"10%"}}>
            <div className="text-black text-center " style={{height:"3.5rem",fontSize:"30px",fontFamily:"cursive"}}>Todo</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><div style={{height:"2rem" ,fontSize:"20px",fontFamily:"cursive"}}>Todo : {list.text}</div></li>
                <li className="list-group-item"><div style={{height:"2rem" ,fontSize:"20px",fontFamily:"cursive"}}>Priority : {list.pri}</div></li>
                <li className="list-group-item"><div style={{height:"2rem" ,fontSize:"20px",fontFamily:"cursive"}}>Date: {list.date}</div></li>
                <li className="list-group-item"><div style={{height:"2rem" ,fontSize:"20px",fontFamily:"cursive"}}>Status: {list.complete?"Completed":"Not completed"}</div></li>
              </ul>
            </div>
            </div>
          ) : (
            ""
          )}
          </div>
        </div>
      </div>
    </div>
  );
}


