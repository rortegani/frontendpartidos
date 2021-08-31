import { SET_USUARIO_PARTIDOS } from "../acciones/tipos";

const estadoInicial = {partidos: [], fetched: false};

export default function usuarioPartidoReducer(estado= estadoInicial, accion) {

    const {type, payload} = accion;

    switch (type) {
        case SET_USUARIO_PARTIDOS:
            return{
                ...estado,
                fetched: payload.fetched,
                partidos: payload.partidos
            }
        default:
            return estado;
    }
}
