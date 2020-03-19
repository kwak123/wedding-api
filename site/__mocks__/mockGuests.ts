import { Guest } from "../contexts/guests"

export const firstLinkedGuest: Guest = {
  hasReceivedRsvp: false,
  isConfirmed: false,
  isAttending: false,
  dietaryRestrictions: ["onion", "garlic", "cilantro"],
  _id: "5e729ee5256afd03413578f8",
  name: "Elysia Hwang",
  isPlusOneEligible: true,
  plusOneId: {
    hasReceivedRsvp: false,
    isConfirmed: false,
    isAttending: false,
    dietaryRestrictions: [],
    _id: "5e72a603eb422603d23a73a2",
    name: "Samuel Kwak",
    isPlusOneEligible: true,
    plusOneId: "5e729ee5256afd03413578f8",
    email: "samuel.kwak@gmail.com",
  },
  email: "elysia.hwang@gmail.com",
}

export const secondLinkedGuest: Guest = {
  hasReceivedRsvp: false,
  isConfirmed: false,
  isAttending: false,
  dietaryRestrictions: [],
  _id: "5e72a603eb422603d23a73a2",
  name: "Samuel Kwak",
  isPlusOneEligible: true,
  plusOneId: {
    hasReceivedRsvp: false,
    isConfirmed: false,
    isAttending: false,
    dietaryRestrictions: ["onion", "garlic", "cilantro"],
    _id: "5e729ee5256afd03413578f8",
    name: "Elysia Hwang",
    isPlusOneEligible: true,
    plusOneId: "5e72a603eb422603d23a73a2",
    email: "elysia.hwang@gmail.com",
  },
  email: "samuel.kwak@gmail.com",
}

export const noPlusOneGuest: Guest = {
  hasReceivedRsvp: false,
  isConfirmed: false,
  isAttending: false,
  dietaryRestrictions: [],
  _id: "5e729ee9256afd03413578f9",
  name: "No Plus One",
  isPlusOneEligible: false,
  plusOneId: null,
  email: "noPlusOne@gmail.com",
}

export const plusOneNotSetGuest: Guest = {
  hasReceivedRsvp: false,
  isConfirmed: false,
  isAttending: true,
  dietaryRestrictions: [],
  _id: "5e72a5d8eb422603d23a73a1",
  name: "Brian Jung",
  isPlusOneEligible: true,
  plusOneId: null,
  email: "brian.jung@gmail.com",
}

export default [
  firstLinkedGuest,
  secondLinkedGuest,
  noPlusOneGuest,
  plusOneNotSetGuest,
]
