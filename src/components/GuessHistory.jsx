import React, { useEffect, useRef } from "react"
import LetterRow from "./LetterRow"
import PropTypes from "prop-types"

export default function GuessHistory({ guessHistory }) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  return (
    <>
      {guessHistory.map((guess, i) => (
        <LetterRow key={i} letters={guess} />
      ))}
      <AlwaysScrollToBottom />
    </>
  )
}

GuessHistory.propTypes = {
  guessHistory: PropTypes.array,
}
