import React from 'react';
import './styles/CatalogoCategoria.scss';
import {useUser, useFirebaseApp} from 'reactfire';
import MostrarProducto from '../componentes/MostrarProducto';
function CatalogoCategoria(props){
    const nombreCategoria = props.match.params.categoriaNombre;
    const [productosCategoria, setProductosCategoria] = React.useState('');
    const firebase = useFirebaseApp();
    const user = useUser();
    const db = firebase.firestore();
    const consultarProductos = async()=>{
        db.collection('Producto')
        .where("CATEGORIA", "in", [nombreCategoria.toLowerCase(), nombreCategoria.toUpperCase()])
        
        .onSnapshot(querySnapshot =>{
            if(querySnapshot.empty){
                return
            }

            let MisProductos = [];
            querySnapshot.forEach((ProductosCategoria)=>{
                MisProductos.push({
                    imagen: ProductosCategoria.data().URL,
                    detalle: ProductosCategoria.data().DETALLE,
                    nombre: ProductosCategoria.data().NOMBRE,
                    precio: ProductosCategoria.data().PRECIO,
                    id: ProductosCategoria.id,
                });
            })
            setProductosCategoria(MisProductos);


        })
    }
    React.useEffect(()=>{
        consultarProductos();

    },[])

        return(
           <div className="catalogo-categoria-item">
                <div className="container-catalogo-categoria-item">
                <h1>{nombreCategoria.toUpperCase()}</h1>
                <div className="container-productos-categoria-item">
                {
                    productosCategoria &&
                    productosCategoria.map(Producto=>(
                        <MostrarProducto
                        nombre= {Producto.nombre}
                        detalle = {Producto.detalle}
                        precio = {Producto.precio}
                        imagen = {Producto.imagen}
                        link={Producto.id}
                        key = {Producto.id}
                        />
                    ))
                }
                </div>
            </div>
           </div>
        )
    
}

export default CatalogoCategoria;