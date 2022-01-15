import React from 'react';
import ReactDOM from 'react-dom';
import BannerEmpresa from './BannerEmpresa';
import MostrarProducto from './/MostrarProducto'
import './styles/PortadaInicio.scss'
import {useUser, useFirebaseApp} from
 'reactfire';
function PortadaInicio() {
    const  [Productos,setProductos] = React.useState('');

    const firebase = useFirebaseApp();

    const user = useUser();
    const db = firebase.firestore();

    
    React.useEffect(() => {
       /* Consultando los productos */ 
        const consultarProductos = async()=>{

            if(Productos !== ''){
                return;
            }
        
            db.collection('Producto')
            .onSnapshot(querySnapshot=>{
                if(querySnapshot.empty){
                    return
                }
                
                let MisProductos = [];
                querySnapshot.forEach((Producto)=>{
                    MisProductos.push({
                            imagen: Producto.data().URL,
                            detalle: Producto.data().DETALLE,
                            nombre: Producto.data().NOMBRE,
                            precio: Producto.data().PRECIO,
                            id: Producto.id
                        }
                    );
    
    
                })
                setProductos(MisProductos);
            })
    
        }
        /* Ejecutamos la consulta de los productos */
        consultarProductos();
        
        // nos suscribimos al evento consultar-productos de window
        window.addEventListener("consultar-productos", consultarProductos)
    
        // devolvemos una función para anular la suscripción al evento consultar-productos al salir del componente
        return () => {
          window.removeEventListener("consultar-productos", consultarProductos)
        }
      }, []) // este efecto se ejecuta sólo al montarse el componente, para lo cual vacio
      









        return(
            <div>
                <div className="PortadaInicio">

                    <BannerEmpresa/>
                    <div className="container-productos" id="container-productos">
                
                    {Productos  &&
                    Productos.map(Producto=>(
                        <MostrarProducto
                        nombre={Producto.nombre}
                        detalle={Producto.detalle}
                        precio ={Producto.precio}
                        imagen={Producto.imagen}
                        link={Producto.id}
                        key= {Producto.id}
                        />
                    ))
                    }
                    
                    {/* {mostrarProductos()}         */}

                    </div>

                </div>
                
            </div>
        )
    
}
export default PortadaInicio;