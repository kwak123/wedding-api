import * as React from "react"

import "./button.css"

export interface ButtonProps {
  onClick: () => any
  text: string
}

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button className="common-button" onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
