import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserDataSourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class UserRoutes {

    static get routes(): Router {

        const router = Router();
        // const emailService = new EmailService(
        //     envs.MAILER_SERVICE,
        //     envs.MAILER_EMAIL,
        //     envs.MAILER_SECRET_KEY,
        //     envs.SEND_EMAIL,
        // );

        const dataSource = new UserDataSourceImpl();
        const userRepository = new UserRepositoryImpl(dataSource);
        const userController = new UserController( userRepository );

        router.post('/create', userController.create);
        router.get('/get-all-paginated', userController.findAll);
        router.get('/get-by-id/:id', userController.findOne);
        router.get('/get-by-email', userController.findOneByEmail)
        router.put('/update', userController.update);
        router.delete('/delete/:id', userController.dalete);

        return router;

    }

}
