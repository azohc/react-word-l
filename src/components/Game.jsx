import React from "react"
import LetterRow from "./LetterRow"
import {
  LETTERSTATE_GHOST,
  LETTERSTATE_HIT,
  LETTERSTATE_MISS,
} from "../constants"
import { useGuess } from "../context/guess"

const MAX_GUESSES = 7

const YOU_WIN = Array.from("🎉YOU WIN!🎉").map((char) => ({
  letter: char,
  state: char === " " ? LETTERSTATE_GHOST : LETTERSTATE_HIT,
}))

const YOU_LOSE = Array.from("😢YOU LOSE😢").map((l) => ({
  letter: l,
  state: l === " " ? LETTERSTATE_GHOST : LETTERSTATE_MISS,
}))

const winCondition = (guess) =>
  guess.history
    .at(-1)
    ?.every(({ state }) => state === LETTERSTATE_HIT)

const loseCondition = (guessHistory) =>
  guessHistory.filter((guess) =>
    guess.every(({ state }) => state !== LETTERSTATE_GHOST)
  ).length === MAX_GUESSES

export default function GuessOrGameStateLetterRow() {
  const guess = useGuess()

  const jsx = () => {
    if (winCondition()) {
      return <LetterRow letters={YOU_WIN} />
    } else if (loseCondition()) {
      return <LetterRow letters={YOU_LOSE} />
    } else {
      return <LetterRow letters={guess.current} />
    }
  }

  return <jsx />
}
