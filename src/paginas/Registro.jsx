import 'firebase/firestore';
import 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom';
import AvisoError from '../componentes/AvisoDatoIncorrecto';
import './styles/Registro.scss';
import 'firebase/auth';
import RegistroCorrecto from '../componentes/RegistroCorrecto';
import logoGoogleRegistro from'../imagenes/logo-google.png'
import { useFirestore, useFirebaseApp, useUser } from 'reactfire';




function Registro(props){
    const [nombreUsuario, setNombreUsuario] = React.useState('');
    const [nombre, setNombre]= React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [dni, setDni] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [password, setPassword] = React.useState('');
 


    const firebase = useFirebaseApp();
    /* Autentificación */
    const user = useUser();
    
    /* Base de Datos */
    const db = firebase.firestore();

    const dbfirestore = useFirestore();
    
/*    

    /* RegistrarUsuario */
    const registrarUsuario = async ()=>{
        let avisoErrorRegistro = document.getElementById('container-error-registro');
        if(nombreUsuario.trim()===''|| correo.trim()===''|| password.trim()===''){
            
            ReactDOM.render(<AvisoError
                text="Ingrese los datos correctamente. "
            />, avisoErrorRegistro)
            return
        }

        await firebase.auth().createUserWithEmailAndPassword(correo,password).then( result=>{
            result.user.updateProfile({
                displayName: nombreUsuario
            })
            .catch(error=>{
                console.error(error);
                alert(error);
            })
            alert('bienvenido, realiza la verificaciòn');
        }).then(function() {
            console.log('Registro Correcto');
        })
        .catch(error=>{
            console.error(error);
            alert(error);
            if(error.message==="The email address is badly formatted."){
                ReactDOM.render(<AvisoError
                    text="Ingrese un correo con formato valido. "
                />, avisoErrorRegistro)
                return
            }
            else if(error.message==="Password should be at least 6 characters"){
                ReactDOM.render(<AvisoError
                    text="La contraseña debe tener al menos 6 caracteres. "
                />, avisoErrorRegistro)
                return  
            }
            else if(error.message==="The email address is already in use by another account."){
                ReactDOM.render(<AvisoError
                    text="La dirección de correo electrónico ya está en uso por otra cuenta."
                />, avisoErrorRegistro)
                return
            }
            else{
                ReactDOM.render(<AvisoError
                    text={error.message}
                />, avisoErrorRegistro)
                return
            }
            
        }) 
    }

    /* Identificarse con cuenta Google */
    const authCuentaGoogle = async ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider)
        .then(result=>{
            console.log('Bienvenido');
            console.log(result.user.displayName);
        }).catch(error=>{
            console.error(error);
        })
    }


    const registrarDatosUsuario = async ()=>{
        let containerErrorIngreso= document.getElementById('container-error-en-ingresar-datos');

        if(nombre.trim()===''||
        apellido.trim()===''||
        dni.trim()===''||
        telefono.trim()===''||
        direccion.trim()===''){
            ReactDOM.render(<AvisoError
            text= "Ingrese tus datos en los campos correctamente. "/>,containerErrorIngreso);
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

        })
        .catch(function(error) {
            console.error("Error en el registro: ", error);
            alert(error);
        });

        var verDatosRegistro = document.getElementById('contenedor-registro');
        verDatosRegistro.classList.add('desaparecer');
        var SeRegistroCorrecto = document.getElementById('contenedor-se-Registro-correcto');
        SeRegistroCorrecto.classList.add('aparecer')

        

        /* var intro = document.getElementById('intro');
            intro.className = 'negativo'; */

    }

    /* Registrar datos */
 
        return(
            <React.Fragment>
                <div className="Registro">

                { !user &&
                    <div className="contenedor-registro" >
                        <div className="registro-input">
                            <h1>REGISTRO</h1>
                        </div>

                        <div className="registro-input">
                            <p>Nombre de Usuario</p>
                            <input type="text"placeholder="Ingrese su nombre" id="nombre" onChange={(ev)=>setNombreUsuario(ev.target.value)}/>
                        </div>

                        
                        <div className="registro-input">
                            <p>Correo</p>
                            <input type="email" placeholder="Ingrese su Email" onChange={(ev)=>setCorreo(ev.target.value) }/>
                        </div>

                        <div className="registro-input">
                            <p>Password</p> 
                            <input type="password" placeholder="Ingrese su Password" onChange={(ev)=>setPassword(ev.target.value)} />

                        </div>

                        <div id="container-error-registro">
                        </div>

                        <div className="registro-input">
                            <button type="button" className="boton-registro" onClick={registrarUsuario}>REGISTRARSE</button>
                        </div>
                        <div className="registro-input registro-con-google">
                            <button type="button" className="boton-registro" onClick={authCuentaGoogle}>
                            <img src={logoGoogleRegistro} alt="logoGoogleRegistro"/>
                            Registrarse con Google</button>
                        </div>
                    </div>

                }

                {user &&
                                  <div className="contenedor-registro" id="contenedor-registro">
                                  <div className="registro-input">
                                      <h1>INGRESAR TU DATOS</h1>
                                  </div>
          
                                  <div className="registro-input">
                                       <p>Nombres</p>
                                      <input type="text"placeholder="Ingrese su nombre" id="nombre" onChange={(ev)=>setNombre(ev.target.value)}/>
                                  </div>
          
                                  <div className="registro-input">
                                      <p>Apellidos</p>
                                      <input type="text"
                                      placeholder="Ingrese sus Apellidos" id="apellido" onChange={(ev)=>setApellido(ev.target.value)}/>
                                  </div>
          
                                  <div className="registro-input">
                                      <p>DNI</p>
                                      <input type="text" placeholder="Ingrese su DNI" id="dni" onChange={(ev)=>setDni(ev.target.value)} />
                                  </div>
          
                                  <div className="registro-input">
                                      <p>Telefono</p>
                                      <input type="tel" placeholder="Ingrese su Telefono" onChange={(ev)=>setTelefono(ev.target.value)} />
                                  </div>
          
                                  <div className="registro-input">
                                      <p>Dirección</p>
                                      <input type="string" placeholder="Ingrese su Dirección" onChange={(ev)=>setDireccion(ev.target.value)} />
                                  </div>

                                  <div id="container-error-en-ingresar-datos">
                                  </div>
          
                             
                                  <div className="registro-input">
                                      <button type="button" className="boton-registro" onClick={registrarDatosUsuario}>
                                          REGISTRAR DATOS</button>
                                  </div>
                              </div>
                              
                }

                <div className="contenedor-se-Registro-correcto"
                id="contenedor-se-Registro-correcto">
                <RegistroCorrecto/>
                </div>
      
                </div>

            </React.Fragment>

        )
    }

 export default Registro;
