import React from 'react';
import './styles/Catalogo.scss'
import MostrarCategoria from '../componentes/MostrarCategoria';
import imagenCategoriaCatalogo from '../imagenes/aceite-shell.png'
import { useFirebaseApp } from 'reactfire';

function Catalogo() {

    const firebase = useFirebaseApp();
    const db = firebase.firestore();
    const [categorias, setCategorias] = React.useState([]);

    const buscarCategorias=()=>{
        db.collection('Categoria')
        .onSnapshot(querySnapShot=>{
            if(querySnapShot.empty){
                return
            }

            let CategoriasEncontradas = []

            querySnapShot.forEach((categoria)=>{
                CategoriasEncontradas.push({
                        nombre: categoria.data().nombre,
                        imagen: categoria.data().imagen,
                        id: categoria.id
                    });               
            });
            setCategorias(CategoriasEncontradas);
            console.log(CategoriasEncontradas);
        })
    }

    React.useEffect(()=>{
        buscarCategorias();
    },[])



    const createCategoria = () => {
        let categoria = []
    
        
        for (let i = 0; i < 20; i++) {

            categoria.push(<MostrarCategoria
            nombre = {`Categoria ${i+1}`}
            imagen= {imagenCategoriaCatalogo}
            key = {i+1}
            link= "/catalogo/1"
            />)
        }
        return categoria
      }

    
        return(
            <div className="catalogo">
                <div className="container-categorias">
                {!!categorias&&
                categorias.map(categoria=>(
                    
                    <MostrarCategoria key={categoria.id}
                    nombre = {categoria.nombre}
                    imagen= {categoria.imagen}
                    link={`/catalogo/${ categoria.nombre.toLowerCase()}`}
                    />
                    
                ))



                }
                </div>
                                
                
                
                

            </div>
            
            
        )
    
}
 export default Catalogo;
