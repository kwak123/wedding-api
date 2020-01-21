import crypto from "crypto"

// Went with encrypting the emails, there's no way to undo a hash so an encryption gives us permanence
const ALGORITHM = "aes-128-cbc"

const salt = "foobar"
const hash = crypto.createHash("sha1")
hash.update(salt)
const KEY = hash.digest().slice(0, 16)

const IV = crypto.pseudoRandomBytes(8).toString("hex")
const PUBLIC_ENCODING = "utf8"
const SECRET_ENCODING = "hex"

const readEmailHash = (hashedEmail: string) => {
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV)
  const unhashedEmail = decipher.update(
    hashedEmail,
    SECRET_ENCODING,
    PUBLIC_ENCODING
  )
  return unhashedEmail + decipher.final(PUBLIC_ENCODING)
}

const makeEmailHash = (email: string) => {
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV)
  const hash = cipher.update(email, PUBLIC_ENCODING, SECRET_ENCODING)
  return hash + cipher.final(SECRET_ENCODING)
}

export default {
  makeEmailHash,
  readEmailHash,
}
