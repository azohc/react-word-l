import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import Keyboard from "./components/Keyboard"
import LetterRow from "./components/LetterRow"
import SpinningW from "./components/SpinningW"
import useKeypress from "./hooks/useKeypress"

export const LETTERSTATE_INIT = "init"
export const LETTERSTATE_HIT = "hit"
export const LETTERSTATE_MISS = "miss"
export const LETTERSTATE_ALMOST = "almost"
export const LETTERSTATE_GHOST = "ghost"
const SOLUTION = "WORDL"
const SOLUTION_LETTERS = new Set(SOLUTION)

const getBlankGuess = () =>
  Array(5).fill({ letter: "", state: LETTERSTATE_GHOST })

function App() {
  const [guessIndex, setGuessIndex] = useState(0)
  const [guess, setGuess] = useState(getBlankGuess())
  const [guessHistory, setGuessHistory] = useState([])

  const [keyGuessMap, setKeyGuessMap] = useState(
    new Map(
      Array.from("QWERTYUIOPASDFGHJKLZXCVBNM").map(
        (letter) => [letter, LETTERSTATE_GHOST]
      )
    )
  )

  useKeypress((key, ctrlKey) => {
    if (key === "Backspace") {
      const newGuess = guess.slice()
      const newGuessIndex =
        guessIndex > 0 ? guessIndex - 1 : guessIndex
      newGuess[newGuessIndex] = {
        letter: "",
        state: LETTERSTATE_INIT,
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
          guess.map((l) => ({
            ...l,
            state: LETTERSTATE_GHOST,
          })),
        ])
      )
      setGuess(getBlankGuess())
    } else if (guessIndex < 5 && key.match(/^[a-zA-Z]$/)) {
      const newGuess = guess.slice()
      newGuess[guessIndex] = {
        letter: key.toUpperCase(),
        state: LETTERSTATE_INIT,
      }
      setGuess(newGuess)
      setGuessIndex(guessIndex + 1)
    }
  })

  function submitGuess() {
    const newGuessHistoryEntry = guess.slice()
    const newKeyGuessMap = new Map(keyGuessMap)

    guess.forEach((l, i) => {
      if (l.letter === SOLUTION.charAt(i)) {
        newGuessHistoryEntry[i].state = LETTERSTATE_HIT
        newKeyGuessMap.set(l.letter, LETTERSTATE_HIT)
      } else if ([...SOLUTION_LETTERS].includes(l.letter)) {
        newGuessHistoryEntry[i].state = LETTERSTATE_ALMOST
        newKeyGuessMap.set(l.letter, LETTERSTATE_ALMOST)
      } else {
        newGuessHistoryEntry[i].state = LETTERSTATE_MISS
        newKeyGuessMap.set(l.letter, LETTERSTATE_MISS)
      }
    })
    setGuessIndex(0)
    setGuess(getBlankGuess())
    setGuessHistory(
      guessHistory.concat([newGuessHistoryEntry])
    )
    setKeyGuessMap(newKeyGuessMap)
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

  const solved = () =>
    guessHistory
      .at(-1)
      ?.every((l) => l.state === LETTERSTATE_HIT)

  const Game = () => {
    if (solved()) {
      return (
        <LetterRow
          letters={Array.from("🎉YOU WIN!🎉").map((l) => ({
            letter: l,
            state:
              l === " "
                ? LETTERSTATE_GHOST
                : LETTERSTATE_HIT,
          }))}
        />
      )
    } else if (
      guessHistory.filter((gh) =>
        gh.every((l) => l.state !== LETTERSTATE_GHOST)
      ).length === 7
    ) {
      return (
        <LetterRow
          letters={Array.from("😢YOU LOSE😢").map((l) => ({
            letter: l,
            state:
              l === " "
                ? LETTERSTATE_GHOST
                : LETTERSTATE_MISS,
          }))}
        />
      )
    } else {
      return <LetterRow letters={guess} />
    }
  }

  return (
    <div className="app">
      <SpinningW />
      <GuessHistory />
      <Game />
      <Keyboard keys={keyGuessMap} />
    </div>
  )
}

export default App
