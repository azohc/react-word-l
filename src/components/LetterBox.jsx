import React from "react"
import PropTypes from "prop-types"
import "./LetterBox.css"

export default function LetterBox({ letter, state }) {
  return (
    <div className={`letterbox ${state}`}>{letter}</div>
  )
}

LetterBox.propTypes = {
  letter: PropTypes.string,
  state: PropTypes.string,
}
