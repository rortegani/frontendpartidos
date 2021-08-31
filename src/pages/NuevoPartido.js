import React, { useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import validator from 'validator'
import { isObjetoVacio } from '../helpers/helpers';
import axios from 'axios';
import { CREAR_PARTIDO_ENDPOINT } from '../helpers/endpoints';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { obetenerUsuarioPartidos } from '../acciones/partidoAcciones';
import NuevoPartidoFormulario from '../componentes/formularios/NuevoPartidoFormulario';

export default function NuevopPartido() {

    const [errores, setErrores]= useState({});
    const history=useHistory();
    const dispatch= useDispatch()

    const crearPartido=  async({fecha, equipoLocal, equipoVisitante}) => {
        const errores={};
        setErrores(errores);

        if(!validator.isDate(fecha)){
            errores.fecha= "Fecha invalida"
        }

        if(validator.isEmpty(equipoLocal)){
            errores.equipoLocal = "El nombre del equipo local no puede estar vacio"
        }

        if(validator.isEmpty(equipoVisitante)){
            errores.equipoVisitante = "El nombre del equipo visitante no puede estar vacio"
        }

        if(!isObjetoVacio(errores)){
            setErrores(errores);
            return;
        }

        try {
            const response = await axios.post(CREAR_PARTIDO_ENDPOINT, {fecha, equipoLocal, equipoVisitante});
            await dispatch(obetenerUsuarioPartidos());
            toast.info("Partido creado con exito", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            });
            history.push(`/partidos/${response.data.partidoId}`);
        } catch (error) {
            setErrores({
                nuevoPartido:error.response.data.message
            });
        }
        
    }

    return (

        <Container className="margen-t margen-b">
            <Row>
                <Col sm="12" lg={{span:10, offset:1}} >
                    <Card body>
                        {errores.nuevoPartido && <Alert variant="danger">{errores.nuevoPartido}</Alert>}
                        <h3>Crear partido</h3>
                        <NuevoPartidoFormulario errores={errores} enviarCallback={crearPartido} editar={false}></NuevoPartidoFormulario>                        
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

