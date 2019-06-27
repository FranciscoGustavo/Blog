import { Router } from 'express';

// Controller
import { ProjectsController, Controller } from '../controllers/ProyectsController';


// Middlewares
//const isAuthenticate = require('../middlewares/isAuthenticate');

class ProjectRoutes {
    public router: Router

    constructor(private controller: ProjectsController) {
        this.router = Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.route('/')
            /*.get(this.controller.index)
            .post(this.controller.create);

        this.router.route('/:id')
            .put(this.controller.find, this.controller.update);
*/
    }
    
}

const projectRoutes: Router = new ProjectRoutes(Controller).router;

export default projectRoutes;