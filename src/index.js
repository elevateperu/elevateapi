import app from './app';
import './database';
import "./libs/initialSetup.js";
app.listen(app.get('port'));
console.log('server on portrr', app.get('port'));
