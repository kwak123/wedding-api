import * as React from "react"

import GuestContextProvider, { GuestContext } from "../../contexts/guests"

import GuestList from "./guestList"
import "./guestList.scss"

const GuestListContainer = () => {
  return (
    <GuestContextProvider>
      <GuestContext.Consumer>
        {props => {
          const { guestList } = props
          return <GuestList guestList={guestList} />
        }}
      </GuestContext.Consumer>
    </GuestContextProvider>
  )
}

export default GuestListContainer
