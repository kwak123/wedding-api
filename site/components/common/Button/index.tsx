import * as React from "react"
import Button from "@material-ui/core/Button"

import "./button.css"

export interface ButtonProps {
  onClick: () => any
  text: string
}

const KwakButton = ({ onClick, text }: ButtonProps) => {
  return (
    <Button className="common-button" variant="contained" onClick={onClick}>
      {text}
    </Button>
  )
}

export default KwakButton
