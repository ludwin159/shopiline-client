import React from 'react';
import './styles/PerfilUsuarioCliente.scss'
import imagenPerfilCliente from'../imagenes/usuario.png'

function PerfilUsuarioCliente(props){

        return(
            <div className="mi-perfil-cliente">
                <img src={props.imagenPerfil}  alt="imagenPerfilCliente" className="imagenPerfilCliente" />
                <div className="Perfil-nombre-cliente">
                <h2 className="text-Perfil-nombre-cliente" >{props.nombre}</h2>
                <h3>Email : <span> {props.correo}</span></h3> 
                

                </div>
                
            
            
            </div>
        )

}

export default PerfilUsuarioCliente;
