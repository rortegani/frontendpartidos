import React, { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import SigninFormulario from '../componentes/formularios/SigninFormulario';
import validator from 'validator'
import { isObjetoVacio } from '../helpers/helpers';
import { loginUsuario } from '../acciones/autenticacionAcciones';

export default function Signin() {

    const [errores, setErrores]= useState({});
    const dispatch= useDispatch();
    const conectado=useSelector(state=>state.auth.conectado);
    const history=useHistory();

    useEffect(() => {
        if(conectado) {
            history.push("/");
        }
    });

    const login=({userName, password}) => {
        const errores={};
        setErrores(errores);

        if(validator.isEmpty(userName)){
            errores.userName = "El usuario no puede estar vacio";
        }

        if(validator.isEmpty(password)){
            errores.password = "La contraseña no puede estar vacia"
        }

        if(!isObjetoVacio(errores)){
            setErrores(errores);
            return;
        }

        dispatch(loginUsuario({userName, password}))
        .then(response=>{

        })
        .catch(error=>{
            setErrores({ auth: "No se puede iniciar sesion con esas credenciales" });
        });
    }

    return (
        <Container className="margen-t">
            <Row>
                <Col sm="12" md={{span:8, offset:2}} lg={{span:6, offset:3}} >
                    <Card body>
                        {errores.auth && <Alert variant="danger">{errores.auth}</Alert>}
                        <h3>Iniciar sesión</h3> 
                        <SigninFormulario errores={errores} enviarCallback={login}></SigninFormulario>
                        <div className="margen-t">
                            <Link to={'/registro'}>¿No tienes una cuenta? Registrate aqui</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
