import { Schema, model } from 'mongoose'
import { genSalt, hash as bcryptHash } from 'bcrypt'

const UserSchema = new Schema(
  {
    name: String,
    surname: String,
    schoolNumber: Number,
    phoneNumber: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student'
    }
  },
  {
    collection: 'Users',
    timestamps: true
  }
)

// kayıt olmadan önce gerçekleştir - model içersinde middleware oluşturur.
UserSchema.pre('save', function (next) {
  const currentUser = this
  const saltRounds = 10

  genSalt(saltRounds, function (err, salt) {
    if (err) return next(err)
    bcryptHash(currentUser.password, salt, function (err, hash) {
      if (err) return next(err)
      currentUser.password = hash
      next()
    })
  })
})

export default model('User', UserSchema)
