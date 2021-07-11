import React, { useState } from "react"
import { Mutation } from "react-apollo"
import { gql } from "apollo-boost"
import withStyles from "@material-ui/core/styles/withStyles"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import FormControl from "@material-ui/core/FormControl"
import Paper from "@material-ui/core/Paper"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import Gavel from "@material-ui/icons/Gavel"
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone"
import Error from "../Shared/Error"

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const Register = ({ classes, setNewUser }) => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (event, createUser) => {
    event.preventDefault()
    createUser()
    // const res = await createUser()
    // Do something with the response
    // setOpen(true)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="h5">Register</Typography>

        <Mutation
          mutation={REGISTER_MUTATION}
          variables={{ username, name, email, password }}
          onCompleted={data => {
            console.log(data)
            setOpen(true)
          }}
        >
          {(createUser, { loading, error }) => {
            return (
              <form
                onSubmit={event => handleSubmit(event, createUser)}
                className={classes.form}
              >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Full Name</InputLabel>
                  <Input
                    id="name"
                    onChange={event => setName(event.target.value)}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    onChange={event => setUsername(event.target.value)}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                  />
                </FormControl>
                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={
                    loading ||
                    !username.trim() ||
                    !name.trim() ||
                    !email.trim() ||
                    !password.trim()
                  }
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
                <Button
                  onClick={() => setNewUser(false)}
                  variant="outlined"
                  color="primary"
                  fullWidth >
                  Previous User ? Log in here
                </Button>

                {/* Error Handling */}
                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
      </Paper>
      {/* Success Dialog */}
      <Dialog
        open={open}
        disablebackdropClick={true}
        TransitionComponent={Transition}
      >
        <DialogTitle className={classes.title}>
          <VerifiedUserTwoTone className={classes.icon} />
          New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>User successfully created!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setNewUser(false)}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

// prettier-ignore
const REGISTER_MUTATION = gql`
  mutation ( $email: String!, $name: String!, $password: String!, $username: String! ) {
    createUser( username: $username, email: $email, name: $name, password: $password ) {
      user {
        username
        name
        email
      }
    }
  }
`

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
})

export default withStyles(styles)(Register)
