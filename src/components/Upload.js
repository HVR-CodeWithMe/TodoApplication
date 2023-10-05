import React from 'react';
import Papa from 'papaparse';
import axios from 'axios';
//import { parse } from 'csv-parse';

class Upload extends React.Component {
  state = {
    csvfile: null,
    data: [],
    check:false
  };
display=result=>{
  console.log(typeof(result.data.length));
  const {todos}=result.data;
  this.setState({
    results:result.data,
    //check:true
  })
  console.log(todos)
  console.log(this.state.results.length)
}
Showdata=()=>{
  const { csvfile } = this.state;
  Papa.parse(csvfile, {
    download: true,
    header: true,
    complete: (result) => {
      this.setState({ data: result.data });
      this.setState({check:true})
    }
  });
}

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };
  updateData = async (result) => {
     this.setState({results:result.data});
     this.setState({check:1});
     console.log(this.state.check)
     
      axios
      .post(`http://localhost:3001/todo/upload`,result.data)
      .then(res => console.log(res.data));
      alert("Sucessfully Uploaded");
    };
    
  render() {
    return (
      <>
      <div className="container text-center" style={{marginTop:"5%"}} >
        <h1 className='container my-4' style={{marginTop:"20%"}}>Add CSV file to your Todo List</h1>
      <form class="row g-3 text-center" style={{textAlign:"center",marginLeft:"35%"}}>
      <div class="col-auto">
        <input type="file" readonly class="form-control-plaintext text-white" id="staticEmail2" ref={input => {
            this.filesInput = input;
          }} onChange={this.handleChange}/>
      </div>
      <div class="col-auto">
        <div class="btn btn-primary mb-3" onClick={this.Showdata}>ShowData</div>
      </div>
      <div class="col-auto">
        <button  class="btn btn-primary mb-3" onClick={this.importCSV}>Upload</button>
      </div>
    </form>
    </div>
    { this.state.check?(
      
      <div className="card my-4 w-30">
      <h2 className="text-black text-center">Your Tasks</h2>
      <div className="todos">
            <div className="text">
              <table class="table table-striped" style={{
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
                {this.state.data.length >0 ? (
          this.state.data.map((todo) => {
            if (todo.text) {
              return (
                <tr style={{fontSize:"20px"}}>
                <td className="text-black">{todo.text}</td>
                <td className="text-black">{todo.pri}</td>
                <td className="text-black">{todo.date}</td>
              </tr>
              );
          }
          return (
              " "
          );
                  
  })
        ) : (
          <p>You currently have no tasks</p>
        )}
         </tbody>
              </table>
            </div>
      </div>
      </div>
    ):("")}
    
    </>
    );
  }
}

export default Upload;
