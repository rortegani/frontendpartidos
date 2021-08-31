import axios from 'axios';
import React, {useState, useEffect} from 'react'
import Partido from '../componentes/partidos/Partido';
import PartidosVacio from '../componentes/utils/PartidosVacio';
import Placeholder from '../componentes/utils/Placeholder';
import { PARTIDOS_CREADOS_ENDPOINT } from '../helpers/endpoints';

export default function Partidos() {

    const [partidos, setPartidos] = useState([]);
    const [fetching, setFeching] = useState(true);

    useEffect(()=>{
        axios.get(PARTIDOS_CREADOS_ENDPOINT).then(response => {
            setPartidos(response.data);
            setFeching(false);
        }).catch(e => {
            console.error(e);
            setFeching(false);
        })
    }, []);

    return (
        <div>
            <div className="margen-t">
                <h1 className="mi-jumbotron">Partidos registrados</h1>        
            </div>
            {fetching && <Placeholder></Placeholder>}  
            {!fetching && partidos.length === 0 &&
                <PartidosVacio texto="No hay partidos disponibles"></PartidosVacio>
            }          
            <div>
                {partidos.map(partido => <Partido key={partido.partidoId} partido={partido} controlesRender={false}></Partido>)}
            </div>
        </div>
    )
}

