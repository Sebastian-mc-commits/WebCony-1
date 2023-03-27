import express from 'express'
import { createServer } from 'http'
import { Server as WebSocketServer } from 'socket.io'
import cors from 'cors'
import { userRouter, categoryRouter, foodItemRouter, spotRouter, orderRouter } from './routes'
import config from './config/config'
import { errorHandlerMiddleware } from './lib/middleware'
import SocketTypes from './types/socket.types'

const app = express()
const httpServer = createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: config.LOCALHOST_CORS
}))

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/foodItem', foodItemRouter)
app.use('/api/spot', spotRouter)
app.use('/api/order', orderRouter)

console.log('Fellas')
app.use(errorHandlerMiddleware)

httpServer.listen(config.port, () => console.log(`Server set on port ${config.port}`))

const io = new WebSocketServer(httpServer)

io.on('connection', (socket): void => {
  socket.on(SocketTypes.MAKE_AN_ORDER, ({ order }) => {
    io.emit(SocketTypes.MAKE_AN_ORDER, { order })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})
