let crypto = require("crypto")

export const accountName = () => {
  return string(integer(5, 12))
}

export const validationName = () => {
  return string(integer(8, 19))
}

export const invalidEmailAddress = () => {
  return string(integer(5, 50))
}

export const nonexistentEmailAddress = () => {
  return `${string(integer(5, 10))}@${string(integer(5,10))}.com`
}

export const password = () => {
  return string(integer(8, 20))
}

export const invalidPassword = () => {
  return string(integer(1, 7))
}

export const compositionName = () => {
  return string(integer(3, 35))
}

export const processAlias = () => {
  return string(integer(10, 20))
}

const integer = (min, max) => {
  return Math.floor(Math.random() * Math.floor(max - min)) + min
}

const string = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2.0)).toString('hex')
}
