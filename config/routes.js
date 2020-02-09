import MessageController from './../src/controllers/MessageController';

export default (server) => {

  // POST ROUTES
  server.get(`/api/message`, MessageController.getAll);
  server.get(`/api/message/:params`, MessageController.get);
  server.post(`/api/message`, MessageController.insert)
  server.put(`/api/message/:id`, MessageController.update);
  server.delete(`/api/message/:id`, MessageController.delete);

}