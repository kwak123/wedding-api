import * as React from "react"
import Api from "../api"

export interface Guest {
  _id: string
  name: string
  plusOneId: string
  email: string
  confirmed: boolean
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
    instance = new GuestContextProvider(props)
  }
  return instance
}
