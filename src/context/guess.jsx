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

const GET_BLANK_GUESS = () =>
  Array(5).fill({ letter: "", state: LETTERSTATE_GHOST })

export function GuessProvider({ children }) {
  const [current, setCurrent] = useState(GET_BLANK_GUESS())
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState([])
  const [letterMap, setLetterMap] = useState(
    new Map(
      Array.from("QWERTYUIOPASDFGHJKLZXCVBNM").map((letter) => [
        letter,
        LETTERSTATE_GHOST,
      ])
    )
  )

  function reset() {
    setIndex(0)
    setCurrent(GET_BLANK_GUESS())
  }

  function addLetter(letter) {
    const newGuess = current.slice()
    newGuess[index] = {
      letter: letter.toUpperCase(),
      state: LETTERSTATE_INIT,
    }
    setCurrent(newGuess)
    setIndex(index + 1)
  }

  function eraseLetter() {
    const newGuess = current.slice()
    const newIndex = index > 0 ? index - 1 : index
    newGuess[newIndex] = {
      letter: "",
      state: LETTERSTATE_INIT,
    }
    setCurrent(newGuess)
    setIndex(newIndex)
  }

  function submit() {
    const newHistoryEntry = current.slice()
    const newLetterMap = new Map(letterMap)

    current.forEach(({ letter }, i) => {
      if (letter === SOLUTION.charAt(i)) {
        newHistoryEntry[i].state = LETTERSTATE_HIT
        newLetterMap.set(letter, LETTERSTATE_HIT)
      } else if ([...SOLUTION_LETTERS].includes(letter)) {
        newHistoryEntry[i].state = LETTERSTATE_ALMOST
        newLetterMap.set(letter, LETTERSTATE_ALMOST)
      } else {
        newHistoryEntry[i].state = LETTERSTATE_MISS
        newLetterMap.set(letter, LETTERSTATE_MISS)
      }
    })
    pushToHistory(newHistoryEntry)
    setLetterMap(newLetterMap)
    reset()
  }

  function interrupt() {
    pushToHistory(
      current.map((guessPart) => ({
        ...guessPart,
        state: LETTERSTATE_GHOST,
      }))
    )
    reset()
  }

  function pushToHistory(guess) {
    setHistory(history.concat([guess]))
  }

  return (
    <GuessContext.Provider
      value={{
        current: current,
        index: index,
        reset,
        addLetter,
        eraseLetter,
        submit,
        interrupt,
        history,
        letterMap,
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
