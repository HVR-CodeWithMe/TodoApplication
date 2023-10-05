import './App.css';
import Navbar from './components/Navbar'
import Getdata from './components/GetData';
import CreateUser from './CreateUser';
import Upload from './components/Upload';
import Putdata from './components/Putdata';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom' 
function App() {
  return (
    <div>
      <Router>
    <Navbar/>
    <Routes>
       <Route exact path='Getdata'  element={<Getdata/>} />
       <Route exact path='CreateUser'  element={<CreateUser/>} />
       <Route exact path='Upload'  element={<Upload/>} />
       <Route exact path='Putdata'  element={<Putdata/>} />
       
   </Routes>
    </Router>
    </div>
  );
}

export default App;
