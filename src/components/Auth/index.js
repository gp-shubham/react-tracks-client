import React, { useState } from "react"
import Register from "./Register"
import Login from "./Login"
import withRoot from "../../withRoot"

export default withRoot(() => {
  const [newUser, setNewUser] = useState(true)
  // return < Register setNewUser={setNewUser} />
  return newUser ? <Register setNewUser={setNewUser} /> : <Login setNewUser={setNewUser} />
})
