import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.post("/signup", controllers.userSignUp);
router.post("/login");

export const userRouter = router;
