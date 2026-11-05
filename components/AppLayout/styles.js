import css from "styled-jsx/css"

import { breakpoints, colors, fonts } from "../../styles/theme"
import { addOpacityToColor } from "../../styles/utils"

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
  }
  * {
    box-sizing: border-box;
  }
  button,
  textarea,
  input {
    font-family: inherit;
  }
  :focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`

export default css`
  .layout {
    display: grid;
    height: 100vh;
    height: 100dvh;
    place-items: center;
  }
  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    width: 100%;
    overflow-y: auto;
  }

  main::-webkit-scrollbar {
    width: 7px;
  }

  main::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${colors.secondary};
  }

  main::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  .toasts {
    bottom: 72px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    left: 50%;
    pointer-events: none;
    position: fixed;
    transform: translateX(-50%);
    width: min(90vw, 420px);
    z-index: 10;
  }
  .toast {
    animation: toast-in 0.25s ease-out;
    background: #1f1029;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 12px 16px;
    text-align: center;
  }
  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breakpoints.mobile};
    }
  }
`
