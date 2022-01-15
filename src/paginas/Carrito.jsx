import React from 'react';
import './styles/Carrito.scss'
import MostrarProductoCarrito from '../componentes/MostrarProductoCarrito';
import {useUser, useFirebaseApp} from 'reactfire';
import {Link} from 'react-router-dom';


function Carrito(props){
    const [productosCarrito, setProductosCarrito] = React.useState('');
    const [idPedidoCarrito, setIdPedidoCarrito] = React.useState('');
    const [totalCarrito, setTotalCarrito] = React.useState('');
    const [activarRealizarPedido, setActivarRealizarPedido] = React.useState(false);
    const [cambioCarrito, setCambioCarrito] = React.useState(false);
    const [realizobusquedaId, setRealizoBusquedaId] = React.useState(false);
    const [cargaInicialCarrito, setCargaInicialCarrito] = React.useState(false);
    const [idPedidoEncontrado, setIdPedidoEncontrado] = React.useState(false);
    

    const firebase = useFirebaseApp();
    const user = useUser();
    const db = firebase.firestore();

/* Consulta el id del carrito */






    React.useEffect(()=>{

        
    
        console.log('4')
            if(user &&!realizobusquedaId &&  !idPedidoCarrito){
                setRealizoBusquedaId(true);

                buscarIdEnCarrito();
            }

        
    },[user])


    const buscarIdEnCarrito = async()=>{
    console.log('5')

        db.collection('Pedido')
        .where("Estado",'==','CARRITO')
        .where("Usuario",'==', user.uid)
        .onSnapshot(querySnapshot=>{

            if(querySnapshot.empty){
                console.log('El carrito esta vacio');
                setRealizoBusquedaId(true);
                return;
            }
            else{
                querySnapshot.forEach((PedidoCarrito)=>{
                    setIdPedidoCarrito(PedidoCarrito.id);
                    console.log(PedidoCarrito.id)
                    setRealizoBusquedaId(true);
                    setIdPedidoEncontrado(true);

                    
                })
            }
            
        })
    }
    /* Consultamos los Productos del Pedido Carrito */

    const misProductosDeCarrito = async()=>{


        


        
        await db.collection('ProductoPedido')
        .where('idUsuario','==',user.uid)
        .where('idPedido','==',idPedidoCarrito)
        .onSnapshot(querySnapshot=>{
            if(querySnapshot.empty){
                setProductosCarrito('')
                setTotalCarrito('');
                console.log('carrito vacio')
                return
            }
            console.log('6')
            let MisProductosCarrito =[];
            let sumaTotal = 0;
            
            querySnapshot.forEach((CarritoProductos)=>{
                MisProductosCarrito.push({
                    cantidad: CarritoProductos.data().cantidad,
                    detalle: CarritoProductos.data().detalle,
                    idPedido: CarritoProductos.data().idPedido,
                    idProducto: CarritoProductos.data().idProducto,
                    imagen: CarritoProductos.data().imagen,
                    nombre: CarritoProductos.data().nombre,
                    precio: CarritoProductos.data().precio,
                    subTotal: CarritoProductos.data().subTotal,
                    idProductoPedido: CarritoProductos.id,
                });
                sumaTotal = sumaTotal + CarritoProductos.data().subTotal;
                console.log(sumaTotal)
            console.log('suma pre pre')

            })
            console.log('suma pre')

            setProductosCarrito(MisProductosCarrito);
            console.log('suma pre 2')

            setTotalCarrito(parseFloat(sumaTotal.toFixed(2)));
            setRealizoBusquedaId(true);
            console.log('suma')

            

        })

    }
    
    /* Si hay un usuario se busca su id del carrito */
   
 /* si hay un pedido Carrito se cargan los productos de carrito */

 React.useEffect(()=>{
    console.log('1')


    if(idPedidoEncontrado && idPedidoCarrito && !cargaInicialCarrito ){
        setCargaInicialCarrito(true);
         misProductosDeCarrito();

    }
    else if(cambioCarrito){
        console.log('2')

        setCambioCarrito(false);

        misProductosDeCarrito();
        console.log("cambio carrito")


    }

    return ()=>{
        console.log("se finalizo carrito")
    }


 },[idPedidoCarrito,idPedidoEncontrado,cambioCarrito ])



 React.useEffect(()=>{
    console.log('3')

    if(productosCarrito){
        setActivarRealizarPedido(true)
    }
    return ()=>{console.log('se finalizo realizar Pedido')}
 },[productosCarrito])
 


   
        return(
            <div className="Carrito">
            { (!!user && !!idPedidoCarrito) && 
                            <div className="container-carrito-productos">
                            <div className="container-productos-presentado">
        
                            {(!!productosCarrito && !!idPedidoCarrito && totalCarrito ) &&
                                productosCarrito.map(Producto=>(
        
                                    <MostrarProductoCarrito
                                    imagen={Producto.imagen}
                                    nombre={Producto.nombre}
                                    detalle={Producto.detalle}
                                    precio={Producto.precio}
                                    cantidad={Producto.cantidad}
                                    subTotal={Producto.subTotal}
                                    key={Producto.idProductoPedido}
                                    id={Producto.idProductoPedido}
                                    cambioCarrito={setCambioCarrito}
        
                                    />
        
                                    ))
                                
                                } 
        
        
                               
                            </div>
                            
                            
                            <div className="container-total">
                                <h2>Total del Pedido: s/ {totalCarrito} </h2>
                                { (!!activarRealizarPedido && !!totalCarrito) && 
                                    <button type="button">
                                    <Link className="Link-realizar-Pedido"  to="/RealizarPedido"  >Realizar Pedido</Link>
                                    </button>

                                }
                                
                                
                            </div>
                       
                        
                        </div>
                        

            }

            { (!!user && !idPedidoCarrito && !!realizobusquedaId) &&
                <div className="">El carrito esta vacio</div>
            }


            {!user &&
                <h4>INGRESE PARA PODER VER SU CARRITO</h4>
            }

                   
                

            </div>
        )
    
}
export default Carrito;