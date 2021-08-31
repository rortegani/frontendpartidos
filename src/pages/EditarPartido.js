import React, { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import validator from 'validator'
import { isObjetoVacio } from '../helpers/helpers';
import axios from 'axios';
import { ACTUALIZAR_PARTIDO_ENDPOINT, PARTIDO_DETALLES_ENDPOINT } from '../helpers/endpoints';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import NuevoPartidoFormulario from '../componentes/formularios/NuevoPartidoFormulario';
import { obetenerUsuarioPartidos } from '../acciones/partidoAcciones';

export default function EditarPartido() {

    const {id} = useParams();
    const [errores, setErrores]= useState({});
    const [partido, setPartido]= useState(null);
    const history=useHistory();
    const dispatch= useDispatch();

    useEffect(() =>{
        axios.get(`${PARTIDO_DETALLES_ENDPOINT}/${id}`).then(response=>{
            setPartido(response.data);
        }).catch(error =>{
            history.push('/')
        })        
    }, [id, history]);

    const editarPartido= async({golesLocal, golesVisitante}) => {
        const errores={};
        setErrores(errores);

        if(validator.isEmpty(golesLocal)){
            errores.golesLocal= "Los goles del equipo local no puede estar vacio"
        }

        if(validator.isEmpty(golesVisitante)){
            errores.golesVisitante = "Los goles del equipo visitante no puede estar vacio"
        }

        if(!isObjetoVacio(errores)){
            setErrores(errores);
            return;
        }

        try {
            const response = await axios.put(`${ACTUALIZAR_PARTIDO_ENDPOINT}/${partido.partidoId}`, {golesLocal, golesVisitante});
            
            await dispatch(obetenerUsuarioPartidos());
            toast.info("Partido actualizado con exito", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            });
            history.push(`/partidos/${response.data.partidoId}`);
        } catch (error) {
            setErrores({
                editarPartido:error.response.data.message
            });
        }
        
    }

    return (

        <Container className="margen-t margen-b">
            <Row>
                <Col sm="12" lg={{span:10, offset:1}} >
                    <Card body>
                        {errores.editarPartido && <Alert variant="danger">{errores.editarPartido}</Alert>}
                        <h3>Editar partido</h3>
                        { partido && 
                            <NuevoPartidoFormulario 
                                errores={errores} 
                                enviarCallback={editarPartido}
                                pFecha={partido.createdAt}
                                pNombreLocal={partido.equipoRestModelLocal.nombre}
                                pnombreVisitante={partido.equipoRestModelVisitante.nombre}
                                pIdLocal={partido.equipoRestModelLocal.id}
                                pIdVisitante={partido.equipoRestModelVisitante.id}
                                pGolesLocal={partido.golesLocal}
                                pGolesVisitante={partido.golesVisitante}
                                editar={true}
                            ></NuevoPartidoFormulario>    
                        }                    
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

