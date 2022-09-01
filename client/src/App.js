import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import ActivityCreate from "./components/ActivityCreate"
import Detail from "./components/Detail"
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= '/' component={LandingPage}/>
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/activities' component={ActivityCreate}/>
      <Route exact path= '/countries/:id' component={Detail}/>
      <Route component={PageNotFound}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
