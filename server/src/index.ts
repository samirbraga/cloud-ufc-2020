require('dotenv').config();
import AppServer from "./Server";


const appServer = new AppServer()

appServer.start(3000)