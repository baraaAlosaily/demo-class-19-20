import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/homepage/Home"
import Favoritepage from './components/favoritepage/Favoritepage';
import Navbar from "./components/navbar/Navbar"

function App() {
  return (
    <div>
    <Router>
      <Navbar/>
      <Switch>
        <Route path={"/"} exact component={Home}/>
        <Route path={"/favorite"} exact component={Favoritepage}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
