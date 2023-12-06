import { Result } from "../dtos/service.dto";
import repository from "../database/prisma.connection";
import * as jwt from 'jsonwebtoken';

export class AuthService {
    private readonly JWT_SECRET = "Leandro para TechHelper 2024!"

    public async login(email: string, password: string): Promise<Result> {
        const result = await repository.aluno.findUnique({
            where: {
                email,
                password,
            },
        });

        if (!result) {
            return {
                code: 401,
                message: "Invalid credentials",
            };
        }

        const token = jwt.sign({id: result.id }, this.JWT_SECRET, {expiresIn: "1h"}) 

        await repository.aluno.update({
            where: {
                id: result.id,
            },
            data: {
                authToken: token,
            },
        });

        return {
            code: 200,
            message: "Login successfuly done",
            data: {
                id: result.id,
                token,
            },
        };
    }

    public async validateToken(token: string): Promise<boolean> {
        try {
            jwt.verify(token, this.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
}

