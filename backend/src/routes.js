const { Router } = require('express');
const middlewareAuth = require('./middlewares/auth');

const routes = new Router();

const userController = require('./controllers/usersController');
const clientController = require('./controllers/clientsController');
const productController = require('./controllers/productsController');
const osController = require('./controllers/osController');
const sessionController = require('./controllers/sessionController');

// Session
routes.post('/session', sessionController.session);
// Usuarios
routes.get('/user', userController.index);
routes.post('/user', userController.create);
routes.put('/user/:id', middlewareAuth, userController.update);
routes.delete('/user/:id', userController.delete);
// Clientes
routes.get('/client', middlewareAuth, clientController.index);
routes.post('/client', middlewareAuth, clientController.create);
routes.put('/client/:id', middlewareAuth, clientController.update);
routes.delete('/client/:id', middlewareAuth, clientController.delete);
// // Produtos
routes.get('/product', middlewareAuth, productController.index);
routes.post('/product', middlewareAuth, productController.create);
routes.put('/product/:id', middlewareAuth, productController.update);
routes.delete('/product/:id', middlewareAuth, productController.delete);
// // Ordem de serviço
routes.get('/os', middlewareAuth, osController.index);
routes.post('/os', middlewareAuth, osController.create);
routes.put('/os/:id', middlewareAuth, osController.update);
routes.delete('/os/:id', middlewareAuth, osController.delete);

module.exports = routes;
