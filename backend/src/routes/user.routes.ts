import { Router } from 'express'
import * as UserController from '../controllers/user.controller'

const router = Router()

router.get('/getUser/:id', UserController.getUserById)

router.post('/createUser/', UserController.createUser)

router.get('/getUsers', UserController.getUsers)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/getTrueUsers', UserController.getTrueUsers)

export default router
