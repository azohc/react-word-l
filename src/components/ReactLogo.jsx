import React from "react"
import "./ReactLogo.css"
import reactLogo from "../assets/react.svg"

export default function ReactLogo() {
  return (
    <a
      href="https://beta.reactjs.org"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={reactLogo}
        className="logo react"
        alt="React logo"
      />
    </a>
  )
}
