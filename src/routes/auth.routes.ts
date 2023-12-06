import { Router } from "express";
import { AlunoController } from "../controllers";
import { avaliacaoRoutes } from "./avaliacao.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthService } from "../services/auth.service";

export const authRoutes = () => {
    const router = Router();
    const authService = new AuthService();



    router.post("/login", async (req, res)=> {
        const {email, password} = req.body;
        const result = await authService.login(email, password);
        res.status(result.code).json(result)
    });


    router.get("/protected", authMiddleware, (req, res)=>{
        res.json({message: "This is a protected route!"})
    })
    return router;
};
