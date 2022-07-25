import { Router } from "express";
import { print } from "../controllers/html.js";

const router = new Router();

router.get("/print", print);

export default router;
