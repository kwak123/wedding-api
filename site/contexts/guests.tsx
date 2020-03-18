import * as React from "react"
import Api from "../api"

export interface Guest {
  _id: string
  // Whether guest has entered their email to view RSVP on wedding-site
  hasReceivedRsvp: boolean

  // Whether guest has responded to RSVP
  isConfirmed: boolean

  // Whether guest is attending or not
  isAttending: boolean

  // Guest name
  name: string

  // Whether or not the guest gets a plus one
  isPlusOneEligible: boolean

  // Mongo ID of Guest's plus-one
  plusOneId: Guest | null

  // Guest email - used as UUID outside of Mongo ID
  email: string

  // List of dietary restrictions, simply string for now
  dietaryRestrictions: string[]
}

interface IGuestContext {
  guestList: Guest[]
  modifyGuest?: (guest: Guest) => any
  setGuestList?: (guestList: Guest[]) => any
  refreshGuestList: () => any
}

const defaultState = {
  guestList: [],
  modifyGuest: () => {},
  setGuestList: () => {},
  refreshGuestList: () => {},
}

export const GuestContext = React.createContext<IGuestContext>(defaultState)

class GuestContextProvider extends React.Component {
  state = {
    guestList: [],
  }

  changeGuestList = guestList => this.setState({ guestList })

  componentDidMount() {
    this.refreshGuestList()
  }

  refreshGuestList = () =>
    Api.getAllGuests().then(({ data }) => {
      // changeGuestList(() => (data as unknown) as Guest[])
      this.changeGuestList(data)
    })

  setGuestList: IGuestContext["setGuestList"] = newGuestList =>
    this.changeGuestList(newGuestList)

  modifyGuest: IGuestContext["modifyGuest"] = modifiedGuest => {
    const oldGuestIndex = this.state.guestList.findIndex(
      guest => guest._id === modifiedGuest._id
    )
    if (oldGuestIndex >= 0) {
      const newGuestList = this.state.guestList.slice()
      newGuestList.splice(oldGuestIndex, 1, modifiedGuest)
      this.changeGuestList(newGuestList)
    }
  }

  render() {
    const value = {
      guestList: this.state.guestList,
      modifyGuest: this.modifyGuest,
      setGuestList: this.setGuestList,
      refreshGuestList: this.refreshGuestList,
    }

    return (
      <GuestContext.Provider value={value}>
        {this.props.children}
      </GuestContext.Provider>
    )
  }
}
let instance = null

export default props => {
  if (instance === null) {
    instance = <GuestContextProvider {...props} />
  }
  return instance
}
