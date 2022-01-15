import React from 'react';
import {Link} from 'react-router-dom'

function SeRegistroAlCarrito(){
        return(
            <div className="container-Producto-agregado">
                <h3>Se agrego Correctamente al Carrito</h3>
                <Link to="/carrito">
                     <button>Ir al Carrito</button>
                </Link>
            </div>
        )
}

export default SeRegistroAlCarrito;