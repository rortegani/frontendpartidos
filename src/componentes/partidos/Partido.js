import moment from 'moment'
import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import EliminarPartidoButton from './botones/EliminarPartidoButton'

export default function Partido({partido, controlesRender}) {
    return (
        <Card className="margen-t margen-b">
            <Card.Header className="mi-card">
                <div>
                    {partido.jugado ?                             
                        <Badge className="mi-badge-jugado">
                            Jugado
                        </Badge> 
                        :
                        <Badge className="mi-badge-pendiente">
                            Pendiente
                        </Badge>                            
                    }
                </div>
            {controlesRender &&
                <div>
                    <Button 
                        variant="primary" size="sm" className="margen-e"
                        as={NavLink} to={`editarpartido/${partido.partidoId}`}
                    >
                        Editar
                    </Button>
                    <EliminarPartidoButton partidoId={partido.partidoId} local={partido.equipoRestModelLocal.nombre} visitante={partido.equipoRestModelVisitante.nombre}></EliminarPartidoButton>
                </div>
            }
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <Link to={`/partidos/${partido.partidoId}`}> {partido.equipoRestModelLocal.nombre} vs {partido.equipoRestModelVisitante.nombre} </Link>
                </Card.Title>            
                <Card.Text>
                    Fecha: {moment(partido.fecha).format('D[/]MM[/]YYYY')}
                </Card.Text>            
                <Card.Text>
                    Creado por {partido.usuarioRestModel.nombre}, {moment(partido.createdAt).fromNow()}
                </Card.Text>            
            </Card.Body>
        </Card>
    )
}


