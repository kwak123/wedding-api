import * as React from "react"

import "./guestList.scss"
import { Guest } from "../../contexts/guests"
import GuestCard from "./guestCard"

interface GuestListProps {
  guestList: Guest[]
}

export const GuestList: React.FC<GuestListProps> = ({ guestList }) => (
  <div className="guest-list__container">
    {guestList.map(guest => (
      <GuestCard key={guest._id} guest={guest} />
    ))}
  </div>
)

export default GuestList
