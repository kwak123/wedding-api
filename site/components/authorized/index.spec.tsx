import * as React from "react"
import { render, waitForElement } from "@testing-library/react"
import Authorized, { AUTH_FORM_ID, AUTH_CHILDREN_ID } from "./index"

describe("Authorized", () => {
  it("should show render form", async () => {
    const { getByTestId } = render(<Authorized />)
    expect(getByTestId(AUTH_FORM_ID)).toBeInTheDocument()
    expect(getByTestId(AUTH_CHILDREN_ID)).not.toBeInTheDocument()
  })
})
