import React from "react"
import w from "../assets/w.png"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Image = styled.img`
  height: 5rem;
  padding: 1rem;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  @media (prefers-reduced-motion: no-preference) {
    & {
      animation: ${rotate} infinite 20s linear;
    }
  }
`

const handleMouseEnter = () => {
  // TODO reset rotation to 0deg
}

export default function SpinningW() {
  return (
    <Image
      onMouseEnter={handleMouseEnter}
      src={w}
      className="w"
      alt="letter w"
    />
  )
}
