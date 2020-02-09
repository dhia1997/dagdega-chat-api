import Controller from  './Controller';
import MessageService from  "./../services/MessageService";
import Post from  "./../models/Post";
const messageService = new MessageService(
  new Message().getInstance()
);

class MessageController extends Controller {

  constructor(service) {
    super(service);
  }

}

export default new MessageController(messageService);