import React from "react"
import "./SpinningW.css"
import w from "../assets/w.png"

const handleMouseEnter = () => {
  // TODO reset rotation to 0deg
}

export default function SpinningW() {
  return (
    <img
      onMouseEnter={handleMouseEnter}
      src={w}
      className="w"
      alt="letter w"
    />
  )
}
