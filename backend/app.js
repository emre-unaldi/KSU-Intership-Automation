process.env.TZ = 'Europe/Istanbul';
import express, { json, urlencoded } from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { config } from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoDB from './helper/mongoDB.js'
import recaptchaRouter from './routes/recaptcha.routes.js'
import userRoutes from './routes/user.routes.js'
import internshipRoutes from './routes/internship.routes.js'
import fileRoutes from './routes/file.routes.js'
import announcementRoutes from './routes/announcement.routes.js'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

// public/uploads export
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(__dirname))

app.use(logger('dev'))

// Parse data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.use('/api/recaptcha', recaptchaRouter)
app.use('/api/users', userRoutes)
app.use('/api/internship', internshipRoutes)
app.use('/api/file', fileRoutes)
app.use('/api/announcement', announcementRoutes)


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
