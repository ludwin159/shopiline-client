import React from 'react';
import './styles/AvisoDatoCorrecto.scss'
function AvisoDatoCorrecto(props){
        return(
            <div className="aviso-correcto">
                <h6 className="texto-aviso-correo">{props.text}</h6>
            </div>
        )
}
export default AvisoDatoCorrecto;