import { Router } from 'express';
import { UserController, Controller } from '../controllers/UsersController';
import decodeJWT from '../middlewares/decodeJWT';

class UserRoutes {
    public router: Router;

    constructor(private controller: UserController) {
        this.router = Router();

        this.loadRoutes();
    }

    loadRoutes() {
        // this.router.use( decodeJWT().unless({ method: ['POST'] }) )
        this.router.get('/get-photo/:photo', this.controller.getPhoto);
        this.router.route('/')
            .get(this.controller.index)
            .post(
                this.controller.multer(),
                this.controller.create,
            )
        this.router.route('/:id')
                .get(this.controller.find, this.controller.show);
    }
}

const userRoutes: Router = new UserRoutes(Controller).router;

export default userRoutes;