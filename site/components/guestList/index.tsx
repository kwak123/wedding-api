import * as React from "react"

import Button from "../common/Button"

import "./guestList.css"
import Axios from "axios"

interface Guest {
  _id: string
  name: string
  plusOneId: string
  email: string
  confirmed: boolean
  dietaryRestrictions: string[]
}

interface GuestProps {
  guest: Guest
}

const GuestConfirmed = ({ confirmed }: { confirmed: boolean }) => (
  <p className={confirmed ? "guest-confirmed" : "guest-not-confirmed"}>
    {confirmed ? "Confirmed" : "Not confirmed"}
  </p>
)

const GuestActions = ({ email }) => {
  const dispatchToggleConfirm = () => Axios.put(`/api/guest/confirm/${email}`)

  return (
    <div className="guest-actions__container">
      <Button onClick={() => {}} text={"Send RSVP"} />
      <Button onClick={() => {}} text={"Attach plus-one"} />
      <Button onClick={dispatchToggleConfirm} text={"Confirm/Unconfirm"} />
    </div>
  )
}

const GuestCard = ({ guest }: GuestProps) => {
  return (
    <div className="guest-card__container">
      <div className="guest-details__container">
        <p className="guest-name">{guest.name}</p>
        <p className="guest-email">Email: {guest.email}</p>
        <p className="guest-plus-one">Plus One: {guest.plusOneId}</p>
        <GuestConfirmed confirmed={guest.confirmed} />
      </div>
      <div className="guest-restrictions__container">
        <h3 className="guest-restrictions__header">Dietary Restrictions</h3>
        <ul>
          {guest.dietaryRestrictions.map((restriction, i) => (
            <li key={restriction + i}>
              <p>{restriction}</p>
            </li>
          ))}
        </ul>
      </div>
      <GuestActions email={guest.email} />
    </div>
  )
}

interface GuestListProps {
  guestList: Guest[]
}

const GuestList = ({ guestList = [] }: GuestListProps) => {
  return (
    <div className="guest-list__container">
      {guestList.map(guest => (
        <GuestCard guest={guest} key={guest._id} />
      ))}
    </div>
  )
}

export default GuestList
