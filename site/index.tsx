import * as React from "react"
import { render } from "react-dom"
import "babel-polyfill"

// import { Api } from "./api";
import Authorized from "./components/authorized"
import { useFetch } from "./utils/index"

import GuestList from "./components/guestList"

import "./index.scss"

const App = () => {
  return (
    <main className="app-container">
      <Authorized>
        <h1 className="app-header">Guests</h1>
        <GuestList />
      </Authorized>
    </main>
  )
}

render(<App />, document.getElementById("root"))
