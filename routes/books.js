const express = require('express')
const router = express.Router()
const Catalog = require('../public/catalog.json')

// -------------------- ROUTE: '/api/products' --------------------
router
  .route('/')
//GET '/api/products' -> devuelve todos los productos.
  .get((req, res) => {
    res.send(Catalog)
  })
//  POST '/api/products' -> recibe y agrega un producto, y lo devuelve con su id asignado.
  .post((req, res) => {
    const { id, title, price, thumbnail } = req.body
    const books = Catalog
    books.push({
      id,
      title,
      price,
      thumbnail
    })  
    res.sendStatus(201)
    console.log(book, 'body')
  })
// -------------------- ROUTE: '/api/products/:id' --------------------
router
  .route('/:id')
// GET '/api/products/:id' -> devuelve un producto según su id.
  .get((req, res) => {
    const book = Catalog.find(b => b.id == req.params.id)
    if (!book) {
        res.status(404).send("Book not found")
        return
    }
    res.send(book)
  })
// PUT '/api/products/:id' -> recibe y actualiza un producto según su id.
  .put((req, res, next) => {
    if (req.params.id == "2") {
      res.status(401).send("Book with id#2 cannot be modified")
      return
    }
    next()
  }, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const book = Catalog.find(m => m.id == id)
    if (!book) {
      res.status(404).send("book not found")
      return
    }
    book.title = title;
    res.sendStatus(200)
  })
// DELETE '/api/products/:id' -> elimina un producto según su id.
  .delete((req, res) => {
    const { id } = req.params
    const book = Catalog.find(m => m.id == id)
    if (!book) {
      res.status(404).send("book not found")
      return
    }
    const index = Catalog.indexOf(book)
    Catalog.splice(index, 1)
  res.sendStatus(200)
  })

module.exports = router