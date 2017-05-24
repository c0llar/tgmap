import { interpolateRainbow } from 'd3'

const hash = str => { // djb2
  let hash = 5381
  for (let c of str)
    hash = ((hash << 5) + hash) + c.charCodeAt(0)

  return hash
}

const reverseString = str => str.split('').reverse().join('')

export const colorById = id => interpolateRainbow(hash(reverseString(id)) % 0.99)

