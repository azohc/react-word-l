import React from "react"
import "./App.css"
import LetterBox from "./components/LetterBox"
import ReactLogo from "./components/ReactLogo"

function App() {
  return (
    <div className="app">
      <ReactLogo />
      <LetterBox letter={"B"} state={"init"} />
      <LetterBox letter={"B"} state={"hit"} />
      <LetterBox letter={"B"} state={"miss"} />
      <LetterBox letter={"B"} state={"almost"} />
    </div>
  )
}

export default App
