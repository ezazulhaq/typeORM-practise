import { Repository } from "typeorm/repository/Repository";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserController {
    userRepository: Repository<User> = AppDataSource.getRepository(User);

    createUser = async (_req: any, _res: any) => {
        const reqBody = _req.body;
        const user = await this.userRepository.save(reqBody);
        if (user)
            _res.status(201).json(user);
        else
            _res.status(500).json({ error: "User Not Created" });

    };

    getUsers = async (_req: any, _res: any) => {
        const users = await this.userRepository.find();
        _res.json(users);
    };

    getUserById = async (_req: any, _res: any) => {
        const userId = _req.params.id;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (user)
            _res.status(200).json(user);
        else
            _res.status(500).json({ error: "User Not Found" });
    };

    deleteUser = async (_req: any, _res: any) => {
        const userId = _req.params.id;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (user) {
            const result = await this.userRepository.remove(user);
            _res.status(200).json({ firstName: result.firstName, lastName: result.lastName })
        }
        else
            _res.status(500).json({ error: "User Not Found" });
    };
}