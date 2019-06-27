import { SessionsController, Controller } from '../controllers/SessionsController';
import { Router } from 'express'; 

class SessionRoutes {
    public router: Router;

    constructor(private controller: SessionsController) {
        this.router = Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.route('/')
        .post(
            this.controller.authenticate, 
            this.controller.generateToken,
            this.controller.sendToken
        );
    }
}

const sessionRoutes: Router = new SessionRoutes(Controller).router;

export default sessionRoutes;