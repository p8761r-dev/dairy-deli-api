import { Router } from "express";
import { validateBody } from "../middlewares/validateJoi.middleware.js";
import { registerSchema, signInSchema, updatePasswordSchema } from '../validations/user.validation.js'

const router = Router();

router.post('/', validateBody(registerSchema), (req, res) => {
    res.json({message: 'ההרשמה התקבלה'});
});

router.post('/login', validateBody(signInSchema), (req, res) => {
    res.json({message: 'בקשת התחברות התקבלה'})
});

router.patch('/password', validateBody(updatePasswordSchema), (req, res) => {
    res.json({message: 'בקשת עדכון הסיסמא התקבלה'})
});

export default router;