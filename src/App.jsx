import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import LetterRow from "./components/LetterRow"
import ReactLogo from "./components/ReactLogo"
import useKeypress from "./hooks/useKeypress"

const solution = "WORDL"

const getBlankGuess = () =>
  Array(5).fill({ letter: "", state: "ghost" })

function App() {
  const [guessIndex, setGuessIndex] = useState(0)
  const [guess, setGuess] = useState(getBlankGuess())
  const [guessHistory, setGuessHistory] = useState([])

  useKeypress((key, ctrlKey) => {
    if (key === "Backspace") {
      const newGuess = guess.slice()
      const newGuessIndex =
        guessIndex > 0 ? guessIndex - 1 : guessIndex
      newGuess[newGuessIndex] = {
        letter: "",
        state: "init",
      }
      setGuess(newGuess)
      setGuessIndex(newGuessIndex)
    } else if (
      key === "Enter" &&
      guess.every((g) => g.letter !== "")
    ) {
      submitGuess()
    } else if (ctrlKey && key.toLowerCase() === "c") {
      setGuessIndex(0)
      setGuessHistory(
        guessHistory.concat([
          guess.map((l) => ({ ...l, state: "ghost" })),
        ])
      )
      setGuess(getBlankGuess())
    } else if (guessIndex < 5 && key.match(/^[a-zA-Z]$/)) {
      const newGuess = guess.slice()
      newGuess[guessIndex] = {
        letter: key.toUpperCase(),
        state: "init",
      }
      setGuess(newGuess)
      setGuessIndex(guessIndex + 1)
    }
  })

  function submitGuess() {
    // PROCESS each KEY
    setGuessIndex(0)
    setGuess(getBlankGuess())
    setGuessHistory(guessHistory.concat([guess]))
  }

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  const GuessHistory = () => (
    <>
      {guessHistory.map((guessHistoryEntry, i) => (
        <LetterRow key={i} letters={guessHistoryEntry} />
      ))}
      <AlwaysScrollToBottom />
    </>
  )

  return (
    <div className="app">
      <ReactLogo />
      <GuessHistory />
      <LetterRow letters={guess} />
    </div>
  )
}

export default App
