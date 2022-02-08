const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = process.env.PORT || 8080

// Middleware ↓↓
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
// app.post('/api/products', function(req, res){
//   res.sendFile(__dirname + '/public/index.html');
// });

// ROUTERS ↓↓
app.use('/api/products', require('./routes/books'))

// Error 404
app.use((req, res, next) => {
  res.status(404).render('404', {
    titulo: 'Error 404',
    descripcion: "The page you're looking for couldn't be found"
  })
})

//Port information ↓
const server = app.listen(PORT,() => {
  console.log(`Listening to port: ${PORT}`)
})
// Error management
server.on("error", (err) => {
  console.log(`Error: ${err}`)
})