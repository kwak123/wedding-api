import * as React from "react"
import { render } from "react-dom"
import "babel-polyfill"

// import { Api } from "./api";
import Authorized from "./components/authorized"
import { useFetch } from "./utils/index"

import GuestList from "./components/guestList"

const App = () => {
  return (
    <div>
      <Authorized>
        <h1>Guests</h1>
        <GuestList />
      </Authorized>
    </div>
  )
}

render(<App />, document.getElementById("root"))
