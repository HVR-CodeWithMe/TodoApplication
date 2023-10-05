import React from "react";
import { useState ,useEffect} from "react";
import axios from "axios";
export default function CreateUser() {
    const [text,setTodo]=useState("");
    const [Pri,setPri]=useState(0);
    const [date,setD]=useState(0);
    const [Todoadd,setadd]=useState([]);
    const [User, setUser] = useState([]);
    const [sort,setSort]=useState();
    useEffect(()=>{
        axios.get("http://localhost:5000/Getdata").then((response)=>{
            setUser(response.data);
        });
    },[]);
    const onInputChange = (e) => {
        setTodo(e.target.value);
    }
    const onInputChange2 = (e) => {
        setPri(e.target.value);
    }
    const display=()=>{
        axios.post("http://localhost:5000/CreateUser",{
      text,
      Pri,
      date,
    }).then((Response)=>{
      alert("User Created");
    });
    }
    const ByPriority=()=>{
      
    }
  return (
    <div className="container my-4" >
      <div className="card ">
        <div className="card-header text-center">
          <h2>Add Todo List</h2>
        </div>
        <div className="card-body">
          <div className="row my-3">
            <div className="col-md-6">
              <div className="form-outline w-80">
                <input type="text" id="typeText" className="form-control"  onChange={onInputChange} />
                <label className="form-label" for="typeText">
                  Todo
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-outline w-10">
                <input type="text" id="typeText" className="form-control"  onChange={onInputChange2} />
                <label className="form-label" for="typeText">
                  Priority
                </label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-outline w-3">
                <input type="date" id="typeText" className="form-control" onChange={(e)=>setD(e.target.value)} />
                <label className="form-label" for="typeText">
                  Date
                </label>
              </div>
            </div>
            <div className="col-md-2">
            <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={display}>Add</button>
        </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center">show Todo lists by  <button type="button" className="btn btn-primary mx-2" onClick={ByPriority} >Priority</button> <button type="button" className="btn btn-primary" >Date</button></p>
          
        </div>
      </div>
    </div>
  );
}
