import Controller from  './Controller';
import UserService from  "./../services/UserService";
import User from  "./../models/User";
import jwt from 'jsonwebtoken';
import gen from '../../config/gen';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;
const userService = new UserService(
  new User().getInstance()
);

class UserController extends Controller {

  constructor(service) {
    super(service);
  }
  async signup(req, res) {
    let response = await this.service.insert(req.body);
    if (response.error) {
      return res.status(response.statusCode).send(response);
    }
    const token = jwt.sign(response, gen, {expiresIn: '72h'});
    delete response.password;
    response = {...response, token};
    return res.status(201).send(response);
  }
  async login(req, res) {
    console.log(this);
    const response = await this.service.get({username: req.body.username});
    if (response.error) {
      return res.status(response.statusCode).send(response);
    }
    const result = await bcrypt.compare(req.body.password, response.password);
    if (!result) {
      return res.status(401).send({message: 'Authentication failed'});
    }
    const token  = jwt.sign(response, gen, {expiresIn: '72h'});
    delete response.password;
    response = {...response, token};
    return res.status(201).send(response);
  }
}
console.log('user service', userService);
console.log('UserController', new UserController(userService));
export default new UserController(userService);