import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Game from "./components/Game"
import GuessHistory from "./components/GuessHistory"
import Keyboard from "./components/Keyboard"
import LetterRow from "./components/LetterRow"
import SpinningW from "./components/SpinningW"
import {
  LETTERSTATE_INIT,
  LETTERSTATE_HIT,
  LETTERSTATE_MISS,
  LETTERSTATE_ALMOST,
  LETTERSTATE_GHOST,
} from "./constants"
import useKeypress from "./hooks/useKeypress"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const SOLUTION = "WORDL"
const SOLUTION_LETTERS = new Set(SOLUTION)

const getBlankGuess = () =>
  Array(5).fill({ letter: "", state: LETTERSTATE_GHOST })

function App() {
  const [currentGuess, setCurrentGuess] = useState(getBlankGuess())
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [guessedKeyMap, setGuessedKeyMap] = useState(
    new Map(
      Array.from("QWERTYUIOPASDFGHJKLZXCVBNM").map((letter) => [
        letter,
        LETTERSTATE_GHOST,
      ])
    )
  )

  useKeypress((key, ctrlKey) => {
    if (key === "Backspace") {
      eraseLastLetterOfCurrentGuess()
    } else if (
      key === "Enter" &&
      currentGuess.every(({ letter }) => letter !== "")
    ) {
      submitCurrentGuess()
    } else if (ctrlKey && key.toLowerCase() === "c") {
      interruptCurrentGuess()
    } else if (currentGuessIndex < 5 && key.match(/^[a-zA-Z]$/)) {
      processLetter(key)
    }
  })

  function eraseLastLetterOfCurrentGuess() {
    const newGuess = currentGuess.slice()
    const newIndex =
      currentGuessIndex > 0
        ? currentGuessIndex - 1
        : currentGuessIndex
    newGuess[newIndex] = {
      letter: "",
      state: LETTERSTATE_INIT,
    }
    setCurrentGuess(newGuess)
    setCurrentGuessIndex(newIndex)
  }

  function interruptCurrentGuess() {
    setCurrentGuessIndex(0)
    setGuessHistory(
      guessHistory.concat([
        currentGuess.map((guessPart) => ({
          ...guessPart,
          state: LETTERSTATE_GHOST,
        })),
      ])
    )
    setCurrentGuess(getBlankGuess())
  }

  function processLetter(letter) {
    const newGuess = currentGuess.slice()
    newGuess[currentGuessIndex] = {
      letter: letter.toUpperCase(),
      state: LETTERSTATE_INIT,
    }
    setCurrentGuess(newGuess)
    setCurrentGuessIndex(currentGuessIndex + 1)
  }

  function submitCurrentGuess() {
    const newHistoryEntry = currentGuess.slice()
    const newMap = new Map(guessedKeyMap)

    currentGuess.forEach(({ letter }, i) => {
      if (letter === SOLUTION.charAt(i)) {
        newHistoryEntry[i].state = LETTERSTATE_HIT
        newMap.set(letter, LETTERSTATE_HIT)
      } else if ([...SOLUTION_LETTERS].includes(letter)) {
        newHistoryEntry[i].state = LETTERSTATE_ALMOST
        newMap.set(letter, LETTERSTATE_ALMOST)
      } else {
        newHistoryEntry[i].state = LETTERSTATE_MISS
        newMap.set(letter, LETTERSTATE_MISS)
      }
    })
    setCurrentGuessIndex(0)
    setCurrentGuess(getBlankGuess())
    setGuessHistory(guessHistory.concat([newHistoryEntry]))
    setGuessedKeyMap(newMap)
  }

  // TODO use useContext for game state ?
  return (
    <AppContainer>
      <SpinningW />
      <GuessHistory guessHistory={guessHistory} />
      <Game currentGuess={currentGuess} guessHistory={guessHistory} />
      <Keyboard keys={guessedKeyMap} />
    </AppContainer>
  )
}

export default App
