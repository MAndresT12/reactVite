export const TURNS = {
    X: '❌',
    O: '⚪'
  }
  
  //hacer uso de concepto de componente dentro del div, 
  //vamosma tener un cuadrado que va a ser posicion donde se va a poder
  //jugar cada uno de los movimientos
  
export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]