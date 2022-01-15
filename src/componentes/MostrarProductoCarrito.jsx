import React from 'react';
import './styles/MostrarProductoCarrito.scss';
import {useUser, useFirebaseApp} from 'reactfire';

function MostrarProductoCarrito(props) {
    let valorId = props.id;

    const firebase = useFirebaseApp();
    const db = firebase.firestore();

    
    const eliminarProducto=async()=>{
        await db.collection('ProductoPedido')
        .doc(valorId)
        .delete()
        .then(()=>{
            props.cambioCarrito(true);

        });



    }


        return(
        <div className="producto-carrito-presentado" >
            <img className="producto-imagen" src={props.imagen} alt=""/>
            <h1 className="producto-nombre" >{props.nombre}</h1>
            <h2 className="producto-detalle">{props.detalle}</h2>
            <h3 className="producto-precio">Precio:  <small>S/ {props.precio}</small></h3>
            <h4 className="producto-cantidad">Cantidad: <small>{props.cantidad}</small></h4>
            <h4 className="producto-subtotal" >SubTotal : <small>S/ {props.subTotal}</small> </h4>
            <button  className="producto-boton-eliminar"  type="button" onClick={eliminarProducto}>Eliminar </button>
        </div>
            
        )
    
}
export default MostrarProductoCarrito;