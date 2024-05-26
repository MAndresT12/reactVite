
import LoginForm from './LoginForm';
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard';
import { useState } from 'react';


//Cuando recuperamos info del servidor, array con elementos, y renderizamos abajo
//Datos
const users = [
    {    
        username: 'marioCasas',
        name: 'Mario Ru',
        isFollowing: true

    },
    {
      username: 'robTed',
      name: 'Pablo H.',
      isFollowing: false 
    },
    {
        username: 'miltonandd',
        name: 'Milton H.',
        isFollowing: true 
      },

      {
        username: 'TMChein',
        name: 'Tomas',
        isFollowing: false 
      },
]


//AHORA RENDERIZADO DEL COMPONENTE CON ARRAY DE ELEMENTOS, con .map
export function App(){

    return(
    <section className='App'>
        {/* Ojo uso de llaves porque eso es lo que queremos renderizar*/}
        {
            users.map(user =>{
                const {username, name, isFollowing} = user
                return (
                    <TwitterFollowCard 
                    username={username} 
                    initialIsFollowing={isFollowing}>
                        {name} {/* Ojo porque no es pasado como prop si no como children*/}
                    </TwitterFollowCard>
                )
            })
        }
    </section>
    )
}

//ANTES!!!!!!
//Ojo colocar export para poder importar
// export function App(){
//     const [name, setName] = useState('midudev')

//     return(
//     <section className='App'>    
//         <TwitterFollowCard   username={name} initialIsFollowing={true}>
//             Miguel Angel
//         </TwitterFollowCard> 
//         <TwitterFollowCard   username="miltonandd" >
//             Milton Heras
//         </TwitterFollowCard>

//         <button onClick = {() => setName('maincraft1')}>
//             Cambio nombre
//         </button>
//     </section>
//     )
// }



//Notes!!! 
//No podemos usar estilos en linea, espera un objeto
//ejm <article style = "display: flex" no valdria
//deberia ser {{}}



//Ejemplo de un login
// import React from 'react';
// import LoginForm from './LoginForm';

// function App() {
//   return (
//     <div className="App">
//       <h1>Login Page</h1>
//       <LoginForm />
//     </div>
//   );
// }

// export default App;

//Importante cuando hago exportaciones nombradas (exportar multiples valores desde un mismo modulo)
//uso en main (bueno pa import {App} ejm), pero en este caso de exportacion or defecto 
//(solo permite exportar un solo valor por módulo) (import App)