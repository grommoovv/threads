import mongoose from 'mongoose'
import { __MONGO_URI__ } from './constants'

let isConnected = false

const connectToDb = async () => {
  mongoose.set('strictQuery', true)

  if (!__MONGO_URI__) return console.log('missing mongo uri key')

  if (isConnected) {
    console.log('mongo connection already established')
    return
  }

  try {
    await mongoose.connect(__MONGO_URI__)
    isConnected = true
    console.log('connected to mongo')
  } catch (error) {
    console.log(error)
  }
}

export { connectToDb }
