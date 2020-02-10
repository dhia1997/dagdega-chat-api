import Controller from  './Controller';
import UserService from  "./../services/UserService";
import User from  "./../models/User";
import jwt from 'jsonwebtoken';
import gen from '../../config/gen';
import bcrypt from 'bcrypt';
// const SALT_WORK_FACTOR = 10;
const userService = new UserService(
  new User().getInstance()
);

class UserController extends Controller {

  constructor(service) {
    super(service);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }
  async signup(req, res) {
    let response = await this.service.insert(req.body);
    if (response.error) {
      return res.status(response.statusCode).send(response);
    }
    const token = jwt.sign(response, gen, {expiresIn: '72h'});
    response['item']['password'] = undefined;
    response = {...response, token};
    return res.status(201).send(response);
  }
  async login(req, res) {
    let response = await this.service.get({username: req.body.username});
    if (response.error) {
      return res.status(response.statusCode).send(response);
    }
    const result = await bcrypt.compare(req.body.password, response.item.password);
    if (!result) {
      return res.status(401).send({message: 'Authentication failed'});
    }
    const token  = jwt.sign(response, gen, {expiresIn: '72h'});
    response['item']['password'] = undefined;
    console.log('response to be returned', response);
    response = {...response, token};
    return res.status(201).send(response);
  }
}
export default new UserController(userService);