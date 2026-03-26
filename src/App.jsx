import { useEffect, useState } from "react"

import "./App.css"

function calculateWinner(squares) {
  const lines = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

    for(let i=0; i<lines.length; i++) {
      const [a,b,c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
    }

    return null
}

function Square({value, onSquareClick}) {
  const color = value === "X" ? "#0BA6DF" : "#FAA533"

  return (
    <button className="square" onClick={onSquareClick} style={{ color }}>
      {value}
    </button>
  )
}

function Board() {
  const [win, setWin] = useState({"X": 0, "O": 0})
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [status, setStatus] = useState("Playing")

  const winner = calculateWinner(squares)
  useEffect(() => {
    setStatus(`WINNER:  ${winner}`)
    setWin((prev) => ({
      ...prev,
      [winner]: prev[winner]+1
    }) )
  }, [winner])

  const draw = squares.every(square => square !== null)
  if (draw) {
    setStatus("DRAW")
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return null
    }

    const nextSquares = squares.slice()
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O"
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  function handleRestart() {
    setSquares(Array(9).fill(null))
  }

  return(
    <>
      <div className="board">
        <div className="status">{winner ? status : "Playing"}</div>
        <div className="wins">
          <span style={{ color: xIsNext ? "#FAA533" : "white", fontWeight: "bold" }}>{"X Wins: "}</span>
          <span style={{ color: win.X > win.O ? "darkgreen" : "red", fontWeight: "bolder" }}>{win.X} </span>
          {" | "}  
          <span style={{ color: !xIsNext ? "#FAA533" : "white", fontWeight: "bold" }}>{"O Wins: "}</span>
          <span style={{ color: win.O > win.X ? "darkgreen" : "red", fontWeight: "bolder" }}>{win.O}</span>  
        </div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        <button className="restartbtn" onClick={handleRestart}>Restart</button>
      </div>
    </>
  ) 
}

function App() {

  return(
    <>
      <Board/>
    </>
  )
}

export default App