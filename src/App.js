import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Editar from "./Pages/Editar";
import LoginProvider from "./Context/LoginProvider";
import CrearPost from "./Pages/CrearPost";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <LoginProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/crearpost" component={CrearPost} />
            <Route exact path="/editar/:id" component={Editar} />
          </LoginProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
