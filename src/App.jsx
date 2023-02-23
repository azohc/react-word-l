import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
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

const YOU_WIN = Array.from("🎉YOU WIN!🎉").map((char) => ({
  letter: char,
  state: char === " " ? LETTERSTATE_GHOST : LETTERSTATE_HIT,
}))

const YOU_LOSE = Array.from("😢YOU LOSE😢").map((l) => ({
  letter: l,
  state: l === " " ? LETTERSTATE_GHOST : LETTERSTATE_MISS,
}))

const getBlankGuess = () =>
  Array(5).fill({ letter: "", state: LETTERSTATE_GHOST })

function App() {
  const [currentGuess, setCurrentGuess] = useState(
    getBlankGuess()
  )
  const [currentGuessIndex, setCurrentGuessIndex] =
    useState(0)
  const [guessHistory, setGuessHistory] = useState([])
  const [guessedKeyMap, setGuessedKeyMap] = useState(
    new Map(
      Array.from("QWERTYUIOPASDFGHJKLZXCVBNM").map(
        (letter) => [letter, LETTERSTATE_GHOST]
      )
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
    } else if (
      currentGuessIndex < 5 &&
      key.match(/^[a-zA-Z]$/)
    ) {
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

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  const GuessHistory = () => (
    <>
      {guessHistory.map((guess, i) => (
        <LetterRow key={i} letters={guess} />
      ))}
      <AlwaysScrollToBottom />
    </>
  )

  const Game = () => {
    if (
      guessHistory
        .at(-1)
        ?.every(({ state }) => state === LETTERSTATE_HIT)
    ) {
      return <LetterRow letters={YOU_WIN} />
    } else if (
      guessHistory.filter((guess) =>
        guess.every(
          ({ state }) => state !== LETTERSTATE_GHOST
        )
      ).length === 7
    ) {
      return <LetterRow letters={YOU_LOSE} />
    } else {
      return <LetterRow letters={currentGuess} />
    }
  }

  return (
    <AppContainer>
      <SpinningW />
      <GuessHistory />
      <Game />
      <Keyboard keys={guessedKeyMap} />
    </AppContainer>
  )
}

export default App
