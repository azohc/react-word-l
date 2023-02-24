import React, { useEffect, useRef } from "react"
import { useGuess } from "../context/guess"
import LetterRow from "./LetterRow"

export default function GuessHistory() {
  const { history } = useGuess()

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  return (
    <>
      {history.map((guess, i) => (
        <LetterRow key={i} letters={guess} />
      ))}
      <AlwaysScrollToBottom />
    </>
  )
}
