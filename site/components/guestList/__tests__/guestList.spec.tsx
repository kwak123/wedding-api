import * as React from "react"
import GuestList from "../guestList"
import mockGuests from "../../../__mocks__/mockGuests"
import { render } from "@testing-library/react"

describe("guestList", () => {
  it("should render guests", () => {
    render(<GuestList guestList={mockGuests} />)
  })
})
