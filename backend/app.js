import express, { json, urlencoded } from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { config } from 'dotenv'
import cors from 'cors'
import mongoDB from './helper/mongoDB.js'
import recaptchaRouter from './routes/recaptcha.routes.js'
import userRoutes from './routes/user.routes.js'
import internshipRoutes from './routes/internship.routes.js'

const app = express()

// dotenv
config()

// cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
)

// Database
mongoDB()

app.use(logger('dev'))

// Parse data
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/recaptcha', recaptchaRouter)
app.use('/api/users', userRoutes)
app.use('/api/internship', internshipRoutes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`The server is started on port ${PORT}.`)
})

export default app
