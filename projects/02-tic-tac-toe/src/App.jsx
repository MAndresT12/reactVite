import './App.css'
import { useState, useEffect } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import {WinnerModal} from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

//1.
// function App() {

//   return (
//     <main className='board'>
//       <h1>Tic tac toe</h1>
//       <section className='game'>
//         {
//           board.map((_, index) => {
//             return (
//               <div className='cell' key={index}>
//                 <span className='cell__content' >
//                   {index}
//                 </span>
//               </div>
//             )
//           })
//         }
//       </section>
//     </main>
//   )
// }


//2.
function App() {
  console.log('render')
  //Porque necesitamos que cada vez que user haga click cambie o se renderice el tablero
  //Necesitariamos un estado
  // const board = Array(9).fill(null) ANTES, necesitamos usar HOOks
  const [board, setBoard] = useState(() => {
    console.log('Inicializar estado del board')
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) //si no hay nada en el localstorage, se crea un array de 9 con null
  
  })
 
 
 
  // console.log(board)
  
  //Crear estado para saber si es turno de la x o O, por defecto X
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    //Como es string no tendría ningun problema
    return turnFromLocalStorage ?? TURNS.X //Si tengo algo desde el storage utilizo del de storage, si es null o undefined utilizo el por defecto que es TURNS.X
  })
  
  const [winner, setWinner] = useState(null) //null es que no hay ganador, false que hay un empate




  const resetGame = () => { //Importante, solo reseteamos lo que queremos, otros estados por ejm se pueden guardar
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()

  }


  const updateBoard = (index) =>{

    //Evitar que se sobreescriba, no actualizamos la posc si tenemos algo
    if (board[index] || winner) return //ojo antes de actualizar, parar el juego cuando hay un winner
    
    //actualizar tablero OJO debe ser nuevo
    const newBoard = [... board]
    newBoard[index] = turn //x u o
    setBoard(newBoard)

    //cambiar turno
    //CALCULAR NUEVO TURNO CON LO QUE TENEMOS ACTUALMENTE
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar aquí partida     saveGameToStorage({board: newBoard, newTurn}) pero vamos a usar cada vez que cambie el turno o board que se guarde conuseEffect podria ser
    saveGameToStorage({board: newBoard, newTurn})



    //revisar si hay un ganador, tablero que tiene el ultimo movimiento
    const newWinner = checkWinnerFrom(newBoard)

    if(newWinner){
      // setWinner(newWinner) //ACTUALIZACION DE ESTADOS ES ASINCRONO, no bloquea ejecucion de codigo que le sigue
      // alert('El ganador es '+newWinner) //o mejor alert(`El ganador es ${newWinner}`)
          //Para solucionar esto le podemos pasar una funcion y no un valor, osea al estado en lugar de pasarle un nuevo valor
          //le pasamos una callback/funcion que se ejecutara cuando el estado se actualice
          // setWinner((prevWinner) => {
          //   console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`)
          //   return newWinner
          // })
      //Por el momento solo usaremos el cambio de estado
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate

    }
  }


  useEffect(() => {
    console.log('useEffect')
  }, [winner])
  //Renderizado
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      {/* Seccion para el juego*/}
      <section className='game'>
        {
          board.map((square, index) => { // (_, index) la primera posicion seria el square
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                 
                {square}
              </Square>
            )
          })
        }
      </section>

      {/* Seccion para los turnos*/}
      {/*visualmente saber quien tiene el turno*/}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>


      
      {/*Ahora seccion con un renderizado condicional si winner es dif a null (osea puede ser x, false, o) vamos a renderizar*/}

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}
export default App
