import { Repository } from "typeorm/repository/Repository";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserController {
    userRepository: Repository<User> = AppDataSource.getRepository(User);

    constructor() {
    }

    createUser = async (_req: any, _res: any) => {
        const reqBody = _req.body;
        let user = new User();
        user = await this.userRepository.save(reqBody);
        _res.status(201).json(user);
    };

    getUsers = async (_req: any, _res: any) => {
        const users = await this.userRepository.find();
        _res.json(users);
    };

    getUserById = async (_req: any, _res: any) => {
        const userId = _req.params.id;
        const user = await this.userRepository.findOneBy({ id: userId });
        _res.json(user);
    };

    deleteUser = async (_req: any, _res: any) => {
        const userId = _req.params.id;
        const user = await this.userRepository.findOneBy({ id: userId });
        const result = await this.userRepository.remove(user);
        _res.status(200).json({ firstName: result.firstName, lastName: result.lastName });
    };
}