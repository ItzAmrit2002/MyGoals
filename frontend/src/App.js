import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Header from "./components/Header";
import GoalEdit from "./pages/GoalEdit"
import Register from "./pages/Register";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <>
    <Router>

    <div className="container">
      <Header/>
      <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/updategoal" element={<GoalEdit/>}/>
    </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
