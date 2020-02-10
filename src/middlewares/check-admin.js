import { jwt } from 'jsonwebtoken';
import { gen } from '../../config/gen';
export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = jwt.verify(token, gen);
    if (userData.role === 'admin') {
      req.userData = userData;
      next();
    } else {
      res.status(401).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Auth failed' });
  }
};
