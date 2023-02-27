import React from "react"
import styled from "styled-components"
import GuessOrGameStateLetterRow from "./components/Game"
import GuessHistory from "./components/GuessHistory"
import Keyboard from "./components/Keyboard"
import SpinningW from "./components/SpinningW"
import { useGuess } from "./context/guess"
import useKeypress from "./hooks/useKeypress"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

function App() {
  const {
    eraseLetter,
    submit,
    interrupt,
    addLetter,
    isIncomplete,
    isSubmittable,
  } = useGuess()

  useKeypress((key, ctrlKey) => {
    if (key === "Backspace") {
      eraseLetter()
    } else if (key === "Enter" && isSubmittable()) {
      submit()
    } else if (ctrlKey && key.toLowerCase() === "c") {
      interrupt()
    } else if (isIncomplete() && key.match(/^[a-zA-Z]$/)) {
      addLetter(key)
    }
  })

  return (
    <AppContainer>
      <SpinningW />
      <GuessHistory />
      <GuessOrGameStateLetterRow />
      <Keyboard />
    </AppContainer>
  )
}

export default App
