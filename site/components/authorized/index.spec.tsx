import * as React from "react"
import { render, fireEvent, act } from "@testing-library/react"
import Authorized, { AUTH_FORM_ID, AUTH_CHILDREN_ID } from "./index"

describe("Authorized", () => {
  const password = "testPassword"
  beforeEach(() => {
    process.env.UI_PASSWORD = password
  })

  afterEach(() => {
    delete process.env.UI_PASSWORD
  })

  it("should show auth form", async () => {
    const { getByTestId, queryByTestId } = render(<Authorized />)
    expect(getByTestId(AUTH_FORM_ID)).toBeInTheDocument()
    expect(queryByTestId(AUTH_CHILDREN_ID)).toBeNull()
  })

  it("after given password, should show children", async () => {
    const password = "password"
    process.env.UI_PASSWORD = password
    const {
      getByTestId,
      queryByTestId,
      getByPlaceholderText,
      findByTestId,
    } = render(<Authorized />)
    const form = getByTestId(AUTH_FORM_ID)
    const input = getByPlaceholderText("Password")

    fireEvent.change(input, { target: { value: "password" } })
    fireEvent.submit(form)

    expect(await findByTestId(AUTH_CHILDREN_ID)).toBeInTheDocument()
    expect(queryByTestId(AUTH_FORM_ID)).toBeNull()
  })
})
