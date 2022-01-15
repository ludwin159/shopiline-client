import React from 'react';
import ReactDOM from 'react-dom';
import './styles/ActualizarDatos.scss';
import { useFirestore, useFirebaseApp, useUser } from 'reactfire';
import { Link } from 'react-router-dom';
import AvisoCorrectoActualizar from '../componentes/AvisoDatoCorrecto';
import AvisoIncorrectoActualizar from '../componentes/AvisoDatoIncorrecto';


function ActualizarDatos(props){
    const [nombre, setNombre]= React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [dni, setDni] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [direccion, setDireccion] = React.useState('');

 

    const firebase = useFirebaseApp();
    /* Autentificación */
    const user = useUser();
    
    /* Base de Datos */
    const db = firebase.firestore();
    const dbfirestore = useFirestore();

    {user &&
        db.collection('Usuario')
        .where('idUsuario',"==",user.uid)
        .onSnapshot(querySnapshot=>{
    
            if(querySnapshot.empty){
                return
            }
            
            querySnapshot.forEach( Usuario=>{   
            let miNombre =   Usuario.data().nombre;
            let miApellido = Usuario.data().apellido;
            let miDni = Usuario.data().dni;
            let miTelefono = Usuario.data().telefono;
            let miDireccion = Usuario.data().direccion;
            if(nombre.trim()===''){
                setNombre(miNombre);

            }
            if(apellido.trim()===''){setApellido(miApellido);}
            if(dni.trim()===''){setDni(miDni);}
            if(telefono.trim()===''){setTelefono(miTelefono);}
            if(direccion.trim()===''){setDireccion(miDireccion)};
            
            })
        })
    
    }

    const ActualizarDatosUsuario = async ()=>{
        let containerErrorActualizar= document.getElementById('container-AvisoIncorrectoActualizar');
        let containerCorrectoActualizar = document.getElementById('container-AvisoCorrectoActualizar');

        if(nombre.trim()===''||
        apellido.trim()===''||
        dni.trim()===''||
        telefono.trim()===''||
        direccion.trim()===''){
            ReactDOM.render(<AvisoIncorrectoActualizar
            text= "No se realizaron cambios al actualizar tus datos"/>,containerErrorActualizar);
            return
        }
      
     
        
        
        
        await db.collection("Usuario").doc(user.uid).set({
            
            idUsuario: user.uid,
            nombreUsuario: user.displayName,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
            dni: dni.trim(),
            direccion: direccion.trim(),
            correo: user.email.trim(),
            
        })
        .then(function(docRef) {
            console.log("Se registraron sus datos Correctamente");
            ReactDOM.render(<AvisoCorrectoActualizar
                text= "Se registraron sus datos Correctamente."/>,containerCorrectoActualizar);

        })
        .catch(function(error) {
            console.error("Error en el registro: ", error);
            alert(error);
            ReactDOM.render(<AvisoIncorrectoActualizar
                text={error.message} />,containerErrorActualizar);
        });

    }


    /* Cambiar Password */
    const CambiarPassword = async ()=>{

        const containeErrorCambiar = document.getElementById('cambiar-password-correcto-Actualizar');

        const containerCorrectoCambiar = document.getElementById('cambiar-password-incorrecto-Actualizar');

        var actionCodeSettings = {
            url: 'https://atencion-de-pedidos.firebaseapp.com/usuario',

        }
            
        var auth = firebase.auth();
        await auth.sendPasswordResetEmail(user.email, actionCodeSettings).
        then(()=> {
            ReactDOM.render(<AvisoCorrectoActualizar text="Se envió un elace a su correo, revise la bandeja de entrada de su correo, para cambiar la contraseña." />,containerCorrectoCambiar);


          }).catch(function(error) {
            console.error(error);

            ReactDOM.render(<AvisoIncorrectoActualizar text={error.message}/>, containeErrorCambiar);
           


          });
    }



    return(
        <div className="container-actualizar-datos">
           {user &&
            <div className="actualizar-datos">
            <h1 className="titulo-actualizar-datos">ACTUALIZAR DATOS</h1>
            <h4 className="text-ingreso-datos">Nombre</h4>
            <input type="text" value={nombre}  onChange={(ev)=>setNombre(ev.target.value)} />

            <h4 className="text-ingreso-datos">Apellido</h4>
            <input type="text" value={apellido} onChange={(ev)=>setApellido(ev.target.value)} />

            <h4 className="text-ingreso-datos">DNI</h4>
            <input type="text" value={dni} onChange={(ev)=>setDni(ev.target.value)} />

            <h4 className="text-ingreso-datos">Telefono</h4>
            <input type="text" value={telefono} onChange={(ev)=>setTelefono(ev.target.value)} />

            <h4 className="text-ingreso-datos">Dirección</h4>
            <input type="text" value={direccion} onChange={(ev)=>setDireccion(ev.target.value) } />

            <div id="container-AvisoIncorrectoActualizar"></div>
            <button type="button" onClick={ActualizarDatosUsuario}>Actualizar Datos</button>

            <div id="container-AvisoCorrectoActualizar"></div>
            <button type="button" onClick={CambiarPassword} >Cambiar Contraseña</button>
            <div id="cambiar-password-correcto-Actualizar"></div>
            <div id="cambiar-password-incorrecto-Actualizar"></div>
            
            <button type="button"><Link className="Link-cancelar-actualizar" to="/usuario" > Salir</Link></button>
           
        </div>
           }
           
          
        </div>
    )

}

export default ActualizarDatos;
