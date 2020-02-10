import MessageController from './../src/controllers/MessageController';
import UserController from './../src/controllers/UserController';
import authChecker from '../src/middlewares/check-auth';
import adminChecker from '../src/middlewares/check-auth';
export default (server) => {
  server.get(`/api/message`, authChecker, MessageController.getAll);
  server.get(`/api/message/:params`, adminChecker, MessageController.get);
  server.post(`/api/message`, adminChecker, MessageController.insert)
  server.put(`/api/message/:id`, adminChecker, MessageController.update);
  server.delete(`/api/message/:id`, adminChecker, MessageController.delete);
  server.get(`/api/user`, adminChecker, UserController.getAll);
  server.get(`/api/user/:params`, adminChecker, UserController.get);
  server.post(`/api/signup`, UserController.signup)
  server.post(`/api/login`, UserController.login)
  server.put(`/api/user/:id`, adminChecker, UserController.update);
  server.delete(`/api/user/:id`, adminChecker, UserController.delete);
}