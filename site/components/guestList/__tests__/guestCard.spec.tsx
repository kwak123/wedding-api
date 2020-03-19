import * as React from "react"
import GuestCard from "../guestCard"
import {
  firstLinkedGuest,
  secondLinkedGuest,
  noPlusOneGuest,
  plusOneNotSetGuest,
} from "../../../__mocks__/mockGuests"
import { render } from "@testing-library/react"

describe("GuestCard", () => {
  it("should render", () => {
    render(<GuestCard guest={firstLinkedGuest} />)
  })
})
