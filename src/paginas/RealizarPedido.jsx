import React from 'react';
import ReactDOM from 'react-dom'
import './styles/RealizarPedido.scss';
import AvisoDatoIncorrecto from '../componentes/AvisoDatoIncorrecto';
import {useUser, useFirebaseApp} from 'reactfire';
import correcto from '../imagenes/correcto.png';
import {Link} from 'react-router-dom';
import DataDepartamento from '../ubigeo/ubigeo_departamento.json';
import DataProvincia from '../ubigeo/ubigeo_provincia.json';
import DataDistrito  from '../ubigeo/ubigeo_distrito.json';

function RealizarPedido(props){
    const [departamento,setDepartamento] = React.useState('');
    const [provincia, setProvincia] = React.useState('');
    const [distrito, setDistrito] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [tipoPago, setTipoPago] = React.useState('')
    const [totalPedido, setTotalPedido] =React.useState('');
    const [productosCarrito, setProductosCarrito] = React.useState('');
    const [idPedidoCarrito, setIdPedidoCarrito] = React.useState('');

    const [btnRealizarPedido,setBtnRealizarPedido] = React.useState(true);

/* Ubigeo */


    

    /* Calculamos la Fecha */
    let date = new Date()
    let day = date.getDate()
    if (day < 10) {
        day = "0" + day;
    }
    let month = date.getMonth() + 1
    if (month < 10) {
        month = "0" + month;
    }
    let year = date.getFullYear()
    let hours = date.getHours()
    if (hours < 10) {
        hours = "0" + hours;
    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let seconds = date.getSeconds()
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let FechaHoy = day + "/" + month + "/" + year+ " " + hours + ":" + minutes;

    console.log(FechaHoy)

    const firebase = useFirebaseApp();
    const user = useUser();
    const db = firebase.firestore();
    

    
    /* Buscamos el Id de carrito a registrar como pedido */
    var mostrarProvincia = [{value: '', text: 'Seleccione Provincia'}];
    const buscarIdCarrito = async()=>{


        db.collection('Pedido')
        .where("Estado",'==','CARRITO')
        .where("Usuario",'==', user.uid)
        .onSnapshot(querySnapshot=>{

            if(querySnapshot.empty){
                console.log('El carrito esta vacio');
                return;
            }
            else{
                querySnapshot.forEach((PedidoCarrito)=>{
                    setIdPedidoCarrito(PedidoCarrito.id);
                    
                })
            }
            
        })
    }


     /* Consultamos los Productos del Pedido Carrito */

     const misProductosDeCarritoPedido = async()=>{


        db.collection('ProductoPedido')
        .where('idUsuario','==',user.uid)
        .where('idPedido','==',idPedidoCarrito)
        .onSnapshot(querySnapshot=>{
            if(querySnapshot.empty){
                return
            }

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
            })
            setProductosCarrito(MisProductosCarrito);
            setTotalPedido(sumaTotal);
            

        })

    }
    
     /* si hay un pedido Carrito se cargan los productos de carrito */

     React.useEffect(()=>{
        {user &&
            buscarIdCarrito();
        }

        return ()=>{
            console.log('se finalizo carga carrito')
        }
     },[user])

     React.useEffect(()=>{
        { idPedidoCarrito &&
            misProductosDeCarritoPedido()
             
        console.log(productosCarrito);
        console.log(idPedidoCarrito)

        };
        return ()=>{
            console.log('RealizarPedidoTermino');
        }

   
        
     },[idPedidoCarrito])


    


    const realizarPedido = async()=>{
        setBtnRealizarPedido(false);
        if(departamento.trim()===''
        ||provincia.trim===''
        ||distrito.trim===''
        ||direccion.trim===''
        ||telefono.trim===''
        ||tipoPago.trim===''
        ){
            let containerNoValido = document.getElementById('container-avisoNoValido');
            setBtnRealizarPedido(true);
            ReactDOM.render(<AvisoDatoIncorrecto text="Rellene los datos Correctamente"/>, containerNoValido);
            return
        }

        await db.collection("Pedido").doc(idPedidoCarrito).set({
            Estado: "PENDIENTE",
            Usuario: user.uid,
            Fecha: FechaHoy,
            Departamento: departamento,
            Provincia: provincia,
            Distrito: distrito,
            Direccion: direccion,
            Telefono: telefono,
            TipoPago: tipoPago,
            TotalPedido: totalPedido,
        })
        .then(function(docRef) {
            console.log("Se registro el Pedido Correctamente");
            let containerPedido = document.getElementById('container-realizar-pedido');
            containerPedido.style.display='none';

            let pedidoCorrecto = document.getElementById('container-Pedido-Correcto');
            pedidoCorrecto.style.display='grid';
        })
        .catch(function(error) {
            console.error("Error en el registro: ", error);
            alert(error);
            setBtnRealizarPedido(true);
        });

        
    }

    

    return(
        <div className="realizar-pedido">
            {(idPedidoCarrito && productosCarrito) &&
             <div className="container-realizar-pedido" id="container-realizar-pedido">
             <h1 className="titulo-realizar-pedido">DATOS DEL PEDIDO</h1>

             
             <div className="container-departamento">
                     <h4>Departamento</h4>
                     <select value={departamento}  onChange={
                         (ev)=>{
                             setDepartamento(ev.target.value)
                             setProvincia('');
                             setDistrito('')
                            }
                         
                         } name="" id="">
                                        <option value=''>Seleccione</option>
                                        {DataDepartamento.map(departamento=>(
                                            <option key={departamento.departamento} value={departamento.departamento}>{departamento.departamento}</option>

                                        ))}
                        
                     </select>
             </div>

             <div className="container-provincia" id="provincia">
                     <h4>Provincia</h4>
                     <select value={provincia} onChange={(ev)=>{setProvincia(ev.target.value); setDistrito('')}} >
                     <option value=''>Seleccione</option>
                                        { departamento &&

                                        
                                        DataProvincia.filter(data => data.departamento===departamento).map((provin)=>{
                                            
                                                return <option key={provin.provincia} value={provin.provincia}>{provin.provincia}</option>
                                            
                              
                                        }
                                            

                                        )}

                     </select>
             </div>

             <div className="container-distrito">
                     <h4>Distrito</h4>
                     <select value={distrito} onChange={(ev)=> setDistrito(ev.target.value) } >
                     <option value=''>Seleccione</option>
                                        { (departamento && provincia) &&
                                        DataDistrito.filter(data=>(data.departamento === departamento && data.provincia===provincia)).map((distrit)=>{           
                                                return <option key={distrit.distrito} value={distrit.distrito}>{distrit.distrito}</option>
                                        }
                                            
                                        )}
                     </select>

             </div>

             
             <div className="container-dato-realizar-pedido">
                 <h4 className="direccion-realizar-pedido" 
                 >Dirección</h4>
                 <input  
                 placeholder="Ingrese su dirección."
                 onChange={(ev)=>setDireccion(ev.target.value)}
                 className="input-direccion-pedido" type="text"/>
             </div>
             <div className="container-dato-realizar-pedido">
                 <h4 className="telefono-realizar-pedido">Telefono</h4>
                 <input 
                 placeholder="Ingrese su teléfono." 
                 onChange={(ev)=>setTelefono(ev.target.value)}
                 className="input-telefono-pedido" type="text"/>

             </div>

             <div className="container-dato-realizar-pedido">
                 <h4 className="tipo-pago-pedido" >Tipo de Pago</h4>
                 <select name="" className="input-tipo-pago" id=""
                 onChange={(ev)=>setTipoPago(ev.target.value)} >
                     <option value="">Seleccione Tipo de Pago</option>
                     <option value="Pago Efectivo">Pago Efectivo</option>
                     <option value="Pago Deposito Bancario">Pago Deposito Bancario</option>
                 </select>
             </div>

             <h2 className="titulo-fecha-estimada" >
                 Fecha : 
             </h2>
             <h2 className="fecha-estimada" >
                 {FechaHoy}
                 </h2>

             <h2 className="titulo-total-realizar-pedido">
                 Total de Pedido: 
             </h2>
             <h2 className="total-realizar-pedido" >
                 S/ {totalPedido}
             </h2>
             <div className="" id="container-avisoNoValido"></div>
             {!!btnRealizarPedido &&
                 <button className="boton-realizar-pedido"  onClick={realizarPedido} >REALIZAR PEDIDO</button>
             
             }





         </div>



            }

            {!idPedidoCarrito || !productosCarrito
             &&
              <h1>Agregue Productos a su carrito</h1>

             }

            <div className="container-Pedido-Correcto" id="container-Pedido-Correcto">
             <h1>Tu pedido se Realizo Correctamente !!</h1>
             <img src={correcto} alt=""/>
             <button className="Boton-Mi-Inicio">
                 <Link className="Link-to-usuario" to="/usuario">Regresar Al Inicio</Link>
             </button>
            </div>
           

        </div>
     )
}

export default RealizarPedido; 