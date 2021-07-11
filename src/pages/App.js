import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchTracks from "../components/Track/SearchTracks"
import TrackList from "../components/Track/TrackList"
import CreateTrack from "../components/Track/CreateTrack"
import Loading from "../components/Shared/Loading";
import Error from "../components/Shared/Error";

const App = ({ classes }) => {
  return (
    <div className={classes.container}>
      {/* <SearchTracks /> */}
      {/* <CreateTracks /> */}
      <Query query={GET_TRACKS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <Error message={error.message} />;
          return (
            <TrackList tracks={data.tracks} />
          )
        }
        }
      </Query>
    </div>
  )
};

const GET_TRACKS_QUERY = gql`
query getTracksQuery {
  tracks {
    id
    title
    description
    url
    likeSet {
      id
    }
    postedBy {
      id
      name
    }
  }
}
`

const styles = theme => ({
  container: {
    margin: "0 auto",
    maxWidth: 960,
    padding: theme.spacing(2)
  }
});

export default withStyles(styles)(App);
