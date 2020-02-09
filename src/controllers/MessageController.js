import Controller from  './Controller';
import MessageService from  "./../services/MessageService";
import Message from  "./../models/Message";
const messageService = new MessageService(
  new Message().getInstance()
);

class MessageController extends Controller {

  constructor(service) {
    super(service);
  }

}

export default new MessageController(messageService);