import { Router } from 'express'
import axios from 'axios'

const router = Router()

router.post('/verify', async (req, res) => {
  const { token } = req.body
  await axios.post(
    `${process.env.VERIFY_URL}?secret=${process.env.SECRET_KEY}&response=${token}`
  )

  if (res.status(200)) {
    return res.send(true)
  } else {
    return res.send(false)
  }
})

export default router
