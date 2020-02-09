import server from './config/server';
import './config/database';
const PORT = process.env.PORT || 5000;


// connecting ...
server.listen(PORT, () => {
  console.log(`Chat dagdega running on port ${PORT}`);
});