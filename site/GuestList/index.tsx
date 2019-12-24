import * as React from "react"

interface Guest {
  name: string
  plusOneId: string
  email: string
  confirmed: boolean
}

interface GuestListProps {
  guestList: Guest[]
}

const GuestList = ({ guestList = [] }: GuestListProps) => {
  return (
    <div>
      {guestList.map(guest => (
        <div>
          <p>{guest.name}</p>
          <p>{guest.email}</p>
          <p>{guest.plusOneId}</p>
          <p>{guest.confirmed}</p>
        </div>
      ))}
    </div>
  )
}

export default GuestList
