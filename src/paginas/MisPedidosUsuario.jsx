import React from 'react';
import './styles/MisPedidosUsuario.scss';
import PedidoUsuarioInfo from '../componentes/PedidoUsuarioInfo';
import {useUser, useFirebaseApp} from 'reactfire';


function MisPedidosUsuario(props){

    const [idPedidos, setIdPedidos] = React.useState('');
    const [actualizarPedidos, setActualizarPedidos] = React.useState(false);
    const firebase= useFirebaseApp(); 
    const db = firebase.firestore();
    const user = useUser();


    const consultarPedidos= async ()=>{
        if(idPedidos !==''){
            return
        }
        await db.collection('Pedido')
        .where("Usuario","==",user.uid)
        .onSnapshot(querySnapShot=>{
            if(querySnapShot.empty){
                console.log('No hay Pedidos Registrados');
                return;
            }
            let misPedidosId = [];
            querySnapShot.forEach((PedidoUsuario)=>{
                if(PedidoUsuario.data().Estado !== 'CARRITO'){
                    misPedidosId.push({
                        id: PedidoUsuario.id,
                        Estado: PedidoUsuario.data().Estado,
                        Fecha: PedidoUsuario.data().Fecha,
                        Departamento: PedidoUsuario.data().Departamento,
                        Provincia: PedidoUsuario.data().Provincia,
                        Distrito: PedidoUsuario.data().Distrito,
                        Telefono: PedidoUsuario.data().Telefono,
                        TipoPago: PedidoUsuario.data().TipoPago,
                        TotalPedido: PedidoUsuario.data().TotalPedido,
                        Direccion: PedidoUsuario.data().Direccion
                    })
                }

            })
            setIdPedidos(misPedidosId);

        })
    }

    React.useEffect(()=>{
        {user &&
            consultarPedidos();
        
        }
    console.log(idPedidos);

    },[user])


    return(
        <div className="MisPedidosUsuario">
                <h1>LISTA DE PEDIDOS</h1>
                
            <div className="container-mis-pedidos">
                    {
                       idPedidos &&
                       idPedidos.map(miPedido=>(
                           <PedidoUsuarioInfo 
                           key={miPedido.id} 
                           Id={miPedido.id} 
                           Estado={miPedido.Estado}
                           Fecha={miPedido.Fecha}
                           Departamento={miPedido.Departamento}
                           Provincia={miPedido.Provincia}
                           Distrito={miPedido.Distrito}
                           Telefono={miPedido.Telefono}
                           TipoPago={miPedido.TipoPago}
                           TotalPedido={miPedido.TotalPedido}
                           Direccion={miPedido.Direccion}
                           />                
                           ))            
                    }
               
            </div>
        </div>)
        
        
}

export default MisPedidosUsuario;