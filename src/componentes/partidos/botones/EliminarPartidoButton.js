import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { obetenerUsuarioPartidos } from '../../../acciones/partidoAcciones'
import { ELIMINAR_PARTIDO_ENDPOINT } from '../../../helpers/endpoints'

export default function EliminarPartidoButton({partidoId, local, visitante}) {

    const dispatch= useDispatch();

    const crearAlerta=()=>{
        confirmAlert({
            title:"Eliminar Partido",
            message:`¿Desea eliminar el partido ${local} vs ${visitante}?`,
            buttons:[
                {
                    label:'si',
                    onClick:()=>{eliminarPartido()}
                },
                {
                    label:'No',
                    onClick:()=>{return false;}
                }
                
            ]
        })
    }

    const eliminarPartido= async()=>{
       try {
            await axios.delete(`${ELIMINAR_PARTIDO_ENDPOINT}/${partidoId}`);
            
            await dispatch(obetenerUsuarioPartidos());

            toast.info("El partido se ha eliminado con exito", {
                position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000
            });
       } catch (error) {
            toast.error(error.response.data.mensage, {
                position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000
            });
       }
    }

    return (
        <Button 
            variant="primary" size="sm"
            onClick={crearAlerta}
        >
            Eliminar
        </Button>
    )
}

