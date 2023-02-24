import React from "react"
import { useGuess } from "../context/guess"
import LetterRow from "./LetterRow"

const toLetters = (letterMap, filter) =>
  [...letterMap.entries()]
    .filter(([letter]) => Array.from(filter).includes(letter))
    .map(([letter, state]) => ({ letter, state }))

export default function Keyboard() {
  // TODO make clickable?
  const guess = useGuess()

  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <LetterRow letters={toLetters(guess.letterMap, "QWERTYUIOP")} />
      <LetterRow letters={toLetters(guess.letterMap, "ASDFGHJKL")} />
      <LetterRow letters={toLetters(guess.letterMap, "ZXCVBNM")} />
    </div>
  )
}
