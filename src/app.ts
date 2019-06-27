'use strict'

// Import Modules
import express from 'express';
import morgan from 'morgan';

// Import Routes
import userRoutes from './routes/UserRoutes';
import postRoutes from './routes/PostRoutes';
import sessionRoutes from './routes/SessionRoutes';

// Load DataBase
import dataBase from './config/databse';

// Midlewares
import { CORSMiddleware } from './middlewares/allowCORS.js'

class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        dataBase.connect();
        
        this.config();
        this.routes();
    }
    
    config() {
        this.app.set('port', process.env.PORT || 8080);
        
        this.app.use( morgan('dev') );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use( CORSMiddleware );
        this.app.use( '/api/users', userRoutes );
        this.app.use( '/api/posts', postRoutes );
        this.app.use( '/api/sessions', sessionRoutes );
    }

    start() {
        this.app.listen(this.app.get('port'), () => {

            console.log('Serer is listening on port ' + this.app.get('port'));
            
        });
    }
}

export default App;