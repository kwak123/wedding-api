import hashingUtils from "./hashing"

describe("mailgun utils", () => {
  describe("makeEmailHash", () => {
    const { makeEmailHash } = hashingUtils

    it("should generate a random hash for different strings", () => {
      const testEmailOne = "sam@gmail.com"
      const testEmailTwo = "elysia@gmail.com"

      const hashedEmailOne = makeEmailHash(testEmailOne)
      const hashedEmailTwo = makeEmailHash(testEmailTwo)

      expect(typeof hashedEmailOne).toEqual("string")
      expect(typeof hashedEmailTwo).toEqual("string")
      expect(hashedEmailOne).not.toEqual(testEmailOne)
      expect(hashedEmailOne).not.toEqual(hashedEmailTwo)
    })

    it("should generate the same has for the same strings", () => {
      const testEmailOne = "sam@gmail.com"

      const hashedEmailOne = makeEmailHash(testEmailOne)
      const hashedEmailTwo = makeEmailHash(testEmailOne)

      expect(hashedEmailOne).toEqual(hashedEmailTwo)
    })
  })

  describe("readEmailHash", () => {
    const { readEmailHash, makeEmailHash } = hashingUtils

    it("should dehash a hash string back to the correct email", () => {
      const testEmail = "sam@gmail.com"
      const hashedEmail = makeEmailHash(testEmail)
      const dehashedEmail = readEmailHash(hashedEmail)

      expect(dehashedEmail).toEqual(testEmail)
    })
  })
})
