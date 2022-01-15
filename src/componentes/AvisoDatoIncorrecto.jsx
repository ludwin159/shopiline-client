import React from 'react';
import './styles/AvisoDatoIncorrecto.scss'
function AvisoDatoIncorrecto(props) {
    
        return(
            <div className="container-info-error" id="container-info-error">
                 <small className="info">{props.text}
                 </small>
            </div>
        )
    
}
export default AvisoDatoIncorrecto;