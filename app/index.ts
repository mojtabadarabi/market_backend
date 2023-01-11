import {setupServer} from "./http/helpers/app";
import {corsOptions} from "../constants";
import {ErrorHandler} from "./http/helpers/error";

const DatabaseTools = require('./http/helpers/Mongo')

const express = require('express')
const app = express()
const expressBusboy = require('express-busboy');
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})
require('dotenv').config()
const routes = require('./routes')
const multer = require('multer');
const fileUpload = require('express-fileupload')

class Application {
    constructor() {
        setupServer(app)
        DatabaseTools.connectToMongo({url: 'mongodb://localhost:27017/market'})
        this.setupMiddlewares()
        this.setupRoutes()
        app.use(ErrorHandler)
    }
    setupMiddlewares() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cors(corsOptions))
    }
    setupRoutes() {
        app.use('/api', routes)
        app.use('/uploads', express.static('./uploads'));
    }
}

module.exports = Application