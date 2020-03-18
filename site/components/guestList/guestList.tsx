import * as React from "react"

import { GuestContext } from "../../contexts/guests"
import Button from "../common/Button"

// Plus One
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import Snackbar from "@material-ui/core/Snackbar"

import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

import "./guestList.scss"
import Axios from "axios"
import { Guest } from "../../contexts/guests"

interface GuestProps {
  guest: Guest
}

const GuestConfirmed = ({ confirmed }: { confirmed: boolean }) => (
  <p className={confirmed ? "guest-confirmed" : "guest-not-confirmed"}>
    {confirmed ? "Confirmed" : "Not confirmed"}
  </p>
)

const PlusOneDialog = ({ open, handleClose }) => {
  const [email, setEmail] = React.useState("")
  const onLink = () => handleClose(email)
  const onCancel = () => handleClose(null)

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Link Plus One</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Insert email of this person's plus one
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} text="Cancel" />
        <Button onClick={onLink} text="Link" />
      </DialogActions>
    </Dialog>
  )
}

const GuestActions = ({ email }) => {
  const { refreshGuestList } = React.useContext(GuestContext)
  const [showDialog, setShowDialog] = React.useState(false)
  const [showErrorToast, setShowErrorToast] = React.useState(false)

  const dispatchToggleConfirm = () =>
    Axios.post("/api/guest/confirm/toggle", {
      guestEmail: email,
    })

  const handleLinkEmail = plusOneEmail => {
    if (!plusOneEmail) {
      setShowDialog(false)
      return Promise.resolve()
    }

    return Axios.post("/api/guest/link", {
      guestEmail: email,
      plusOneEmail,
    })
      .then(() => {
        setShowDialog(false)
      })
      .catch(() => {
        setShowErrorToast(true)
        setShowDialog(false)
      })
  }

  const handleCloseToast = () => {
    setShowErrorToast(false)
  }

  const handleTogglingConfirm = () =>
    dispatchToggleConfirm().then(() => refreshGuestList())

  const handleLink = plusOneEmail =>
    handleLinkEmail(plusOneEmail).then(() => refreshGuestList())

  return (
    <div className="guest-actions__container">
      <Button onClick={() => {}} text={"Send RSVP"} />
      <Button onClick={() => setShowDialog(true)} text={"Attach plus-one"} />
      <Button onClick={handleTogglingConfirm} text={"Confirm/Unconfirm"} />
      <PlusOneDialog
        open={showDialog}
        handleClose={plusOneEmail => handleLink(plusOneEmail)}
      />
      <Snackbar
        open={showErrorToast}
        autoHideDuration={5000}
        onClose={handleCloseToast}
      >
        <Card>
          <CardContent>
            <Typography component="p" variant="body1">
              Uh oh, couldn't link that email.
            </Typography>
          </CardContent>
        </Card>
      </Snackbar>
    </div>
  )
}

const GuestCard = ({ guest }: GuestProps) => {
  return (
    <Card className="guest-card__container" raised={true}>
      <div
        className="guest-details__container"
        data-testid={`guest-${guest.name}`}
      >
        <p className="guest-name">{guest.name}</p>
        <p className="guest-email">Email: {guest.email}</p>
        <p className="guest-plus-one">
          Plus One: {guest.plusOneId && guest.plusOneId.name}
        </p>
        <GuestConfirmed confirmed={guest.isConfirmed} />
      </div>
      <div className="guest-restrictions__container">
        <h3 className="guest-restrictions__header">Dietary Restrictions</h3>
        <ul>
          {guest.dietaryRestrictions.map((restriction, i) => (
            <li key={restriction + i}>
              <p>{restriction}</p>
            </li>
          ))}
        </ul>
      </div>
      <GuestActions email={guest.email} />
    </Card>
  )
}

interface GuestListProps {
  guestList: Guest[]
}

export const GuestList: React.FC<GuestListProps> = ({ guestList }) => (
  <div className="guest-list__container">
    {guestList.map(guest => (
      <GuestCard key={guest._id} guest={guest} />
    ))}
  </div>
)

export default GuestList
