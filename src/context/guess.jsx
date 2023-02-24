import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import {
  LETTERSTATE_INIT,
  LETTERSTATE_GHOST,
  LETTERSTATE_HIT,
  LETTERSTATE_MISS,
  LETTERSTATE_ALMOST,
} from "../constants"

const GuessContext = createContext()

const SOLUTION = "WORDL"
const SOLUTION_LETTERS = new Set(SOLUTION)

const getBlankGuess = () =>
  Array(5).fill({ letter: "", state: LETTERSTATE_GHOST })

export function GuessProvider({ children }) {
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

  // -------------
  // current guess

  function eraseLastLetter() {
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

  function addLetter(letter) {
    const newGuess = currentGuess.slice()
    newGuess[currentGuessIndex] = {
      letter: letter.toUpperCase(),
      state: LETTERSTATE_INIT,
    }
    setCurrentGuess(newGuess)
    setCurrentGuessIndex(currentGuessIndex + 1)
  }

  function submit() {
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
    pushHistoryEntry(newHistoryEntry)
    setGuessedKeyMap(newMap)
    reset()
  }

  function reset() {
    setCurrentGuessIndex(0)
    setCurrentGuess(getBlankGuess())
  }

  function interrupt() {
    pushHistoryEntry(
      currentGuess.map((guessPart) => ({
        ...guessPart,
        state: LETTERSTATE_GHOST,
      }))
    )
    reset()
  }

  // -------------
  // guess history
  function pushHistoryEntry(guess) {
    setGuessHistory(guessHistory.concat([guess]))
  }

  return (
    <GuessContext.Provider
      value={{
        current: currentGuess,
        index: currentGuessIndex,
        eraseLastLetter,
        addLetter,
        reset,
        interrupt,
        submit,
        history: guessHistory,
        pushHistoryEntry,
        keys: guessedKeyMap,
      }}
    >
      {children}
    </GuessContext.Provider>
  )
}

export function useGuess() {
  const context = useContext(GuessContext)
  if (!context) {
    throw new Error("useGuess must be used within a GuessProvider")
  }
  return context
}

GuessProvider.propTypes = {
  children: PropTypes.any,
}
