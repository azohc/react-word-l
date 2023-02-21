import React from "react"
import PropTypes from "prop-types"
import LetterBox from "./LetterBox"

export default function LetterRow({ letters }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
      }}
    >
      {letters.map((letter, i) => (
        <LetterBox key={i} letter={letter.toUpperCase()} />
      ))}
    </div>
  )
}

LetterRow.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string),
}
