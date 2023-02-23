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
    background-color: var(--c-white);
    color: var(--c-black);
    border-color: var(--c-black-mute);
  }

  &.${LETTERSTATE_HIT} {
    background-color: var(--c-green);
    color: var(--c-white);
  }

  &.${LETTERSTATE_MISS} {
    background-color: var(--c-gray);
    color: var(--c-white);
  }

  &.${LETTERSTATE_ALMOST} {
    background-color: var(--c-orange);
    color: var(--c-white);
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
