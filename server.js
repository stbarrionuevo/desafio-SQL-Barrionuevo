
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const path = require ("path")

const { chat, products } = require('./model/productsClass')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
const server = httpServer;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views'))

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')
  

    socket.emit('productos', await products.getAll())
   
   
    socket.on('update', async producto => {
      await products.add( producto )
      io.sockets.emit('productos', await products.getAll())
    })
  
    
   
    socket.emit('mensajes', await chat.getAll());
  
    
    socket.on('newMsj', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        await chat.add( mensaje )
        io.sockets.emit('mensajes', await chat.getAll());
    })
  
  })

app.set('views', path.resolve(__dirname, '../public'))

const productsRouter = require('./router/productsRouter');
app.use('/api', productsRouter)


const cartRouter = require('./router/cartRouter');
app.use('/cart', cartRouter)

const PORT = 8080;



server.listen(PORT , console.log(`------------ SERVER READY IN PORT: ${PORT} ------------`))