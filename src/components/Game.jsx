import React from "react"
import LetterRow from "./LetterRow"
import PropTypes from "prop-types"
import {
  LETTERSTATE_GHOST,
  LETTERSTATE_HIT,
  LETTERSTATE_MISS,
} from "../constants"

const YOU_WIN = Array.from("🎉YOU WIN!🎉").map((char) => ({
  letter: char,
  state: char === " " ? LETTERSTATE_GHOST : LETTERSTATE_HIT,
}))

const YOU_LOSE = Array.from("😢YOU LOSE😢").map((l) => ({
  letter: l,
  state: l === " " ? LETTERSTATE_GHOST : LETTERSTATE_MISS,
}))

export default function Game({ currentGuess, guessHistory }) {
  const winCondition = () =>
    guessHistory
      .at(-1)
      ?.every(({ state }) => state === LETTERSTATE_HIT)

  const loseCondition = () =>
    guessHistory.filter((guess) =>
      guess.every(({ state }) => state !== LETTERSTATE_GHOST)
    ).length === 7

  const Game = () => {
    if (winCondition()) {
      return <LetterRow letters={YOU_WIN} />
    } else if (loseCondition()) {
      return <LetterRow letters={YOU_LOSE} />
    } else {
      return <LetterRow letters={currentGuess} />
    }
  }

  return <Game />
}

Game.propTypes = {
  currentGuess: PropTypes.array,
  guessHistory: PropTypes.array,
}
