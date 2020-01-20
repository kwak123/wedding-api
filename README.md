Really, this needs to be able to tell who is invited, add a new guest, and send emails?

The main data model is the WeddingGuest, properties and documentation enumerated below.

```js
export interface WeddingGuest extends Document {
  // Guest name
  name: string

  // Mongo ID of Guest's plus-one
  plusOneId: string

  // Guest email - used as UUID outside of Mongo ID
  email: string

  // Whether guest has responded to RSVP
  confirmed: boolean

  // Whether guest is attending or not
  attending: boolean

  // List of dietary restrictions, simply string for now
  dietaryRestrictions: string[]
}
```
