import React from 'react'
import imgpartidosvacio from '../../assets/img-partidosvacio.svg'

export default function PartidosVacio({texto}) {
    return (
        <div className="img-partidos-vacio">
            <div>
                <object type="image/svg+xml" data={imgpartidosvacio}>
                    Error al cargar svg
                </object>
                <p>{texto}</p>
            </div>
        </div>
    )
}


