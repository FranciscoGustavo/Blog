// Import modules
import { Router } from 'express';

// Controller
import { PostsController, Controller } from '../controllers/PostsController';

// Middleawares
//const isAuthenticate = require('../middlewares/isAuthenticate');




    

class PostRoutes {
    public router: Router;

    constructor(private controller: PostsController) {
        this.router = Router();

        this.loadRoutes();

    }

    loadRoutes(){
        this.router.get('/get-cover/:cover', this.controller.getCover);
        this.router.get('/get-image/:image', this.controller.getImage);

        this.router.route('/')
            .get(this.controller.index)
            .post(this.controller.create);

        this.router.route('/:slug')
            .get(this.controller.find, this.controller.show)
            /*.post(PostsController.multer(), PostsController.find, PostsController.update)*/
    }
}

const postRoutes = new PostRoutes(Controller).router;

export default postRoutes;