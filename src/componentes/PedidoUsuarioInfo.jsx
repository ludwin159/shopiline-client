import React from 'react';
import './styles/PedidoUsuarioInfo.scss';
import AvisoDatoIncorrecto from'./AvisoDatoIncorrecto'
import {useUser, useFirebaseApp} from 'reactfire';

function PedidoUsuarioInfo(props){
    const Id = props.Id;
    const Estado = props.Estado;
    const Fecha = props.Fecha;
    const Departamento = props.Departamento;
    const Provincia = props.Provincia;
    const Distrito = props.Distrito;
    const Telefono = props.Telefono;
    const TipoPago = props.TipoPago;
    const TotalPedido = props.TotalPedido;
    const Direccion = props.Direccion;
    const [productosPedidos, setProductosPedidos]= React.useState('');
    const [mostrarError, setMostrarError] = React.useState(false);
    const [depositoBancario, setDepositoBancario] = React.useState('');
    const [numeroDepositoBancario, setNumeroDepositoBancario] = React.useState('');
    let MostrarIngresarDeposito= false;
    let MostrarDeposito = false;
    
    if(TipoPago==='Pago Deposito Bancario'){
        MostrarIngresarDeposito= true;
    }
    if(numeroDepositoBancario){
        MostrarIngresarDeposito=false;
    }

    const firebase = useFirebaseApp();
    const user = useUser();
    const db = firebase.firestore();

    const consultarProductosPedidos= async()=>{

        if(productosPedidos !== ''){
            return
        };

        await db.collection('ProductoPedido')
        .where('idPedido','==',Id)
        .where('idUsuario','==',user.uid)
        .onSnapshot(querySnapshot=>{
            if(querySnapshot.empty){
                return
            }
            let MisProductosRegistrados= [];

            querySnapshot.forEach(
                (ProductoRegistrado)=>{
                    MisProductosRegistrados.push({
                        cantidad: ProductoRegistrado.data().cantidad,
                        detalle: ProductoRegistrado.data().detalle,
                        idPedido: ProductoRegistrado.data().idPedido,
                        idProducto: ProductoRegistrado.data().idProducto,
                        imagen: ProductoRegistrado.data().imagen,
                        nombre: ProductoRegistrado.data().nombre,
                        precio: ProductoRegistrado.data().precio,
                        subTotal: ProductoRegistrado.data().subTotal,
                        idProductoPedido: ProductoRegistrado.id,
                    })
                })
                setProductosPedidos(MisProductosRegistrados);
        })
    };
    consultarProductosPedidos()

    const ingresarDepositoBancario = async()=>{
        if(depositoBancario.trim()===''){
            setMostrarError(true);
            return
        }

        await db.collection("Pagos").doc(Id).set({
            idUsuario: user.uid,
            idPedido: Id,
            nDepositoBancario: depositoBancario,
        })
        .then(function(docRef){
            console.log("Se registro correctamente el número de Deposito Bancario");
        })
        .catch(function(error){
            console.error("Se registro un error al ingresar el número de Deposito Bancario")
        })
    }

    const consultarPagoDeposito= async()=>{
        
        if(numeroDepositoBancario !== ''){
            return;
        }

        db.collection("Pagos")
                .where('idUsuario',"==",user.uid)
                .where('idPedido',"==",Id)
                .onSnapshot(querySnapshot=>{
                    if(querySnapshot.empty){
                        return
                    }
                    querySnapshot.forEach(Pago=>{
                        setNumeroDepositoBancario(Pago.data().nDepositoBancario)
                    })

                    
                    
                  
                    
        })
        
    }
    if(TipoPago ==='Pago Deposito Bancario'){
        consultarPagoDeposito();
    console.log(numeroDepositoBancario);

    }
    
    console.log(productosPedidos);

    return(
        <div className="container-pedido">
        <h3> <strong>Fecha Registrada :</strong> {Fecha}</h3>
        <h3> <strong>Id Pedido : </strong> {Id} </h3>
        <h3> <strong>Tipo de Pago : </strong> {TipoPago}</h3>
        <h3> <strong>Estado : </strong> {Estado}</h3>
        <h3> <strong>Dirección : </strong> {Direccion} </h3>
        <div className="container-productos-lista-pedidos">
            <h2 className="title">Producto</h2>
            <h2 className="title">Detalle</h2>
            <h2 className="title">Precio</h2>
            <h2 className="title">Cantidad</h2>
            <h2 className="title">Sub Total</h2>

            {productosPedidos &&
            productosPedidos.map(Producto=>(
                <React.Fragment key={Producto.idProductoPedido} >
                    <h2 className="element ">{Producto.nombre}</h2>
                    <h2 className="element">{Producto.detalle}</h2>
                    <h2 className="element">S/{Producto.precio} </h2>
                    <h2 className="element">{Producto.cantidad} </h2>
                    <h2 className="element">S/{Producto.subTotal}</h2>
                </React.Fragment>
                
            ))
            }


        </div>
        <h5 className="Total-pedido"> <small>Total:</small> S/ {TotalPedido} </h5>
        {MostrarIngresarDeposito &&
        <input className="input-pedido-deposito" type="text"
        onChange={(ev)=>setDepositoBancario(ev.target.value)}/>
        }
        {MostrarIngresarDeposito &&
        <button className="boton-pedido-deposito"
        onClick={ingresarDepositoBancario} >
            Ingresar   Nº Deposito Bancario</button>
        }
        {MostrarIngresarDeposito &&
        <div className="avisoIncorrecto" id="avisoIncorrecto">
        { mostrarError &&
        <AvisoDatoIncorrecto text="El dato ingresado es Incorrecto"/>
        }
        </div>
        }
        {numeroDepositoBancario &&
        <h3><strong>N° Deposito Bancario : </strong>{numeroDepositoBancario} </h3>
        }
        
    </div>
    )
}
export default PedidoUsuarioInfo;