import mongoose, { set, connect } from 'mongoose'

export default () => {
  set('strictQuery', true)
  connect('mongodb://127.0.0.1:27017/internship-automation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected')
  })
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Not Connected', err)
  })
}
