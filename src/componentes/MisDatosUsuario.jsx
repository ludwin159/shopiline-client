import React from 'react';
import './styles/MisDatosUsuario.scss';

function MisDatosUsuario(props){
    
        return(
            <div className="Mis-datos-de-usuario">

                <h3 className="titulo-datos-usuario">MIS DATOS</h3> 

                <h4> <span>Nombre :</span>
                {props.nombre} </h4>

                <h4><span>Apellido :</span> 
                {props.apellido} </h4>

                <h4><span>DNI : </span>
                {props.dni}</h4>

                <h4><span>Telefono :</span> 
                {props.telefono} </h4>

                <h4><span>Dirección :</span>
                {props.direccion } </h4>

            </div>
        )
    
}
export default MisDatosUsuario;