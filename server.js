// Server setup
const jsonServer = require('json-server');
const { readSync } = require('fs');
const { RSA_NO_PADDING } = require('constants');
const server = jsonServer.create();
const dbPath = './src/assets/catalog/inventoryData.json';
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();
 
// Set default middlewares
server.use(middlewares);

const isAuthorizableRequest = req => {
  return req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'PATCH';
}

const isAuthorized = req => {
  // TODO use env for store username and password
  return (req.query.username === "admin" && req.query.password === "password");
}

// Server POST, PUT, DELETE, PATCH auth
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if(isAuthorizableRequest(req) && !isAuthorized(req)){
    res.sendStatus(401);
  }else{
    next();
  }
})

// Use default router 
server.use(router);
server.listen(3001, () => {
  console.log('JAMBO back-end server is running')
});