import { Request, Response } from "express";
import { CreateUserUseCase } from "../usecases/User/CreateUserUseCase";
import { ListUsersUseCase } from "../usecases/User/ListUsersUseCase";
import { EditUserUseCase } from "../usecases/User/EditUserUseCase";
import { ChangeUserStatusUseCase } from "../usecases/User/ChangeUserStatusUseCase";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const createUser = new CreateUserUseCase();
      const user = await createUser.execute({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { onlyActive } = req.query;
      const listUsers = new ListUsersUseCase();
      const users = await listUsers.execute(onlyActive === "true");
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async edit(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const editUser = new EditUserUseCase();
      await editUser.execute({ id: Number(id), name, email });
      return res.status(200).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const changeUserStatus = new ChangeUserStatusUseCase();
      await changeUserStatus.execute(Number(id), false);
      return res.status(200).json({ message: "Usuário desativado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async activate(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const changeUserStatus = new ChangeUserStatusUseCase();
      await changeUserStatus.execute(Number(id), true);
      return res.status(200).json({ message: "Usuário ativado com sucesso." });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
