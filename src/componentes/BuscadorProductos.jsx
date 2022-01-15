import React from 'react';
import 'firebase/auth';
import { useFirebaseApp, useUser } from 'reactfire';
import './styles/BuscarProductos.scss'
import BuscarIcono from '../imagenes/buscar.png';
import MostrarProducto from '../componentes/MostrarProducto';


function BuscarProductos(props){
    const [buscar,setBuscar]= React.useState('');
    const [ProductosBuscados, setProductosBuscados] =React.useState('');

    const firebase = useFirebaseApp();
    const db = firebase.firestore();

    const buscarProducto = async()=>{

        db.collection('Producto')
       /*  .where('NOMBRE',">=",buscar) */
        .onSnapshot(querySnapShot=>{
            if(querySnapShot.empty){
                return
            }

            let ProductosEncontrados = [];

            querySnapShot.forEach((Producto)=>{
            if(Producto.data().NOMBRE.toLowerCase().includes(buscar.toLowerCase())){

                ProductosEncontrados.push({
                    imagen: Producto.data().URL,
                    detalle: Producto.data().DETALLE,
                    nombre: Producto.data().NOMBRE,
                    precio: Producto.data().PRECIO,
                    id: Producto.id
                });
            }

            
        })
        setProductosBuscados(ProductosEncontrados);
        })
        


    }
    React.useEffect(() => {
        if (buscar!= ''){
            buscarProducto();

        }
        else{
            setProductosBuscados('')
        }
        
    }, [buscar, buscarProducto])
    

    



    return(
    
        <div className="container-buscar">
            <div className="container-nav-buscador">
                <div className="ingresoBuscador">
                    <img src={BuscarIcono} alt="Icono Buscar"className="lupa-buscar" />
                    <input type="text" className="input-buscador" placeholder="Nombre del Producto"
                    onChange={(ev)=>{
                        setBuscar(ev.target.value)
                    } }
                    />
                    <button className="btn-buscar" type="button">
                        Buscar
                    </button>
                </div>
            </div>    
            <div className="container-productos-buscados">
            {ProductosBuscados  &&
                    ProductosBuscados.map(Producto=>(
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
            </div>
            

        </div>


    )

}
export default BuscarProductos;