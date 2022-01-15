import React from 'react';
import './styles/MostrarProducto.scss'
import {Link} from 'react-router-dom';

function MostrarProducto (props){
        return(
           <Link className="Producto-Link" 
           to={`/DatosProducto/${props.link}`} >
            <div className="Producto-Mostrado"  >
                <div className="container-imagen-producto">
                    <img src={props.imagen} alt=""/>
                </div>
                <div className="info-producto">
                    <h3>{props.nombre}</h3>
                    <h3>{props.detalle}</h3>
                    <h3> S/ {props.precio} </h3>
                </div>
            </div>
           </Link>
        )
}

export default MostrarProducto;