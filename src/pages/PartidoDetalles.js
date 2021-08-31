import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Card, Badge } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import { PARTIDO_DETALLES_ENDPOINT } from '../helpers/endpoints';

export default function PartidoDetalles() {

    const {id} =useParams();
    const [partido, setPartido] = useState(null);
    const history = useHistory();

    useEffect(()=>{
        axios.get(`${PARTIDO_DETALLES_ENDPOINT}/${id}`).then(response => {
            setPartido(response.data);
        }).catch(e => {
            history.push('/');
        })
    }, [id, history]);

    return (
        <div className="margen-b">
            {partido && (
                <React.Fragment>
                    <div className="margen-t">
                        <h1 className="mi-jumbotron"> {partido.equipoRestModelLocal.nombre} vs {partido.equipoRestModelVisitante.nombre} </h1>
                        <p>  Creado por {partido.usuarioRestModel.nombre}, {moment(partido.createdAt).fromNow()} </p>
                    </div>

                    <Card>
                        <Card.Header>                            
                            <h3>Goles</h3>                                                         
                            <p>{partido.equipoRestModelLocal.nombre} 
                            <Badge className="mi-badge-marcador">
                                {partido.golesLocal}
                            </Badge>
                            vs 
                            <Badge className="mi-badge-marcador">
                               {partido.golesVisitante}                            
                            </Badge>
                            {partido.equipoRestModelVisitante.nombre}</p> 
                        </Card.Header>
                        <Card.Body>
                            <p>Fecha: {moment(partido.fecha).format('D[/]MM[/]YYYY')}</p>                         
                            <p>Estado: {partido.jugado ? "Jugado" : "Pendiente"}</p>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            )}
        </div>
    )
}

