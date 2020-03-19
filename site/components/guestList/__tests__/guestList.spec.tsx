import * as React from "react"
import GuestList from "../guestList"
import mockGuests from "../../../__mocks__/mockGuests"
import { render } from "@testing-library/react"

describe("guestList", () => {
  it("should render guests", async () => {
    const { findByText } = render(<GuestList guestList={mockGuests} />)
    // TODO: 3/18/2020 See how we can query these in a promise?
    const [guestOne, guestTwo, guestThree, guestFour] = mockGuests
    expect(await findByText(guestOne.name)).not.toBeNull()
    expect(await findByText(guestTwo.name)).not.toBeNull()
    expect(await findByText(guestThree.name)).not.toBeNull()
    expect(await findByText(guestFour.name)).not.toBeNull()
  })
})
