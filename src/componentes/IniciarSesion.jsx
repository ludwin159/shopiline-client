import React from 'react';
import ReactDOM from 'react-dom';
import 'firebase/auth';
import { useFirestore, useFirebaseApp, useUser } from 'reactfire';
import './styles/IniciarSesion.scss'
import firebaseConfig from '../firebase-config';
import {Link} from 'react-router-dom';
import imgLogoUsuario from '../imagenes/usuario1.png'
import LogoGoogle from './../imagenes/logo-google.png';
import PerfilUsuarioCliente from './PerfilUsuarioCliente';
import imagenPerfilCliente from '../imagenes/usuario.png';
import MisDatosUsuario from '../componentes/MisDatosUsuario';
import AvisoDatoIncorrecto from '../componentes/AvisoDatoIncorrecto';

export default(props)=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const firebase = useFirebaseApp();
    const user = useUser()
    


    //consultar datos
    const db = firebase.firestore()
    

    const consultarMisDatos = async ()=>{
        let info = []
        db.collection('Usuario')
        .where('idUsuario',"==",user.uid)
        .onSnapshot(querySnapshot=>{
    
            if(querySnapshot.empty){
                return
            }
            console.log(querySnapshot);
            querySnapshot.forEach( Usuario=>{            
            console.log(Usuario.data().nombre);
            console.log(Usuario.data().apellido);
            console.log(Usuario.data().correo);
            console.log(Usuario.data().direccion);
            console.log(Usuario.data().dni);
            console.log(Usuario.data().idUsuario);
            console.log(Usuario.data().nombreUsuario);
            console.log(Usuario.data().telefono);

              
              let misDatos = <MisDatosUsuario
              nombre = {Usuario.data().nombre}
              apellido =  {Usuario.data().apellido}
              dni = {Usuario.data().dni}
              telefono = {Usuario.data().telefono}
              direccion = {Usuario.data().direccion}

              />;
            

            let containerDatos = document.getElementById("datos-del-usuario");
            ReactDOM.render(misDatos,containerDatos);
            let containerbotonDatos = document.getElementById('container-boton-actualizarDatos');
            ReactDOM.render(<button type="button" className=" boton-opcion-cliente">Actualizar Datos</button>,containerbotonDatos)

            
            })
        })
        
    }
    
    React.useEffect(()=>{
        if(user){
            consultarMisDatos();

        }
    },[consultarMisDatos, user])
 


    //Cerrar Acceso
    const logout = async ()=>{
        await firebase.auth().signOut();
    }


    //Acceder con cuida Google
    


    //Acceder con cuida Google
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
    //Ingresar con Email password
    const login = async ()=>{

        if(email==='' || password===''){
            let avisoLogin = document.getElementById('correo-password-no-valido');
            ReactDOM.render(<AvisoDatoIncorrecto
                text= "Correo o password incorrectos, revise los caracteres e ingrese datos validos."
                />,avisoLogin);
            return;

        } 

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result=>{
            console.log('Bienvenido');
            console.log(result.user.displayName);
        }).catch(error=>{
            console.error(error);
            let avisoLogin = document.getElementById('correo-password-no-valido');

            if(error.message==="The email address is badly formatted."){
                ReactDOM.render(<AvisoDatoIncorrecto
                    text= "La dirección de correo no tiene un formato valido. "
                    />,avisoLogin);
            }
            else if(error.message==="There is no user record corresponding to this identifier. The user may have been deleted."){
                ReactDOM.render(<AvisoDatoIncorrecto
                    text= "El usuario no se encuentra registrado o puede haber sido eliminado, comprueba los caracteres. "
                    />,avisoLogin);
            }
            else if(error.message==="The password is invalid or the user does not have a password."){
                ReactDOM.render(<AvisoDatoIncorrecto
                    text= "La contraseña del usuario es incorrecta. "
                    />,avisoLogin);
            }

            else{
                ReactDOM.render(<AvisoDatoIncorrecto
                    text={error.message}
                    />,avisoLogin);
                    alert(error);
            }
            
        })
        setEmail('');
        setPassword('');

    }

    return(

        <div className="contenedor-login">
            {
                !user &&
                <div className="container">
                    <div className="Login">
                        <h2 className="titulo-login">INICIAR SESIÓN</h2>

                        <img className="imgLogoUsuario" src={imgLogoUsuario} alt="Imagen Inicio Sesión"/>
                        
                        <p>Correo </p>
                        <input type="email" placeholder="Ingrese su Correo" onChange={(ev)=>setEmail(ev.target.value)}/>
                        

                        <p>Password</p>
                        <input className="input-password" type="password" placeholder= "Ingrese su Password " onChange={(ev) => setPassword(ev.target.value)}/>

                        <div id="correo-password-no-valido">
                        
                        </div>

                        <button type="button" onClick={login} className="boton-inicio-sesion">INGRESAR</button>

                        <button type="button" onClick={authCuentaGoogle} className="boton-inicio-sesion boton-Google">
                            <img className="LogoGoogle" src={LogoGoogle} alt="Logo gogle"/>
                            Ingresar con Google</button>
                            

                        <div className="contenedor-registro-admin">
                            <Link className="registro" to="/registro">
                            <button type="button" className="boton-registro">Registro</button>

                            </Link>

                            <a className="ingreso-admin" href={process.env.REACT_APP_LINK_ADMINISTRATOR}>
                            <span>
                            Ingresar como
                            <br/>
                            Administrador
                            </span>
                            
                            </a>
                            
                        </div>
                        <div className="container-link-olvide-password">
                        <Link className="Link-olvide-password" to='/recuperarPassword'>
                            ¿Olvidaste tu password? 
                        </Link>
                        </div>
                        
                        
                        
                    </div>
                </div>

            }
            {

            !!user &&



            <div className="Login">
              {user.photoURL &&
              <div className="">
                  
                  <PerfilUsuarioCliente
                    imagenPerfil={user.photoURL}
                    correo = {user.email}
                    nombre = {user.displayName}
                    />
            

              </div>

              
              }
              {
                !user.photoURL && 
                <div className="">
                    
                    <PerfilUsuarioCliente
                    imagenPerfil={imagenPerfilCliente}
                    correo = {user.email}
                    nombre = {user.displayName}
                    />
                
                </div>

              }
              <div id="datos-del-usuario"></div>

            
            <Link to="/actualizarDatos">
                <div id="container-boton-actualizarDatos"></div>
                </Link>
            

            <button type="button" className=" boton-opcion-cliente">
                <Link className="Link-opcion-ver-pedidos" to="/MisPedidosUsuario"> Mis Pedidos</Link></button>
            <button type="button" onClick={logout} className="boton-opcion-cliente">Cerrar Sesion</button>
            </div>
            }
        </div>
    )
}
