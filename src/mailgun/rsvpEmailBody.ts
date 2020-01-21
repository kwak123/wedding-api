export default `
<div>
  <p>This is the RSVP template</p>
</div>
`

// import hashingUtils from "../utils/hashing"

// const makeEmailBody = (email: string) => {
//   let BASE_URL = `http://localhost:3000/`
//   if (process.env.NODE_ENV && process.env.NODE_ENV === "prod") {
//     BASE_URL = `https://kwakanalia.wedding/`
//   }
//   const CONFIRM_PAGE = `confirm/`

//   const hashedEmail = hashingUtils.makeEmailHash(email)
//   const ENDPOINT = `?email=${hashedEmail}`

//   const linkWithHash = `${BASE_URL}${CONFIRM_PAGE}${ENDPOINT}`

//   return `
//     <div>
//       <p>This is the RSVP template</p>
//       <a href=${linkWithHash}>Confirm Here</a>
//     </div>
//   `
// }

// export default {
//   makeEmailBody,
// }
