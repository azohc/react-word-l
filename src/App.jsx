import React from "react"
import styled from "styled-components"
import Game from "./components/Game"
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
  const guess = useGuess()

  useKeypress((key, ctrlKey) => {
    if (key === "Backspace") {
      guess.eraseLastLetter()
    } else if (
      key === "Enter" &&
      guess.current.every(({ letter }) => letter !== "")
    ) {
      guess.submit()
    } else if (ctrlKey && key.toLowerCase() === "c") {
      guess.interrupt()
    } else if (guess.index < 5 && key.match(/^[a-zA-Z]$/)) {
      guess.addLetter(key)
    }
  })

  return (
    <AppContainer>
      <SpinningW />
      <GuessHistory guessHistory={guess.history} />
      <Game guessHistory={guess.history} />
      <Keyboard keys={guess.keys} />
    </AppContainer>
  )
}

export default App
