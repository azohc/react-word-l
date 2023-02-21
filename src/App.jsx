import React, { useState } from "react"
import "./App.css"
import LetterBox from "./components/LetterBox"
import LetterRow from "./components/LetterRow"
import ReactLogo from "./components/ReactLogo"
import useKeypress from "./hooks/useKeypress"

function App() {
  const [guessIndex, setGuessIndex] = useState(0)
  const [guess, setGuess] = useState(["", "", "", "", ""])
  const [guessHistory, setGuessHistory] = useState([])

  useKeypress((key, ctrlKey) => {
    if (key === "Backspace") {
      const newGuess = guess.slice()
      const newGuessIndex =
        guessIndex > 0 ? guessIndex - 1 : guessIndex
      newGuess[newGuessIndex] = ""
      setGuess(newGuess)
      setGuessIndex(newGuessIndex)
    } else if (
      key === "Enter" &&
      guess[guess.length - 1] !== ""
    ) {
      submitGuess()
    } else if (ctrlKey && key.toLowerCase() === "c") {
      setGuessIndex(0)
      setGuessHistory(guessHistory.concat([guess]))
      setGuess(["", "", "", "", ""])
    } else if (guessIndex < 5 && key.match(/^[a-zA-Z]$/)) {
      const newGuess = guess.slice()
      newGuess[guessIndex] = key
      setGuess(newGuess)
      setGuessIndex(guessIndex + 1)
    }
  })

  function submitGuess() {
    setGuessIndex(0)
    setGuess(["", "", "", "", ""])
    setGuessHistory(guessHistory.concat([guess]))
  }

  return (
    <div className="app">
      <ReactLogo />

      {guessHistory.map((guessHistoryEntry, i) => (
        <LetterRow key={i} letters={guessHistoryEntry} />
      ))}

      <LetterRow letters={guess} />
    </div>
  )
}

export default App
