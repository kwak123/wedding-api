import React, { useState, useContext } from "react"

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

interface GuestAttendingProps {
  confirmed: boolean
  attending: boolean
}
const GuestAttending: React.FC<GuestAttendingProps> = ({
  attending,
  confirmed,
}) => {
  const classModifier = attending && confirmed ? "yes" : "no"
  let text: string

  if (confirmed) {
    if (attending) {
      text = "Attending"
    } else {
      text = "Not attending"
    }
  } else {
    if (attending) {
      // This branch is a safety net for bad state, you shouldn't be able to be confirmed without also knowing attendance
      text = "Confirmed, attendance unknown"
    }
    text = "Not confirmed"
  }

  return <p className={`guest-confirmed ${classModifier}`}>{text}</p>
}

const PlusOneDialog = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: (email: string) => void
}) => {
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

const GuestActions = ({
  email,
  plusOneEmail,
  isAttending,
}: {
  email: string
  plusOneEmail: string
  isAttending: boolean
}) => {
  const { refreshGuestList } = useContext(GuestContext)
  const [showDialog, setShowDialog] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)

  const dispatchToggleConfirm = () =>
    Axios.post("/api/guest/confirm/toggle", {
      guestEmail: email,
    })

  const handleLinkEmail = async (plusOneEmail: string) => {
    if (!plusOneEmail) {
      setShowDialog(false)
      return
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

  const handleTogglingAttending = () =>
    Axios.put("/api/guest/rsvp", {
      guestEmail: email,
      plusOneEmail: plusOneEmail,
      isAttending: !isAttending,
    }).then(refreshGuestList)

  const handleLink = (plusOneEmail: string) =>
    handleLinkEmail(plusOneEmail).then(() => refreshGuestList())

  const sendRsvp = () =>
    Axios.post("/api/email/test", {
      to: email,
      subject: "You're invited!",
      template: "invitation",
    }).then(refreshGuestList)

  return (
    <div className="guest-actions__container">
      <Button onClick={sendRsvp} text={"Send RSVP"} />
      <Button onClick={() => setShowDialog(true)} text={"Attach plus-one"} />
      <Button onClick={handleTogglingConfirm} text={"Confirm/Unconfirm"} />
      <Button
        onClick={handleTogglingAttending}
        text={"Attending/Not attending"}
      />
      <PlusOneDialog
        open={showDialog}
        handleClose={(plusOneEmail: string) => handleLink(plusOneEmail)}
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
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => setIsExpanded(!isExpanded)

  return (
    <Card className="guest-card__container" raised={true}>
      <div
        className="guest-summary__container"
        data-testid={`guest-${guest.name}`}
        onClick={handleExpand}
      >
        <div className="guest_summary">
          <h2 className="guest-name">{guest.name}</h2>
          <p className="guest-email">{guest.email}</p>
        </div>
        <div className="guest-plus-one__container">
          <p className="guest-name">
            {(guest.plusOneId && (guest.plusOneId as Guest).name) || "None"}
          </p>
          <p className="guest-email">
            {guest.plusOneId && (guest.plusOneId as Guest).email}
          </p>
        </div>
        <GuestAttending
          confirmed={guest.isConfirmed}
          attending={guest.isAttending}
        />
      </div>
      {isExpanded && (
        <div className="guest-details__container">
          <div className="guest-restrictions__container">
            <h3 className="guest-restrictions__header">Dietary Restrictions</h3>
            <ul>
              {guest.dietaryRestrictions.map((restriction, i) => (
                <li key={restriction + i}>
                  <p>{restriction}</p>
                </li>
              ))}
            </ul>
            <GuestActions
              email={guest.email}
              plusOneEmail={
                guest.plusOneId ? (guest.plusOneId as Guest).email : ""
              }
              isAttending={guest.isAttending}
            />
          </div>
        </div>
      )}
    </Card>
  )
}

export default GuestCard
