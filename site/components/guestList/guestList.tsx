import React, { useMemo, useState } from "react"

import "./guestList.scss"
import { Guest } from "../../contexts/guests"
import GuestCard from "./guestCard"
import { TextField } from "@material-ui/core"

interface GuestListProps {
  guestList: Guest[]
}

export const GuestList: React.FC<GuestListProps> = ({ guestList }) => {
  const [nameFilter, setNameFilter] = useState("")

  const filteredGuests = useMemo(() => {
    return guestList.filter(guest =>
      guest.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
  }, [guestList, nameFilter])

  return (
    <div className="guest-list__container">
      <div className="guest-name-filter">
        <TextField
          id="name-filter"
          label="Name Filter"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />
      </div>
      {filteredGuests.map(guest => (
        <GuestCard key={guest._id} guest={guest} />
      ))}
    </div>
  )
}

export default GuestList
