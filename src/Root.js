import React from "react"
import { Query } from "react-apollo"
import { gql } from "apollo-boost"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import withRoot from "./withRoot"
import App from "./pages/App"
import Profile from "./pages/Profile"
import Header from "./components/Shared/Header"
import Loading from "./components/Shared/Loading"
import Error from "./components/Shared/Error"

const Root = () => (
  <Query query={ME_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />
      if (error) return <Error error={error} />
      const currentUser = data.me
      return (
        <Router><>
          <Header currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/profile/:id" component={Profile} />
          </Switch>
        </></Router>
      )
    }}
  </Query>
)

// const GET_TRACK_QUERY = gql`
//   {
//     tracks {
//       id
//       title
//     }
//   }
// `
const ME_QUERY = gql`
  {
    me {
      id
      name
      username
      email
    }
  }
`

export default withRoot(Root)
