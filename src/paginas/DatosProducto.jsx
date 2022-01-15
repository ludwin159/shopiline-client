import React from 'react';
import ReactDOM from 'react-dom';
import './styles/DatosProducto.scss'
import AvisoDatoIncorrecto from '../componentes/AvisoDatoIncorrecto';
import {Link}  from 'react-router-dom'
import {useUser, useFirebaseApp} from 'reactfire';


function DatosProducto(props){
   
            const [imagen, setImagen] = React.useState('');
            const [detalle, setDetalle] = React.useState('');
            const [precio, setPrecio] = React.useState('');
            const [nombre, setNombre] = React.useState('');
            const [id, setId] = React.useState('');
            const [cantidad,setCantidad] = React.useState(1);
            const [idPedido,setIdPedido] = React.useState('');
            const [consultarIdPedido, setConsultarIdPedido] = React.useState('');
            const [productoAgregado, setProductoAgregado] = React.useState('');
            const [creandoPedido, setCreandoPedido] = React.useState('');
            const [idProducto, setIdProducto] = React.useState('');


            const firebase = useFirebaseApp();
            const user = useUser();
            const db = firebase.firestore();

            React.useEffect(()=>{
            setIdProducto(props.match.params.DatosProductoId)
            },[])

            

            const consultarDatosProducto= async ()=>{

                db.collection('Producto')
                .doc(idProducto)
                .onSnapshot(querySnapshot=>{
                    if(querySnapshot.empty){
                        return
                    }
                    setImagen(querySnapshot.data().URL);
                    setNombre(querySnapshot.data().NOMBRE);
                    setId(querySnapshot.id);
                    setDetalle(querySnapshot.data().DETALLE);
                    setPrecio(querySnapshot.data().PRECIO.toFixed(2))
                    
                        })      
            }

            React.useEffect(()=>{

                if(idProducto){
                    consultarDatosProducto();

                }

            },[idProducto])
            

            const aumentarCantidad= ()=>{
                setCantidad(cantidad+1);
            }
            const menosCantidad= ()=>{
                setCantidad(cantidad-1);
            }

            React.useEffect(()=>{
                if(cantidad<1){
                    setCantidad(1);
                }
            },[cantidad])
            

            const CrearPedido = async()=>{
                await db.collection("Pedido").add({
                    Usuario: user.uid,
                    Estado: 'CARRITO',
                    fecha: Date.now(),
                }).then((docRef) => {
                    setIdPedido(docRef.id);
                })
            }

      
            
/* Crear un carrito  si el usuario no tiene uno */
            const consultarPedido = async()=>{

                if(!user){
                    return
                }
                if(user){
                   await db.collection('Pedido')
                    .where('Usuario','==',user.uid)
                    .where('Estado', '==', 'CARRITO')
                    .onSnapshot(querySnapshot=>{
                        

                        if(querySnapshot.empty){
                            setConsultarIdPedido(true);
                            setIdPedido(false);
                               setConsultarIdPedido(true);

                            return
                        }
                        else{
                            console.log("Hay Pedido")
                            querySnapshot.forEach((Pedido)=>{
                            console.log(Pedido.id);
                            setIdPedido(Pedido.id);
                            })
                            setConsultarIdPedido(true);

                        }

                    })
                    

                }
    
            }

            /* Ejecutamos crear carrito */
            React.useEffect(()=>{
                consultarPedido();

            },[]);

            React.useEffect(()=>{

                if((consultarIdPedido && !idPedido && !creandoPedido)){
                    setCreandoPedido(true);
                    CrearPedido();

                }


            },[consultarPedido])

/* Agregar el producto al carrito */
            const agregarCarrito = async()=>{

                if(!user){
                    let containerAviso = document.getElementById('container-aviso-carrito');
                    ReactDOM.render( <AvisoDatoIncorrecto text="Ingrese o Registrese para continuar." />,containerAviso)
                    return
        
                }

                await db.collection("ProductoPedido").add({
                    idUsuario: user.uid,
                    idProducto: id,
                    idPedido: idPedido,
                    nombre: nombre,
                    detalle: detalle,
                    imagen: imagen,
                    cantidad: cantidad,
                    precio: precio,
                    subTotal: parseFloat((precio*cantidad).toFixed(2)),
                })
                .then(function(docRef){
                    console.log("Se Registro el Pedido")
                    setProductoAgregado(true);

                })
                .catch(function(error){
                    console.log("Error en registro del producto");
                    alert(error);
                });
            }



        return(
            <div className="datos-producto">
                { nombre &&
                

                    <div  key={id} className="container-producto">
                        <h1>{nombre} </h1>
                        <h2>{detalle}</h2>
                        <img src={imagen} alt=""/>
                        <div className="container-precio-producto">
                            <h3>Precio :</h3>
                            <h3>S/ {precio}</h3>
                        </div>
                        <div className="container-cantidad-producto">
                            <button type="button" onClick={menosCantidad}>-</button>
                            <input type="number" value={cantidad}   onChange={(ev)=> setCantidad(ev.target.value)}/>
                            <button type="button" onClick={aumentarCantidad}>+</button>
                        </div>
                        
                        <div className="container-boton-agregar">
                            {!productoAgregado &&
                                 <div className="container-Producto-agregado" id="container-Producto-agregado">
                                <button id="boton-agregar-carrito"  type="button" onClick={agregarCarrito}>AGREGAR AL CARRITO</button>
                                
                                
                            </div>
                            }
                           

                            {productoAgregado &&
                            <React.Fragment>
                                <h3 id="Se-agrego-al-Carrito">Se agrego Correctamente al Carrito</h3>

                                <Link  className="Ir-a-Carrito" id="Ir-a-Carrito" to="/carrito">
                                    <button className="boton-agregar-carrito" >Ir al Carrito</button>
                                </Link>
                            </React.Fragment>
                            }




                            <div id="container-aviso-carrito"></div>
                            

                           
                        

                        </div>
                       
    
                    </div>

                

                }
                
                            

            </div>
            
        )
    

   
}
export default DatosProducto;