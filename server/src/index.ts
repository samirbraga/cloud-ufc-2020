require('dotenv').config();
import AppServer from "./Server";

const appServer = new AppServer()

appServer.start(parseInt(process.env.PORT) || 3000)