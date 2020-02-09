import MessageController from './../src/controllers/MessageController';
import UserController from './../src/controllers/UserController';

export default (server) => {
  server.get(`/api/message`, MessageController.getAll);
  server.get(`/api/message/:params`, MessageController.get);
  server.post(`/api/message`, MessageController.insert)
  server.put(`/api/message/:id`, MessageController.update);
  server.delete(`/api/message/:id`, MessageController.delete);
  server.get(`/api/user`, UserController.getAll);
  server.get(`/api/user/:params`, UserController.get);
  server.post(`/api/signup`, UserController.signup)
  server.post(`/api/login`, UserController.login)
  server.put(`/api/user/:id`, UserController.update);
  server.delete(`/api/user/:id`, UserController.delete);
}