import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navegacion from './layouts/Navegacion';
import Signin from './pages/Signin';
import Partidos from './pages/Partidos';
import store from "./store";
import comprobarToken from './helpers/comprobarToken';
import RutaPrivada from './utils/RutaPrivada';
import PartidosUsuario from './pages/PartidosUsuario';
import PartidoDetalles from './pages/PartidoDetalles';
import Signup from './pages/Signup';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import "react-confirm-alert/src/react-confirm-alert.css";
import NuevopPartido from './pages/NuevoPartido';
import EditarPartido from './pages/EditarPartido';

import moment from "moment";
import 'moment/locale/es'
moment.locale('es')

comprobarToken();

function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
        <div>
          <Navegacion></Navegacion>
        </div>
        <Container>
        <ToastContainer/>
          <Switch>
            <Route exact path="/" component={Partidos}></Route>
            <Route exact path="/login" component={Signin}></Route>
            <Route exact path="/registro" component={Signup}></Route>
            <Route exact path="/partidos/:id" component={PartidoDetalles}></Route>
            <RutaPrivada exact path="/partidos" component={PartidosUsuario}></RutaPrivada>
            <RutaPrivada exact path="/crearpartido" component={NuevopPartido}></RutaPrivada>
            <RutaPrivada exact path="/editarpartido/:id" component={EditarPartido}></RutaPrivada>
          </Switch>
        </Container>
      </BrowserRouter>
    </Provider>    
  );
}

export default App;
