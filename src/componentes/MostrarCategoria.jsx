import React from 'react';
import './styles/MostrarCategoria.scss';
import {Link} from 'react-router-dom';
function MostrarCategoria(props){
    
        return(
                <Link className = "link-categoria"  to={props.link}>
                    <div className="categoria">
                    <h3 className="nombre-categoria">{props.nombre} </h3>
                    <img className="imagen-Categoria" src={props.imagen} alt=""/>
                    </div>
                </Link>

        )

    
        
}
 export default MostrarCategoria;