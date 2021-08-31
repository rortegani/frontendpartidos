
import { combineReducers } from 'redux';
import autenticacionReducer from './autenticacionReducer'
import usuarioPartidoReducer from "./usuarioPartidoReducer";

export default combineReducers({
    auth: autenticacionReducer,
    partidos: usuarioPartidoReducer
});