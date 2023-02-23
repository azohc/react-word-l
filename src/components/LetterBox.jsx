import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {
  LETTERSTATE_INIT,
  LETTERSTATE_HIT,
  LETTERSTATE_MISS,
  LETTERSTATE_ALMOST,
  LETTERSTATE_GHOST,
} from "../constants"

const Square = styled.div`
  background-color: var(--c-white);
  color: var(--c-black);
  border: 4px var(--c-black-mute) solid;
  border-radius: 8px;
  font-size: 2rem;
  height: 48px;
  width: 48px;
  text-align: center;

  &.${LETTERSTATE_INIT} {
    color: var(--c-black);
    background-color: var(--c-white);
    border-color: var(--c-black-mute);
  }

  &.${LETTERSTATE_HIT} {
    color: var(--c-white);
    background-color: var(--c-green);
  }

  &.${LETTERSTATE_MISS} {
    color: var(--c-white);
    background-color: var(--c-gray);
  }

  &.${LETTERSTATE_ALMOST} {
    color: var(--c-white);
    background-color: var(--c-orange);
  }

  &.${LETTERSTATE_GHOST} {
    opacity: 0.3;
  }
`

export default function LetterBox({ letter, state }) {
  return <Square className={state}>{letter}</Square>
}

LetterBox.propTypes = {
  letter: PropTypes.string,
  state: PropTypes.string,
}
