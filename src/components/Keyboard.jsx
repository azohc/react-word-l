import React from "react"
import LetterRow from "./LetterRow"
import PropTypes from "prop-types"

const toLetters = (keysMap, filter) =>
  [...keysMap.entries()]
    .filter(([letter]) =>
      Array.from(filter).includes(letter)
    )
    .map(([letter, state]) => ({ letter, state }))

export default function Keyboard({ keys }) {
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
      <LetterRow letters={toLetters(keys, "QWERTYUIOP")} />
      <LetterRow letters={toLetters(keys, "ASDFGHJKL")} />
      <LetterRow letters={toLetters(keys, "ZXCVBNM")} />
    </div>
  )
}

Keyboard.propTypes = {
  keys: PropTypes.instanceOf(Map),
}
