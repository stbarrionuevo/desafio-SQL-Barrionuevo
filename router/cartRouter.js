const express = require('express');
const cartRouter = express.Router();

const cart = require('../model/CartClass')

cartRouter.post('/',)

cartRouter.delete('/')


cartRouter.post('/', async (req, res) => {
    try {
        
        return res.json(`Nuevo carrito creado`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear el carrito ${err}`
        });
 
      
    }})


module.exports = cartRouter;